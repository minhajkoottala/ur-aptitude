"use client";

import { useAssessmentStore } from "@/store/assessmentStore";
import Onboarding from "@/components/Onboarding";
import InterestsSwipe from "@/components/InterestsSwipe";
import AptitudeChallenge from "@/components/AptitudeChallenge";
import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";

const emptySubscribe = () => () => {};

export default function Home() {
  const { stage, calculateResults } = useAssessmentStore();
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const router = useRouter();

  // Handle calculating suspense state
  useEffect(() => {
    if (stage === "calculating") {
      const timer = setTimeout(() => {
        const url = calculateResults();
        router.push(url);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [stage, calculateResults, router]);

  if (!isMounted) {
    return <main className="flex-1 w-full min-h-[500px]" />;
  }

  return (
    <main className="flex-1 w-full max-w-4xl mx-auto flex flex-col relative text-text-main p-4 sm:p-6 md:p-8">
      {stage === "onboarding" && <Onboarding />}
      {stage === "interests" && <InterestsSwipe />}
      {stage === "aptitude" && <AptitudeChallenge />}
      {stage === "calculating" && (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 my-auto">
          <div className="w-16 h-16 border-4 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin mb-6" />
          <h2 className="text-xl sm:text-2xl font-display font-bold mb-2 text-text-main">
            Generating Comprehensive Evaluation Report
          </h2>
          <p className="text-sm text-text-muted font-normal max-w-md">
            Analyzing behavioral interest dimensions, cognitive performance speed, and recommended academic streams...
          </p>
          <div className="mt-8 flex items-center gap-2 text-xs text-text-subtle font-medium">
            <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
            <span>Calibrating Higher Secondary Stream fit</span>
          </div>
        </div>
      )}
      {stage === "results" && (
        <div className="flex-1 flex items-center justify-center p-8">
          <p className="text-text-muted text-sm">Loading Results Report...</p>
        </div>
      )}
    </main>
  );
}
