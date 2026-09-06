"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useSyncExternalStore, useRef, useState } from "react";
import { motion, useAnimationControls, PanInfo } from "framer-motion";

const emptySubscribe = () => () => {};

type DockPosition = 
  | "top-right" 
  | "top-left" 
  | "mid-right" 
  | "mid-left" 
  | "bottom-right" 
  | "bottom-left";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  
  const isDraggingRef = useRef(false);
  const toggleRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  
  const [dockPos, setDockPos] = useState<DockPosition>("top-right");

  if (!isMounted) return null;

  const handleTap = () => {
    if (isDraggingRef.current) return;
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 120);

    if (!toggleRef.current || !toggleRef.current.parentElement) return;

    const parentRect = toggleRef.current.parentElement.getBoundingClientRect();
    const pointX = info.point.x;
    const pointY = info.point.y;

    const relY = (pointY - parentRect.top) / parentRect.height;
    const isLeft = pointX < parentRect.left + parentRect.width / 2;

    let nextPos: DockPosition = "top-right";

    if (relY < 0.35) {
      nextPos = isLeft ? "top-left" : "top-right";
    } else if (relY > 0.65) {
      nextPos = isLeft ? "bottom-left" : "bottom-right";
    } else {
      nextPos = isLeft ? "mid-left" : "mid-right";
    }

    setDockPos(nextPos);
    
    // Smoothly snap drag offset back to 0 so it aligns perfectly with the CSS border position
    controls.start({ x: 0, y: 0, transition: { type: "spring", stiffness: 400, damping: 28 } });
  };

  const positionClasses: Record<DockPosition, string> = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "mid-right": "top-1/2 -translate-y-1/2 right-4",
    "mid-left": "top-1/2 -translate-y-1/2 left-4",
    "bottom-right": "bottom-6 right-4",
    "bottom-left": "bottom-6 left-4",
  };

  return (
    <motion.div
      ref={toggleRef}
      drag
      dragMomentum={false}
      dragElastic={0.05}
      animate={controls}
      onDragStart={() => {
        isDraggingRef.current = true;
      }}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.15, cursor: "grabbing" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`absolute z-[9999] touch-none select-none cursor-grab transition-all duration-300 ${positionClasses[dockPos]}`}
    >
      <button
        onClick={handleTap}
        className="p-2.5 glass-card rounded-full hover:bg-brand-violet/20 transition-colors shadow-xl border border-white/20 flex items-center justify-center bg-bg-card/90"
        aria-label="Toggle Theme (Dockable to Corners & Sides)"
        title="Drag to snap to any corner or side border • Click to toggle theme"
      >
        <motion.div
          initial={false}
          animate={{ rotate: theme === "dark" ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          {theme === "dark" ? (
            <Sun size={18} className="text-brand-amber" />
          ) : (
            <Moon size={18} className="text-brand-violet" />
          )}
        </motion.div>
      </button>
    </motion.div>
  );
}
