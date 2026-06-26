"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Home, ArrowRight, Star } from "lucide-react";
import { createPortal } from "react-dom";

export interface CelebrationScreenProps {
  mode: "donor" | "shopkeeper" | "volunteer";
  title: string;
  subtitle: string;
  points?: number;
  onDone: () => void;
  ctaLabel?: string;
  secondaryCtaLabel?: string;
  onSecondaryAction?: () => void;
}

// â”€â”€ Donor Animation (Heart/Life Saving) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const DonorAnimation = () => (
  <div className="relative w-56 h-56 flex items-center justify-center">
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      className="absolute w-48 h-48 bg-[#9BC84A] rounded-full blur-2xl"
    />
    <motion.div
      initial={{ scale: 0, rotate: -15 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="relative z-10 w-28 h-28 bg-[#5A8C2A] rounded-3xl border-[6px] border-white shadow-2xl flex items-center justify-center"
    >
      <motion.svg width="64" height="64" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </motion.svg>
    </motion.div>
    
    {/* Floating Plus Signs (Coding instead of emojis) */}
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-6 h-6 flex items-center justify-center"
        initial={{ opacity: 0, y: 0, x: 0, scale: 0 }}
        animate={{ 
          opacity: [0, 1, 0], 
          y: [-20, -100], 
          x: (i - 1.5) * 40,
          scale: [0.5, 1.2, 0.8]
        }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" stroke="white" strokeWidth="4" strokeLinecap="round">
          <path d="M12 4v16M4 12h16" />
        </svg>
      </motion.div>
    ))}
  </div>
);

// â”€â”€ Shopkeeper Animation (Shop Building) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const ShopkeeperAnimation = () => (
  <div className="relative w-64 h-64 flex items-center justify-center">
    <motion.div
      animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="absolute w-56 h-56 bg-[#5B8DB8] rounded-full blur-2xl"
    />
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className="relative z-10 flex flex-col items-center"
    >
      {/* Awning */}
      <div className="flex z-20 overflow-hidden rounded-t-[16px] shadow-md border-[4px] border-white/20 pb-1">
         {[...Array(6)].map((_, i) => (
           <motion.div 
             key={i} 
             className="w-8 h-10 rounded-b-full bg-white relative -mt-4 shadow-sm"
             style={{ background: i % 2 === 0 ? "#F2D15A" : "#FFFFFF" }}
             initial={{ y: -20 }}
             animate={{ y: 0 }}
             transition={{ type: "spring", delay: 0.3 + i * 0.05 }}
           />
         ))}
      </div>
      {/* Storefront Window */}
      <motion.div 
        className="w-40 h-28 bg-[#1A1A1A] rounded-b-[20px] border-[6px] border-white p-3 flex gap-3 shadow-2xl relative -mt-2 z-10"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        style={{ originY: 0 }}
        transition={{ type: "spring", delay: 0.2 }}
      >
        <div className="flex-1 bg-[#4A90D9]/40 rounded-lg flex items-center justify-center overflow-hidden border border-white/10">
           <motion.div 
             className="w-8 h-8 bg-[#9BC84A] rounded-md shadow-inner"
             animate={{ rotate: [0, 10, -10, 0] }}
             transition={{ duration: 2.5, repeat: Infinity }}
           />
        </div>
        <div className="flex-1 bg-[#4A90D9]/40 rounded-lg flex items-center justify-center overflow-hidden border border-white/10">
           <motion.div 
             className="w-8 h-8 bg-[#F2D15A] rounded-full shadow-inner"
             animate={{ scale: [1, 1.1, 1] }}
             transition={{ duration: 2, repeat: Infinity }}
           />
        </div>
      </motion.div>
      
      {/* Signboard */}
      <motion.div 
        className="absolute -top-6 bg-white text-[#1A1A1A] px-5 py-1.5 rounded-full font-black text-sm shadow-[0_4px_16px_rgba(0,0,0,0.2)] z-30 tracking-wider"
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", delay: 0.8, stiffness: 300 }}
      >
        OPEN
      </motion.div>
    </motion.div>
  </div>
);

// â”€â”€ Volunteer Animation (Delivery / Happy) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const VolunteerAnimation = () => (
  <div className="relative w-56 h-56 flex items-center justify-center">
    <motion.div
      animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="absolute w-48 h-48 bg-[#F2D15A] rounded-full blur-2xl"
    />
    
    <motion.div
      initial={{ x: -120, rotate: -15, opacity: 0 }}
      animate={{ x: 0, rotate: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
      className="relative z-10"
    >
      <div className="w-28 h-28 bg-[#D4AF37] rounded-[24px] border-[6px] border-white shadow-[0_16px_32px_rgba(212,175,55,0.4)] relative flex items-center justify-center overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-1/2 border-b-[6px] border-white/20 bg-[#E5C253]" />
         {/* Checkmark inside box */}
         <motion.svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
           initial={{ pathLength: 0 }}
           animate={{ pathLength: 1 }}
           transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
           className="relative z-10 mt-2"
         >
            <polyline points="20 6 9 17 4 12" />
         </motion.svg>
      </div>
    </motion.div>
    
    {/* Speed lines */}
    {[...Array(4)].map((_, i) => (
       <motion.div
         key={i}
         className="absolute h-2 bg-white rounded-full z-0"
         style={{ width: 30 + i * 15, left: 10, top: 70 + i * 25 }}
         animate={{ x: [-80, 140], opacity: [0, 1, 0] }}
         transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: "linear" }}
       />
    ))}
  </div>
);

