"use client";

import { useState, useRef, useEffect } from "react";
import { useAssessmentStore } from "@/store/assessmentStore";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Heart, Zap, Compass } from "lucide-react";

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
  const progressPercent = ((currentQuestionIndex) / sessionInterests.length) * 100;

  const handleStart = () => {
    setShowIntro(false);
    startTimeRef.current = Date.now();
  };

  const handleSelect = (trait: string) => {
    if (isAnimating) return;
    
    const timeTakenMs = Date.now() - startTimeRef.current;
    setIsAnimating(true);
    setDirection(1);

    setTimeout(() => {
      answerInterest(trait, timeTakenMs);
      startTimeRef.current = Date.now();
      setIsAnimating(false);
    }, 280);
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      z: 0,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      z: 0,
      x: dir < 0 ? 80 : -80,
      opacity: 0,
      scale: 0.96,
    }),
  };

  // Section 1 Intro Screen
  if (showIntro) {
    return (
      <div className="flex-1 flex flex-col justify-between h-full w-full max-w-sm mx-auto py-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 flex flex-col justify-center items-center text-center my-auto"
        >
          {/* Round Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-pink/10 border border-brand-pink/20 text-brand-pink text-xs font-bold uppercase tracking-wider mb-4">
            <Heart size={14} />
            <span>Round 1 of 2</span>
          </div>

          <h2 className="text-3xl font-display font-extrabold text-text-main mb-3">
            Passion & Vibe Check
          </h2>

          <p className="text-text-muted text-sm leading-relaxed mb-6">
            Compare two choices and pick whichever feels more exciting or natural. Don&apos;t overthink it—trust your gut!
          </p>

          <div className="w-full space-y-2.5 text-left mb-6">
            <div className="glass-card p-3.5 rounded-2xl flex items-center gap-3 border-l-4 border-l-brand-pink">
              <Sparkles size={16} className="text-brand-pink shrink-0" />
              <span className="text-xs text-text-main font-medium">20 Rapid-fire real scenarios</span>
            </div>
            <div className="glass-card p-3.5 rounded-2xl flex items-center gap-3 border-l-4 border-l-brand-violet">
              <Compass size={16} className="text-brand-violet shrink-0" />
              <span className="text-xs text-text-main font-medium">Tap your preferred option</span>
            </div>
            <div className="glass-card p-3.5 rounded-2xl flex items-center gap-3 border-l-4 border-l-brand-cyan">
              <Zap size={16} className="text-brand-cyan shrink-0" />
              <span className="text-xs text-text-main font-medium">Calibrates your RIASEC interest profile</span>
            </div>
          </div>
        </motion.div>

        <button
          onClick={handleStart}
          className="w-full bg-gradient-to-r from-brand-violet to-brand-pink hover:opacity-95 text-white font-display font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-all"
        >
          <span>Start Round 1</span>
          <ArrowRight size={18} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full w-full">
      {/* Progress Bar */}
      <div className="w-full pt-4 pb-3">
        <div className="flex justify-between text-xs text-text-muted mb-2 font-display uppercase tracking-wider">
          <span className="font-bold text-brand-pink flex items-center gap-1.5">
            <Heart size={13} className="text-brand-pink" />
            <span>Passion Check</span>
          </span>
          <span className="font-semibold">{currentQuestionIndex + 1} / {sessionInterests.length}</span>
        </div>
        <div className="h-2 w-full bg-bg-card rounded-full overflow-hidden border border-border-glass">
          <motion.div 
            className="h-full bg-gradient-to-r from-brand-violet to-brand-pink"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Swipe Question Cards Container */}
      <div className="flex-1 relative flex items-start justify-center overflow-y-auto overflow-x-hidden pt-2">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={currentQ.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="w-full"
          >
            <div className="text-center mb-6 px-2">
              <h2 className="text-xl sm:text-2xl font-display font-bold leading-snug text-text-main">
                {currentQ.scenario}
              </h2>
              <p className="text-xs sm:text-sm text-text-muted mt-1.5 font-medium">Which one do you vibe with more?</p>
            </div>

            <div className="flex flex-col gap-3.5">
              {/* Option A */}
              <button
                onClick={() => handleSelect(currentQ.optionA.trait)}
                className="glass-card w-full p-5 sm:p-6 rounded-3xl text-left border-2 border-transparent hover:border-brand-pink/50 active:scale-98 transition-all relative overflow-hidden group shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-brand-pink/15 text-brand-pink font-bold flex items-center justify-center shrink-0 text-sm group-hover:bg-brand-pink group-hover:text-white transition-colors">
                    A
                  </div>
                  <span className="text-base sm:text-lg font-medium text-text-main leading-snug">{currentQ.optionA.text}</span>
                </div>
              </button>

              <div className="flex items-center justify-center my-0.5">
                <span className="px-3 py-0.5 rounded-full glass-card text-[10px] text-text-muted font-display tracking-widest uppercase font-bold">
                  OR
                </span>
              </div>

              {/* Option B */}
              <button
                onClick={() => handleSelect(currentQ.optionB.trait)}
                className="glass-card w-full p-5 sm:p-6 rounded-3xl text-left border-2 border-transparent hover:border-brand-cyan/50 active:scale-98 transition-all relative overflow-hidden group shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-brand-cyan/15 text-brand-cyan font-bold flex items-center justify-center shrink-0 text-sm group-hover:bg-brand-cyan group-hover:text-white transition-colors">
                    B
                  </div>
                  <span className="text-base sm:text-lg font-medium text-text-main leading-snug">{currentQ.optionB.text}</span>
                </div>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
