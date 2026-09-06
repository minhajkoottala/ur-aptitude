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
      }, 2500); // 2.5 seconds of fake suspense
      return () => clearTimeout(timer);
    }
  }, [stage, calculateResults, router]);

  if (!isMounted) {
    return <main className="flex-1 w-full h-full bg-bg-dark" />;
  }

  return (
    <main className="flex-1 w-full h-full flex flex-col relative overflow-hidden bg-bg-dark text-text-main p-4 sm:p-6">
      {stage === "onboarding" && <Onboarding />}
      {stage === "interests" && <InterestsSwipe />}
      {stage === "aptitude" && <AptitudeChallenge />}
      {stage === "calculating" && (
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 border-4 border-brand-violet border-t-brand-cyan rounded-full animate-spin mb-6" />
          <h2 className="text-2xl font-display font-bold mb-2">Analyzing Cognitive Footprint</h2>
          <p className="text-text-muted animate-pulse">Matching traits and calculating superpowers...</p>
        </div>
      )}
      {stage === "results" && (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-text-muted">Results Dashboard Coming Soon...</p>
        </div>
      )}
    </main>
  );
}
