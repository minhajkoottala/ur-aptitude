"use client";

import { useState, useRef, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAssessmentStore } from "@/store/assessmentStore";
import archetypesData from "@/data/archetypes.json";
import RadarChart from "@/components/RadarChart";
import { StoryShareCard } from "@/components/StoryShareCard";
import { 
  AlertTriangle, RefreshCw, Check, Copy, Printer,
  Cpu, Palette, TrendingUp, Code, HeartHandshake, Sliders, Binary,
  Crown, Laptop, Search, Users, Lightbulb, Wrench, Atom, Flame, Megaphone,
  Download, Eye, X, BookOpen, GraduationCap, Compass, Briefcase, FileCheck, LucideIcon
} from "lucide-react";
import { toPng } from "html-to-image";

const TRAITS_ORDER = ["Realistic", "Investigative", "Artistic", "Social", "Enterprising", "Conventional"];

const ARCHETYPE_ICONS: Record<string, LucideIcon> = {
  "systems-architect": Cpu,
  "creative-visionary": Palette,
  "growth-strategist": TrendingUp,
  "tech-alchemist": Code,
  "empathetic-storyteller": HeartHandshake,
  "ops-maestro": Sliders,
  "quantitative-pioneer": Binary,
  "human-centric-leader": Crown,
  "digital-craftsman": Laptop,
  "data-detective": Search,
  "community-builder": Users,
  "product-strategist": Lightbulb,
  "mechanical-innovator": Wrench,
  "scientific-explorer": Atom,
  "venture-catalyst": Flame,
  "expressive-communicator": Megaphone,
};

interface ResultData {
  arch: string;
  age: string;
  r: { key: string; count: number }[];
  apt: string;
}

type ArchetypeItem = (typeof archetypesData)[number];

