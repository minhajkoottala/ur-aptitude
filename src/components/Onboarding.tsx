"use client";

import { useState } from "react";
import { useAssessmentStore, AgeGroup } from "@/store/assessmentStore";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Compass, 
  GraduationCap, 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  FileText
} from "lucide-react";

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
    <div className="w-full max-w-xl mx-auto py-6 sm:py-10 px-4">
      <AnimatePresence mode="wait">
        {step === "greeting" ? (
          <motion.div
            key="greeting-step"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-text-main leading-snug">
                Test your aptitude with scientifically proven ways
              </h1>
              <p className="text-text-muted text-sm leading-relaxed font-normal">
                A simple 2-part test to explore your natural interests, problem-solving skills, and suitable study paths.
              </p>
            </div>

            {/* Test Format Box */}
            <div className="formal-card p-4 rounded-xl flex items-center justify-between text-xs text-text-muted bg-bg-surface">
              <div className="flex items-center gap-2">
                <Clock size={15} className="text-brand-blue" />
                <span>Estimated Time: <strong>~3 minutes</strong></span>
              </div>
              <div className="h-4 w-px bg-border-subtle" />
              <div className="flex items-center gap-2">
                <FileText size={15} className="text-brand-blue" />
                <span>Structure: <strong>2 Sections</strong></span>
              </div>
            </div>

            {/* Select Track */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block">
                Select your track to begin:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Explorer Option */}
                <button
                  onClick={() => handleSelectAge("explorer")}
                  className="formal-card-interactive p-4 sm:p-5 rounded-xl flex flex-col justify-between text-left group cursor-pointer"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-brand-blue-light text-brand-blue flex items-center justify-center">
                        <Compass size={17} />
                      </div>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-bg-subtle text-text-muted border border-border-subtle">
                        Ages 8–13
                      </span>
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-text-main group-hover:text-brand-blue transition-colors">
                        Explorer
                      </h2>
                      <p className="text-xs text-text-muted mt-1 leading-relaxed">
                        For kids and younger students to discover their natural skills, interests, and exciting fields.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-2.5 border-t border-border-subtle flex items-center justify-between text-xs font-semibold text-brand-blue">
                    <span>Select Explorer</span>
                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>

                {/* Navigator Option */}
                <button
                  onClick={() => handleSelectAge("navigator")}
                  className="formal-card-interactive p-4 sm:p-5 rounded-xl flex flex-col justify-between text-left group cursor-pointer"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-brand-blue text-white flex items-center justify-center">
                        <GraduationCap size={17} />
                      </div>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-brand-blue-light text-brand-blue border border-brand-blue/20">
                        Ages 14+
                      </span>
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-text-main group-hover:text-brand-blue transition-colors">
                        Navigator
                      </h2>
                      <p className="text-xs text-text-muted mt-1 leading-relaxed">
                        For students exploring higher secondary (+2) academic streams, subject combinations, and career paths.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-2.5 border-t border-border-subtle flex items-center justify-between text-xs font-semibold text-brand-blue">
                    <span>Select Navigator</span>
                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="rules-step"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="space-y-5"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={() => setStep("greeting")}
                  className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text-main font-semibold py-1.5 px-3 rounded-lg border border-border-subtle bg-bg-surface hover:bg-bg-subtle transition-all cursor-pointer shadow-xs"
                >
                  <ArrowLeft size={13} /> Back
                </button>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-blue-light text-brand-blue border border-brand-blue/20 capitalize">
                  {selectedGroup}
                </span>
              </div>

              <h2 className="text-xl font-display font-bold text-text-main">
                Assessment Overview
              </h2>
              <p className="text-xs text-text-muted mt-0.5">
                The assessment consists of two brief parts:
              </p>
            </div>

            {/* Protocol Steps */}
            <div className="space-y-3">
              <div className="formal-card p-4 rounded-xl flex items-start gap-3 bg-bg-surface">
                <div className="w-7 h-7 rounded-md bg-brand-blue-light text-brand-blue flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-text-main">
                    Interest Inventory (20 Questions)
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                    Compare two activities and pick the one you prefer. Go with your first intuition.
                  </p>
                </div>
              </div>

              <div className="formal-card p-4 rounded-xl flex items-start gap-3 bg-bg-surface">
                <div className="w-7 h-7 rounded-lg bg-brand-blue-light text-brand-blue flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-text-main">
                    Timed Aptitude Questions (15 Questions)
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                    Short problem-solving questions. Each has a 20-second timer.
                  </p>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <div className="pt-2">
              <button
                onClick={handleStart}
                className="w-full bg-brand-blue hover:bg-brand-blue-hover text-white font-display font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer text-sm"
              >
                <span>Start Test</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
