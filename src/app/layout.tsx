import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";

const fontOutfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const fontJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aptitude & Career Assessment Engine | Cognitive Profiling",
  description: "Comprehensive cognitive aptitude profiling and higher secondary (+2) stream recommendations for Indian students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontOutfit.variable} ${fontJakarta.variable} h-full w-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen w-full flex flex-col font-body bg-bg-base text-text-main overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="w-full min-h-screen flex flex-col relative bg-bg-base">
            {/* Formal Google-Style Header */}
            <header className="w-full border-b border-border-subtle bg-bg-surface sticky top-0 z-30 shadow-xs">
              <div className="w-full max-w-5xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-blue flex items-center justify-center text-white text-sm font-bold shadow-xs">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="m4.93 4.93 4.24 4.24"/>
                      <path d="m14.83 9.17 4.24-4.24"/>
                      <path d="m14.83 14.83 4.24 4.24"/>
                      <path d="m9.17 14.83-4.24 4.24"/>
                      <circle cx="12" cy="12" r="4"/>
                    </svg>
                  </div>
                  <div>
                    <span className="font-display font-bold text-base sm:text-lg tracking-tight text-text-main">
                      Aptitude<span className="text-brand-blue">Engine</span>
                    </span>
                    <span className="hidden md:inline-block ml-2 px-2 py-0.5 rounded text-[11px] font-medium bg-brand-blue-light text-brand-blue border border-brand-blue/20">
                      Standard Evaluation
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                </div>
              </div>
            </header>

            {/* Main Application Container */}
            <div className="flex-1 w-full flex flex-col relative">
              {children}
            </div>

            {/* Formal Institutional Footer */}
            <footer className="w-full border-t border-border-subtle bg-bg-surface py-4 mt-auto">
              <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-text-muted gap-2">
                <span>© {new Date().getFullYear()} Cognitive Aptitude & Stream Evaluation Platform</span>
                <span className="text-text-subtle">Designed for Secondary & Higher Secondary Students</span>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
