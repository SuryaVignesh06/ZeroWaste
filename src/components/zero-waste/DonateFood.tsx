"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import {
  ChevronLeft,
  Camera,
  Sparkles,
  Check,
  MapPin,
  Clock,
  Calendar,
  Utensils,
  Apple,
  Package,
  ChevronRight,
  PartyPopper,
  Loader2,
} from "lucide-react";

const CATEGORIES = [
  { id: "cooked", label: "Cooked Food", icon: Utensils },
  { id: "raw", label: "Raw / Vegetables", icon: Apple },
  { id: "packaged", label: "Packaged", icon: Package },
];

const AI_RECOGNITION_RESULT = {
  title: "Veg Biryani + Curd Rice (Serves ~15)",
  category: "cooked",
  quantity: 15,
  servings: 15,
  aiFreshness: 0.92,
  suggestedExpiry: 5,
  detectedItems: [
    "Vegetable biryani (~10 servings)",
    "Curd rice (~5 servings)",
    "Sealed packaging detected",
  ],
};

export function DonateFood() {
  const step = useAppStore((s) => s.donateStep);
  const setStep = useAppStore((s) => s.setDonateStep);
  const form = useAppStore((s) => s.donateForm);
  const setForm = useAppStore((s) => s.setDonateForm);
  const resetForm = useAppStore((s) => s.resetDonateForm);
  const setScreen = useAppStore((s) => s.setScreen);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiDone, setAiDone] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleAiRecognize = () => {
    setAiLoading(true);
    setTimeout(() => {
      setAiLoading(false);
      setAiDone(true);
      setForm({
        title: AI_RECOGNITION_RESULT.title,
        category: AI_RECOGNITION_RESULT.category,
        quantity: AI_RECOGNITION_RESULT.quantity,
        servings: AI_RECOGNITION_RESULT.servings,
        expiryHours: AI_RECOGNITION_RESULT.suggestedExpiry,
        aiRecognized: true,
      });
    }, 1800);
  };

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => {
      resetForm();
      setConfirmed(false);
      setScreen("home");
    }, 2200);
  };

  const canProceed =
    (step === 1 && form.title && form.quantity > 0) ||
    (step === 2 && form.pickupAddress) ||
    step === 3;

  return (
    <div className="relative flex h-full flex-col">
      <div className="absolute inset-0 -z-10 bg-zw-aurora" />
      <div className="blob bg-zw-primary-300/30 zw-float-slow" style={{ width: 250, height: 250, top: "10%", right: "-20%" }} />

      {/* Header */}
      <div className="px-5 pb-3 pt-4">
        <div className="absolute inset-0 -z-10 bg-white/60 backdrop-blur-xl border-b border-zw-border-strong" />
        <div className="mb-3 flex items-center gap-3">
          <button
            onClick={() => {
              if (step === 1) setScreen("home");
              else setStep(step - 1);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full glass active:scale-95"
          >
            <ChevronLeft size={18} />
          </button>
          <h1 className="font-display text-lg font-bold tracking-tight text-zw-text-primary">
            Donate Food
          </h1>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s, i) => (
            <div key={s} className="flex flex-1 items-center gap-2">
              <div className="flex items-center gap-2">
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor:
                      step >= s
                        ? "var(--color-zw-primary-700)"
                        : "rgba(0, 0, 0, 0.1)",
                    scale: step === s ? 1.1 : 1,
                  }}
                  className="flex h-7 w-7 items-center justify-center rounded-full"
                >
                  {step > s ? (
                    <Check size={14} strokeWidth={3} className="text-white" />
                  ) : (
                    <span className="text-[12px] font-bold text-white">{s}</span>
                  )}
                </motion.div>
                <span
                  className={`text-[11px] font-semibold ${
                    step >= s ? "text-zw-text-primary" : "text-zw-text-muted"
                  }`}
                >
                  {["What", "When & Where", "Review"][i]}
                </span>
              </div>
              {i < 2 && (
                <div className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-black/10">
                  <motion.div
                    initial={false}
                    animate={{ width: step > s ? "100%" : "0%" }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-y-0 left-0 bg-zw-primary-700"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="flex-1 overflow-y-auto zw-scroll px-5 pb-32 pt-5">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-display text-base font-bold text-zw-text-primary">
                Add photos of the food
              </h2>
              <p className="mt-1 text-[12px] text-zw-text-secondary">
                Our AI will identify the food and suggest details
              </p>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <button
                  onClick={handleAiRecognize}
                  className="relative flex aspect-square flex-col items-center justify-center gap-1 rounded-3xl border-2 border-dashed border-zw-primary-300 bg-zw-primary-50/80 backdrop-blur-md active:scale-95"
                >
                  {aiLoading ? (
                    <Loader2 size={20} className="animate-spin text-zw-primary-700" />
                  ) : aiDone ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex h-full w-full flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-200"
                    >
                      <Check size={24} className="text-zw-primary-700" />
                    </motion.div>
                  ) : (
                    <>
                      <Camera size={22} className="text-zw-primary-700" />
                      <span className="text-[10px] font-semibold text-zw-primary-700">
                        Add photo
                      </span>
                    </>
                  )}
                </button>
                {[0, 1].map((i) => (
                  <div
                    key={i}
                    className="flex aspect-square items-center justify-center rounded-3xl border border-dashed border-zw-border-strong bg-white/40 backdrop-blur-md"
                  >
                    <Camera size={18} className="text-zw-text-muted" />
                  </div>
                ))}
              </div>

              {/* AI recognition result */}
              <AnimatePresence>
                {aiDone && (
                  <motion.div
                    initial={{ y: 20, opacity: 0, height: 0 }}
                    animate={{ y: 0, opacity: 1, height: "auto" }}
                    exit={{ y: -20, opacity: 0, height: 0 }}
                    className="mt-4 overflow-hidden rounded-3xl glass glass-inset p-4"
                  >
                    <div className="flex items-center gap-2">
                      <div className="zw-ai-border h-7 w-7 rounded-lg p-[1.5px]">
                        <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-white">
                          <Sparkles size={13} className="text-zw-primary-700" />
                        </div>
                      </div>
                      <span className="text-[13px] font-bold text-zw-text-primary">
                        AI Recognition Complete
                      </span>
                      <span className="ml-auto rounded-full bg-zw-primary-100 px-2 py-0.5 text-[10px] font-bold text-zw-primary-700">
                        {Math.round(AI_RECOGNITION_RESULT.aiFreshness * 100)}% fresh
                      </span>
                    </div>
                    <div className="mt-3 space-y-1.5">
                      {AI_RECOGNITION_RESULT.detectedItems.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          <Check
                            size={12}
                            strokeWidth={3}
                            className="text-zw-primary-700"
                          />
                          <span className="text-[12px] text-zw-text-secondary">
                            {item}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Title */}
              <div className="mt-5">
                <label className="text-[12px] font-semibold text-zw-text-primary">
                  Food title
                </label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ title: e.target.value })}
                  placeholder="e.g., Wedding Reception Surplus"
                  className="mt-1.5 h-12 w-full rounded-2xl glass px-3 text-[13px] focus:outline-none focus:ring-2 focus:ring-zw-primary-400/40"
                />
              </div>

              {/* Category */}
              <div className="mt-4">
                <label className="text-[12px] font-semibold text-zw-text-primary">
                  Category
                </label>
                <div className="mt-1.5 grid grid-cols-3 gap-2">
                  {CATEGORIES.map((c) => {
                    const Icon = c.icon;
                    const active = form.category === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setForm({ category: c.id })}
                        className={`flex flex-col items-center gap-1.5 rounded-2xl border p-3 transition-all ${
                          active
                            ? "border-zw-primary-600 bg-zw-primary-50 ring-2 ring-zw-primary-400/40"
                            : "border-zw-border-strong bg-white/60 backdrop-blur-md"
                        }`}
                      >
                        <Icon
                          size={20}
                          className={
                            active
                              ? "text-zw-primary-700"
                              : "text-zw-text-muted"
                          }
                        />
                        <span
                          className={`text-[10px] font-semibold ${
                            active
                              ? "text-zw-primary-900"
                              : "text-zw-text-secondary"
                          }`}
                        >
                          {c.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Servings */}
              <div className="mt-4">
                <label className="text-[12px] font-semibold text-zw-text-primary">
                  Number of servings
                </label>
                <div className="mt-1.5 flex items-center gap-2">
                  <button
                    onClick={() =>
                      setForm({
                        quantity: Math.max(1, form.quantity - 5),
                        servings: Math.max(1, form.quantity - 5),
                      })
                    }
                    className="flex h-12 w-12 items-center justify-center rounded-2xl glass text-xl font-bold text-zw-text-primary active:scale-95"
                  >
                    -
                  </button>
                  <div className="flex h-12 flex-1 items-center justify-center rounded-2xl glass">
                    <span className="font-display text-base font-bold">
                      {form.servings}
                    </span>
                    <span className="ml-1 text-[12px] text-zw-text-muted">
                      servings
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      setForm({
                        quantity: form.quantity + 5,
                        servings: form.servings + 5,
                      })
                    }
                    className="flex h-12 w-12 items-center justify-center rounded-2xl glass text-xl font-bold text-zw-text-primary active:scale-95"
                  >
                    +
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-display text-base font-bold text-zw-text-primary">
                Pickup location & timing
              </h2>
              <p className="mt-1 text-[12px] text-zw-text-secondary">
                NGO volunteers need this info to plan pickup
              </p>

              {/* Mini map */}
              <div className="mt-4 relative h-44 overflow-hidden rounded-3xl glass">
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "linear-gradient(0deg, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="zw-urgency-pulse-amber relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-zw-accent-500 to-zw-accent-700 ring-4 ring-white">
                    <MapPin size={16} className="text-white" />
                  </div>
                </motion.div>
                <div className="absolute bottom-2 right-2 rounded-full glass-strong px-2.5 py-1 text-[10px] font-medium text-zw-text-secondary">
                  Anna Nagar, Chennai
                </div>
              </div>

              {/* Address */}
              <div className="mt-4">
                <label className="text-[12px] font-semibold text-zw-text-primary">
                  Pickup address
                </label>
                <textarea
                  value={form.pickupAddress}
                  onChange={(e) => setForm({ pickupAddress: e.target.value })}
                  placeholder="Flat / House no, Street, Area, Landmark"
                  rows={3}
                  className="mt-1.5 w-full rounded-2xl glass p-3 text-[13px] focus:outline-none focus:ring-2 focus:ring-zw-primary-400/40"
                />
              </div>

              {/* Pickup window */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[12px] font-semibold text-zw-text-primary">
                    Pickup from
                  </label>
                  <div className="mt-1.5 flex h-12 items-center gap-2 rounded-2xl glass px-3">
                    <Clock size={14} className="text-zw-text-muted" />
                    <span className="text-[13px] font-medium text-zw-text-primary">
                      Now
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-zw-text-primary">
                    Until
                  </label>
                  <div className="mt-1.5 flex h-12 items-center gap-2 rounded-2xl glass px-3">
                    <Calendar size={14} className="text-zw-text-muted" />
                    <span className="text-[13px] font-medium text-zw-text-primary">
                      in 2 hours
                    </span>
                  </div>
                </div>
              </div>

              {/* AI expiry suggestion */}
              <div className="mt-4 rounded-3xl glass glass-inset p-4">
                <div className="flex items-center gap-2">
                  <div className="zw-ai-border h-7 w-7 rounded-lg p-[1.5px]">
                    <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-white">
                      <Sparkles size={13} className="text-zw-primary-700" />
                    </div>
                  </div>
                  <span className="text-[12px] font-bold text-zw-text-primary">
                    AI suggests expiry window
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-zw-text-secondary">
                  Based on the food type and storage, consume within:
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => setForm({ expiryHours: 3 })}
                    className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all ${
                      form.expiryHours === 3
                        ? "bg-gradient-to-br from-zw-primary-600 to-zw-primary-800 text-white shadow-sm"
                        : "glass text-zw-text-secondary"
                    }`}
                  >
                    3 hours
                  </button>
                  <button
                    onClick={() => setForm({ expiryHours: 5 })}
                    className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all ${
                      form.expiryHours === 5
                        ? "bg-gradient-to-br from-zw-primary-600 to-zw-primary-800 text-white shadow-sm"
                        : "glass text-zw-text-secondary"
                    }`}
                  >
                    5 hours
                  </button>
                  <button
                    onClick={() => setForm({ expiryHours: 8 })}
                    className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all ${
                      form.expiryHours === 8
                        ? "bg-gradient-to-br from-zw-primary-600 to-zw-primary-800 text-white shadow-sm"
                        : "glass text-zw-text-secondary"
                    }`}
                  >
                    8 hours
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-display text-base font-bold text-zw-text-primary">
                Review your donation
              </h2>
              <p className="mt-1 text-[12px] text-zw-text-secondary">
                Make sure everything looks correct
              </p>

              {/* Summary card */}
              <div className="mt-4 overflow-hidden rounded-3xl glass glass-inset">
                <div className="flex items-center gap-3 border-b border-zw-divider p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-200">
                    <Utensils size={22} className="text-zw-primary-800" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-[14px] font-bold text-zw-text-primary">
                      {form.title || "Veg Biryani + Curd Rice"}
                    </h3>
                    <p className="text-[11px] text-zw-text-secondary">
                      {form.servings} servings · {form.category} food
                    </p>
                  </div>
                </div>

                <div className="divide-y divide-zw-divider">
                  <SummaryRow
                    icon={<MapPin size={14} />}
                    label="Pickup address"
                    value={form.pickupAddress || "Anna Nagar, Chennai"}
                  />
                  <SummaryRow
                    icon={<Clock size={14} />}
                    label="Pickup window"
                    value="Now — in 2 hours"
                  />
                  <SummaryRow
                    icon={<Sparkles size={14} />}
                    label="AI expiry window"
                    value={`${form.expiryHours} hours from now`}
                  />
                  <SummaryRow
                    icon={<Calendar size={14} />}
                    label="NGO preference"
                    value="Auto-match nearest NGO"
                  />
                </div>
              </div>

              {/* Impact preview */}
              <div className="mt-4 overflow-hidden rounded-3xl glass-primary p-4 text-white">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-zw-primary-100" />
                  <span className="text-[13px] font-bold">
                    Predicted Impact
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="font-display text-xl font-bold">
                      {form.servings}
                    </div>
                    <div className="text-[10px] text-white/80">Meals saved</div>
                  </div>
                  <div>
                    <div className="font-display text-xl font-bold">
                      {(form.servings * 0.4).toFixed(1)}kg
                    </div>
                    <div className="text-[10px] text-white/80">CO2 saved</div>
                  </div>
                  <div>
                    <div className="font-display text-xl font-bold">
                      +{form.servings * 3}
                    </div>
                    <div className="text-[10px] text-white/80">Points</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA */}
      <div className="px-5 py-3">
        <div className="absolute inset-x-0 bottom-0 -z-10 h-[76px] bg-white/80 backdrop-blur-xl border-t border-zw-border-strong" />
        <motion.button
          whileTap={{ scale: 0.97 }}
          disabled={!canProceed}
          onClick={() => {
            if (step === 3) handleConfirm();
            else setStep(step + 1);
          }}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl glass-primary text-[14px] font-semibold text-white disabled:opacity-50"
        >
          {step === 3 ? (
            <>
              <PartyPopper size={18} />
              Confirm Donation
            </>
          ) : (
            <>
              Continue
              <ChevronRight size={16} strokeWidth={2.5} />
            </>
          )}
        </motion.button>
      </div>

      {/* Success overlay */}
      <AnimatePresence>
        {confirmed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-lg px-8"
          >
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              className="flex h-24 w-24 items-center justify-center rounded-full glass-primary shadow-2xl"
            >
              <Check size={48} strokeWidth={3} className="text-white" />
            </motion.div>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 font-display text-xl font-bold text-zw-text-primary"
            >
              Donation listed!
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-2 text-center text-[13px] text-zw-text-secondary"
            >
              NGOs within 5km have been notified. You'll get a notification when someone accepts.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SummaryRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 p-4">
      <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-md bg-zw-primary-50 text-zw-primary-700">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-[11px] font-medium uppercase tracking-wide text-zw-text-muted">
          {label}
        </div>
        <div className="mt-0.5 text-[13px] font-semibold text-zw-text-primary">
          {value}
        </div>
      </div>
    </div>
  );
}
