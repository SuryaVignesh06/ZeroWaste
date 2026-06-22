"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { MOCK_MONTHLY_IMPACT } from "@/lib/mock-data";
import { formatRelativeTime } from "./Countdown";
import {
  Sparkles,
  Flame,
  Leaf,
  Heart,
  Users,
  Award,
  Crown,
  Star,
  TrendingUp,
  Utensils,
  ShoppingBag,
  Bike,
  HandHeart,
} from "lucide-react";

const BADGE_ICONS: Record<string, any> = {
  Heart,
  Flame,
  Leaf,
  Users,
  Award,
  Crown,
};

const EVENT_ICONS: Record<string, any> = {
  rescue: HandHeart,
  purchase: ShoppingBag,
  donate: Heart,
  volunteer: Bike,
};

export function ImpactDashboard() {
  const impactPoints = useAppStore((s) => s.impactPoints);
  const mealsSaved = useAppStore((s) => s.mealsSaved);
  const co2Saved = useAppStore((s) => s.co2Saved);
  const moneySaved = useAppStore((s) => s.moneySaved);
  const badges = useAppStore((s) => s.badges);
  const events = useAppStore((s) => s.events);

  const levels = [
    { name: "Bronze", min: 0, color: "from-orange-400 to-amber-600" },
    { name: "Silver", min: 500, color: "from-slate-300 to-slate-500" },
    { name: "Gold", min: 1000, color: "from-amber-300 to-yellow-500" },
    { name: "Platinum", min: 2000, color: "from-cyan-300 to-teal-500" },
  ];
  const currentLevel = [...levels]
    .reverse()
    .find((l) => impactPoints >= l.min)!;
  const nextLevel = levels.find((l) => l.min > impactPoints);
  const levelProgress = nextLevel
    ? ((impactPoints - currentLevel.min) /
        (nextLevel.min - currentLevel.min)) *
      100
    : 100;

  const maxMeals = Math.max(...MOCK_MONTHLY_IMPACT.map((d) => d.meals));

  return (
    <div className="relative flex h-full flex-col">
      <div className="absolute inset-0 -z-10 bg-zw-aurora" />
      <div className="blob bg-zw-primary-300/40 zw-float-slow" style={{ width: 280, height: 280, top: "-10%", right: "-20%" }} />
      <div className="blob bg-zw-pink-200/40 zw-float" style={{ width: 220, height: 220, top: "30%", left: "-15%" }} />

      <div className="sticky top-0 z-30 px-5 py-4">
        <div className="absolute inset-0 -z-10 bg-white/60 backdrop-blur-xl border-b border-zw-border-strong" />
        <h1 className="font-display text-[22px] font-bold tracking-tight text-zw-text-primary">
          Your Impact
        </h1>
        <p className="text-[11px] text-zw-text-secondary">
          Track your contribution to a zero-waste world
        </p>
      </div>

      <div className="flex-1 overflow-y-auto zw-scroll pb-32">
        {/* Hero stat card */}
        <div className="px-5 pt-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative overflow-hidden rounded-3xl glass-primary p-5 text-white shadow-xl"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.2, 0.15] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white"
            />
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.15, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              className="absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-white"
            />

            <div className="relative z-10">
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br ${currentLevel.color} shadow-lg ring-2 ring-white/40`}
                >
                  <Crown size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-wider text-white/80">
                    Impact Level
                  </div>
                  <div className="font-display text-base font-bold">
                    {currentLevel.name}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-[11px] text-white/80">
                  Total Impact Points
                </div>
                <div className="font-display text-4xl font-bold">
                  <motion.span
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {impactPoints.toLocaleString("en-IN")}
                  </motion.span>
                  <span className="ml-2 text-base font-medium text-white/80">
                    pts
                  </span>
                </div>
              </div>

              {nextLevel && (
                <div className="mt-3">
                  <div className="mb-1 flex items-center justify-between text-[10px] text-white/85">
                    <span>{currentLevel.name}</span>
                    <span>
                      {Math.round(levelProgress)}% to {nextLevel.name}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/25">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${levelProgress}%` }}
                      transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-white to-zw-primary-100"
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Sub-stats */}
        <div className="mt-4 grid grid-cols-3 gap-3 px-5">
          <SubStat
            icon={<Utensils size={16} />}
            label="Meals saved"
            value={String(mealsSaved)}
            color="bg-gradient-to-br from-emerald-50 to-white text-zw-primary-700"
          />
          <SubStat
            icon={<Leaf size={16} />}
            label="CO2 saved"
            value={`${co2Saved}kg`}
            color="bg-gradient-to-br from-teal-50 to-white text-teal-700"
          />
          <SubStat
            icon={<TrendingUp size={16} />}
            label="Money saved"
            value={`\u20B9${moneySaved}`}
            color="bg-gradient-to-br from-amber-50 to-white text-zw-accent-700"
          />
        </div>

        {/* Weekly chart */}
        <div className="mt-5 px-5">
          <h3 className="mb-3 font-display text-[12px] font-bold uppercase tracking-wide text-zw-text-secondary">
            This Week
          </h3>
          <div className="rounded-3xl glass glass-inset p-4">
            <div className="flex h-32 items-end justify-between gap-2">
              {MOCK_MONTHLY_IMPACT.map((d, i) => {
                const heightPct = (d.meals / maxMeals) * 100;
                return (
                  <div
                    key={d.day}
                    className="flex flex-1 flex-col items-center gap-1.5"
                  >
                    <div className="relative flex w-full flex-1 items-end">
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${heightPct}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.6,
                          delay: i * 0.08,
                          ease: "easeOut",
                        }}
                        className="w-full rounded-t-md bg-gradient-to-t from-zw-primary-700 to-zw-primary-400"
                      >
                        <motion.span
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + i * 0.08 }}
                          className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-bold text-zw-text-primary"
                        >
                          {d.meals}
                        </motion.span>
                      </motion.div>
                    </div>
                    <span className="text-[9px] font-medium text-zw-text-muted">
                      {d.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="mt-5 px-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display text-[12px] font-bold uppercase tracking-wide text-zw-text-secondary">
              Badges
            </h3>
            <span className="text-[11px] font-semibold text-zw-primary-700">
              {badges.filter((b) => b.unlocked).length}/{badges.length}{" "}
              unlocked
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {badges.map((b, i) => {
              const Icon = BADGE_ICONS[b.icon] ?? Award;
              return (
                <motion.div
                  key={b.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.06 }}
                  className={`flex flex-col items-center rounded-3xl border p-3 text-center ${
                    b.unlocked
                      ? "border-zw-primary-200/50 bg-gradient-to-br from-zw-primary-50 to-white shadow-sm backdrop-blur-md"
                      : "border-zw-border-strong bg-white/50 backdrop-blur-md opacity-70"
                  }`}
                >
                  <div
                    className={`relative flex h-12 w-12 items-center justify-center rounded-full ${
                      b.unlocked
                        ? "bg-gradient-to-br from-zw-primary-500 to-zw-primary-800 shadow-md"
                        : "bg-zw-bg-muted"
                    }`}
                  >
                    <Icon
                      size={22}
                      className={
                        b.unlocked ? "text-white" : "text-zw-text-muted"
                      }
                    />
                    {b.unlocked && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute inset-0 rounded-full"
                        style={{
                          background:
                            "conic-gradient(from 0deg, transparent 60%, rgba(255,255,255,0.3) 80%, transparent 100%)",
                        }}
                      />
                    )}
                  </div>
                  <span
                    className={`mt-2 text-[10px] font-bold leading-tight ${
                      b.unlocked ? "text-zw-primary-900" : "text-zw-text-muted"
                    }`}
                  >
                    {b.name}
                  </span>
                  {!b.unlocked && b.progress !== undefined && (
                    <div className="mt-1 w-full">
                      <div className="h-1 overflow-hidden rounded-full bg-zw-border-strong">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${b.progress}%` }}
                          transition={{ delay: 0.5 + i * 0.05, duration: 0.6 }}
                          className="h-full bg-zw-primary-500"
                        />
                      </div>
                      <span className="text-[8px] text-zw-text-muted">
                        {b.progress}%
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Recent activity */}
        <div className="mt-5 px-5">
          <h3 className="mb-3 font-display text-[12px] font-bold uppercase tracking-wide text-zw-text-secondary">
            Recent Activity
          </h3>
          <div className="space-y-2">
            {events.map((e, i) => {
              const Icon = EVENT_ICONS[e.type] ?? Star;
              return (
                <motion.div
                  key={e.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 rounded-3xl glass glass-inset p-3"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-zw-primary-50 to-white text-zw-primary-700 border border-zw-primary-200/40">
                    <Icon size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[12px] font-semibold text-zw-text-primary line-clamp-1">
                      {e.label}
                    </div>
                    <div className="text-[10px] text-zw-text-muted">
                      {formatRelativeTime(e.timestamp)} ·{" "}
                      <span className="font-semibold text-zw-primary-700">
                        +{e.points} pts
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-0.5">
                    {e.mealsSaved > 0 && (
                      <span className="text-[10px] font-bold text-zw-primary-700">
                        {e.mealsSaved} meals
                      </span>
                    )}
                    {e.moneySaved > 0 && (
                      <span className="text-[10px] font-bold text-zw-accent-700">
                        \u20B9{e.moneySaved}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Quote */}
        <div className="mt-5 px-5">
          <div className="rounded-3xl bg-gradient-to-br from-zw-accent-50 to-zw-primary-50 p-4 text-center border border-white/60 backdrop-blur-md">
            <Sparkles size={20} className="mx-auto text-zw-primary-700" />
            <p className="mt-2 font-display text-[13px] font-semibold italic text-zw-text-primary">
              "Food should nourish people, not landfills."
            </p>
            <p className="mt-1 text-[10px] text-zw-text-secondary">
              You've prevented {co2Saved}kg of CO2 emissions — equivalent to
              planting {(co2Saved / 21).toFixed(1)} trees.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SubStat({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-white/60 p-3 shadow-sm backdrop-blur-md ${color}`}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/80">
        {icon}
      </div>
      <div className="mt-2 font-display text-base font-bold text-zw-text-primary">
        {value}
      </div>
      <div className="text-[10px] text-zw-text-muted">{label}</div>
    </div>
  );
}
