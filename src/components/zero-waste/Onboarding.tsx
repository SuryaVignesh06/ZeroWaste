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
    <div className="relative flex h-full flex-col bg-zw-bg-base">
      {/* Skip */}
      <button
        onClick={completeOnboarding}
        className="absolute right-5 top-5 z-20 text-sm font-medium text-zw-text-secondary transition-colors hover:text-zw-primary-700"
      >
        Skip
      </button>

      {/* Slide visual */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="relative flex h-full flex-col"
          >
            {/* Gradient hero */}
            <div
              className={`flex h-[55%] items-center justify-center bg-gradient-to-br ${slide.gradient} relative overflow-hidden`}
            >
              {/* Decorative circles */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.18 }}
                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-white"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.12 }}
                transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
                className="absolute -bottom-12 -right-12 h-56 w-56 rounded-full bg-white"
              />
              <motion.div
                initial={{ y: 30, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
                className="relative z-10 flex h-28 w-28 items-center justify-center rounded-3xl bg-white/20 backdrop-blur-md ring-1 ring-white/40"
              >
                <Icon size={56} strokeWidth={1.6} className="text-white" />
              </motion.div>
            </div>

            {/* Text */}
            <div className="flex flex-1 flex-col justify-start px-7 pt-10">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="font-display text-[28px] font-bold leading-tight text-zw-text-primary"
              >
                {slide.title}
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="mt-3 text-[15px] leading-relaxed text-zw-text-secondary"
              >
                {slide.subtitle}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 pb-3">
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
                  : "var(--color-zw-border)",
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ height: 8 }}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center gap-3 px-6 pb-8 pt-2">
        {index > 0 && (
          <button
            onClick={goBack}
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-zw-border bg-white text-zw-text-secondary transition-colors hover:bg-zw-bg-muted active:scale-95"
          >
            <ChevronLeft size={22} />
          </button>
        )}
        <motion.button
          onClick={goNext}
          whileTap={{ scale: 0.96 }}
          className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-zw-primary-700 text-[15px] font-semibold text-white shadow-lg shadow-zw-primary-700/25 transition-all hover:bg-zw-primary-800"
        >
          {index === ONBOARDING_SLIDES.length - 1 ? "Get Started" : "Continue"}
          <ChevronRight size={18} strokeWidth={2.5} />
        </motion.button>
      </div>
    </div>
  );
}
