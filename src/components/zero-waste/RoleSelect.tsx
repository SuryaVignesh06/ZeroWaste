"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { ROLE_CARDS } from "@/lib/mock-data";
import {
  ShoppingBag,
  Store,
  HeartHandshake,
  Bike,
  ChevronRight,
  Recycle,
} from "lucide-react";

const ICONS: Record<string, any> = {
  ShoppingBag,
  Store,
  HeartHandshake,
  Bike,
};

export function RoleSelect() {
  const setRole = useAppStore((s) => s.setRole);

  return (
    <div className="flex h-full flex-col bg-zw-bg-base">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-zw-primary-700 via-zw-primary-800 to-zw-primary-900 px-6 pb-10 pt-14">
        <motion.div
          initial={{ scale: 0, opacity: 0.18 }}
          animate={{ scale: 1, opacity: 0.18 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0.12 }}
          animate={{ scale: 1, opacity: 0.12 }}
          transition={{ delay: 0.15, duration: 0.7, ease: "easeOut" }}
          className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white"
        />

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md ring-1 ring-white/40">
            <Recycle size={22} className="text-white" strokeWidth={2.2} />
          </div>
          <span className="font-display text-xl font-bold text-white">
            Zero-Waste
          </span>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="relative z-10 mt-6 font-display text-3xl font-bold leading-tight text-white"
        >
          Food should nourish people,
          <br />
          <span className="text-zw-primary-200">not landfills.</span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative z-10 mt-2 text-[14px] leading-relaxed text-white/80"
        >
          Choose how you want to be part of the ecosystem.
        </motion.p>
      </div>

      {/* Role cards */}
      <div className="-mt-6 flex-1 rounded-t-3xl bg-zw-bg-base px-5 pb-6 pt-7">
        <div className="grid grid-cols-2 gap-3">
          {ROLE_CARDS.map((card, i) => {
            const Icon = ICONS[card.icon] ?? ShoppingBag;
            return (
              <motion.button
                key={card.role}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.05 * i + 0.3, duration: 0.4 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setRole(card.role)}
                className="group relative flex flex-col items-start overflow-hidden rounded-3xl border border-zw-border bg-white p-5 text-left transition-all hover:border-zw-primary-300 hover:shadow-lg hover:shadow-zw-primary-700/5"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${card.accent} shadow-md`}
                >
                  <Icon size={24} className="text-white" strokeWidth={2.2} />
                </div>
                <h3 className="mt-4 font-display text-[15px] font-bold text-zw-text-primary">
                  {card.title}
                </h3>
                <p className="mt-1 text-[12px] leading-snug text-zw-text-secondary">
                  {card.description}
                </p>
                <ChevronRight
                  size={16}
                  className="mt-3 text-zw-text-muted transition-all group-hover:translate-x-1 group-hover:text-zw-primary-600"
                />
              </motion.button>
            );
          })}
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          className="mt-5 grid grid-cols-3 gap-2 rounded-2xl bg-zw-primary-50 p-4"
        >
          <Stat value="1.2k" label="Meals saved" />
          <Stat value="482kg" label="CO2 reduced" />
          <Stat value="34" label="Active rescues" />
        </motion.div>

        <p className="mt-4 text-center text-[11px] text-zw-text-muted">
          By continuing you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-lg font-bold text-zw-primary-800">
        {value}
      </span>
      <span className="text-[10px] font-medium uppercase tracking-wide text-zw-text-secondary">
        {label}
      </span>
    </div>
  );
}
