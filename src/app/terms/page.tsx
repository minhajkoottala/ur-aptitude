import type { Metadata } from "next";
import Link from "next/link";
import { FileText, CheckCircle2, AlertCircle, Scale, ShieldAlert, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Apti Test",
  description: "Terms and conditions governing the academic and personal use of Apti Test.",
};

export default function TermsPage() {
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
          Legal Documentation
        </span>
      </div>

      {/* Header */}
      <div className="space-y-2 border-b border-border-subtle pb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-brand-blue-light text-brand-blue border border-brand-blue/20">
          <Scale size={12} />
          <span>Platform Terms & Agreement</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-text-main tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
          Effective Date: September 2026 • AptiTest Assessment Platform
        </p>
      </div>

      {/* Structured Legal Sections */}
      <div className="space-y-6 text-xs sm:text-sm text-text-muted leading-relaxed">
        {/* Section 1 */}
        <section className="formal-card rounded-xl p-5 sm:p-6 bg-bg-surface space-y-3">
          <h2 className="text-base sm:text-lg font-display font-bold text-text-main flex items-center gap-2">
            <span className="text-brand-blue font-mono text-sm">01.</span>
            <span>Acceptance of Terms</span>
          </h2>
          <p>
            By accessing, browsing, or utilizing AptiTest (&ldquo;the Platform&rdquo;), you acknowledge that you have read, understood, and agreed to be legally bound by these Terms of Service and our associated Privacy Policy and Academic Disclaimer. If you do not agree with these terms, please discontinue use of the platform.
          </p>
        </section>

        {/* Section 2 */}
        <section className="formal-card rounded-xl p-5 sm:p-6 bg-bg-surface space-y-3">
          <h2 className="text-base sm:text-lg font-display font-bold text-text-main flex items-center gap-2">
            <span className="text-brand-blue font-mono text-sm">02.</span>
            <span>Permitted Educational & Personal Use</span>
          </h2>
          <p>
            AptiTest is made available for individual self-evaluation, parental exploration, classroom demonstrations, and educational guidance.
          </p>
          <div className="space-y-2 pt-1">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-brand-teal shrink-0 mt-0.5" />
              <span><strong>Permitted:</strong> Taking assessments, printing evaluation reports, sharing scorecard PNGs, and utilizing stream recommendations for personal academic planning.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <AlertCircle size={16} className="text-brand-amber shrink-0 mt-0.5" />
              <span><strong>Restricted:</strong> Reverse-engineering question databases for commercial resale, automated bulk scraping, or representing AptiTest scores as official government or accredited university admissions certifications.</span>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="formal-card rounded-xl p-5 sm:p-6 bg-bg-surface space-y-3">
          <h2 className="text-base sm:text-lg font-display font-bold text-text-main flex items-center gap-2">
            <span className="text-brand-blue font-mono text-sm">03.</span>
            <span>Intellectual Property & Academic Rights</span>
          </h2>
          <p>
            All original evaluation questions, assessment frameworks, graphic elements, cognitive battery sequences, and platform designs are the intellectual property of <strong>Minhaj Engapuzha</strong> and AptiTest, except where established public-domain psychometric models (such as Holland's RIASEC framework) apply.
          </p>
        </section>

        {/* Section 4 */}
        <section className="formal-card rounded-xl p-5 sm:p-6 bg-bg-surface space-y-3">
          <h2 className="text-base sm:text-lg font-display font-bold text-text-main flex items-center gap-2">
            <span className="text-brand-blue font-mono text-sm">04.</span>
            <span>Limitation of Liability</span>
          </h2>
          <div className="p-3.5 rounded-lg bg-bg-subtle border border-border-subtle flex items-start gap-3">
            <ShieldAlert size={18} className="text-brand-amber shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-xs sm:text-sm text-text-main">Advisory Nature of Evaluations</h4>
              <p className="text-xs text-text-muted leading-relaxed">
                The aptitude archetypes, higher secondary stream alignments (+2 Science/Commerce/Humanities), and career trajectories are generated as heuristic advisory indicators. AptiTest and its contributors assume no liability for academic or professional decisions made solely on the basis of assessment scores.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="formal-card rounded-xl p-5 sm:p-6 bg-bg-surface space-y-3">
          <h2 className="text-base sm:text-lg font-display font-bold text-text-main flex items-center gap-2">
            <span className="text-brand-blue font-mono text-sm">05.</span>
            <span>Modifications to Terms</span>
          </h2>
          <p>
            We reserve the right to revise or update these terms periodically to reflect updates in psychometric methodology, legal standards, or platform functionality. Continued use of the platform signifies your acceptance of any updated terms.
          </p>
        </section>
      </div>
    </main>
  );
}