// â”€â”€ Role Configs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const CONFIGS = {
  donor: {
    bg: "linear-gradient(145deg, #6B9E2B 0%, #3A6915 100%)",
    accentColor: "#5A8C2A",
    Component: DonorAnimation
  },
  shopkeeper: {
    bg: "linear-gradient(145deg, #4A90D9 0%, #1D436A 100%)",
    accentColor: "#2C5F8E",
    Component: ShopkeeperAnimation
  },
  volunteer: {
    bg: "linear-gradient(145deg, #F2D15A 0%, #A6861E 100%)",
    accentColor: "#B8920F",
    Component: VolunteerAnimation
  },
} as const;

// â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function CelebrationScreen({
  mode,
  title,
  subtitle,
  points = 10,
  onDone,
  ctaLabel = "Back to Home",
  secondaryCtaLabel,
  onSecondaryAction
}: CelebrationScreenProps) {
  const cfg = CONFIGS[mode];
  const [progress, setProgress] = useState(100);
  const [mounted, setMounted] = useState(false);
  const springBouncy = { type: "spring", stiffness: 300, damping: 20 };

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  // 8-second countdown
  useEffect(() => {
    const start = Date.now();
    const duration = 8000;
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(pct);
      if (pct > 0) requestAnimationFrame(tick);
      else onDone();
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  const AnimationComponent = cfg.Component;

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[300] flex flex-col overflow-hidden"
      style={{ background: cfg.bg }}
    >
      {/* Flash burst on mount */}
      <motion.div
        className="absolute inset-0 bg-white pointer-events-none z-50"
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />

      <div className="flex-1 flex flex-col items-center justify-center gap-10 px-6 text-center relative z-10">

        {/* High Fidelity Coded Animation */}
        <AnimationComponent />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.4 }}
          className="flex flex-col items-center gap-3"
        >
          <h1 className="font-heading font-black text-[40px] leading-[1.1] text-white drop-shadow-md">
            {title}
          </h1>
          <p className="font-body text-[16px] text-white/90 max-w-[280px] leading-relaxed font-medium">
            {subtitle}
          </p>

          {/* Points badge */}
          {points > 0 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 450, damping: 18, delay: 0.65 }}
              className="flex items-center gap-2 px-6 py-3 mt-2 rounded-full border-2 border-white/40 shadow-lg"
              style={{ background: "rgba(255,255,255,0.2)" }}
            >
              <Star size={20} className="fill-[#F2D15A] text-[#F2D15A] drop-shadow-sm" />
              <span className="font-heading font-black text-[17px] text-white tracking-wide">
                +{points} Points Earned!
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Progress bar */}
        <div className="w-48 h-2 rounded-full overflow-hidden mt-4" style={{ background: "rgba(255,255,255,0.25)" }}>
          <div
            className="h-full rounded-full bg-white transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 24, delay: 0.7 }}
        className="px-6 pb-12 pt-4 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, ...springBouncy }}
          className="mt-6 flex flex-col gap-3"
        >
          {secondaryCtaLabel && onSecondaryAction && (
            <button
              onClick={onSecondaryAction}
              className={`w-full py-3.5 rounded-full font-heading font-bold text-[17px] border-2 transition-transform active:scale-95 ${
                mode === "donor"
                  ? "border-[#9BC84A] text-[#9BC84A] hover:bg-[#9BC84A]/10"
                  : mode === "shopkeeper"
                  ? "border-[#F2D15A] text-[#F2D15A] hover:bg-[#F2D15A]/10"
                  : "border-[#4A90D9] text-[#4A90D9] hover:bg-[#4A90D9]/10"
              }`}
            >
              {secondaryCtaLabel}
            </button>
          )}
          
          <button
            onClick={onDone}
            className={`w-full py-4 rounded-full font-heading font-bold text-[17px] flex items-center justify-center gap-2 transition-transform active:scale-95 ${
              mode === "donor" 
                ? "bg-white text-[#5A8C2A] shadow-[0_0_30px_rgba(255,255,255,0.4)]" 
                : mode === "shopkeeper"
                ? "bg-white text-[#D4AF37] shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                : "bg-white text-[#2C5F8E] shadow-[0_0_30px_rgba(255,255,255,0.4)]"
            }`}
          >
            {ctaLabel} <ArrowRight size={20} />
          </button>
        </motion.div>
      </motion.div>
    </div>,
    document.body
  );
}
