import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import questionData from '@/data/questions.json';
import archetypesData from '@/data/archetypes.json';

// --- Types ---
export type AgeGroup = 'explorer' | 'navigator' | null;

export interface InterestQuestion {
  id: string;
  scenario: string;
  optionA: { text: string; trait: string };
  optionB: { text: string; trait: string };
}

export interface AptitudeQuestion {
  id: string;
  domain: string;
  question: string;
  options: string[];
  correctIndex: number;
  difficulty: string;
}

export type AssessmentStage = 'onboarding' | 'interests' | 'aptitude' | 'calculating' | 'results';

// We now track 'presented' counts to calculate percentages.
type TraitScores = Record<string, { count: number; presentedCount: number; totalTimeMs: number }>;
type DomainScores = Record<string, { count: number; totalPresented: number; totalTimeMs: number }>;

interface AssessmentState {
  // Session State
  stage: AssessmentStage;
  ageGroup: AgeGroup;
  
  // Selected Question Pool for this session
  sessionInterests: InterestQuestion[];
  sessionAptitudes: AptitudeQuestion[];
  
  // Progress & Scores
  currentQuestionIndex: number;
  riasecScores: TraitScores;
  aptitudeScores: DomainScores;

  // User Personalization
  userName: string;
  setUserName: (name: string) => void;

  // Actions
  setAgeGroup: (group: AgeGroup) => void;
  startAssessment: () => void;
  answerInterest: (chosenTrait: string, timeMs: number) => void;
  answerAptitude: (domain: string, isCorrect: boolean, timeMs: number) => void;
  calculateResults: () => string; // Returns the URL encoded string
  resetAssessment: () => void;
}

