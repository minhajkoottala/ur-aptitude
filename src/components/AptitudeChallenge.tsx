"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useAssessmentStore } from "@/store/assessmentStore";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, AlertTriangle, ArrowRight, Brain, Clock, Target } from "lucide-react";

const SECONDS_PER_QUESTION = 20;

export default function AptitudeChallenge() {
  const { sessionAptitudes, currentQuestionIndex, answerAptitude } = useAssessmentStore();
  const [showIntro, setShowIntro] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(1);
  const [timeLeft, setTimeLeft] = useState(SECONDS_PER_QUESTION);
  const [hasError, setHasError] = useState(false);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    startTimeRef.current = Date.now();
  }, [currentQuestionIndex]);

  const handleStart = () => {
    setShowIntro(false);
    setTimeLeft(SECONDS_PER_QUESTION);
    startTimeRef.current = Date.now();
  };

  const currentQ = sessionAptitudes?.[currentQuestionIndex];

  const handleSelect = useCallback((selectedIndex: number) => {
    if (isAnimating || !currentQ) return;
    
    try {
      const timeTakenMs = Date.now() - startTimeRef.current;
      const isCorrect = selectedIndex === currentQ.correctIndex;
      
      setIsAnimating(true);
      setDirection(1);

      setTimeout(() => {
        answerAptitude(currentQ.domain, isCorrect, timeTakenMs);
        setTimeLeft(SECONDS_PER_QUESTION);
        startTimeRef.current = Date.now();
        setIsAnimating(false);
      }, 280);
    } catch (error) {
      console.error("Error processing aptitude answer:", error);
      setHasError(true);
    }
  }, [isAnimating, currentQ, answerAptitude]);

  // Timer Effect (Only runs when not in intro)
  useEffect(() => {
    if (showIntro || isAnimating) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSelect(-1); // Auto-fail on timeout
          return SECONDS_PER_QUESTION;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showIntro, currentQuestionIndex, isAnimating, handleSelect]);

  if (hasError) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
        <AlertTriangle className="text-brand-amber mb-4" size={48} />
        <h2 className="text-2xl font-display font-bold mb-2">Something went wrong</h2>
        <p className="text-text-muted">We hit a snag loading this puzzle. Refreshing the app should fix it!</p>
      </div>
    );
  }

  if (!sessionAptitudes || sessionAptitudes.length === 0) return null;
  
  if (!currentQ || !currentQ.options) {
    setHasError(true);
    return null;
  }

  const progressPercent = (currentQuestionIndex / sessionAptitudes.length) * 100;

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0, scale: 0.96 }),
    center: { z: 0, x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ z: 0, x: dir < 0 ? 80 : -80, opacity: 0, scale: 0.96 }),
  };

  // Section 2 Intro Screen
  if (showIntro) {
    return (
      <div className="flex-1 flex flex-col justify-between h-full w-full max-w-sm mx-auto py-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 flex flex-col justify-center items-center text-center my-auto"
        >
          {/* Round Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-bold uppercase tracking-wider mb-4">
            <Brain size={14} />
            <span>Round 2 of 2</span>
          </div>

          <h2 className="text-3xl font-display font-extrabold text-text-main mb-3">
            Aptitude Speed Challenge
          </h2>

          <p className="text-text-muted text-sm leading-relaxed mb-6">
            Solve quick logic, spatial, and numerical puzzles. Think fast—the countdown begins when you tap start!
          </p>

          <div className="w-full space-y-2.5 text-left mb-6">
            <div className="glass-card p-3.5 rounded-2xl flex items-center gap-3 border-l-4 border-l-brand-cyan">
              <Brain size={16} className="text-brand-cyan shrink-0" />
              <span className="text-xs text-text-main font-medium">15 Cognitive puzzle challenges</span>
            </div>
            <div className="glass-card p-3.5 rounded-2xl flex items-center gap-3 border-l-4 border-l-brand-amber">
              <Clock size={16} className="text-brand-amber shrink-0" />
              <span className="text-xs text-text-main font-medium">20 Seconds timer per question</span>
            </div>
            <div className="glass-card p-3.5 rounded-2xl flex items-center gap-3 border-l-4 border-l-brand-violet">
              <Target size={16} className="text-brand-violet shrink-0" />
              <span className="text-xs text-text-main font-medium">Scores accuracy & raw problem-solving speed</span>
            </div>
          </div>
        </motion.div>

        <button
          onClick={handleStart}
          className="w-full bg-gradient-to-r from-brand-cyan to-brand-violet hover:opacity-95 text-white font-display font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-all"
        >
          <span>Start Challenge</span>
          <ArrowRight size={18} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full w-full">
      {/* Header & Progress */}
      <div className="w-full pt-4 pb-3">
        <div className="flex justify-between items-center text-xs text-text-muted mb-2 font-display uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <Timer size={14} className={timeLeft <= 5 ? "text-brand-pink animate-pulse" : "text-brand-cyan"} />
            <span className={timeLeft <= 5 ? "text-brand-pink font-bold" : "text-text-main font-bold"}>
              00:{timeLeft.toString().padStart(2, '0')}
            </span>
          </span>
          <span className="font-semibold">{currentQuestionIndex + 1} / {sessionAptitudes.length}</span>
        </div>
        <div className="h-2 w-full bg-bg-card rounded-full overflow-hidden border border-border-glass relative">
          <motion.div 
            className="h-full bg-gradient-to-r from-brand-cyan to-brand-violet"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="flex-1 relative flex flex-col items-center overflow-y-auto overflow-x-hidden pt-2">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={currentQ.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="w-full flex flex-col h-full"
          >
            <div className="text-center mb-6 px-2 flex-shrink-0">
              <span className="inline-block px-3 py-1 bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs rounded-full uppercase tracking-widest font-bold mb-3">
                {currentQ.domain}
              </span>
              <h2 className="text-lg sm:text-xl font-body font-semibold leading-relaxed text-text-main">
                {currentQ.question}
              </h2>
            </div>

            <div className="flex flex-col gap-3 flex-1 overflow-y-auto pb-6 px-1">
              {currentQ.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className="glass-card w-full p-4 sm:p-5 rounded-2xl text-left border border-border-glass hover:border-brand-cyan/50 active:scale-98 transition-all text-sm sm:text-base font-medium group shadow-sm flex items-center gap-3"
                >
                  <span className="w-7 h-7 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan font-bold flex items-center justify-center text-xs shrink-0 group-hover:bg-brand-cyan group-hover:text-white transition-colors">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-text-main flex-1">{option}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
