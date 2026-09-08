import type { Metadata } from "next";
import Link from "next/link";
import { 
  AlertTriangle, 
  HelpCircle, 
  GraduationCap, 
  BookOpen, 
  Compass, 
  ArrowLeft,
  CheckCircle,
  Lightbulb
} from "lucide-react";

export const metadata: Metadata = {
  title: "Academic & Methodological Disclaimer | Apti Test",
  description: "Official psychometric and academic advisory disclaimer for Apti Test.",
};

export default function DisclaimerPage() {
  return (
    <main className="w-full max-w-4xl mx-auto py-6 sm:py-10 px-4 sm:px-6 space-y-8">
      {/* Navigation Return */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-brand-blue transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Return to Assessment</span>
        </Link>
        <span className="text-[11px] font-bold uppercase tracking-wider text-text-subtle">
          Methodological Transparency
        </span>
      </div>

      {/* Header */}
      <div className="space-y-2 border-b border-border-subtle pb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-brand-amber/10 text-brand-amber border border-brand-amber/20">
          <AlertTriangle size={12} />
          <span>Academic & Advisory Disclaimer</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-text-main tracking-tight">
          Psychometric & Evaluation Disclaimer
        </h1>
        <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
          Understanding the scope, methodology, and consultative purpose of AptiTest results.
        </p>
      </div>

      {/* Important Advisory Banner */}
      <div className="formal-card rounded-xl p-5 sm:p-6 bg-bg-surface border-l-4 border-l-brand-amber space-y-2">
        <div className="flex items-center gap-2 text-brand-amber font-bold text-xs uppercase tracking-wider">
          <HelpCircle size={16} />
          <span>Consultative Guidance, Not Clinical Assessment</span>
        </div>
        <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
          AptiTest is designed as an <strong>exploratory vocational discovery platform</strong>. The generated cognitive archetypes, recommended +2 streams (Science, Commerce, Humanities, Applied Arts), and career paths represent evidence-informed directional guides rather than definitive career mandates or psychiatric diagnostic assessments.
        </p>
      </div>

      {/* Structured Sections */}
      <div className="space-y-6 text-xs sm:text-sm text-text-muted leading-relaxed">
        {/* Section 1: Psychometric Model Context */}
        <section className="formal-card rounded-xl p-5 sm:p-6 bg-bg-surface space-y-3">
          <h2 className="text-base sm:text-lg font-display font-bold text-text-main flex items-center gap-2">
            <Compass size={17} className="text-brand-blue" />
            <span>01. Theoretical Foundation & RIASEC Alignment</span>
          </h2>
          <p>
            The interest assessment framework utilizes Dr. John Holland’s hexagonal vocational topology (RIASEC: Realistic, Investigative, Artistic, Social, Enterprising, Conventional). While RIASEC is an internationally recognized model in vocational psychology, individual human potential is dynamic, evolving with experience, exposure, and targeted mentorship.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-bg-subtle border border-border-subtle">
              <h4 className="font-bold text-xs text-text-main mb-1">What AptiTest Measures</h4>
              <ul className="list-disc pl-4 space-y-1 text-[11.5px] text-text-muted">
                <li>Self-reported interest leanings & affinities</li>
                <li>Timed deductive, numerical & spatial reasoning response speed</li>
                <li>High-level vocational archetype clusters</li>
              </ul>
            </div>
            <div className="p-3 rounded-lg bg-bg-subtle border border-border-subtle">
              <h4 className="font-bold text-xs text-text-main mb-1">What It Does Not Replace</h4>
              <ul className="list-disc pl-4 space-y-1 text-[11.5px] text-text-muted">
                <li>Formal clinical psycho-educational evaluations</li>
                <li>Standardized university entrance examinations (e.g., JEE, NEET, CUET, SAT)</li>
                <li>One-on-one certified career counseling sessions</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Higher Secondary Stream Alignment */}
        <section className="formal-card rounded-xl p-5 sm:p-6 bg-bg-surface space-y-3">
          <h2 className="text-base sm:text-lg font-display font-bold text-text-main flex items-center gap-2">
            <GraduationCap size={17} className="text-brand-blue" />
            <span>02. Academic Stream Recommendations (+2 / High School)</span>
          </h2>
          <p>
            Stream recommendations provided for the <strong>Navigator Track</strong> (e.g., Science PCM/PCB, Commerce with Mathematics, Humanities & Behavioral Sciences) are synthesized from your cognitive speed metrics and interest orientation.
          </p>
          <p>
            Students and parents should combine these insights with actual academic track records, personal passions, institutional subject availability, and consultations with school teachers.
          </p>
        </section>

        {/* Section 3: Recommended Next Steps */}
        <section className="formal-card rounded-xl p-5 sm:p-6 bg-bg-surface space-y-3">
          <h2 className="text-base sm:text-lg font-display font-bold text-text-main flex items-center gap-2">
            <Lightbulb size={17} className="text-brand-blue" />
            <span>03. Recommended Action Plan</span>
          </h2>
          <p>
            To gain the greatest benefit from your AptiTest report:
          </p>
          <div className="space-y-2 pt-1">
            <div className="flex items-start gap-2.5">
              <CheckCircle size={15} className="text-brand-teal shrink-0 mt-0.5" />
              <span><strong>Review with Mentors:</strong> Discuss your core competencies and flow state triggers with academic teachers and career guidance counselors.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle size={15} className="text-brand-teal shrink-0 mt-0.5" />
              <span><strong>Explore Practical Projects:</strong> Test your interest in recommended careers through short online courses, coding challenges, creative portfolios, or internships.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle size={15} className="text-brand-teal shrink-0 mt-0.5" />
              <span><strong>Retake Periodically:</strong> As your cognitive skills mature, re-evaluate every 6 to 12 months to observe pattern shifts.</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
