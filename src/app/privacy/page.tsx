import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Lock, EyeOff, ServerOff, Cookie, UserCheck, ArrowLeft, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Apti Test",
  description: "Official Privacy Policy and Data Handling Principles for Apti Test.",
};

export default function PrivacyPage() {
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
          <Shield size={12} />
          <span>Data Governance & Privacy</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-text-main tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
          Last Updated: September 2026 • AptiTest Academic Assessment Platform
        </p>
      </div>

      {/* Core Privacy Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="formal-card p-4 rounded-xl bg-bg-surface space-y-2 border-t-3 border-t-brand-blue">
          <div className="flex items-center gap-2 text-brand-blue">
            <ServerOff size={16} />
            <h3 className="text-xs font-bold uppercase tracking-wider">Local-First Processing</h3>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            All psychometric scoring and cognitive evaluation algorithms run directly within your browser.
          </p>
        </div>

        <div className="formal-card p-4 rounded-xl bg-bg-surface space-y-2 border-t-3 border-t-brand-teal">
          <div className="flex items-center gap-2 text-brand-teal">
            <EyeOff size={16} />
            <h3 className="text-xs font-bold uppercase tracking-wider">Zero Ad Tracking</h3>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            We do not deploy marketing trackers, surveillance pixels, or commercial data-mining brokers.
          </p>
        </div>

        <div className="formal-card p-4 rounded-xl bg-bg-surface space-y-2 border-t-3 border-t-brand-amber">
          <div className="flex items-center gap-2 text-brand-amber">
            <Lock size={16} />
            <h3 className="text-xs font-bold uppercase tracking-wider">Stateless Shareability</h3>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            Assessment scorecards are encoded into secure URL parameters for easy sharing without centralized database storage.
          </p>
        </div>
      </div>

      {/* Structured Legal Sections */}
      <div className="space-y-6 text-xs sm:text-sm text-text-muted leading-relaxed">
        {/* Section 1 */}
        <section className="formal-card rounded-xl p-5 sm:p-6 bg-bg-surface space-y-3">
          <h2 className="text-base sm:text-lg font-display font-bold text-text-main flex items-center gap-2">
            <span className="text-brand-blue font-mono text-sm">01.</span>
            <span>Commitment to User Privacy</span>
          </h2>
          <p>
            AptiTest (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the Platform&rdquo;) is an educational aptitude and vocational assessment tool. We are fundamentally committed to protecting the privacy of students, educators, parents, and institutions who utilize our services.
          </p>
          <p>
            Our core architecture is built upon a <strong>privacy-by-design</strong> model: we minimize data intake and avoid retaining identifiable records on centralized databases.
          </p>
        </section>

        {/* Section 2 */}
        <section className="formal-card rounded-xl p-5 sm:p-6 bg-bg-surface space-y-3">
          <h2 className="text-base sm:text-lg font-display font-bold text-text-main flex items-center gap-2">
            <span className="text-brand-blue font-mono text-sm">02.</span>
            <span>Information Handled by the Platform</span>
          </h2>
          <p>
            When engaging with AptiTest, the platform processes the following data types:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-text-muted">
            <li>
              <strong className="text-text-main">Optional Name / Nickname:</strong> An optional name or nickname provided solely to personalize your generated scorecard and results card. This name is stored ephemerally in browser session memory and client-side URL parameters—it is never transmitted to or stored on any central server or database.
            </li>
            <li>
              <strong className="text-text-main">Assessment Inputs:</strong> Track selection (Explorer vs. Navigator track), interest swipes (RIASEC preferences), and response selections to timed cognitive challenges.
            </li>
            <li>
              <strong className="text-text-main">Device & Display Preferences:</strong> Local storage flags for theme selection (light or dark mode) to maintain visual consistency.
            </li>
            <li>
              <strong className="text-text-main">Generated Scorecard Payload:</strong> Evaluated archetype metrics, RIASEC sub-scores, and optional display name encoded within the browser URL query string.
            </li>
          </ul>
          <p>
            We do <strong>not</strong> require user accounts, mandatory email addresses, phone numbers, or government identification to take or view assessments.
          </p>
        </section>

        {/* Section 3 */}
        <section className="formal-card rounded-xl p-5 sm:p-6 bg-bg-surface space-y-3">
          <h2 className="text-base sm:text-lg font-display font-bold text-text-main flex items-center gap-2">
            <span className="text-brand-blue font-mono text-sm">03.</span>
            <span>Local Storage & Cookies</span>
          </h2>
          <div className="flex items-start gap-3 p-3.5 rounded-lg bg-bg-subtle border border-border-subtle">
            <Cookie size={18} className="text-brand-blue shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-text-main mb-0.5">Strictly Necessary Storage Only</h4>
              <p className="text-xs text-text-muted leading-relaxed">
                The platform utilizes HTML5 Web Storage (localStorage/sessionStorage) solely for technical operations: preserving your active assessment progress and theme preferences. No third-party marketing cookies are introduced.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="formal-card rounded-xl p-5 sm:p-6 bg-bg-surface space-y-3">
          <h2 className="text-base sm:text-lg font-display font-bold text-text-main flex items-center gap-2">
            <span className="text-brand-blue font-mono text-sm">04.</span>
            <span>Student & Minor Protection</span>
          </h2>
          <p>
            Given that AptiTest serves school-age learners (Ages 8+ for the Explorer track and Ages 14+ for the Navigator track), we maintain heightened safeguards against unauthorized profiling. No personal directory or public search index of student results is maintained.
          </p>
        </section>

        {/* Section 5 */}
        <section className="formal-card rounded-xl p-5 sm:p-6 bg-bg-surface space-y-3">
          <h2 className="text-base sm:text-lg font-display font-bold text-text-main flex items-center gap-2">
            <span className="text-brand-blue font-mono text-sm">05.</span>
            <span>Contact & Governance</span>
          </h2>
          <p>
            For inquiries regarding privacy practices, methodological verification, or academic collaboration:
          </p>
          <div className="p-3.5 rounded-lg bg-bg-subtle border border-border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <UserCheck size={16} className="text-brand-blue" />
              <span className="font-semibold text-text-main">Minhaj Engapuzha (Project Lead)</span>
              <span className="text-text-subtle">• Jamia Millia Islamia</span>
            </div>
            <Link 
              href="/credits" 
              className="text-brand-blue hover:underline font-semibold"
            >
              View Creator Profile →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
