"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface GaugeChartProps {
  value: number; // 0 to 100
  label?: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function GaugeChart({ value, label, size = 120, strokeWidth = 12, className = "" }: GaugeChartProps) {
  const [offset, setOffset] = useState(0);
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI; // semi-circle
  
  useEffect(() => {
    // value is percentage. offset for dasharray
    const progress = value / 100;
    setTimeout(() => setOffset(circumference - progress * circumference), 0);
  }, [value, circumference]);

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`} style={{ width: size, height: size / 2 + 20 }}>
      <svg width={size} height={size / 2} className="overflow-visible">
        {/* Background arc */}
        <path
          d={`M ${strokeWidth/2} ${size/2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth/2} ${size/2}`}
          fill="none"
          stroke="var(--bg-input)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Progress arc */}
        <motion.path
          d={`M ${strokeWidth/2} ${size/2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth/2} ${size/2}`}
          fill="none"
          stroke="var(--accent-gold)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute bottom-0 text-center flex flex-col items-center">
        <span className="text-h2 leading-none">{value}%</span>
        {label && <span className="text-caption text-text-muted">{label}</span>}
      </div>
    </div>
  );
}
