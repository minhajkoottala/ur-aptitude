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
  CheckCircle2, 
  FileText,
  BrainCircuit,
  Target,
  Zap,
  ShieldCheck
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
    <div className="w-full max-w-2xl mx-auto py-4 sm:py-8 px-3 sm:px-4">
      <AnimatePresence mode="wait">
        {step === "greeting" ? (
          <motion.div
            key="greeting-step"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Header Section */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue-light text-brand-blue text-xs font-semibold tracking-wide border border-brand-blue/20">
                <BrainCircuit size={14} />
                <span>Standardized Academic Evaluation</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-text-main leading-tight">
                Cognitive Aptitude & <br className="hidden sm:inline" />
                <span className="text-brand-blue">Career Stream Assessment</span>
              </h1>

              <p className="text-text-muted text-xs sm:text-sm leading-relaxed max-w-lg mx-auto font-normal">
                Calibrate your intrinsic cognitive strengths, identify your RIASEC vocational orientation, and receive definitive recommendations for Higher Secondary (+2) streams and aligned career pathways.
              </p>
            </div>

            {/* Quick Spec Metrics Bar */}
            <div className="formal-card p-3.5 sm:p-4 rounded-xl flex items-center justify-around gap-2 bg-bg-surface text-center">
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <Clock size={15} className="text-brand-blue shrink-0" />
                <span>Time: <strong>~3-4 mins</strong></span>
              </div>
              <div className="h-4 w-px bg-border-subtle" />
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <FileText size={15} className="text-brand-blue shrink-0" />
                <span>Modules: <strong>2 Rounds</strong></span>
              </div>
              <div className="h-4 w-px bg-border-subtle hidden sm:block" />
              <div className="hidden sm:flex items-center gap-2 text-xs text-text-muted">
                <CheckCircle2 size={15} className="text-brand-teal shrink-0" />
                <span>Instant Verified Report</span>
              </div>
            </div>

            {/* Track Selection Cards */}
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-wider text-text-muted uppercase block">
                Select Candidate Evaluation Track
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Explorer Option */}
                <button
                  onClick={() => handleSelectAge("explorer")}
                  className="formal-card-interactive p-4 sm:p-5 rounded-xl flex flex-col justify-between text-left group cursor-pointer"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-lg bg-brand-blue-light text-brand-blue flex items-center justify-center">
                        <Compass size={18} />
                      </div>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-bg-subtle text-text-muted border border-border-subtle">
                        Ages 8 – 13
                      </span>
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-text-main group-hover:text-brand-blue transition-colors">
                        Explorer Track
                      </h2>
                      <p className="text-xs text-text-muted leading-relaxed font-normal mt-1">
                        Foundational strength discovery and developmental aptitude profiling for primary and middle school students.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between text-xs font-semibold text-brand-blue">
                    <span>Select Explorer Track</span>
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>

                {/* Navigator Option */}
                <button
                  onClick={() => handleSelectAge("navigator")}
                  className="formal-card-interactive p-4 sm:p-5 rounded-xl flex flex-col justify-between text-left group cursor-pointer border-brand-blue/30"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-lg bg-brand-blue text-white flex items-center justify-center">
                        <GraduationCap size={18} />
                      </div>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-brand-blue-light text-brand-blue border border-brand-blue/20">
                        Ages 14+ / High School
                      </span>
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-text-main group-hover:text-brand-blue transition-colors">
                        Navigator Track
                      </h2>
                      <p className="text-xs text-text-muted leading-relaxed font-normal mt-1">
                        Higher Secondary (+2) stream advice (Science, Commerce, Humanities), subject electives, and career pathways.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between text-xs font-semibold text-brand-blue">
                    <span>Select Navigator Track</span>
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              </div>
            </div>

            {/* Footnote */}
            <div className="text-center pt-1">
              <span className="text-xs text-text-subtle">
                Standardized Psychometric & Aptitude Battery • Designed for Indian Students
              </span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="rules-step"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="space-y-5"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={() => setStep("greeting")}
                  className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text-main font-semibold py-1.5 px-3 rounded-lg border border-border-subtle bg-bg-surface hover:bg-bg-subtle transition-all cursor-pointer shadow-xs"
                >
                  <ArrowLeft size={14} /> Back
                </button>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-blue-light text-brand-blue border border-brand-blue/20 capitalize">
                  {selectedGroup} Evaluation Track
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-display font-bold text-text-main mb-1">
                Assessment Protocol & Guidelines
              </h2>
              <p className="text-xs sm:text-sm text-text-muted">
                Review the two evaluation stages before starting:
              </p>
            </div>

            {/* Protocol Cards */}
            <div className="space-y-3">
              <div className="formal-card p-4 rounded-xl flex items-start gap-3.5 bg-bg-surface">
                <div className="w-8 h-8 rounded-lg bg-brand-blue-light text-brand-blue flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h3 className="text-sm font-bold text-text-main mb-0.5">
                    Behavioral & Interest Inventory (20 Items)
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed font-normal">
                    Comparative scenario evaluation. Choose the option that naturally aligns with your genuine interest. There are no wrong answers.
                  </p>
                </div>
              </div>

              <div className="formal-card p-4 rounded-xl flex items-start gap-3.5 bg-bg-surface">
                <div className="w-8 h-8 rounded-lg bg-brand-blue-light text-brand-blue flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h3 className="text-sm font-bold text-text-main mb-0.5">
                    Timed Cognitive & Aptitude Battery (15 Items)
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed font-normal">
                    Assesses numerical, spatial, logical, and verbal reasoning. Each puzzle is timed at 20 seconds. Speed and accuracy calibrate your aptitude score.
                  </p>
                </div>
              </div>

              <div className="formal-card p-4 rounded-xl flex items-start gap-3.5 bg-bg-surface">
                <div className="w-8 h-8 rounded-lg bg-brand-teal/10 text-brand-teal flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h3 className="text-sm font-bold text-text-main mb-0.5">
                    Synthesis & Academic Stream Report
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed font-normal">
                    Instantly generates your RIASEC trait radar, definitive Higher Secondary (+2) stream recommendations with electives, and aligned career pathways.
                  </p>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <div className="pt-2">
              <button
                onClick={handleStart}
                className="w-full bg-brand-blue hover:bg-brand-blue-hover text-white font-display font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer text-sm sm:text-base"
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
