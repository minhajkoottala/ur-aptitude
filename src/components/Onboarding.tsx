"use client";

import { useState } from "react";
import { useAssessmentStore, AgeGroup } from "@/store/assessmentStore";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Compass, Smartphone, Sparkles, ArrowLeft, ArrowRight, Zap, Target, ShieldCheck, ClipboardCheck } from "lucide-react";

export default function Onboarding() {
  const { setAgeGroup, startAssessment } = useAssessmentStore();
  const [step, setStep] = useState<"greeting" | "rules">("greeting");
  const [selectedGroup, setSelectedGroup] = useState<AgeGroup>(null);

  const handleSelectAge = (group: "explorer" | "navigator") => {
    setSelectedGroup(group);
    setAgeGroup(group);
    setStep("rules");
  };

  const handleStart = () => {
    startAssessment();
  };

  return (
    <div className="flex-1 flex flex-col justify-between h-full w-full max-w-sm mx-auto overflow-y-auto py-2">
      <AnimatePresence mode="wait">
        {step === "greeting" ? (
          <motion.div
            key="greeting-step"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col justify-center items-center my-auto"
          >
            {/* Greeting Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-violet/10 border border-brand-violet/20 text-brand-violet text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles size={14} />
              <span>Welcome Explorer</span>
            </div>

            {/* Main Greeting Title */}
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-center mb-3 text-transparent bg-clip-text bg-gradient-to-r from-brand-violet via-brand-pink to-brand-amber leading-tight">
              Discover Your True Archetype
            </h1>

            <p className="text-text-muted text-center text-sm sm:text-base leading-relaxed mb-6">
              Unlock your cognitive footprint, hidden superpowers, and ideal future pathways in under 3 minutes.
            </p>

            {/* Mobile Experience Notice */}
            <div className="w-full glass-card p-3.5 rounded-2xl flex items-center gap-3 mb-6 border border-brand-cyan/20 bg-brand-cyan/5">
              <div className="p-2 rounded-xl bg-brand-cyan/20 text-brand-cyan shrink-0">
                <Smartphone size={18} />
              </div>
              <p className="text-xs text-text-muted leading-snug">
                <strong className="text-text-main">Mobile-First: </strong> 
                Best experienced on a mobile device for smooth swipe gestures.
              </p>
            </div>

            {/* Age Group Selection Prompt */}
            <div className="w-full space-y-3">
              <span className="text-xs font-bold tracking-widest text-text-muted uppercase text-center block mb-1">
                Select Your Track
              </span>

              {/* Explorer Option */}
              <button
                onClick={() => handleSelectAge("explorer")}
                className="glass-card w-full p-4.5 rounded-2xl flex items-center space-x-4 border-2 border-transparent hover:border-brand-pink/50 active:scale-98 transition-all text-left group shadow-sm"
              >
                <div className="h-12 w-12 rounded-xl bg-brand-pink/15 group-hover:bg-brand-pink/25 flex items-center justify-center text-brand-pink shrink-0 transition-colors">
                  <Compass size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-display font-bold text-text-main">Explorer Track</h2>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-pink/15 text-brand-pink">Ages 8-13</span>
                  </div>
                  <p className="text-xs text-text-muted mt-0.5">Scenario matches & strengths discovery</p>
                </div>
              </button>

              {/* Navigator Option */}
              <button
                onClick={() => handleSelectAge("navigator")}
                className="glass-card w-full p-4.5 rounded-2xl flex items-center space-x-4 border-2 border-transparent hover:border-brand-cyan/50 active:scale-98 transition-all text-left group shadow-sm"
              >
                <div className="h-12 w-12 rounded-xl bg-brand-cyan/15 group-hover:bg-brand-cyan/25 flex items-center justify-center text-brand-cyan shrink-0 transition-colors">
                  <Rocket size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-display font-bold text-text-main">Navigator Track</h2>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-cyan/15 text-brand-cyan">Ages 14+</span>
                  </div>
                  <p className="text-xs text-text-muted mt-0.5">Strategic career & cognitive analysis</p>
                </div>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="rules-step"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col justify-between py-2"
          >
            <div>
              {/* Back button & track indicator */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setStep("greeting")}
                  className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text-main font-bold py-1 px-2.5 rounded-lg glass-card transition-colors"
                >
                  <ArrowLeft size={14} /> Back
                </button>
                <span className="text-xs font-display font-bold px-2.5 py-1 rounded-full bg-brand-violet/10 text-brand-violet border border-brand-violet/20 capitalize">
                  {selectedGroup} Track Selected
                </span>
              </div>

              {/* Protocol Header */}
              <div className="flex items-center gap-2 mb-1">
                <ClipboardCheck size={22} className="text-brand-violet" />
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-text-main">
                  Assessment Protocol
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-muted mb-5">
                Here&apos;s what you need to know before stepping into the engine:
              </p>

              {/* Rules List */}
              <div className="space-y-3">
                {/* Rule 1 */}
                <div className="glass-card p-4 rounded-2xl flex items-start gap-3 border-l-4 border-l-brand-violet">
                  <div className="p-2 rounded-xl bg-brand-violet/10 text-brand-violet shrink-0 mt-0.5">
                    <Zap size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-text-main">1. Vibe Check Decision Round</h3>
                    <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                      Select Option A or Option B based on your intuition. Go with your raw gut feeling—no overthinking!
                    </p>
                  </div>
                </div>

                {/* Rule 2 */}
                <div className="glass-card p-4 rounded-2xl flex items-start gap-3 border-l-4 border-l-brand-pink">
                  <div className="p-2 rounded-xl bg-brand-pink/10 text-brand-pink shrink-0 mt-0.5">
                    <Target size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-text-main">2. Cognitive Speed Challenge</h3>
                    <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                      Short timed aptitude puzzles. Both speed and accuracy calibrate your superpower radar.
                    </p>
                  </div>
                </div>

                {/* Rule 3 */}
                <div className="glass-card p-4 rounded-2xl flex items-start gap-3 border-l-4 border-l-brand-mint">
                  <div className="p-2 rounded-xl bg-brand-mint/10 text-brand-mint shrink-0 mt-0.5">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-text-main">3. Zero Pressure</h3>
                    <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                      There are no right or wrong answers in interests. Be 100% authentic for an accurate archetype match.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <div className="mt-6 pt-2">
              <button
                onClick={handleStart}
                className="w-full bg-gradient-to-r from-brand-violet to-brand-pink hover:opacity-95 text-white font-display font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-all"
              >
                <span>Begin Assessment</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
