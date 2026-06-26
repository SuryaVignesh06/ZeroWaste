"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { ArrowRight, Sparkles, MapPin, Tag, BrainCircuit } from "lucide-react";

const SLIDES = [
  {
    id: "rescue",
    eyebrow: "Food Rescue Network",
    title: "Food should feed people.",
    subtitle: "Real-time alerts when surplus food is available nearby. Rescue meals from weddings, restaurants, and homes before they go to waste.",
    color: "var(--color-pastel-green)",
    textColor: "var(--color-zw-ink)",
    Icon: MapPin,
  },
  {
    id: "market",
    eyebrow: "Affordable Marketplace",
    title: "Premium groceries, up to 70% off.",
    subtitle: "Buy perfectly safe, near-expiry products from local supermarkets at a fraction of the cost. Good for your wallet, good for the planet.",
    color: "var(--color-pastel-blue)",
    textColor: "var(--color-zw-ink)",
    Icon: Tag,
  },
  {
    id: "ai",
    eyebrow: "AI-Powered",
    title: "Zero waste. Zero delay.",
    subtitle: "Our AI instantly matches surplus food with the right NGOs, optimizes delivery routes, and calculates your personal environmental impact.",
    color: "var(--color-pastel-yellow)",
    textColor: "var(--color-zw-ink)",
    Icon: BrainCircuit,
  },
];

export function Onboarding() {
  const setScreen = useAppStore((s) => s.setScreen);
  const [index, setIndex] = useState(0);

  const slide = SLIDES[index];
  const isLast = index === SLIDES.length - 1;

  const nextSlide = () => {
    if (isLast) {
      setScreen("roleSelect");
    } else {
      setIndex((i) => i + 1);
    }
  };

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[var(--color-zw-bg)]">
      {/* Dynamic Background Elements */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 1.2, rotate: 10 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="absolute -top-32 -right-32 h-96 w-96 rounded-full blur-[80px]"
          style={{ background: slide.color, opacity: 0.4 }}
        />
      </AnimatePresence>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={`bottom-${index}`}
          initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 1.2, rotate: -10 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4, delay: 0.1 }}
          className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full blur-[80px]"
          style={{ background: slide.color, opacity: 0.3 }}
        />
      </AnimatePresence>

      <div className="relative z-10 flex flex-1 flex-col justify-between px-8 pt-16 pb-12">
        {/* Skip button */}
        <div className="flex justify-end">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setScreen("roleSelect")}
            className="rounded-full bg-white/50 px-4 py-2 text-[14px] font-bold text-[var(--color-zw-ink)] shadow-sm backdrop-blur-md"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Skip
          </motion.button>
        </div>

        {/* Visual Zone */}
        <div className="flex h-[40%] items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.8 }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
              className="relative flex h-64 w-full items-center justify-center"
            >
              {/* Epic Floating Visuals based on slide */}
              {index === 0 && (
                <div className="relative h-48 w-48">
                  <motion.div
                    animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-[40px] shadow-xl"
                    style={{ background: slide.color, border: "4px solid white" }}
                  />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", bounce: 0.6 }}
                    className="absolute -right-6 -top-6 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg"
                  >
                    <slide.Icon size={32} className="text-[var(--color-zw-ink)]" />
                  </motion.div>
                  {/* Floating badge */}
                  <motion.div
                    animate={{ y: [5, -5, 5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-4 -left-8 rounded-2xl bg-white px-4 py-3 shadow-lg"
                  >
                    <span className="text-[14px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>+50 Meals Rescued</span>
                  </motion.div>
                </div>
              )}
              {index === 1 && (
                <div className="relative h-48 w-48">
                  <motion.div
                    animate={{ y: [-10, 10, -10], rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-[40px] shadow-xl"
                    style={{ background: slide.color, border: "4px solid white" }}
                  />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", bounce: 0.6 }}
                    className="absolute -left-6 -bottom-6 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-zw-ink)] shadow-lg"
                  >
                    <span className="text-[20px] font-bold text-white" style={{ fontFamily: "var(--font-outfit)" }}>-70%</span>
                  </motion.div>
                  {/* Floating badge */}
                  <motion.div
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute -right-12 top-12 rounded-2xl bg-white px-4 py-3 shadow-lg"
                  >
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-[var(--color-zw-ink-secondary)] line-through" style={{ fontFamily: "var(--font-jakarta)" }}>₹120</span>
                      <span className="text-[16px] font-bold text-[var(--color-pastel-green)]" style={{ fontFamily: "var(--font-outfit)" }}>₹35</span>
                    </div>
                  </motion.div>
                </div>
              )}
              {index === 2 && (
                <div className="relative h-48 w-48">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1], rotate: [0, 180, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-[8px] border-dashed border-[var(--color-zw-ink)] opacity-10"
                  />
                  <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-4 rounded-full shadow-xl"
                    style={{ background: slide.color, border: "4px solid white" }}
                  />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", bounce: 0.6 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <slide.Icon size={48} className="text-[var(--color-zw-ink)]" />
                  </motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-2 right-4 text-[var(--color-zw-ink)]"
                  >
                    <Sparkles size={24} />
                  </motion.div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Text Zone */}
        <div className="mt-8 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div
                className="mb-4 inline-flex items-center rounded-full px-4 py-1.5 shadow-sm"
                style={{ background: slide.color }}
              >
                <span className="text-[12px] font-bold uppercase tracking-wider text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-jakarta)" }}>
                  {slide.eyebrow}
                </span>
              </div>
              <h1 className="text-[36px] font-extrabold leading-[1.1] text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>
                {slide.title}
              </h1>
              <p className="mt-4 text-[16px] font-medium leading-[1.6] text-[var(--color-zw-ink-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>
                {slide.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 flex items-center justify-between">
          <div className="flex gap-2">
            {SLIDES.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  width: i === index ? 32 : 8,
                  backgroundColor: i === index ? "var(--color-zw-ink)" : "var(--color-zw-divider)",
                }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
                className="h-2 rounded-full"
              />
            ))}
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="flex h-16 w-16 items-center justify-center rounded-full shadow-xl transition-all"
            style={{
              background: "var(--color-zw-ink)",
              color: "#FFFFFF",
            }}
          >
            {isLast ? (
              <span className="text-[16px] font-bold" style={{ fontFamily: "var(--font-outfit)" }}>Go</span>
            ) : (
              <ArrowRight size={28} />
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
