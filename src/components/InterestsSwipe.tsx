"use client";

import { useState, useRef, useEffect } from "react";
import { useAssessmentStore } from "@/store/assessmentStore";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Compass, CheckCircle, FileQuestion } from "lucide-react";

export default function InterestsSwipe() {
  const { sessionInterests, currentQuestionIndex, answerInterest } = useAssessmentStore();
  const [showIntro, setShowIntro] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(1);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    startTimeRef.current = Date.now();
  }, [currentQuestionIndex]);

  if (!sessionInterests || sessionInterests.length === 0) return null;

  const currentQ = sessionInterests[currentQuestionIndex];
  const progressPercent = ((currentQuestionIndex + 1) / sessionInterests.length) * 100;

  const handleStart = () => {
    setShowIntro(false);
    startTimeRef.current = Date.now();
  };

  const handleSelect = (trait: string, dir: number) => {
    if (isAnimating) return;
    
    const timeTakenMs = Date.now() - startTimeRef.current;
    setIsAnimating(true);
    setDirection(dir);

    setTimeout(() => {
      answerInterest(trait, timeTakenMs);
      startTimeRef.current = Date.now();
      setIsAnimating(false);
    }, 220);
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: {
      z: 0,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      z: 0,
      x: dir < 0 ? 40 : -40,
      opacity: 0,
    }),
  };

  // Section 1 Intro Screen
  if (showIntro) {
    return (
      <div className="w-full max-w-2xl mx-auto py-6 sm:py-10 px-3 sm:px-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {/* Module Pill */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue-light text-brand-blue text-xs font-semibold uppercase tracking-wider border border-brand-blue/20">
              <Compass size={14} />
              <span>Section 1 of 2</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-bold text-text-main">
              Behavioral & Interest Inventory
            </h2>

            <p className="text-text-muted text-xs sm:text-sm leading-relaxed max-w-lg mx-auto font-normal">
              Compare paired occupational scenarios and select the activity that aligns more closely with your genuine interest and natural curiosity.
            </p>
          </div>

          <div className="formal-card p-4 sm:p-5 rounded-xl space-y-3 bg-bg-surface">
            <div className="flex items-center gap-3 text-xs sm:text-sm text-text-muted">
              <CheckCircle size={16} className="text-brand-blue shrink-0" />
              <span>20 Paired choice scenario items</span>
            </div>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-text-muted">
              <CheckCircle size={16} className="text-brand-blue shrink-0" />
              <span>Calibrates Holland's RIASEC vocational dimensions</span>
            </div>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-text-muted">
              <CheckCircle size={16} className="text-brand-blue shrink-0" />
              <span>Select your authentic preference without overthinking</span>
            </div>
          </div>

          <button
            onClick={handleStart}
            className="w-full bg-brand-blue hover:bg-brand-blue-hover text-white font-display font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer text-sm sm:text-base"
          >
            <span>Begin Section 1</span>
            <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto py-3 sm:py-6 px-3 sm:px-4 space-y-4 select-none">
      {/* Top Header: Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-xs text-text-muted font-medium">
          <span className="font-semibold text-brand-blue flex items-center gap-1.5">
            <FileQuestion size={14} />
            <span>Behavioral Preference Inventory</span>
          </span>
          <span className="font-semibold text-xs px-2.5 py-0.5 rounded-full bg-bg-subtle text-text-muted border border-border-subtle">
            Item {currentQuestionIndex + 1} of {sessionInterests.length}
          </span>
        </div>
        <div className="h-1.5 w-full bg-bg-subtle rounded-full overflow-hidden border border-border-subtle">
          <motion.div 
            className="h-full bg-brand-blue rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Main Question Container */}
      <div className="relative pt-2">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={currentQ.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.18, ease: "easeInOut" }}
            className="space-y-4"
          >
            {/* Scenario Header */}
            <div className="formal-card p-4 sm:p-6 rounded-xl text-center bg-bg-surface space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-text-subtle block">
                Comparative Scenario
              </span>
              <h2 className="text-base sm:text-lg md:text-xl font-display font-bold leading-snug text-text-main">
                {currentQ.scenario}
              </h2>
              <p className="text-xs text-text-muted pt-1">
                Which activity appeals to you more?
              </p>
            </div>

            {/* Two Option Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Option A */}
              <button
                onClick={() => handleSelect(currentQ.optionA.trait, 1)}
                className="formal-card-interactive p-4 sm:p-5 rounded-xl text-left group cursor-pointer flex flex-col justify-between min-h-[120px] sm:min-h-[140px]"
              >
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-bg-subtle group-hover:bg-brand-blue group-hover:text-white text-text-muted font-bold text-xs flex items-center justify-center shrink-0 transition-colors mt-0.5">
                    A
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-text-main group-hover:text-brand-blue transition-colors leading-relaxed">
                    {currentQ.optionA.text}
                  </span>
                </div>
                <div className="mt-3 pt-2 border-t border-border-subtle flex items-center justify-between text-[11px] text-text-subtle group-hover:text-brand-blue">
                  <span>Select A</span>
                  <ArrowRight size={13} />
                </div>
              </button>

              {/* Option B */}
              <button
                onClick={() => handleSelect(currentQ.optionB.trait, -1)}
                className="formal-card-interactive p-4 sm:p-5 rounded-xl text-left group cursor-pointer flex flex-col justify-between min-h-[120px] sm:min-h-[140px]"
              >
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-bg-subtle group-hover:bg-brand-blue group-hover:text-white text-text-muted font-bold text-xs flex items-center justify-center shrink-0 transition-colors mt-0.5">
                    B
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-text-main group-hover:text-brand-blue transition-colors leading-relaxed">
                    {currentQ.optionB.text}
                  </span>
                </div>
                <div className="mt-3 pt-2 border-t border-border-subtle flex items-center justify-between text-[11px] text-text-subtle group-hover:text-brand-blue">
                  <span>Select B</span>
                  <ArrowRight size={13} />
                </div>
              </button>
            </div>

            {/* Footnote */}
            <div className="text-center pt-1">
              <span className="text-[11px] text-text-subtle">
                Choose the option that represents your authentic interest
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
