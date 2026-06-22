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
    <div className="relative flex h-full flex-col overflow-hidden bg-zw-aurora">
      {/* Decorative blobs */}
      <div className="blob bg-zw-primary-400/50 zw-float-slow" style={{ width: 320, height: 320, top: "-15%", right: "-15%" }} />
      <div className="blob bg-zw-pink-300/40 zw-float" style={{ width: 280, height: 280, bottom: "10%", left: "-20%" }} />
      <div className="blob bg-zw-accent-300/30 zw-float-slow" style={{ width: 220, height: 220, top: "30%", right: "-5%" }} />

      <div className="relative z-10 flex h-full flex-col">
        {/* Header */}
        <div className="px-6 pb-6 pt-14">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl glass-primary">
              <Recycle size={22} className="text-white" strokeWidth={2.4} />
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-zw-text-primary">
              Zero-Waste
            </span>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mt-7 font-display text-[30px] font-bold leading-[1.15] tracking-tight text-zw-text-primary"
          >
            Food should nourish
            <br />
            people,{" "}
            <span className="bg-gradient-to-r from-zw-primary-600 to-zw-accent-500 bg-clip-text text-transparent">
              not landfills.
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-2 text-[14px] leading-relaxed text-zw-text-secondary"
          >
            Choose how you want to be part of the ecosystem.
          </motion.p>
        </div>

        {/* Role cards */}
        <div className="flex-1 overflow-y-auto zw-scroll px-5 pb-6">
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
                  className="group relative flex flex-col items-start overflow-hidden rounded-3xl glass glass-inset p-5 text-left transition-all hover:shadow-xl hover:shadow-black/5 active:scale-96"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${card.accent} shadow-lg`}
                  >
                    <Icon size={22} className="text-white" strokeWidth={2.4} />
                  </div>
                  <h3 className="mt-4 font-display text-[15px] font-bold tracking-tight text-zw-text-primary">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-[11px] leading-snug text-zw-text-secondary">
                    {card.description}
                  </p>
                  <div className="mt-3 flex h-6 w-6 items-center justify-center rounded-full bg-zw-primary-50 transition-all group-hover:bg-zw-primary-100">
                    <ChevronRight
                      size={12}
                      className="text-zw-primary-700 transition-all group-hover:translate-x-0.5"
                      strokeWidth={3}
                    />
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Stats strip — glass card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.4 }}
            className="mt-5 grid grid-cols-3 gap-2 rounded-3xl glass glass-inset p-4"
          >
            <Stat value="1.2k" label="Meals saved" />
            <div className="border-x border-zw-divider" />
            <Stat value="482kg" label="CO2 reduced" />
            <div className="border-x border-zw-divider" />
            <Stat value="34" label="Active rescues" />
          </motion.div>

          <p className="mt-4 text-center text-[11px] text-zw-text-muted">
            By continuing you agree to our Terms & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-base font-bold text-zw-primary-800">
        {value}
      </span>
      <span className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-zw-text-secondary">
        {label}
      </span>
    </div>
  );
}
