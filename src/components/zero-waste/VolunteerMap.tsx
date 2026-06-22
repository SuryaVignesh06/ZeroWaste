"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { Countdown } from "./Countdown";
import {
  Bike,
  MapPin,
  Navigation,
  Star,
  Zap,
  CircleDollarSign,
  Clock,
  Package,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Trophy,
} from "lucide-react";

export function VolunteerMap() {
  const [online, setOnline] = useState(true);
  const [activePickup, setActivePickup] = useState<string | null>("d3");
  const donations = useAppStore((s) => s.donations);
  const listed = donations.filter((d) => d.status === "listed");

  const activeDonation = donations.find((d) => d.id === activePickup);

  return (
    <div className="flex h-full flex-col bg-zw-bg-base">
      {/* Top stats bar */}
      <div className="sticky top-0 z-30 border-b border-zw-border/60 bg-white px-5 pb-3 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-lg font-bold text-zw-text-primary">
              Volunteer Hub
            </h1>
            <p className="text-[11px] text-zw-text-secondary">
              You're {online ? "online" : "offline"} · 5km radius
            </p>
          </div>
          {/* Online toggle */}
          <button
            onClick={() => setOnline(!online)}
            className={`flex items-center gap-2 rounded-full px-3 py-2 transition-all ${
              online
                ? "bg-zw-primary-700 text-white"
                : "bg-zw-bg-muted text-zw-text-secondary"
            }`}
          >
            <motion.div
              animate={{ scale: online ? [1, 1.3, 1] : 1 }}
              transition={{ duration: 1.5, repeat: online ? Infinity : 0 }}
              className={`h-2.5 w-2.5 rounded-full ${
                online ? "bg-zw-primary-300" : "bg-zw-text-muted"
              }`}
            />
            <span className="text-[12px] font-bold">
              {online ? "Online" : "Offline"}
            </span>
          </button>
        </div>

        {/* Earnings strip */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-gradient-to-br from-zw-primary-50 to-white p-2.5">
            <div className="flex items-center gap-1 text-zw-primary-700">
              <TrendingUp size={12} />
              <span className="text-[10px] font-medium uppercase">Today</span>
            </div>
            <div className="font-display text-base font-bold text-zw-text-primary">
              12
            </div>
            <div className="text-[9px] text-zw-text-muted">pickups done</div>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-amber-50 to-white p-2.5">
            <div className="flex items-center gap-1 text-zw-accent-700">
              <CircleDollarSign size={12} />
              <span className="text-[10px] font-medium uppercase">Earned</span>
            </div>
            <div className="font-display text-base font-bold text-zw-text-primary">
              ₹240
            </div>
            <div className="text-[9px] text-zw-text-muted">today</div>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-amber-50 to-white p-2.5">
            <div className="flex items-center gap-1 text-zw-accent-700">
              <Trophy size={12} />
              <span className="text-[10px] font-medium uppercase">Points</span>
            </div>
            <div className="font-display text-base font-bold text-zw-text-primary">
              +360
            </div>
            <div className="text-[9px] text-zw-text-muted">today</div>
          </div>
        </div>
      </div>

      {/* Map area */}
      <div className="relative flex-1 overflow-hidden">
        <div
          className="absolute inset-0 bg-zw-bg-muted"
          style={{
            backgroundImage:
              "linear-gradient(0deg, var(--color-zw-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-zw-border) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* Roads */}
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <path
            d="M 0 100 L 100% 100"
            stroke="var(--color-zw-bg-surface)"
            strokeWidth="14"
          />
          <path
            d="M 0 280 L 100% 280"
            stroke="var(--color-zw-bg-surface)"
            strokeWidth="12"
          />
          <path
            d="M 90 0 L 90 100%"
            stroke="var(--color-zw-bg-surface)"
            strokeWidth="14"
          />
          <path
            d="M 260 0 L 260 100%"
            stroke="var(--color-zw-bg-surface)"
            strokeWidth="10"
          />
          {/* Optimized route */}
          {activeDonation && (
            <motion.path
              d="M 180 320 L 180 280 L 90 280 L 90 200 L 60 180"
              stroke="var(--color-zw-primary-600)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="6 6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          )}
        </svg>

        {/* Volunteer location */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative flex h-12 w-12 items-center justify-center rounded-full bg-zw-primary-900 ring-4 ring-white"
          >
            <Bike size={20} className="text-white" />
          </motion.div>
          <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-zw-primary-900 px-2 py-0.5 text-[9px] font-bold text-white">
            You
          </div>
        </div>

        {/* Donation pins */}
        {listed.map((d, i) => {
          const positions = [
            { left: "18%", top: "20%" },
            { left: "62%", top: "15%" },
            { left: "30%", top: "55%" },
            { left: "70%", top: "50%" },
            { left: "45%", top: "75%" },
          ];
          const pos = positions[i % positions.length];
          const isActive = d.id === activePickup;
          const hoursToExpiry =
            (new Date(d.expiryDeadline).getTime() - Date.now()) / 3600000;
          const isUrgent = hoursToExpiry < 2;

          return (
            <motion.button
              key={d.id}
              initial={{ y: -30, opacity: 0, scale: 0.5 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{
                delay: i * 0.1,
                type: "spring",
                stiffness: 300,
                damping: 18,
              }}
              whileTap={{ scale: 0.85 }}
              onClick={() => setActivePickup(d.id)}
              style={{ left: pos.left, top: pos.top }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 ${
                isActive ? "z-20" : "z-10"
              }`}
            >
              <div
                className={`relative flex items-center justify-center rounded-full ring-3 ring-white transition-all ${
                  isActive
                    ? "h-12 w-12 bg-zw-accent-600"
                    : isUrgent
                      ? "zw-urgency-pulse h-9 w-9 bg-zw-danger"
                      : "h-9 w-9 bg-zw-primary-700"
                }`}
              >
                <Package
                  size={isActive ? 18 : 14}
                  className="text-white"
                />
              </div>
              {isActive && (
                <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-zw-accent-600 px-2 py-0.5 text-[9px] font-bold text-white">
                  {d.servings} servings · {d.pickupDistanceKm}km
                </div>
              )}
            </motion.button>
          );
        })}

        {/* Bottom card */}
        <div className="absolute inset-x-0 bottom-0 z-30">
          <AnimatePresence mode="wait">
            {activeDonation ? (
              <motion.div
                key={activeDonation.id}
                initial={{ y: 200 }}
                animate={{ y: 0 }}
                exit={{ y: 200 }}
                transition={{ type: "spring", stiffness: 400, damping: 36 }}
                className="rounded-t-3xl bg-white p-4 shadow-2xl"
              >
                <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-zw-border-strong" />

                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${activeDonation.imageColor}`}
                  >
                    <Package size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-display text-[14px] font-bold text-zw-text-primary">
                        {activeDonation.donorName}
                      </h3>
                      <span className="rounded-full bg-zw-primary-100 px-1.5 py-0.5 text-[9px] font-bold text-zw-primary-800">
                        AI Match {activeDonation.aiMatchScore}%
                      </span>
                    </div>
                    <p className="text-[11px] text-zw-text-secondary line-clamp-1">
                      {activeDonation.title}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-[10px] text-zw-text-muted">
                      <span className="flex items-center gap-1">
                        <MapPin size={9} /> {activeDonation.pickupDistanceKm}km
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={9} /> expires{" "}
                        <Countdown
                          deadline={activeDonation.expiryDeadline}
                          variant="compact"
                        />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Earning estimate */}
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-zw-primary-50 p-2">
                    <div className="font-display text-sm font-bold text-zw-primary-800">
                      {activeDonation.servings}
                    </div>
                    <div className="text-[9px] text-zw-text-muted">Meals</div>
                  </div>
                  <div className="rounded-lg bg-amber-50 p-2">
                    <div className="font-display text-sm font-bold text-zw-accent-700">
                      +{activeDonation.servings * 3}
                    </div>
                    <div className="text-[9px] text-zw-text-muted">Points</div>
                  </div>
                  <div className="rounded-lg bg-emerald-50 p-2">
                    <div className="font-display text-sm font-bold text-zw-success">
                      ₹{Math.round(activeDonation.pickupDistanceKm * 12)}
                    </div>
                    <div className="text-[9px] text-zw-text-muted">Earning</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-3 flex gap-2">
                  <button className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl border border-zw-border bg-white text-[13px] font-semibold text-zw-text-secondary">
                    <Navigation size={14} />
                    Navigate
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl bg-zw-primary-700 text-[13px] font-semibold text-white shadow-md shadow-zw-primary-700/25"
                  >
                    <Zap size={14} />
                    Accept Pickup
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ y: 200 }}
                animate={{ y: 0 }}
                exit={{ y: 200 }}
                className="rounded-t-3xl bg-white p-5 shadow-2xl"
              >
                <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-zw-border-strong" />
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-zw-primary-700" />
                  <span className="text-[12px] font-semibold text-zw-text-primary">
                    Tap a pin to see pickup details
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-zw-text-secondary">
                  {listed.length} donations available within 5km
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
