"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useAssessmentStore } from "@/store/assessmentStore";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, AlertTriangle, ArrowRight, Brain, Clock, CheckCircle2, ShieldCheck } from "lucide-react";

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
      }, 220);
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
      <div className="w-full max-w-2xl mx-auto py-8 text-center space-y-3">
        <AlertTriangle className="text-brand-amber mx-auto" size={36} />
        <h2 className="text-lg font-display font-bold">Item Load Error</h2>
        <p className="text-xs text-text-muted">A technical issue occurred loading this question.</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-brand-blue text-white rounded-lg text-xs font-semibold"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  if (!sessionAptitudes || sessionAptitudes.length === 0) return null;
  
  if (!currentQ || !currentQ.options) {
    setHasError(true);
    return null;
  }

  const progressPercent = ((currentQuestionIndex + 1) / sessionAptitudes.length) * 100;
  const timerPercent = (timeLeft / SECONDS_PER_QUESTION) * 100;

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { z: 0, x: 0, opacity: 1 },
    exit: (dir: number) => ({ z: 0, x: dir < 0 ? 40 : -40, opacity: 0 }),
  };

  // Section 2 Intro Screen
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
              <Brain size={14} />
              <span>Section 2 of 2</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-bold text-text-main">
              Timed Cognitive Assessment
            </h2>

            <p className="text-text-muted text-xs sm:text-sm leading-relaxed max-w-lg mx-auto font-normal">
              Evaluate your core problem-solving faculties across Numerical, Logical, Spatial, and Verbal reasoning domains.
            </p>
          </div>

          <div className="formal-card p-4 sm:p-5 rounded-xl space-y-3 bg-bg-surface">
            <div className="flex items-center gap-3 text-xs sm:text-sm text-text-muted">
              <CheckCircle2 size={16} className="text-brand-blue shrink-0" />
              <span>15 Standardized aptitude problem sets</span>
            </div>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-text-muted">
              <Clock size={16} className="text-brand-amber shrink-0" />
              <span>20-second strict countdown timer per question</span>
            </div>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-text-muted">
              <ShieldCheck size={16} className="text-brand-teal shrink-0" />
              <span>Calibrates accuracy, response latency, and domain aptitude strength</span>
            </div>
          </div>

          <button
            onClick={handleStart}
            className="w-full bg-brand-blue hover:bg-brand-blue-hover text-white font-display font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer text-sm sm:text-base"
          >
            <span>Start Timed Assessment</span>
            <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto py-3 sm:py-6 px-3 sm:px-4 space-y-4 select-none">
      {/* Header & Progress */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-xs text-text-muted font-medium">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold ${
              timeLeft <= 5 
                ? "bg-red-50 text-red-600 border border-red-200 animate-pulse" 
                : "bg-brand-blue-light text-brand-blue border border-brand-blue/20"
            }`}>
              <Timer size={13} />
              <span>00:{timeLeft.toString().padStart(2, '0')}</span>
            </span>
            <span className="text-xs text-text-subtle hidden sm:inline">Time Remaining</span>
          </div>
          <span className="font-semibold text-xs px-2.5 py-0.5 rounded-full bg-bg-subtle text-text-muted border border-border-subtle">
            Item {currentQuestionIndex + 1} of {sessionAptitudes.length}
          </span>
        </div>

        {/* Dual Progress: Overall items + Question timer */}
        <div className="space-y-1">
          <div className="h-1.5 w-full bg-bg-subtle rounded-full overflow-hidden border border-border-subtle">
            <motion.div 
              className="h-full bg-brand-blue rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            />
          </div>
          <div className="h-1 w-full bg-bg-subtle/60 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 linear ${
                timeLeft <= 5 ? "bg-red-500" : "bg-brand-blue/50"
              }`}
              style={{ width: `${timerPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Card */}
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
            className="space-y-3.5"
          >
            <div className="formal-card p-4 sm:p-5 rounded-xl text-center bg-bg-surface space-y-1.5">
              <div className="inline-block px-2.5 py-0.5 bg-brand-blue-light border border-brand-blue/20 text-brand-blue text-[10px] rounded-md uppercase tracking-wider font-bold">
                {currentQ.domain}
              </div>
              <h2 className="text-sm sm:text-base md:text-lg font-display font-bold leading-relaxed text-text-main">
                {currentQ.question}
              </h2>
            </div>

            {/* Multiple Choice Options */}
            <div className="space-y-2">
              {currentQ.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className="formal-card-interactive w-full p-3.5 rounded-xl text-left group cursor-pointer flex items-center gap-3"
                >
                  <span className="w-6 h-6 rounded-md bg-bg-subtle group-hover:bg-brand-blue group-hover:text-white text-text-muted font-bold flex items-center justify-center text-xs shrink-0 transition-colors">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-text-main group-hover:text-brand-blue transition-colors flex-1 leading-snug">
                    {option}
                  </span>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="text-center pt-1">
              <span className="text-[11px] text-text-subtle">
                {timeLeft <= 5 ? "⚠️ Time running out for this item" : "Accuracy and response speed contribute to domain score"}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
