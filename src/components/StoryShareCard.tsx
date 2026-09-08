"use client";

import React, { forwardRef } from "react";
import { LucideIcon, Briefcase, GraduationCap, CheckCircle2 } from "lucide-react";

interface StoryShareCardProps {
  archetype: {
    id: string;
    traits: string[];
    primaryAptitude?: string;
    recommendedStream?: {
      category: string;
      stream: string;
      why: string;
      electives?: string[];
    };
    broadCareers?: Array<string | { title: string; description: string; degrees: string; exams: string }>;
    coreSkills?: string[];
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
    // Mini Radar Chart for the 9:16 formal card (360x640px)
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

    const streamCategory = archetype.recommendedStream?.category || "Commerce";
    const topCareer = archetype.broadCareers?.[0];
    const topCareerTitle = typeof topCareer === "object" ? topCareer.title : topCareer;

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
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#1A73E8] flex items-center justify-center text-white text-xs font-bold">
              ✦
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-tight text-slate-900 block leading-tight">
                Aptitude<span className="text-[#1A73E8]">Engine</span>
              </span>
              <span className="text-[8px] text-slate-500 uppercase tracking-wider block">
                Standard Assessment Report
              </span>
            </div>
          </div>
          <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-[#1A73E8] border border-blue-100">
            {isExplorer ? "Explorer (Ages 8-13)" : "Navigator (14+)"}
          </span>
        </div>

        {/* Profile Card Header */}
        <div className="text-center mt-1">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1A73E8] mx-auto mb-2 shadow-xs">
            <BadgeIcon size={24} className="text-[#1A73E8]" />
          </div>

          <span className="text-[9px] font-bold uppercase tracking-widest text-[#1A73E8] block mb-0.5">
            Verified Cognitive Profile
          </span>

          <h1 className="text-[19px] font-bold text-slate-900 leading-tight mb-1 tracking-tight">
            {viewData.title}
          </h1>

          <p className="text-[10px] text-slate-600 font-medium leading-snug italic px-4 line-clamp-2">
            &ldquo;{viewData.tagline}&rdquo;
          </p>
        </div>

        {/* +2 Stream Fit Banner */}
        {archetype.recommendedStream && (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 mx-1">
            <div className="flex items-center justify-between text-[9px] font-bold uppercase text-slate-500 mb-1">
              <span>+2 Stream Fit</span>
              <span className="text-[#1A73E8] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                {streamCategory}
              </span>
            </div>
            <div className="text-[11px] font-bold text-slate-900 leading-snug">
              {archetype.recommendedStream.stream}
            </div>
          </div>
        )}

        {/* Mini RIASEC Radar */}
        <div className="flex flex-col items-center my-0.5">
          <svg width={size} height={size} className="overflow-visible">
            {gridLevels.map((level, i) => {
              const points = TRAITS.map((_, j) => getPoint(level, j));
              const path = points.map((p) => `${p.x},${p.y}`).join(" ");
              return (
                <polygon
                  key={i}
                  points={path}
                  fill="none"
                  stroke="#E2E8F0"
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
                  stroke="#E2E8F0"
                  strokeWidth="1"
                />
              );
            })}

            <polygon
              points={polygonPath}
              fill="rgba(26, 115, 232, 0.18)"
              stroke="#1A73E8"
              strokeWidth="1.75"
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
                  fill="#64748B"
                  fontSize="7.5"
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

        {/* Career & Skills Summary */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 mx-1 space-y-1.5">
          {topCareerTitle && (
            <div className="flex items-center justify-between text-[10px] pb-1 border-b border-slate-200">
              <span className="text-slate-500 font-semibold flex items-center gap-1">
                <Briefcase size={11} className="text-[#1A73E8]" />
                <span>Primary Pathway:</span>
              </span>
              <span className="text-slate-900 font-bold truncate max-w-[170px]">{topCareerTitle}</span>
            </div>
          )}

          <div className="space-y-1">
            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider block">
              Core Competencies:
            </span>
            <div className="grid grid-cols-2 gap-1 text-[9.5px]">
              {(archetype.coreSkills || viewData.superpowers).slice(0, 4).map((skill, idx) => (
                <div key={idx} className="flex items-center gap-1 text-slate-700 truncate">
                  <CheckCircle2 size={10} className="text-[#1A73E8] shrink-0" />
                  <span className="truncate">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-400">
          <span>Official Evaluation Summary</span>
          <span className="font-semibold text-slate-600">aptitude.app</span>
        </div>
      </div>
    );
  }
);

StoryShareCard.displayName = "StoryShareCard";
