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
  const viewData = isExplorer ? archetype.explorer : archetype.navigator;
  const BadgeIcon = ARCHETYPE_ICONS[archetype.id] || Compass;

  return (
    <main className="w-full max-w-4xl mx-auto py-4 sm:py-8 px-3 sm:px-6 space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg bg-text-main text-bg-surface text-xs sm:text-sm font-semibold shadow-lg flex items-center gap-2 animate-in fade-in zoom-in-95">
          <Check size={16} className="text-brand-blue" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Official Report Header Banner with Streamlined Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border-subtle">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-brand-blue-light text-brand-blue border border-brand-blue/20 mb-1">
            <FileCheck size={12} />
            <span>Official Assessment Report</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-text-main">
            Cognitive Aptitude & Stream Guidance Profile
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Track: {isExplorer ? "Explorer Track (Ages 8–13)" : "Navigator Track (Ages 14+ / High School)"} • Verified Evaluation
          </p>
        </div>

        {/* Consolidated Action Bar */}
        <div className="flex items-center gap-2 print:hidden shrink-0">
          <button 
            onClick={copyCleanLink}
            className="px-3 py-1.5 rounded-lg border border-border-subtle bg-bg-surface hover:bg-bg-subtle text-xs font-semibold text-text-muted hover:text-text-main transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            title="Copy Report Link"
          >
            <Copy size={13} />
            <span className="hidden sm:inline">Copy Link</span>
          </button>

          <button 
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-lg border border-border-subtle bg-bg-surface hover:bg-bg-subtle text-xs font-semibold text-text-muted hover:text-text-main transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            title="Print or Save PDF"
          >
            <Printer size={13} />
            <span>Print / PDF</span>
          </button>

          <button 
            onClick={() => setShowPreviewModal(true)}
            className="px-3.5 py-1.5 rounded-lg bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Eye size={13} />
            <span>Scorecard</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: PRIMARY COGNITIVE PROFILE */}
      <div className="formal-card rounded-xl p-5 sm:p-6 bg-bg-surface border-l-4 border-l-brand-blue">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-brand-blue-light text-brand-blue flex items-center justify-center shrink-0">
            <BadgeIcon size={28} />
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue">
                Primary Cognitive Profile
              </span>
              {archetype.primaryAptitude && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-bg-subtle text-text-muted border border-border-subtle">
                  Aptitude: {archetype.primaryAptitude}
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-display font-bold text-text-main">
              {viewData.title}
            </h2>

            <p className="text-xs sm:text-sm text-text-muted font-medium italic">
              &ldquo;{viewData.tagline}&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: HIGHER SECONDARY (+2) STREAM RECOMMENDATION */}
      {archetype.recommendedStream && (
        <div className="formal-card rounded-xl p-5 sm:p-6 bg-bg-surface space-y-3.5">
          <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
            <div className="flex items-center gap-2">
              <GraduationCap size={17} className="text-brand-blue" />
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-text-main">
                Higher Secondary (+2) Stream Recommendation
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-brand-blue-light text-brand-blue border border-brand-blue/20">
              {archetype.recommendedStream.category} Stream
            </span>
          </div>

          <div>
            <h4 className="text-base font-bold text-text-main mb-1">
              {archetype.recommendedStream.stream}
            </h4>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-normal">
              {archetype.recommendedStream.why}
            </p>
          </div>

          {archetype.recommendedStream.electives && (
            <div className="pt-2.5 border-t border-border-subtle">
              <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider block mb-2">
                Recommended 11th & 12th Subject Combinations / Electives:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {archetype.recommendedStream.electives.map((ele: string, idx: number) => (
                  <span 
                    key={idx} 
                    className="px-2.5 py-1 rounded-md bg-bg-subtle border border-border-subtle text-xs font-semibold text-text-main"
                  >
                    {ele}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SECTION 3: CAREER TRACKS & DEGREE PATHWAYS */}
      {archetype.broadCareers && (
        <div className="formal-card rounded-xl p-5 sm:p-6 bg-bg-surface space-y-3.5">
          <div className="flex items-center gap-2 pb-3 border-b border-border-subtle">
            <Briefcase size={17} className="text-brand-blue" />
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-text-main">
              Aligned Career Tracks & Degree Pathways
            </h3>
          </div>
          <p className="text-xs text-text-muted">
            High-alignment career pathways matching this cognitive profile:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {archetype.broadCareers.map((career: any, idx: number) => {
              const isObj = typeof career === "object" && career !== null;
              const title = isObj ? career.title : career;
              const desc = isObj ? career.description : "";
              const degrees = isObj ? career.degrees : "";
              const exams = isObj ? career.exams : "";

              return (
                <div 
                  key={idx} 
                  className="p-3.5 rounded-lg bg-bg-subtle/50 border border-border-subtle hover:border-brand-blue/30 transition-colors flex flex-col justify-between space-y-2"
                >
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-text-main">
                      {title}
                    </h4>
                    {desc && (
                      <p className="text-xs text-text-muted mt-1 leading-relaxed">
                        {desc}
                      </p>
                    )}
                  </div>
                  {(degrees || exams) && (
                    <div className="pt-2 border-t border-border-subtle space-y-1 text-[11px]">
                      {degrees && (
                        <div className="flex items-start gap-1.5">
                          <span className="text-text-muted font-semibold shrink-0">Degrees:</span>
                          <span className="text-brand-blue font-medium">{degrees}</span>
                        </div>
                      )}
                      {exams && (
                        <div className="flex items-start gap-1.5">
                          <span className="text-text-muted font-semibold shrink-0">Key Exams:</span>
                          <span className="text-brand-teal font-medium">{exams}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 4 & 5: RADAR CHART & CORE COMPETENCIES (Side-by-side grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Radar Chart */}
        <div className="formal-card rounded-xl p-4 sm:p-5 bg-bg-surface flex flex-col justify-between">
          <RadarChart data={data.r} />
          <p className="text-[10.5px] text-text-subtle text-center mt-1">
            Measures intrinsic vocational orientation across Holland's RIASEC dimensions
          </p>
        </div>

        {/* Core Competencies */}
        <div className="formal-card rounded-xl p-4 sm:p-5 bg-bg-surface flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2.5 border-b border-border-subtle">
              <BookOpen size={16} className="text-brand-blue" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-main">
                Core Cognitive Competencies
              </h3>
            </div>
            
            <div className="space-y-2">
              {(archetype.coreSkills || viewData.superpowers).map((skill: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2.5 p-2 rounded-lg bg-bg-subtle/50 border border-border-subtle text-xs font-medium text-text-main">
                  <span className="w-5 h-5 rounded bg-brand-blue-light text-brand-blue font-bold text-[10px] flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-border-subtle text-[10.5px] text-text-subtle">
            Demonstrated natural strengths validated by standardized scoring
          </div>
        </div>
      </div>

      {/* SECTION 6: INSTITUTIONAL ADVISORY */}
      {isExplorer ? (
        <div className="formal-card rounded-xl p-5 bg-bg-surface space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-brand-blue flex items-center gap-2">
            <Compass size={15} />
            <span>Developmental Milestones & Quests</span>
          </h3>
          <ul className="space-y-1.5">
            {archetype.explorer.funQuests.map((quest: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-text-muted leading-relaxed">
                <Check size={13} className="text-brand-blue mt-0.5 shrink-0" />
                <span>{quest}</span>
              </li>
            ))}
          </ul>
          <div className="p-3 bg-brand-blue-light/50 border border-brand-blue/20 rounded-lg mt-2">
            <h4 className="text-[10.5px] font-bold text-brand-blue uppercase mb-0.5">Parent & Teacher Recommendation</h4>
            <p className="text-xs text-text-muted leading-relaxed">{archetype.explorer.parentTip}</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="formal-card p-4 rounded-xl bg-bg-surface border-t-3 border-t-brand-teal">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-teal mb-1">Optimal Learning Flow State</h3>
            <p className="text-xs text-text-muted leading-relaxed">{archetype.navigator.flowTriggers}</p>
          </div>
          <div className="formal-card p-4 rounded-xl bg-bg-surface border-t-3 border-t-brand-amber">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-amber mb-1">Friction & Fatigue Triggers</h3>
            <p className="text-xs text-text-muted leading-relaxed">{archetype.navigator.frictionTriggers}</p>
          </div>
        </div>
      )}

      {/* FOOTER BAR: Clean Retake & Scorecard CTA */}
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
          className="text-xs font-semibold text-brand-blue hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>View / Export Official Scorecard</span>
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
              <span className="text-xs font-bold uppercase tracking-wider">Official Scorecard Preview</span>
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
                <span>Save Scorecard (PNG)</span>
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
