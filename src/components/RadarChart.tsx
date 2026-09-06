"use client";

import React from "react";

// Mapping RIASEC traits to a fixed order for the hexagon
const TRAITS = ["Realistic", "Investigative", "Artistic", "Social", "Enterprising", "Conventional"];

interface RadarChartProps {
  data: { key: string; count: number }[]; // Raw RIASEC scores
}

export default function RadarChart({ data }: RadarChartProps) {
  // Normalize scores to a 0-1 scale (assuming max possible score is 10)
  const MAX_SCORE = 10;
  
  // Create a map for quick lookup
  const scoreMap = data.reduce((acc, curr) => {
    acc[curr.key] = Math.min(curr.count, MAX_SCORE) / MAX_SCORE;
    return acc;
  }, {} as Record<string, number>);

  const size = 200;
  const center = size / 2;
  const radius = (size / 2) - 30; // Leave room for labels

  // Generate points for a 6-sided polygon (hexagon)
  const getPoint = (value: number, index: number) => {
    const angle = (Math.PI * 2 * index) / 6 - Math.PI / 2; // Start at top
    const r = value * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // Build the polygon path for the user's data
  const dataPoints = TRAITS.map((trait, i) => getPoint(scoreMap[trait] || 0.1, i)); // 0.1 minimum so shape doesn't collapse
  const polygonPath = dataPoints.map(p => `${p.x},${p.y}`).join(" ");

  // Build background grid (web)
  const gridLevels = [0.25, 0.5, 0.75, 1];
  
  return (
    <div className="w-full flex flex-col items-center justify-center my-6">
      <h3 className="text-sm font-display tracking-widest text-brand-violet uppercase mb-4">Cognitive Footprint</h3>
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
              strokeWidth="1"
              className="text-text-muted/40" 
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
              className="text-text-muted/40"
            />
          );
        })}

        {/* Draw User Data Polygon */}
        <polygon 
          points={polygonPath} 
          fill="rgba(52, 211, 153, 0.25)" 
          stroke="#34D399" 
          strokeWidth="2.5" 
        />
        
        {/* Draw Dots */}
        {dataPoints.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="4" fill="#06B6D4" /> 
        ))}

        {/* Draw Labels */}
        {TRAITS.map((trait, i) => {
          const labelPoint = getPoint(1.25, i); // Push labels outside
          return (
            <text
              key={i}
              x={labelPoint.x}
              y={labelPoint.y}
              fill="currentColor"
              fontSize="11"
              fontWeight="800"
              textAnchor="middle"
              dominantBaseline="middle"
              className="uppercase tracking-wider font-display text-text-main font-extrabold"
            >
              {trait.slice(0, 3)}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
