"use client";

import React, { forwardRef } from "react";
import { LucideIcon, CheckCircle2, Sparkles, GraduationCap } from "lucide-react";

interface StoryShareCardProps {
  archetype: any;
  viewData: any;
  BadgeIcon: LucideIcon;
  rScores?: { key: string; count: number }[];
  isExplorer: boolean;
}

const TRAITS = ["Realistic", "Investigative", "Artistic", "Social", "Enterprising", "Conventional"];

export const StoryShareCard = forwardRef<HTMLDivElement, StoryShareCardProps>(
  ({ archetype, viewData, BadgeIcon, rScores, isExplorer }, ref) => {
    // Radar Chart Calculations
    const MAX_SCORE = 10;
    const scoreMap = (rScores || []).reduce((acc, curr) => {
      acc[curr.key] = Math.min(curr.count, MAX_SCORE) / MAX_SCORE;
      return acc;
    }, {} as Record<string, number>);

    const size = 130;
    const center = size / 2;
    const radius = size / 2 - 20;

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
          backgroundColor: "#FFFFFF",
          fontFamily: "var(--font-outfit), system-ui, -apple-system, sans-serif",
          color: "#0F172A",
        }}
        className="relative flex flex-col justify-between p-5 overflow-hidden select-none box-border border border-slate-200"
      >
        {/* Top Header Banner */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <img 
              src="/logo.png" 
              alt="Apti Test" 
              className="w-6 h-6 rounded-full object-contain border border-slate-200 shrink-0" 
            />
            <div>
              <span className="text-[13px] font-bold tracking-tight text-slate-900 block leading-tight">
                Apti<span className="text-[#1A73E8]">Test</span>
              </span>
              <span className="text-[9px] text-slate-500 uppercase tracking-wider block font-semibold">
                Know Your Potential
              </span>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-[#1A73E8] border border-blue-100 shrink-0">
            {isExplorer ? "Explorer (Ages 8-13)" : "Navigator (14+)"}
          </span>
        </div>

        {/* Profile Card Header */}
        <div className="text-center space-y-1 my-0.5">
          <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1A73E8] mx-auto shadow-xs">
            <BadgeIcon size={24} className="text-[#1A73E8]" />
          </div>

          <span className="text-[9.5px] font-bold uppercase tracking-widest text-[#1A73E8] block">
            Your Mind Archetype
          </span>

          <h1 className="text-[20px] font-bold text-slate-900 leading-tight tracking-tight">
            {viewData?.title}
          </h1>

          <p className="text-[11px] text-slate-600 font-medium leading-snug italic px-2 line-clamp-2">
            &ldquo;{viewData?.tagline}&rdquo;
          </p>
        </div>

        {/* Practical Strength Summary */}
        {archetype?.practicalStrength && (
          <div className="bg-slate-50 border border-slate-200/90 rounded-lg p-2.5 space-y-1 text-left">
            <div className="flex items-center gap-1 text-[9.5px] font-bold uppercase tracking-wider text-[#1A73E8]">
              <Sparkles size={12} />
              <span>Your Practical Strength</span>
            </div>
            <p className="text-[11px] text-slate-700 leading-normal line-clamp-3 font-normal">
              {archetype.practicalStrength}
            </p>
          </div>
        )}

        {/* Mini Radar Chart */}
        <div className="flex flex-col items-center my-1">
          <svg width={size} height={size} className="overflow-visible">
            {gridLevels.map((level, i) => {
              const points = TRAITS.map((_, j) => getPoint(level, j));
              const path = points.map((p) => `${p.x},${p.y}`).join(" ");
              return (
                <polygon
                  key={i}
                  points={path}
                  fill="none"
                  stroke="#CBD5E1"
                  strokeWidth="1"
                />
              );
            })}

            {TRAITS.map((_, i) => {
              const outerPoint = getPoint(1, i);
              return (
                <line
                  key={i}
                  x1={center}
                  y1={center}
                  x2={outerPoint.x}
                  y2={outerPoint.y}
                  stroke="#CBD5E1"
                  strokeWidth="1"
                />
              );
            })}

            <polygon
              points={polygonPath}
              fill="rgba(26, 115, 232, 0.20)"
              stroke="#1A73E8"
              strokeWidth="2"
            />

            {dataPoints.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="2.5" fill="#1A73E8" />
            ))}

            {TRAITS.map((trait, i) => {
              const labelPoint = getPoint(1.28, i);
              return (
                <text
                  key={i}
                  x={labelPoint.x}
                  y={labelPoint.y}
                  fill="#475569"
                  fontSize="8.5"
                  fontWeight="700"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="uppercase tracking-wider"
                >
                  {trait.slice(0, 3)}
                </text>
              );
            })}
          </svg>
        </div>

        {/* Roadmap / Strengths Summary */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-lg p-2.5 space-y-1.5 text-left">
          {!isExplorer && viewData?.simpleStream && (
            <div className="flex items-center justify-between pb-1 border-b border-slate-200">
              <span className="text-[9.5px] font-bold uppercase text-slate-500 flex items-center gap-1">
                <GraduationCap size={12} className="text-[#1A73E8]" />
                <span>Optimal +2 Stream</span>
              </span>
              <span className="text-[10px] font-bold text-[#1A73E8] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                {viewData.simpleStream} Stream
              </span>
            </div>
          )}

          <div className="space-y-1">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">
              Core Strengths:
            </span>
            <div className="grid grid-cols-1 gap-1 text-[10.5px]">
              {(viewData?.superpowers || []).map((power: string, idx: number) => (
                <div key={idx} className="flex items-center gap-1.5 text-slate-800 font-medium truncate">
                  <CheckCircle2 size={12} className="text-[#1A73E8] shrink-0" />
                  <span className="truncate">{power}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
          <span className="font-medium">Apti Test Result</span>
          <span className="font-bold text-slate-700">ur.aptitude.vercel.app</span>
        </div>
      </div>
    );
  }
);

StoryShareCard.displayName = "StoryShareCard";