// --- Helper to shuffle array ---
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// --- Store ---
export const useAssessmentStore = create<AssessmentState>()(
  persist(
    (set, get) => ({
      stage: 'onboarding',
      ageGroup: null,
      userName: '',
      sessionInterests: [],
      sessionAptitudes: [],
      currentQuestionIndex: 0,
      riasecScores: {},
      aptitudeScores: {},

      setUserName: (name) => set({ userName: name }),
      setAgeGroup: (group) => set({ ageGroup: group }),

      startAssessment: () => {
        // Quota Sampling for Interests: We just pick 20 random (balanced in the JSON)
        const shuffledInterests = shuffleArray(questionData.interests as InterestQuestion[]).slice(0, 20);
        
        // Quota Sampling for Aptitude: Balance across domains
        const allAptitudes = questionData.aptitude as AptitudeQuestion[];
        const domains = [...new Set(allAptitudes.map(q => q.domain))]; // Usually 4-6 domains
        const questionsPerDomain = 4; // Target 4 per domain = 16 questions total, or adapt as needed.
        let balancedAptitudes: AptitudeQuestion[] = [];
        
        for (const d of domains) {
            const domainQs = allAptitudes.filter(q => q.domain === d);
            // If a domain has fewer than questionsPerDomain, take all it has
            const selected = shuffleArray(domainQs).slice(0, questionsPerDomain);
            balancedAptitudes.push(...selected);
        }
        
        // Shuffle the final balanced set
        const shuffledAptitudes = shuffleArray(balancedAptitudes);

        set({
          stage: 'interests',
          sessionInterests: shuffledInterests,
          sessionAptitudes: shuffledAptitudes,
          currentQuestionIndex: 0,
          riasecScores: {},
          aptitudeScores: {},
        });
      },

      answerInterest: (chosenTrait, timeMs) => {
        set((state) => {
          const currentQuestion = state.sessionInterests[state.currentQuestionIndex];
          const optionATrait = currentQuestion.optionA.trait;
          const optionBTrait = currentQuestion.optionB.trait;

          // Initialize if not exist
          const newScores = { ...state.riasecScores };
          if (!newScores[optionATrait]) newScores[optionATrait] = { count: 0, presentedCount: 0, totalTimeMs: 0 };
          if (!newScores[optionBTrait]) newScores[optionBTrait] = { count: 0, presentedCount: 0, totalTimeMs: 0 };

          newScores[optionATrait].presentedCount += 1;
          newScores[optionBTrait].presentedCount += 1;
          
          newScores[chosenTrait].count += 1;
          newScores[chosenTrait].totalTimeMs += timeMs; // Add time only to chosen

          const nextIndex = state.currentQuestionIndex + 1;
          const isDone = nextIndex >= state.sessionInterests.length;

          return {
            riasecScores: newScores,
            currentQuestionIndex: isDone ? 0 : nextIndex,
            stage: isDone ? 'aptitude' : state.stage,
          };
        });
      },

      answerAptitude: (domain, isCorrect, timeMs) => {
        set((state) => {
          const currentScore = state.aptitudeScores[domain] || { count: 0, totalPresented: 0, totalTimeMs: 0 };
          const newScores = {
            ...state.aptitudeScores,
            [domain]: {
              count: currentScore.count + (isCorrect ? 1 : 0),
              totalPresented: currentScore.totalPresented + 1,
              totalTimeMs: currentScore.totalTimeMs + timeMs,
            }
          };

          const nextIndex = state.currentQuestionIndex + 1;
          const isDone = nextIndex >= state.sessionAptitudes.length;

          return {
            aptitudeScores: newScores,
            currentQuestionIndex: isDone ? 0 : nextIndex,
            stage: isDone ? 'calculating' : state.stage,
          };
        });
      },

      calculateResults: () => {
        const state = get();
        
        // --- 1. Normalized Aptitude (%) ---
        const aptitudePercentages = Object.entries(state.aptitudeScores).map(([key, data]) => {
          return {
            key,
            percentage: data.totalPresented > 0 ? (data.count / data.totalPresented) : 0,
            totalTimeMs: data.totalTimeMs
          };
        }).sort((a, b) => {
          if (Math.abs(b.percentage - a.percentage) > 0.01) return b.percentage - a.percentage;
          return a.totalTimeMs - b.totalTimeMs; // Tie-breaker: speed
        });
        
        const topAptitude = aptitudePercentages.length > 0 ? aptitudePercentages[0].key : 'Logical';

        // --- 2. Normalized RIASEC Vector (%) ---
        const traitsOrder = ["Realistic", "Investigative", "Artistic", "Social", "Enterprising", "Conventional"];
        const riasecPercentages = traitsOrder.map(trait => {
           const data = state.riasecScores[trait];
           if (!data || data.presentedCount === 0) return 0.1; // Baseline if missing
           return data.count / data.presentedCount;
        });

        // --- 3. Cosine Similarity Matching for Archetype ---
        let bestMatch = archetypesData[0].id;
        let highestSim = -1;
        
        for (const arch of archetypesData) {
            // Create the archetype's ideal vector (1 for primary traits, 0 for others)
            const archVector = traitsOrder.map(t => arch.traits.includes(t) ? 1.0 : 0.0);
            
            // Calculate Cosine Similarity
            let dotProduct = 0;
            let normUser = 0;
            let normArch = 0;
            
            for (let i = 0; i < 6; i++) {
                dotProduct += riasecPercentages[i] * archVector[i];
                normUser += riasecPercentages[i] * riasecPercentages[i];
                normArch += archVector[i] * archVector[i];
            }
            
            const sim = (normUser === 0 || normArch === 0) ? 0 : dotProduct / (Math.sqrt(normUser) * Math.sqrt(normArch));
            
            // If the primary aptitude matches the archetype's primary aptitude, give a slight boost (e.g. +0.05)
            // Assuming archetypesData might have a primaryAptitude field
            const finalSim = (arch as any).primaryAptitude === topAptitude ? sim + 0.05 : sim;

            if (finalSim > highestSim) {
                highestSim = finalSim;
                bestMatch = arch.id;
            }
        }
        
        // Scale user vector to 0-10 for the URL param to keep it compact and backward-compatible
        const rScores = riasecPercentages.map(v => Math.round(v * 10)).join(",");

        const params = new URLSearchParams({
          arch: bestMatch,
          age: state.ageGroup || 'navigator',
          r: rScores,
          apt: topAptitude
        });

        if (state.userName && state.userName.trim()) {
          params.set('name', state.userName.trim());
        }
        
        set({ stage: 'results' });
        return `/results?${params.toString()}`;
      },

      resetAssessment: () => {
        set({
          stage: 'onboarding',
          ageGroup: null,
          userName: '',
          sessionInterests: [],
          sessionAptitudes: [],
          currentQuestionIndex: 0,
          riasecScores: {},
          aptitudeScores: {},
        });
      }
    }),
    {
      name: 'aptitude-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
