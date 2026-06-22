"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { Countdown } from "./Countdown";
import {
  MapPin,
  Users,
  Clock,
  Flame,
  Map as MapIcon,
  List,
  Sparkles,
  Check,
  X,
  HeartHandshake,
  Building2,
  Home,
  Utensils,
  GraduationCap,
  CalendarDays,
  Bike,
  Star,
} from "lucide-react";

const DONOR_ICONS: Record<string, any> = {
  "marriage-hall": Building2,
  restaurant: Utensils,
  hostel: GraduationCap,
  household: Home,
  event: CalendarDays,
};

export function NgoFeed() {
  const donations = useAppStore((s) => s.donations);
  const acceptDonation = useAppStore((s) => s.acceptDonation);
  const [view, setView] = useState<"list" | "map">("list");

  const listed = donations.filter((d) => d.status === "listed");

  return (
    <div className="flex h-full flex-col bg-zw-bg-base">
      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-zw-border/60 bg-white px-5 pb-3 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-lg font-bold text-zw-text-primary">
              Rescue Feed
            </h1>
            <p className="text-[11px] text-zw-text-secondary">
              {listed.length} surplus donations waiting
            </p>
          </div>
          {/* View toggle */}
          <div className="flex rounded-xl border border-zw-border bg-zw-bg-muted p-0.5">
            <button
              onClick={() => setView("list")}
              className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-all ${
                view === "list"
                  ? "bg-white text-zw-primary-700 shadow-sm"
                  : "text-zw-text-muted"
              }`}
            >
              <List size={14} />
              List
            </button>
            <button
              onClick={() => setView("map")}
              className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-all ${
                view === "map"
                  ? "bg-white text-zw-primary-700 shadow-sm"
                  : "text-zw-text-muted"
              }`}
            >
              <MapIcon size={14} />
              Map
            </button>
          </div>
        </div>

        {/* Urgent count banner */}
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-gradient-to-r from-zw-accent-50 to-zw-accent-100 p-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zw-accent-600">
            <Flame size={14} className="text-white" />
          </div>
          <div className="flex-1">
            <span className="text-[12px] font-bold text-zw-accent-700">
              2 urgent rescues
            </span>
            <span className="text-[11px] text-zw-accent-700/80">
              {" "}
              · expires within 2 hours
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        <AnimatePresence mode="wait">
          {view === "list" ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3 px-5 py-4"
            >
              {listed.map((d, i) => {
                const Icon = DONOR_ICONS[d.donorType] ?? Building2;
                const hoursToExpiry =
                  (new Date(d.expiryDeadline).getTime() - Date.now()) / 3600000;
                const isUrgent = hoursToExpiry < 2;
                const isWarning = hoursToExpiry < 4 && !isUrgent;

                return (
                  <motion.div
                    key={d.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className={`overflow-hidden rounded-2xl border bg-white ${
                      isUrgent
                        ? "border-zw-danger/40 shadow-md shadow-zw-danger/10"
                        : "border-zw-border"
                    }`}
                  >
                    {/* Image strip with urgency bar */}
                    <div
                      className={`relative h-20 w-full bg-gradient-to-br ${d.imageColor}`}
                    >
                      <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 shadow-sm">
                        <Icon size={11} className="text-zw-primary-700" />
                        <span className="text-[10px] font-bold uppercase text-zw-primary-700">
                          {d.donorType.replace("-", " ")}
                        </span>
                      </div>
                      {isUrgent && (
                        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-zw-danger px-2.5 py-1 shadow-sm">
                          <Flame size={10} className="text-white" />
                          <span className="text-[10px] font-bold uppercase text-white">
                            Urgent
                          </span>
                        </div>
                      )}
                      {/* Servings badge */}
                      <div className="absolute bottom-2 right-3 flex items-center gap-1 rounded-full bg-zw-primary-900/80 px-2 py-0.5 backdrop-blur-sm">
                        <Users size={10} className="text-white" />
                        <span className="text-[10px] font-bold text-white">
                          {d.servings} servings
                        </span>
                      </div>
                      {/* Urgency bar */}
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-white/30">
                        <motion.div
                          initial={{ width: "100%" }}
                          animate={{
                            width: isUrgent
                              ? ["100%", "40%", "100%"]
                              : isWarning
                                ? "60%"
                                : "85%",
                          }}
                          transition={{
                            duration: isUrgent ? 1.5 : 0.5,
                            repeat: isUrgent ? Infinity : 0,
                          }}
                          className={`h-full ${
                            isUrgent ? "bg-zw-danger" : "bg-zw-accent-500"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-4">
                      <h3 className="font-display text-[15px] font-bold text-zw-text-primary">
                        {d.title}
                      </h3>
                      <p className="mt-0.5 line-clamp-2 text-[12px] text-zw-text-secondary">
                        {d.description}
                      </p>

                      {/* Meta row */}
                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-zw-text-secondary">
                        <div className="flex items-center gap-1">
                          <MapPin size={11} />
                          <span>{d.pickupDistanceKm}km away</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={11} />
                          <span>Pickup window: 2 hrs</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Sparkles size={11} className="text-zw-primary-600" />
                          <span>
                            AI fresh: {Math.round(d.aiFreshnessScore * 100)}%
                          </span>
                        </div>
                      </div>

                      {/* AI match score */}
                      {d.aiMatchScore && (
                        <div className="mt-3 flex items-center justify-between rounded-xl bg-zw-primary-50 p-2.5">
                          <div className="flex items-center gap-2">
                            <Sparkles size={14} className="text-zw-primary-700" />
                            <span className="text-[11px] font-bold text-zw-primary-900">
                              AI Match Score
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-20 overflow-hidden rounded-full bg-zw-primary-200">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${d.aiMatchScore}%` }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="h-full bg-zw-primary-700"
                              />
                            </div>
                            <span className="text-[11px] font-bold text-zw-primary-800">
                              {d.aiMatchScore}%
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Countdown + actions */}
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-medium uppercase tracking-wide text-zw-text-muted">
                            Expires in
                          </span>
                          <Countdown
                            deadline={d.expiryDeadline}
                            variant="compact"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-zw-border bg-white text-zw-text-muted active:scale-95">
                            <X size={16} />
                          </button>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => acceptDonation(d.id)}
                            className="flex h-9 items-center gap-1.5 rounded-xl bg-zw-primary-700 px-4 text-[12px] font-semibold text-white shadow-md shadow-zw-primary-700/20"
                          >
                            <Check size={14} strokeWidth={3} />
                            Accept
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {listed.length === 0 && (
                <div className="mt-20 flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zw-primary-50">
                    <HeartHandshake
                      size={28}
                      className="text-zw-primary-600"
                    />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-zw-text-primary">
                    All caught up!
                  </p>
                  <p className="text-[12px] text-zw-text-muted">
                    No active donations in your area
                  </p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative h-full"
            >
              {/* Stylized map */}
              <div
                className="relative h-[450px] bg-zw-bg-muted"
                style={{
                  backgroundImage:
                    "linear-gradient(0deg, var(--color-zw-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-zw-border) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              >
                {/* Roads */}
                <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                  <path d="M 0 80 L 100% 80" stroke="var(--color-zw-bg-surface)" strokeWidth="14" />
                  <path d="M 0 200 L 100% 200" stroke="var(--color-zw-bg-surface)" strokeWidth="10" />
                  <path d="M 0 350 L 100% 350" stroke="var(--color-zw-bg-surface)" strokeWidth="12" />
                  <path d="M 80 0 L 80 100%" stroke="var(--color-zw-bg-surface)" strokeWidth="14" />
                  <path d="M 240 0 L 240 100%" stroke="var(--color-zw-bg-surface)" strokeWidth="10" />
                </svg>

                {/* Pins */}
                {listed.map((d, i) => {
                  const positions = [
                    { left: "15%", top: "20%" },
                    { left: "65%", top: "15%" },
                    { left: "30%", top: "55%" },
                    { left: "70%", top: "60%" },
                    { left: "45%", top: "80%" },
                  ];
                  const pos = positions[i % positions.length];
                  const hoursToExpiry =
                    (new Date(d.expiryDeadline).getTime() - Date.now()) / 3600000;
                  const isUrgent = hoursToExpiry < 2;
                  const isWarning = hoursToExpiry < 4 && !isUrgent;

                  return (
                    <motion.button
                      key={d.id}
                      initial={{ y: -40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: i * 0.1,
                        type: "spring",
                        stiffness: 300,
                        damping: 18,
                      }}
                      whileTap={{ scale: 0.9 }}
                      style={{ left: pos.left, top: pos.top }}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                    >
                      <div
                        className={`relative flex items-center justify-center rounded-full p-2 ${
                          isUrgent
                            ? "zw-urgency-pulse bg-zw-danger"
                            : isWarning
                              ? "zw-urgency-pulse-amber bg-zw-warning"
                              : "bg-zw-primary-700"
                        } ring-3 ring-white`}
                      >
                        <Utensils size={14} className="text-white" />
                      </div>
                      <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-1.5 py-0.5 text-[9px] font-bold text-zw-text-primary shadow-sm">
                        {d.servings} servings
                      </div>
                    </motion.button>
                  );
                })}

                {/* Self marker */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="zw-aura relative flex h-12 w-12 items-center justify-center rounded-full bg-zw-primary-900 ring-4 ring-white">
                    <HeartHandshake size={20} className="text-white" />
                  </div>
                  <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-zw-primary-900 px-2 py-0.5 text-[9px] font-bold text-white">
                    You
                  </div>
                </div>
              </div>

              {/* Bottom info card */}
              <div className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-white p-4 shadow-2xl">
                <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-zw-border-strong" />
                <h3 className="font-display text-sm font-bold text-zw-text-primary">
                  {listed.length} donations around you
                </h3>
                <p className="text-[11px] text-zw-text-secondary">
                  Tap a pin to see details. Color indicates urgency.
                </p>
                <div className="mt-3 flex gap-3 text-[11px]">
                  <div className="flex items-center gap-1">
                    <div className="h-2.5 w-2.5 rounded-full bg-zw-primary-700" />
                    <span className="text-zw-text-secondary">Safe (4h+)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-2.5 w-2.5 rounded-full bg-zw-warning" />
                    <span className="text-zw-text-secondary">Soon (2-4h)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-2.5 w-2.5 rounded-full bg-zw-danger" />
                    <span className="text-zw-text-secondary">Urgent (&lt;2h)</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
