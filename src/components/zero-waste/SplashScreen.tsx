"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";

export function SplashScreen() {
  const setScreen = useAppStore((s) => s.setScreen);
  const onboarded = useAppStore((s) => s.onboarded);

  useEffect(() => {
    // Total duration 2000ms before navigating
    const timer = setTimeout(() => {
      setScreen(onboarded ? "roleSelect" : "onboarding");
    }, 2000);
    return () => clearTimeout(timer);
  }, [onboarded, setScreen]);

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0A2E1A 0%, #1A6B3C 60%, #22C55E 100%)" }}
      >
        <motion.div
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            damping: 14,
            stiffness: 280,
            duration: 0.7,
            delay: 0.3
          }}
          className="flex h-[72px] w-[72px] items-center justify-center rounded-[20px] bg-white/10 backdrop-blur-sm"
        >
          <svg width="40" height="40" viewBox="0 0 56 56" fill="none">
            <rect x="14" y="14" width="28" height="28" rx="8" transform="rotate(45 28 28)" fill="white" />
            <path d="M28 20 L33 28 L28 36 L23 28 Z" fill="#1A6B3C" />
          </svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
          className="mt-4 text-[28px] font-extrabold text-white tracking-[3px]"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          ZERO WASTE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.65, ease: "easeOut" }}
          className="mt-2 text-[15px] font-normal text-white/75 text-center px-8"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Food should feed people, not landfills.
        </motion.p>

        {/* Loading Indicator */}
        <div className="absolute bottom-12 flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              className="h-2 w-2 rounded-full bg-white/60"
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
