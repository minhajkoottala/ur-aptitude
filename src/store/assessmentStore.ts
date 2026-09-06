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

type TraitScores = Record<string, { count: number; totalTimeMs: number }>;
type DomainScores = Record<string, { count: number; totalTimeMs: number }>;

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

  // Actions
  setAgeGroup: (group: AgeGroup) => void;
  startAssessment: () => void;
  answerInterest: (trait: string, timeMs: number) => void;
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
      sessionInterests: [],
      sessionAptitudes: [],
      currentQuestionIndex: 0,
      riasecScores: {},
      aptitudeScores: {},

      setAgeGroup: (group) => set({ ageGroup: group }),

      startAssessment: () => {
        const shuffledInterests = shuffleArray(questionData.interests as InterestQuestion[]).slice(0, 20);
        const shuffledAptitudes = shuffleArray(questionData.aptitude as AptitudeQuestion[]).slice(0, 15);

        set({
          stage: 'interests',
          sessionInterests: shuffledInterests,
          sessionAptitudes: shuffledAptitudes,
          currentQuestionIndex: 0,
          riasecScores: {},
          aptitudeScores: {},
        });
      },

      answerInterest: (trait, timeMs) => {
        set((state) => {
          const currentScore = state.riasecScores[trait] || { count: 0, totalTimeMs: 0 };
          const newScores = {
            ...state.riasecScores,
            [trait]: {
              count: currentScore.count + 1,
              totalTimeMs: currentScore.totalTimeMs + timeMs,
            }
          };

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
          const currentScore = state.aptitudeScores[domain] || { count: 0, totalTimeMs: 0 };
          const newScores = {
            ...state.aptitudeScores,
            [domain]: {
              count: currentScore.count + (isCorrect ? 1 : 0),
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
        
        // Helper to sort by score (desc), then timeMs (asc for tie-breaker)
        const sortScores = (scores: Record<string, { count: number; totalTimeMs: number }>) => {
          return Object.entries(scores)
            .map(([key, data]) => ({ key, ...data }))
            .sort((a, b) => {
              if (b.count !== a.count) return b.count - a.count; // Higher score wins
              return a.totalTimeMs - b.totalTimeMs; // Lower time wins tiebreaker
            });
        };

        const sortedRiasec = sortScores(state.riasecScores);
        const sortedAptitude = sortScores(state.aptitudeScores);

        // Get Top 2 RIASEC traits and Top 1 Aptitude
        const topTraits = sortedRiasec.slice(0, 2).map(t => t.key);
        const topAptitude = sortedAptitude.length > 0 ? sortedAptitude[0].key : 'Logical'; // Fallback

        // Find matching archetype
        let bestMatch = archetypesData[0].id;
        for (const arch of archetypesData) {
          // Check if the top 2 traits match the archetype's traits (in any order)
          const matchesTraits = arch.traits.every(t => topTraits.includes(t));
          if (matchesTraits) {
            bestMatch = arch.id;
            break;
          }
        }
        
        // Extract RIASEC counts in standard order for compact URL: R,I,A,S,E,C
        const traitsOrder = ["Realistic", "Investigative", "Artistic", "Social", "Enterprising", "Conventional"];
        const rScores = traitsOrder.map(t => state.riasecScores[t]?.count || 0).join(",");

        const params = new URLSearchParams({
          arch: bestMatch,
          age: state.ageGroup || 'navigator',
          r: rScores,
          apt: topAptitude
        });
        
        set({ stage: 'results' });
        return `/results?${params.toString()}`;
      },

      resetAssessment: () => {
        set({
          stage: 'onboarding',
          ageGroup: null,
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
