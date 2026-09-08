"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!isMounted) return null;

  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={handleToggle}
      className={`px-3 py-1.5 rounded-lg border border-border-subtle bg-bg-surface hover:bg-bg-subtle text-text-muted hover:text-brand-blue transition-all flex items-center gap-1.5 text-xs font-semibold shadow-xs ${className}`}
      aria-label="Toggle Light and Dark Theme"
      title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {theme === "dark" ? (
        <>
          <Sun size={15} className="text-brand-amber" />
          <span className="hidden sm:inline">Light</span>
        </>
      ) : (
        <>
          <Moon size={15} className="text-brand-blue" />
          <span className="hidden sm:inline">Dark</span>
        </>
      )}
    </button>
  );
}
