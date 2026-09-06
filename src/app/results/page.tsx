"use client";

import { useState, useRef, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAssessmentStore } from "@/store/assessmentStore";
import archetypesData from "@/data/archetypes.json";
import RadarChart from "@/components/RadarChart";
import { StoryShareCard } from "@/components/StoryShareCard";
import { 
  AlertTriangle, RefreshCw, Camera, Check, Copy, Sparkles,
  Gamepad2, Cpu, Palette, TrendingUp, Code, HeartHandshake, Sliders, Binary,
  Crown, Laptop, Search, Users, Lightbulb, Wrench, Atom, Flame, Megaphone,
  Eye, Download, X, Smartphone, LucideIcon
} from "lucide-react";
import { toPng } from "html-to-image";

const TRAITS_ORDER = ["Realistic", "Investigative", "Artistic", "Social", "Enterprising", "Conventional"];

// High-tech vector icon mapping for every archetype (no raw OS emojis)
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
  
  const shareCardRef = useRef<HTMLDivElement>(null);
  const storyCardRef = useRef<HTMLDivElement>(null);

  const { data, archetype, error } = useMemo(() => {
    // 1. Try clean short query params: ?arch=...&age=...&r=4,8,2,10,7,1
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

    // 2. Legacy base64 fallback: ?data=...
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
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Generate & Share Viral 9:16 Story Snapshot (1080x1920)
  const handleShareStorySnapshot = async () => {
    if (!storyCardRef.current || isGeneratingImage || !archetype || !viewData) return;

    try {
      setIsGeneratingImage(true);
      showToast("Generating 9:16 Story snapshot...");

      const dataUrl = await toPng(storyCardRef.current, {
        cacheBust: true,
        pixelRatio: 3, // 360x640 -> 1080x1920 HD
      });

      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], `${archetype.id}-story-9x16.png`, { type: "image/png" });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `My Cognitive Archetype: ${viewData.title}`,
          text: `I got ${viewData.title}! Discover your cognitive superpowers on Aptitude: ${window.location.href}`,
        });
        showToast("Shared successfully!");
      } else {
        const link = document.createElement("a");
        link.download = `${archetype.id}-story-9x16.png`;
        link.href = dataUrl;
        link.click();
        
        if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href);
        }
        showToast("9:16 Story downloaded! Link copied to clipboard.");
      }
    } catch (err) {
      console.error("Failed to generate image share:", err);
      showToast("Link copied to clipboard!");
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
      }
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // Direct Download 9:16 HD Image
  const handleDownloadStoryImage = async () => {
    if (!storyCardRef.current || isGeneratingImage || !archetype) return;

    try {
      setIsGeneratingImage(true);
      showToast("Generating 9:16 HD Image (1080x1920)...");

      const dataUrl = await toPng(storyCardRef.current, {
        cacheBust: true,
        pixelRatio: 3,
      });

      const link = document.createElement("a");
      link.download = `${archetype.id}-story-9x16.png`;
      link.href = dataUrl;
      link.click();
      showToast("9:16 Story Image downloaded!");
    } catch (err) {
      console.error("Failed to download image:", err);
      showToast("Download failed. Link copied!");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const copyCleanLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Result link copied!");
    }
  };

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(`I took the Aptitude test and got *${viewData?.title}*!\nDiscover your cognitive archetype: ${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  if (error) {
    return (
      <main className="flex-1 w-full h-full flex flex-col items-center justify-center bg-bg-dark text-text-main p-6 text-center">
        <AlertTriangle className="text-brand-pink mb-4" size={48} />
        <h1 className="text-2xl font-display font-bold mb-2">Signal Lost</h1>
        <p className="text-text-muted mb-8">This result link is broken or expired.</p>
        <button
          onClick={() => {
            resetAssessment();
            router.push("/");
          }}
          className="glass-card px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-violet/10 transition-colors"
        >
          <RefreshCw size={18} /> Take the Test
        </button>
      </main>
    );
  }

  if (!data || !archetype) {
    return (
      <main className="flex-1 w-full h-full flex flex-col items-center justify-center bg-bg-dark text-text-main p-6">
        <div className="w-8 h-8 border-2 border-brand-cyan border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  const isExplorer = data.age === "explorer";
  const viewData = isExplorer ? archetype.explorer : archetype.navigator;
  const BadgeIcon = ARCHETYPE_ICONS[archetype.id] || Sparkles;

  // Direct 9:16 Card Mode (for clean headless capture or iframe embed)
  if (searchParams.get("card") === "1") {
    return (
      <main className="w-screen h-screen flex items-center justify-center bg-[#07090E] p-0 m-0 overflow-hidden">
        <StoryShareCard
          archetype={archetype}
          viewData={viewData}
          BadgeIcon={BadgeIcon}
          rScores={data.r}
          isExplorer={isExplorer}
        />
      </main>
    );
  }

  return (
    <main className="flex-1 w-full h-full overflow-y-auto flex flex-col relative bg-bg-dark text-text-main p-4 sm:p-6 pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-brand-violet text-white text-xs sm:text-sm font-bold shadow-2xl flex items-center gap-2 animate-bounce">
          <Check size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-xs font-display font-bold tracking-widest text-text-muted uppercase">
          {isExplorer ? "Explorer Result" : "Navigator Result"}
        </div>
        <button 
          onClick={copyCleanLink}
          className="p-2 glass-card rounded-full hover:bg-brand-violet/20 transition-colors"
          title="Copy Link"
        >
          <Copy size={16} />
        </button>
      </div>

      {/* ARCHETYPE CARD (Target for Snapshot Generation, with shrink-0 to prevent flex squashing) */}
      <div 
        ref={shareCardRef}
        className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center relative mb-6 border border-brand-violet/30 shadow-xl shrink-0"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-violet via-brand-pink to-brand-amber rounded-t-3xl" />
        
        {/* Sleek Vector Archetype Badge */}
        <div className="w-16 h-16 rounded-2xl bg-brand-violet/10 border border-brand-violet/20 flex items-center justify-center text-brand-violet mb-3 shadow-sm shrink-0">
          <BadgeIcon size={30} />
        </div>

        <span className="text-xs font-bold text-brand-violet mb-2 tracking-widest uppercase">
          Your Archetype
        </span>
        
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-text-main mb-3 leading-tight">
          {viewData.title}
        </h1>
        
        <p className="text-sm sm:text-base text-brand-cyan font-medium italic leading-relaxed mb-4">
          &ldquo;{viewData.tagline}&rdquo;
        </p>

        {/* Mini Watermark badge for stories */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-border-glass text-[10px] text-text-muted font-display tracking-widest uppercase">
          <Sparkles size={11} className="text-brand-violet" />
          <span>Aptitude Engine</span>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="glass-card rounded-3xl p-6 mb-6 shrink-0">
        <RadarChart data={data.r} />
      </div>

      {/* Superpowers */}
      <div className="glass-card rounded-3xl p-6 mb-6 shrink-0">
        <h3 className="text-sm font-display tracking-widest text-brand-pink uppercase mb-4 font-bold flex items-center gap-1.5">
          <Sparkles size={14} className="text-brand-pink" />
          <span>Core Superpowers</span>
        </h3>
        <ul className="space-y-3">
          {viewData.superpowers.map((sp: string, idx: number) => (
            <li key={idx} className="flex items-start gap-3">
              <Sparkles size={14} className="text-brand-pink mt-1 shrink-0" />
              <span className="text-text-main font-medium leading-snug">{sp}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Dynamic Section based on Age Group */}
      {isExplorer ? (
        <div className="glass-card rounded-3xl p-6 mb-8 border-brand-cyan/20 shrink-0">
          <h3 className="text-sm font-display tracking-widest text-brand-cyan uppercase mb-4 font-bold flex items-center gap-1.5">
            <Gamepad2 size={16} className="text-brand-cyan" />
            <span>Quests to Level Up</span>
          </h3>
          <ul className="space-y-3 mb-6">
            {archetype.explorer.funQuests.map((quest: string, idx: number) => (
              <li key={idx} className="flex items-start gap-3">
                <Gamepad2 size={15} className="text-brand-cyan mt-1 shrink-0" />
                <span className="text-text-muted font-medium">{quest}</span>
              </li>
            ))}
          </ul>
          <div className="p-4 bg-brand-violet/15 rounded-xl border border-brand-violet/30">
            <h4 className="text-xs font-bold text-brand-violet uppercase mb-2">For Parents</h4>
            <p className="text-sm text-text-main font-medium italic">{archetype.explorer.parentTip}</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4 mb-8 shrink-0">
          <div className="flex gap-4">
            <div className="flex-1 glass-card p-5 rounded-3xl border-t-2 border-t-brand-mint">
              <h3 className="text-xs font-display font-extrabold text-brand-mint uppercase mb-2">State of Flow</h3>
              <p className="text-sm text-text-muted font-medium">{archetype.navigator.flowTriggers}</p>
            </div>
            <div className="flex-1 glass-card p-5 rounded-3xl border-t-2 border-t-brand-pink">
              <h3 className="text-xs font-display font-extrabold text-brand-pink uppercase mb-2">Friction</h3>
              <p className="text-sm text-text-muted font-medium">{archetype.navigator.frictionTriggers}</p>
            </div>
          </div>

          {archetype.navigator.strategicFields && (
            <div className="glass-card p-5 rounded-3xl border-t-2 border-t-brand-violet">
              <h3 className="text-xs font-display font-extrabold text-brand-violet uppercase mb-3">Strategic Career Pathways</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {archetype.navigator.strategicFields.map((field: string, idx: number) => (
                  <span key={idx} className="px-3 py-1 bg-brand-violet/15 border border-brand-violet/30 rounded-full text-xs text-text-main font-bold">
                    {field}
                  </span>
                ))}
              </div>
              {archetype.navigator.streamFit && (
                <p className="text-xs text-text-muted font-medium">
                  <strong className="text-text-main font-bold">Stream Fit: </strong>{archetype.navigator.streamFit}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* VIRAL SHARE & ACTIONS */}
      <div className="mt-auto space-y-3 shrink-0">
        {/* Main Viral Screenshot Button */}
        <button
          onClick={handleShareStorySnapshot}
          disabled={isGeneratingImage}
          className="w-full bg-gradient-to-r from-brand-violet via-brand-pink to-brand-amber hover:opacity-95 text-white font-display font-bold py-4 rounded-2xl flex items-center justify-center gap-2.5 shadow-xl active:scale-98 transition-all disabled:opacity-50"
        >
          <Camera size={20} />
          <span>{isGeneratingImage ? "Generating 9:16 Snapshot..." : "Share 9:16 Story Snapshot"}</span>
        </button>

        {/* Preview 9:16 Card Modal Trigger */}
        <button
          onClick={() => setShowPreviewModal(true)}
          className="w-full glass-card py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-bold hover:bg-brand-violet/20 transition-colors text-text-main"
        >
          <Eye size={15} className="text-brand-cyan" />
          <span>Preview 9:16 Story Card</span>
        </button>

        {/* Quick Social Shares */}
        <div className="grid grid-cols-3 gap-2">
          {/* WhatsApp Button with Official WhatsApp Vector Icon */}
          <button
            onClick={shareToWhatsApp}
            className="glass-card py-3 px-2 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold hover:bg-[#25D366]/20 transition-colors text-text-main"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="text-[#25D366]">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.928 0-3.816-.51-5.474-1.476l-.393-.231-4.071 1.067 1.087-3.969-.255-.406c-1.062-1.691-1.625-3.663-1.625-5.682 0-5.834 4.746-10.58 10.58-10.58 2.827 0 5.484 1.101 7.483 3.101 1.999 1.999 3.099 4.656 3.099 7.484 0 5.836-4.748 10.582-10.584 10.582M12 0C5.373 0 0 5.373 0 12c0 2.119.555 4.184 1.611 6.002L0 24l6.166-1.617C7.944 23.38 9.957 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0"/>
            </svg>
            <span>WhatsApp</span>
          </button>

          {/* Instagram Story Button */}
          <button
            onClick={handleShareStorySnapshot}
            disabled={isGeneratingImage}
            className="glass-card py-3 px-2 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold hover:bg-brand-pink/20 transition-colors text-text-main disabled:opacity-50"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-pink">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            <span>Insta Story</span>
          </button>

          {/* Copy Link Button */}
          <button
            onClick={copyCleanLink}
            className="glass-card py-3 px-2 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold hover:bg-brand-violet/20 transition-colors text-text-main"
          >
            <Copy size={15} className="text-brand-violet" />
            <span>Copy Link</span>
          </button>
        </div>
        
        {/* Retake */}
        <button
          onClick={() => {
            resetAssessment();
            router.push("/");
          }}
          className="w-full text-text-muted text-xs hover:text-text-main transition-colors underline py-2 block text-center"
        >
          Retake Assessment
        </button>
      </div>

      {/* Hidden 9:16 Story Card for Snapshot Capture (Always rendered for toPng) */}
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

      {/* Modal: Live Preview of 9:16 Story Card */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
          <div className="relative flex flex-col items-center max-w-[360px] w-full animate-in fade-in zoom-in-95 duration-200 my-auto">
            {/* Header & Close */}
            <div className="w-full flex items-center justify-between pb-3 text-white">
              <div className="flex items-center gap-2">
                <Smartphone size={16} className="text-brand-pink" />
                <span className="text-xs font-bold uppercase tracking-wider">9:16 Story Preview</span>
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Close Preview"
              >
                <X size={18} />
              </button>
            </div>

            {/* Exact 9:16 Preview Card with clean dimensions */}
            <div className="w-[300px] h-[533px] sm:w-[340px] sm:h-[604px] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(124,58,237,0.35)] border border-white/20 relative">
              <div className="w-[360px] h-[640px] origin-top-left scale-[0.833] sm:scale-[0.944]">
                <StoryShareCard
                  archetype={archetype}
                  viewData={viewData}
                  BadgeIcon={BadgeIcon}
                  rScores={data.r}
                  isExplorer={isExplorer}
                />
              </div>
            </div>

            {/* Action Buttons directly below card */}
            <div className="flex gap-2.5 w-full mt-4">
              <button
                onClick={handleDownloadStoryImage}
                disabled={isGeneratingImage}
                className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3 px-3 rounded-2xl flex items-center justify-center gap-1.5 text-xs transition-colors"
              >
                <Download size={15} />
                <span>Save 9:16 (HD)</span>
              </button>
              <button
                onClick={handleShareStorySnapshot}
                disabled={isGeneratingImage}
                className="flex-1 bg-gradient-to-r from-brand-violet to-brand-pink text-white font-bold py-3 px-3 rounded-2xl flex items-center justify-center gap-1.5 text-xs shadow-lg active:scale-98 transition-all"
              >
                <Camera size={15} />
                <span>Share Story</span>
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
        <main className="flex-1 w-full h-full flex flex-col items-center justify-center bg-bg-dark text-text-main p-6">
          <div className="w-8 h-8 border-2 border-brand-cyan border-t-transparent rounded-full animate-spin" />
        </main>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
