import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { 
  GraduationCap, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  ArrowLeft,
  Award,
  Compass,
  Brain,
  Target
} from "lucide-react";

export const metadata: Metadata = {
  title: "Credits & Creator | Apti Test",
  description: "About the creator and academic foundations behind Apti Test.",
};

export default function CreditsPage() {
  return (
    <main className="w-full max-w-4xl mx-auto py-6 sm:py-10 px-4 sm:px-6 space-y-10">
      {/* Top Breadcrumb / Return */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-brand-blue transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Return to Assessment</span>
        </Link>
        <span className="text-[11px] font-bold uppercase tracking-wider text-text-subtle">
          AptiTest • Institutional Profile
        </span>
      </div>

      {/* Hero Header */}
      <div className="space-y-2 border-b border-border-subtle pb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-brand-blue-light text-brand-blue border border-brand-blue/20">
          <Sparkles size={12} />
          <span>Creator & Academic Credits</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-text-main tracking-tight">
          About the Creator & Foundation
        </h1>
        <p className="text-sm text-text-muted max-w-2xl leading-relaxed">
          AptiTest is an academic vocational assessment and cognitive profiling platform designed to help students discover their natural inclinations, higher secondary streams, and career trajectories.
        </p>
      </div>

      {/* SECTION 1: CREATOR PROFILE CARD */}
      <div className="formal-card rounded-2xl p-6 sm:p-8 bg-bg-surface border border-border-subtle shadow-sm relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 relative z-10">
          {/* Portrait Image */}
          <div className="relative shrink-0">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-border-subtle shadow-md bg-bg-subtle ring-4 ring-brand-blue/10">
              <Image
                src="/creator.jpg"
                alt="Minhaj Engapuzha - Creator of AptiTest"
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 640px) 144px, 176px"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-brand-blue text-white p-1.5 rounded-lg shadow-sm border border-bg-surface" title="Verified Creator">
              <Award size={16} />
            </div>
          </div>

          {/* Profile Details */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
                  Project Creator & Lead
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-brand-blue-light text-brand-blue border border-brand-blue/20">
                  Creator
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-text-main">
                Minhaj Engapuzha & Team
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
              Minhaj Engapuzha and team created AptiTest as an intuitive, scientifically grounded self-discovery platform designed on established psychometric frameworks to demystify stream selection and vocational orientation for school and college students.
            </p>

            {/* Credential Tags */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-md bg-bg-subtle border border-border-subtle text-[11px] font-medium text-text-muted">
                🏛️ Jamia Millia Islamia, New Delhi
              </span>
              <span className="px-2.5 py-1 rounded-md bg-bg-subtle border border-border-subtle text-[11px] font-medium text-text-muted">
                📊 Psychometric Research
              </span>
              <span className="px-2.5 py-1 rounded-md bg-bg-subtle border border-border-subtle text-[11px] font-medium text-text-muted">
                🎯 Educational Assessment
              </span>
              <span className="px-2.5 py-1 rounded-md bg-bg-subtle border border-border-subtle text-[11px] font-medium text-text-muted">
                🧭 Vocational Orientation
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: ACADEMIC & THEORETICAL FOUNDATIONS */}
      <div className="space-y-4" id="methodology">
        <div className="flex items-center gap-2 pb-2 border-b border-border-subtle">
          <BookOpen size={18} className="text-brand-blue" />
          <h2 className="text-lg font-display font-bold text-text-main">
            Academic & Theoretical Foundations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="formal-card rounded-xl p-5 bg-bg-surface space-y-2.5 border-l-4 border-l-brand-blue">
            <div className="flex items-center gap-2">
              <Compass size={16} className="text-brand-blue" />
              <h3 className="text-sm font-bold text-text-main">
                Holland’s RIASEC Vocational Model
              </h3>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              The behavioral orientation swipe matrix is calibrated upon psychologist Dr. John L. Holland’s hexagonal model of vocational themes: Realistic, Investigative, Artistic, Social, Enterprising, and Conventional.
            </p>
            <div className="text-[11px] text-text-subtle font-mono pt-1">
              Ref: Holland, J. L. (1997). Making Vocational Choices.
            </div>
          </div>

          <div className="formal-card rounded-xl p-5 bg-bg-surface space-y-2.5 border-l-4 border-l-brand-teal">
            <div className="flex items-center gap-2">
              <Brain size={16} className="text-brand-teal" />
              <h3 className="text-sm font-bold text-text-main">
                Differential Cognitive Aptitude Assessment
              </h3>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              The timed aptitude battery benchmarks spatial visualization, deductive pattern recognition, numerical sequence synthesis, and mechanical reasoning under standardized response intervals.
            </p>
            <div className="text-[11px] text-text-subtle font-mono pt-1">
              Method: Timed Multidimensional Cognitive Battery
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: ASSESSMENT PRINCIPLES */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-border-subtle">
          <Target size={18} className="text-brand-blue" />
          <h2 className="text-lg font-display font-bold text-text-main">
            Core Assessment Objectives
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="formal-card p-4 rounded-xl bg-bg-surface space-y-1.5">
            <h3 className="text-xs font-bold text-text-main">Objective Evaluation</h3>
            <p className="text-[11.5px] text-text-muted leading-relaxed">
              Providing impartial insights into cognitive strengths and personal interest inclinations.
            </p>
          </div>

          <div className="formal-card p-4 rounded-xl bg-bg-surface space-y-1.5">
            <h3 className="text-xs font-bold text-text-main">Stream Guidance</h3>
            <p className="text-[11.5px] text-text-muted leading-relaxed">
              Assisting high school students in selecting appropriate Higher Secondary (+2) academic tracks.
            </p>
          </div>

          <div className="formal-card p-4 rounded-xl bg-bg-surface space-y-1.5">
            <h3 className="text-xs font-bold text-text-main">Holistic Profiling</h3>
            <p className="text-[11.5px] text-text-muted leading-relaxed">
              Synthesizing vocational interests and cognitive speed into actionable career archetype cards.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 4: COMMITMENT TO INTEGRITY */}
      <div className="formal-card rounded-xl p-5 sm:p-6 bg-brand-blue-light/30 border border-brand-blue/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-brand-blue" />
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-text-main">
              Ethical Educational Purpose
            </h3>
          </div>
          <p className="text-xs text-text-muted leading-relaxed max-w-xl">
            AptiTest is dedicated to ad-free, accessible, and privacy-respecting educational assessment for learners, counselors, and educators worldwide.
          </p>
        </div>

        <Link
          href="/"
          className="px-4 py-2 bg-brand-blue hover:bg-brand-blue-hover text-white rounded-lg text-xs font-bold tracking-tight inline-flex items-center gap-1.5 shadow-xs shrink-0 cursor-pointer transition-colors"
        >
          <span>Take the Assessment</span>
        </Link>
      </div>
    </main>
  );
}
