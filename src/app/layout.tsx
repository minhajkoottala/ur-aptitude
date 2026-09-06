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
  title: "Aptitude & Archetype Engine",
  description: "Find your cognitive archetype and true strengths.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontOutfit.variable} ${fontJakarta.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col items-center justify-center font-body bg-bg-base overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Main App Container (Floating Card on Desktop, Fullscreen on Mobile) */}
          <div className="w-full h-[100dvh] sm:h-[90dvh] sm:max-h-[850px] sm:max-w-md sm:border sm:border-border-glass sm:rounded-[2.5rem] sm:shadow-2xl sm:overflow-hidden relative bg-bg-dark flex flex-col">
            <ThemeToggle />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
