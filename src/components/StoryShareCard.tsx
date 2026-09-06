"use client";

import React, { forwardRef } from "react";
import { Sparkles, LucideIcon, Zap, Target } from "lucide-react";

interface StoryShareCardProps {
  archetype: {
    id: string;
    traits: string[];
    primaryAptitude?: string;
  };
  viewData: {
    title: string;
    tagline: string;
    superpowers: string[];
    strategicFields?: string[];
    funQuests?: string[];
    streamFit?: string;
  };
  BadgeIcon: LucideIcon;
  rScores: { key: string; count: number }[];
  isExplorer: boolean;
}

const TRAITS = ["Realistic", "Investigative", "Artistic", "Social", "Enterprising", "Conventional"];

export const StoryShareCard = forwardRef<HTMLDivElement, StoryShareCardProps>(
  ({ archetype, viewData, BadgeIcon, rScores, isExplorer }, ref) => {
    // Mini Radar Chart for the 9:16 card (360x640px)
    const MAX_SCORE = 10;
    const scoreMap = (rScores || []).reduce((acc, curr) => {
      acc[curr.key] = Math.min(curr.count, MAX_SCORE) / MAX_SCORE;
      return acc;
    }, {} as Record<string, number>);

    const size = 154;
    const center = size / 2;
    const radius = size / 2 - 24;

    const getPoint = (value: number, index: number) => {
      const angle = (Math.PI * 2 * index) / 6 - Math.PI / 2;
      const r = value * radius;
      return {
        x: center + r * Math.cos(angle),
        y: center + r * Math.sin(angle),
      };
    };

    const dataPoints = TRAITS.map((trait, i) => getPoint(Math.max(scoreMap[trait] || 0.2, 0.15), i));
    const polygonPath = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");
    const gridLevels = [0.33, 0.66, 1];

    return (
      <div
        ref={ref}
        style={{
          width: "360px",
          height: "640px",
          backgroundColor: "#07090E",
          fontFamily: "var(--font-outfit), system-ui, -apple-system, sans-serif",
        }}
        className="relative text-white flex flex-col justify-between p-4 sm:p-5 overflow-hidden select-none box-border"
      >
        {/* Ambient Glowing Gradient Orbs */}
        <div 
          className="absolute -top-12 -left-12 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(124, 58, 237, 0.45) 0%, rgba(124, 58, 237, 0) 70%)" }}
        />
        <div 
          className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(244, 114, 182, 0.35) 0%, rgba(244, 114, 182, 0) 70%)" }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, rgba(6, 182, 212, 0) 70%)" }}
        />

        {/* Subtle decorative border outline */}
        <div className="absolute inset-2 rounded-2xl border border-white/10 pointer-events-none" />

        {/* 1. Header Bar */}
        <div className="relative z-10 flex items-center justify-between pt-1 px-1">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center">
              <Sparkles size={11} className="text-white" />
            </div>
            <span className="text-[11px] font-black tracking-widest text-white uppercase">
              APTITUDE ENGINE
            </span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/[0.12] border border-white/20 text-[9px] font-black text-slate-100 tracking-wider uppercase">
            <span>{isExplorer ? "Explorer" : "Navigator"}</span>
            <span className="text-purple-300 font-black">9:16</span>
          </div>
        </div>

        {/* 2. Archetype Hero Block */}
        <div className="relative z-10 flex flex-col items-center text-center mt-2">
          {/* Badge Icon */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600/30 to-pink-600/20 border border-purple-400/40 flex items-center justify-center text-white mb-2 shadow-[0_0_24px_rgba(124,58,237,0.35)]">
            <BadgeIcon size={28} className="text-purple-300" />
          </div>

          <div className="flex items-center gap-1 text-[9px] font-black tracking-widest text-pink-400 uppercase mb-1">
            <Zap size={10} className="text-pink-400" />
            <span>Cognitive Archetype</span>
          </div>

          <h1 className="text-[22px] font-black text-white leading-tight mb-1.5 tracking-tight px-2">
            {viewData.title}
          </h1>

          <p className="text-[11px] text-cyan-300 italic font-semibold leading-snug px-4 line-clamp-2">
            &ldquo;{viewData.tagline}&rdquo;
          </p>

          {/* Primary Aptitude Pill */}
          {archetype.primaryAptitude && (
            <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/40 text-[9px] font-black text-purple-200">
              <Target size={10} className="text-purple-300" />
              <span>{archetype.primaryAptitude} Aptitude</span>
            </div>
          )}
        </div>

        {/* 3. Radar Chart (RIASEC) */}
        <div className="relative z-10 flex flex-col items-center my-auto py-1">
          <svg width={size} height={size} className="overflow-visible">
            {/* Background Grid Rings */}
            {gridLevels.map((level, i) => {
              const points = TRAITS.map((_, j) => getPoint(level, j));
              const path = points.map((p) => `${p.x},${p.y}`).join(" ");
              return (
                <polygon
                  key={i}
                  points={path}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="1"
                />
              );
            })}

            {/* Spokes / Axes */}
            {TRAITS.map((_, i) => {
              const outerPoint = getPoint(1, i);
              return (
                <line
                  key={i}
                  x1={center}
                  y1={center}
                  x2={outerPoint.x}
                  y2={outerPoint.y}
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="1"
                />
              );
            })}

            {/* Radar Filled Shape */}
            <polygon
              points={polygonPath}
              fill="rgba(52, 211, 153, 0.35)"
              stroke="#34D399"
              strokeWidth="2.5"
            />

            {/* Radar Data Vertex Dots */}
            {dataPoints.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#38BDF8" stroke="#ffffff" strokeWidth="1.5" />
            ))}

            {/* RIASEC Labels */}
            {TRAITS.map((trait, i) => {
              const labelPoint = getPoint(1.3, i);
              return (
                <text
                  key={i}
                  x={labelPoint.x}
                  y={labelPoint.y}
                  fill="#E2E8F0"
                  fontSize="9"
                  fontWeight="900"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="uppercase tracking-widest"
                >
                  {trait.slice(0, 3)}
                </text>
              );
            })}
          </svg>
        </div>

        {/* 4. Superpowers Summary */}
        <div className="relative z-10 bg-white/[0.07] border border-white/15 rounded-xl p-3 mx-1">
          <div className="text-[9px] font-black text-pink-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
            <Sparkles size={11} className="text-pink-400" />
            <span>Core Superpowers</span>
          </div>
          <div className="space-y-1">
            {viewData.superpowers.slice(0, 3).map((sp, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-100">
                <span className="text-pink-400 text-[10px] font-extrabold">✦</span>
                <span className="font-bold leading-tight truncate">{sp}</span>
              </div>
            ))}
          </div>

          {/* Optional Stream Fit / Quest preview */}
          {viewData.streamFit ? (
            <div className="mt-2 pt-1.5 border-t border-white/15 flex items-center justify-between text-[9px] gap-2">
              <span className="text-slate-300 uppercase font-bold shrink-0">Stream Fit</span>
              <span className="text-emerald-400 font-extrabold text-right truncate flex-1">{viewData.streamFit}</span>
            </div>
          ) : viewData.funQuests?.[0] ? (
            <div className="mt-2 pt-1.5 border-t border-white/15 flex items-center justify-between text-[9px] gap-2">
              <span className="text-slate-300 uppercase font-bold shrink-0">Top Quest</span>
              <span className="text-cyan-300 font-semibold text-right truncate flex-1">{viewData.funQuests[0]}</span>
            </div>
          ) : null}
        </div>

        {/* 5. Watermark & Branding Footer */}
        <div className="relative z-10 pt-2 px-1 border-t border-white/15 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[8px] font-black uppercase tracking-widest text-slate-300">
              Discover your archetype
            </span>
            <span className="text-[11px] font-black text-white tracking-wide">
              aptitude.app
            </span>
          </div>
          <div className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-[9px] font-black text-white shadow-md">
            #MyArchetype
          </div>
        </div>
      </div>
    );
  }
);

StoryShareCard.displayName = "StoryShareCard";
