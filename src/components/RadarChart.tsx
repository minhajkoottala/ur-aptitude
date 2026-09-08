"use client";

import React from "react";

// Mapping RIASEC traits to a fixed order for the hexagon
const TRAITS = ["Realistic", "Investigative", "Artistic", "Social", "Enterprising", "Conventional"];

interface RadarChartProps {
  data: { key: string; count: number }[];
}

export default function RadarChart({ data }: RadarChartProps) {
  const MAX_SCORE = 10;
  
  const scoreMap = data.reduce((acc, curr) => {
    acc[curr.key] = Math.min(curr.count, MAX_SCORE) / MAX_SCORE;
    return acc;
  }, {} as Record<string, number>);

  const size = 240;
  const center = size / 2;
  const radius = (size / 2) - 38;

  const getPoint = (value: number, index: number) => {
    const angle = (Math.PI * 2 * index) / 6 - Math.PI / 2;
    const r = value * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const dataPoints = TRAITS.map((trait, i) => getPoint(Math.max(scoreMap[trait] || 0.15, 0.12), i));
  const polygonPath = dataPoints.map(p => `${p.x},${p.y}`).join(" ");
  const gridLevels = [0.25, 0.5, 0.75, 1];
  
  return (
    <div className="w-full flex flex-col items-center justify-center my-2">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-brand-blue" />
        <h3 className="text-xs font-display tracking-wider text-text-main uppercase font-bold">
          RIASEC Trait Orientation Profile
        </h3>
      </div>

      <svg width={size} height={size} className="overflow-visible">
        {/* Draw Web Grid */}
        {gridLevels.map((level, i) => {
          const points = TRAITS.map((_, j) => getPoint(level, j));
          const path = points.map(p => `${p.x},${p.y}`).join(" ");
          return (
            <polygon 
              key={i} 
              points={path} 
              fill="none" 
              stroke="currentColor" 
              strokeWidth={i === gridLevels.length - 1 ? "1.5" : "1"}
              strokeDasharray={i < gridLevels.length - 1 ? "3 3" : undefined}
              className="text-border-subtle" 
            />
          );
        })}

        {/* Draw Axes */}
        {TRAITS.map((_, i) => {
          const outerPoint = getPoint(1, i);
          return (
            <line 
              key={i} 
              x1={center} 
              y1={center} 
              x2={outerPoint.x} 
              y2={outerPoint.y} 
              stroke="currentColor" 
              strokeWidth="1" 
              className="text-border-subtle"
            />
          );
        })}

        {/* Draw User Data Polygon */}
        <polygon 
          points={polygonPath} 
          fill="rgba(26, 115, 232, 0.22)" 
          stroke="#1A73E8" 
          strokeWidth="2" 
        />
        
        {/* Draw Dots */}
        {dataPoints.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4" fill="#1A73E8" />
            <circle cx={p.x} cy={p.y} r="2" fill="#FFFFFF" />
          </g>
        ))}

        {/* Draw Labels */}
        {TRAITS.map((trait, i) => {
          const labelPoint = getPoint(1.24, i);
          return (
            <text
              key={i}
              x={labelPoint.x}
              y={labelPoint.y}
              fill="currentColor"
              fontSize="9.5"
              fontWeight="700"
              textAnchor="middle"
              dominantBaseline="middle"
              className="uppercase tracking-wider font-display text-text-muted"
            >
              {trait.slice(0, 3)}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
