import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";
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
  title: "Apti Test | Know Your Potential",
  description: "Test your aptitude with scientifically proven evaluation methods.",
  icons: {
    icon: [
      { url: "/icon.png" },
      { url: "/favicon.ico" },
    ],
    apple: "/icon.png",
  },
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
            {/* Header - Kept clean with brand link and theme toggle */}
            <header className="w-full border-b border-border-subtle bg-bg-surface sticky top-0 z-30 shadow-xs">
              <div className="w-full max-w-5xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2.5">
                <a href="/" className="flex items-center gap-2.5 group cursor-pointer">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-border-subtle shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                    <Image
                      src="/logo.png"
                      alt="Apti Test Logo"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display font-bold text-base tracking-tight text-text-main leading-tight">
                      Apti<span className="text-brand-blue">Test</span>
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-text-subtle font-semibold leading-none hidden sm:block">
                      Know Your Potential
                    </span>
                  </div>
                </a>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                </div>
              </div>
            </header>

            {/* Main Content Area */}
            <div className="flex-1 w-full flex flex-col relative">
              {children}
            </div>

            {/* Formal Footer with Legal, Methodology & Credits */}
            <footer className="w-full border-t border-border-subtle bg-bg-surface py-8 mt-auto print:hidden">
              <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-6 border-b border-border-subtle text-xs">
                  {/* Column 1: Brand & Purpose */}
                  <div className="md:col-span-2 space-y-2.5">
                    <a href="/" className="flex items-center gap-2 group">
                      <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0">
                        <Image src="/logo.png" alt="Apti Test" fill className="object-contain" />
                      </div>
                      <span className="font-display font-bold text-sm text-text-main">
                        Apti<span className="text-brand-blue">Test</span>
                      </span>
                    </a>
                    <p className="text-xs text-text-muted leading-relaxed max-w-md">
                      Standardized cognitive aptitude evaluation and Holland RIASEC vocational profiling platform engineered to empower school and college students in identifying their natural academic streams and career pathways.
                    </p>
                    <div className="pt-1">
                      <a 
                        href="/credits" 
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-bg-subtle hover:bg-brand-blue-light/50 border border-border-subtle text-[11px] font-semibold text-text-muted hover:text-brand-blue transition-colors"
                      >
                        <span>Created by <strong>Minhaj Engapuzha and team</strong></span>
                        <span className="text-brand-blue">→</span>
                      </a>
                    </div>
                  </div>

                  {/* Column 2: Legal & Governance */}
                  <div className="space-y-2">
                    <span className="font-bold uppercase tracking-wider text-[11px] text-text-main block">
                      Legal & Policies
                    </span>
                    <ul className="space-y-1.5 text-text-muted">
                      <li>
                        <a href="/privacy" className="hover:text-brand-blue transition-colors">
                          Privacy Policy
                        </a>
                      </li>
                      <li>
                        <a href="/terms" className="hover:text-brand-blue transition-colors">
                          Terms of Service
                        </a>
                      </li>
                      <li>
                        <a href="/disclaimer" className="hover:text-brand-blue transition-colors">
                          Methodology & Disclaimer
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Column 3: Platform & Credits */}
                  <div className="space-y-2">
                    <span className="font-bold uppercase tracking-wider text-[11px] text-text-main block">
                      Institutional & Credits
                    </span>
                    <ul className="space-y-1.5 text-text-muted">
                      <li>
                        <a href="/credits" className="hover:text-brand-blue transition-colors font-medium">
                          Creator Profile & Vision
                        </a>
                      </li>
                      <li>
                        <a href="/credits#methodology" className="hover:text-brand-blue transition-colors">
                          RIASEC Theoretical Model
                        </a>
                      </li>
                      <li>
                        <a href="/" className="hover:text-brand-blue transition-colors">
                          Take Assessment
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between text-[11.5px] text-text-subtle gap-2">
                  <div>
                    © {new Date().getFullYear()} AptiTest • Know Your Potential. All rights reserved.
                  </div>
                  <div className="flex items-center gap-3">
                    <a href="/privacy" className="hover:text-text-muted transition-colors">Privacy</a>
                    <span>•</span>
                    <a href="/terms" className="hover:text-text-muted transition-colors">Terms</a>
                    <span>•</span>
                    <a href="/disclaimer" className="hover:text-text-muted transition-colors">Disclaimer</a>
                    <span>•</span>
                    <a href="/credits" className="hover:text-text-muted transition-colors font-medium">Credits</a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
