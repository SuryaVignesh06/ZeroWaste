"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { ONBOARDING_SLIDES } from "@/lib/mock-data";
import {
  ShoppingBasket,
  HeartHandshake,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Recycle,
} from "lucide-react";

const ICONS: Record<string, any> = {
  ShoppingBasket,
  HeartHandshake,
  Sparkles,
};

export function Onboarding() {
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const slide = ONBOARDING_SLIDES[index];
  const Icon = ICONS[slide.accentIcon] ?? Sparkles;

  const goNext = () => {
    if (index === ONBOARDING_SLIDES.length - 1) {
      completeOnboarding();
      return;
    }
    setDirection(1);
    setIndex((i) => i + 1);
  };

  const goBack = () => {
    if (index === 0) return;
    setDirection(-1);
    setIndex((i) => i - 1);
  };

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-zw-aurora">
      {/* Decorative blobs */}
      <div className="blob bg-zw-primary-400/50 zw-float-slow" style={{ width: 300, height: 300, top: "-10%", right: "-20%" }} />
      <div className="blob bg-zw-pink-300/40 zw-float" style={{ width: 250, height: 250, top: "40%", left: "-15%" }} />
      <div className="blob bg-zw-accent-300/30 zw-float-slow" style={{ width: 200, height: 200, bottom: "20%", right: "-10%" }} />

      {/* Skip */}
      <button
        onClick={completeOnboarding}
        className="absolute right-5 top-5 z-20 rounded-full glass px-4 py-1.5 text-[13px] font-semibold text-zw-text-primary transition-all hover:bg-white/90 active:scale-95"
      >
        Skip
      </button>

      {/* Slide visual */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            className="relative flex h-full flex-col"
          >
            {/* Brand mark */}
            <div className="flex items-center justify-center pt-16">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="flex items-center gap-2"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl glass-primary">
                  <Recycle size={20} className="text-white" strokeWidth={2.4} />
                </div>
                <span className="font-display text-xl font-bold tracking-tight text-zw-text-primary">
                  Zero-Waste
                </span>
              </motion.div>
            </div>

            {/* Hero icon */}
            <div className="flex flex-1 items-center justify-center">
              <motion.div
                initial={{ scale: 0, rotate: -20, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                  stiffness: 200,
                  damping: 18,
                }}
                className="relative"
              >
                {/* Glowing aura */}
                <motion.div
                  animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className={`absolute inset-0 rounded-[3rem] bg-gradient-to-br ${slide.gradient} blur-2xl`}
                />
                <div
                  className={`relative flex h-32 w-32 items-center justify-center rounded-[3rem] bg-gradient-to-br ${slide.gradient} shadow-2xl`}
                >
                  <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-b from-white/30 to-transparent" />
                  <Icon size={56} strokeWidth={1.8} className="relative text-white" />
                </div>
              </motion.div>
            </div>

            {/* Text */}
            <div className="px-8 pb-2">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="font-display text-[28px] font-bold leading-tight tracking-tight text-zw-text-primary"
              >
                {slide.title}
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-3 text-[15px] leading-relaxed text-zw-text-secondary"
              >
                {slide.subtitle}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination + CTA */}
      <div className="relative z-10 px-6 pb-10 pt-4">
        {/* Pagination */}
        <div className="mb-5 flex items-center justify-center gap-2">
          {ONBOARDING_SLIDES.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className="rounded-full"
              animate={{
                width: i === index ? 28 : 8,
                backgroundColor:
                  i === index
                    ? "var(--color-zw-primary-700)"
                    : "rgba(0, 0, 0, 0.15)",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ height: 8 }}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          {index > 0 && (
            <button
              onClick={goBack}
              className="flex h-14 w-14 items-center justify-center rounded-2xl glass text-zw-text-primary transition-all hover:bg-white/90 active:scale-95"
            >
              <ChevronLeft size={22} />
            </button>
          )}
          <motion.button
            onClick={goNext}
            whileTap={{ scale: 0.96 }}
            className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl glass-primary text-[15px] font-semibold text-white active:scale-98"
          >
            {index === ONBOARDING_SLIDES.length - 1
              ? "Get Started"
              : "Continue"}
            <ChevronRight size={18} strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