function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { resetAssessment } = useAssessmentStore();
  
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(searchParams.get("story") === "1");
  
  const storyCardRef = useRef<HTMLDivElement>(null);

  const { data, archetype, error } = useMemo(() => {
    const archParam = searchParams.get("arch");
    const ageParam = searchParams.get("age");
    const rParam = searchParams.get("r");
    const dataParam = searchParams.get("data");

    if (archParam) {
      const match = archetypesData.find((a) => a.id === archParam);
      if (match) {
        let rArray: { key: string; count: number }[] = [];
        if (rParam) {
          const counts = rParam.split(",").map((c) => parseInt(c, 10) || 0);
          rArray = TRAITS_ORDER.map((trait, idx) => ({
            key: trait,
            count: counts[idx] || 0,
          }));
        } else {
          rArray = TRAITS_ORDER.map((trait) => ({
            key: trait,
            count: match.traits.includes(trait) ? 8 : 3,
          }));
        }

        return {
          data: {
            arch: archParam,
            age: ageParam || "navigator",
            r: rArray,
            apt: searchParams.get("apt") || "Logical",
          } as ResultData,
          archetype: match as ArchetypeItem,
          error: false,
        };
      }
    }

    if (dataParam) {
      try {
        const decodedStr = Buffer.from(dataParam, "base64").toString("utf-8");
        const parsed = JSON.parse(decodedStr);
        const match = archetypesData.find((a) => a.id === parsed.arch);
        if (match) {
          return {
            data: parsed as ResultData,
            archetype: match as ArchetypeItem,
            error: false,
          };
        }
      } catch (err) {
        console.error("Failed to decode base64 results", err);
      }
    }

    return { data: null, archetype: null, error: true };
  }, [searchParams]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDownloadScorecard = async () => {
    if (!storyCardRef.current || isGeneratingImage || !archetype) return;

    try {
      setIsGeneratingImage(true);
      showToast("Generating official scorecard...");

      const dataUrl = await toPng(storyCardRef.current, {
        cacheBust: true,
        pixelRatio: 2.5,
      });

      const link = document.createElement("a");
      link.download = `${archetype.id}-scorecard.png`;
      link.href = dataUrl;
      link.click();
      showToast("Scorecard downloaded!");
    } catch (err) {
      console.error("Failed to download image:", err);
      showToast("Download failed. Link copied!");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const copyCleanLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Report link copied to clipboard!");
    }
  };

  if (error) {
    return (
      <main className="w-full max-w-2xl mx-auto py-12 px-4 text-center space-y-4">
        <AlertTriangle className="text-brand-amber mx-auto" size={36} />
        <h1 className="text-xl font-display font-bold">Evaluation Record Not Found</h1>
        <p className="text-xs text-text-muted">The evaluation link is broken or has expired.</p>
        <button
          onClick={() => {
            resetAssessment();
            router.push("/");
          }}
          className="px-4 py-2.5 bg-brand-blue hover:bg-brand-blue-hover text-white rounded-lg text-xs font-semibold inline-flex items-center gap-2 shadow-xs cursor-pointer"
        >
          <RefreshCw size={13} /> Start New Assessment
        </button>
      </main>
    );
  }

  if (!data || !archetype) {
    return (
      <main className="w-full max-w-2xl mx-auto py-16 text-center">
        <div className="w-8 h-8 border-3 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto" />
      </main>
    );
  }

  const isExplorer = data.age === "explorer";
  const viewData = (isExplorer ? archetype.explorer : archetype.navigator) as any;
  const BadgeIcon = ARCHETYPE_ICONS[archetype.id] || Compass;

  return (
    <main className="w-full max-w-3xl mx-auto py-4 sm:py-8 px-3 sm:px-6 space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg bg-text-main text-bg-surface text-xs sm:text-sm font-semibold shadow-lg flex items-center gap-2 animate-in fade-in zoom-in-95">
          <Check size={16} className="text-brand-blue" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="pb-4 border-b border-border-subtle">
        <h1 className="text-xl sm:text-2xl font-display font-bold text-text-main">
          Your Profile
        </h1>
      </div>

      {/* SECTION 1: WHO AM I? (HERO CARD) */}
      <div className="formal-card rounded-xl p-5 sm:p-6 bg-bg-surface border-l-4 border-l-brand-blue space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-brand-blue-light text-brand-blue flex items-center justify-center shrink-0">
            <BadgeIcon size={28} />
          </div>
          <div className="flex-1 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue">
              Your Cognitive Archetype
            </span>
            <h2 className="text-2xl font-display font-bold text-text-main">
              {viewData.title}
            </h2>
            <p className="text-sm text-text-muted font-medium italic">
              &ldquo;{viewData.tagline}&rdquo;
            </p>
          </div>
        </div>
        
        {/* Practical Strength Explanation */}
        <div className="pt-4 border-t border-border-subtle">
          <p className="text-sm text-text-main leading-relaxed">
            <strong className="text-brand-blue">Your Practical Strength:</strong> {archetype.practicalStrength}
          </p>
        </div>
      </div>

      {/* SECTION 2: WHAT SHOULD I DO NEXT? (ROADMAP) */}
      {isExplorer ? (
        // Explorer Roadmap (8-13)
        <div className="formal-card rounded-xl p-5 sm:p-6 bg-bg-surface space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-brand-blue flex items-center gap-2">
            <BookOpen size={16} />
            <span>What You Naturally Enjoy</span>
          </h3>
          <ul className="space-y-2">
            {viewData.superpowers?.map((power: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-text-muted">
                <Check size={14} className="text-brand-blue mt-0.5 shrink-0" />
                <span>{power}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        // Navigator Roadmap (14+)
        <div className="space-y-4 sm:space-y-6">
          <div className="formal-card rounded-xl p-5 sm:p-6 bg-bg-surface space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-border-subtle">
              <GraduationCap size={18} className="text-brand-blue" />
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-text-main">
                Recommended Higher Secondary (+2) Stream
              </h3>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded text-sm font-bold uppercase tracking-wider bg-brand-blue text-white shadow-sm">
                {viewData.simpleStream} Stream
              </span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed pt-1">
              Based on your analytical reasoning, spatial skills, and problem-solving approach, the <strong className="text-text-main">{viewData.simpleStream}</strong> stream is the most natural fit. It will leverage your core strengths rather than working against them.
            </p>
          </div>

          {viewData.broadCareers && (
             <div className="formal-card rounded-xl p-5 sm:p-6 bg-bg-surface space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-border-subtle">
                <Briefcase size={18} className="text-brand-blue" />
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-text-main">
                  Aligned Career & Degree Pathways
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {viewData.broadCareers.map((career: any, idx: number) => {
                  const title = career.title || career;
                  const degrees = career.degrees;

                  return (
                    <div 
                      key={idx} 
                      className="p-4 rounded-lg bg-bg-subtle/50 border border-border-subtle hover:border-brand-blue/30 transition-colors flex flex-col justify-center space-y-1.5"
                    >
                      <h4 className="font-bold text-sm text-text-main">
                        {title}
                      </h4>
                      {degrees && (
                        <p className="text-xs text-text-muted font-medium">
                          <strong className="text-text-subtle">Degree:</strong> {degrees}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SECTION 3: VISUAL PROFILE (Radar Chart) */}
      <div className="formal-card rounded-xl p-5 sm:p-6 bg-bg-surface flex flex-col items-center">
        <h3 className="text-xs font-bold uppercase tracking-wider text-text-main mb-4 w-full text-left">
          Your Interest Spectrum
        </h3>
        <div className="w-full max-w-sm">
           <RadarChart data={data.r} />
        </div>
      </div>

      {/* FOOTER BAR */}
      <div className="pt-4 border-t border-border-subtle flex items-center justify-between print:hidden">
        <button
          onClick={() => {
            resetAssessment();
            router.push("/");
          }}
          className="text-xs text-text-muted hover:text-text-main transition-colors flex items-center gap-1.5 font-medium underline cursor-pointer"
        >
          <RefreshCw size={12} /> Retake Assessment
        </button>

        <button
          onClick={() => setShowPreviewModal(true)}
          className="text-xs font-semibold px-4 py-2 rounded-lg bg-brand-blue hover:bg-brand-blue-hover text-white shadow-sm flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <Eye size={13} />
          <span>View Scorecard</span>
        </button>
      </div>

      {/* Hidden Scorecard for Image Generation */}
      <div
        style={{
          position: "fixed",
          left: "-9999px",
          top: 0,
          zIndex: -999,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <StoryShareCard
          ref={storyCardRef}
          archetype={archetype}
          viewData={viewData}
          BadgeIcon={BadgeIcon}
          rScores={data.r}
          isExplorer={isExplorer}
        />
      </div>

      {/* Scorecard Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative flex flex-col items-center max-w-[380px] w-full my-auto">
            <div className="w-full flex items-center justify-between pb-3 text-white">
              <span className="text-xs font-bold uppercase tracking-wider">Shareable Scorecard</span>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>

            <div className="rounded-xl overflow-hidden shadow-2xl border border-slate-200">
              <StoryShareCard
                archetype={archetype}
                viewData={viewData}
                BadgeIcon={BadgeIcon}
                rScores={data.r}
                isExplorer={isExplorer}
              />
            </div>

            <div className="w-full mt-3">
              <button
                onClick={handleDownloadScorecard}
                disabled={isGeneratingImage}
                className="w-full bg-brand-blue hover:bg-brand-blue-hover text-white font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-1.5 text-xs shadow-md transition-colors cursor-pointer"
              >
                <Download size={14} />
                <span>Save Image (PNG)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <main className="w-full max-w-2xl mx-auto py-16 text-center">
          <div className="w-8 h-8 border-3 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto" />
        </main>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
