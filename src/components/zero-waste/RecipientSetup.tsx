"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { ChevronLeft, Heart, Shield, Minus, Plus, Utensils, Package, Calendar, Star, CheckCircle2, Bell } from "lucide-react";

export function RecipientSetup() {
  const setScreen = useAppStore((s) => s.setScreen);
  const saveRecipientProfile = useAppStore((s) => s.saveRecipientProfile);
  const completeSetup = useAppStore((s) => s.completeSetup);

  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);

  // Step 1
  const [name, setName] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [familySize, setFamilySize] = useState(1);

  // Step 2
  const [dietary, setDietary] = useState("");
  const [supportType, setSupportType] = useState("");
  const [notifications, setNotifications] = useState(true);

  const isStep1Valid = name && neighborhood;
  const isStep2Valid = supportType !== "";

  const handleNext = () => {
    if (step === 1 && isStep1Valid) setStep(2);
    else if (step === 2 && isStep2Valid) {
      saveRecipientProfile({ name, neighborhood, familySize, dietary, supportType, notifications });
      setSuccess(true);
    }
  };

  const finishSetup = () => {
    completeSetup();
    setScreen("recipient-home" as any); // Note: We will build recipient-home later
  };

  return (
    <div className="relative flex h-full flex-col bg-[#F7F5F0]">
      {/* Top Header */}
      {!success && (
        <div className="flex items-center justify-between px-4 pt-12 pb-4">
          <button
            onClick={() => (step === 1 ? setScreen("role-select") : setStep(1))}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm"
          >
            <ChevronLeft size={20} className="text-[#0A0A0A]" />
          </button>
          <div className="flex gap-2">
            <div className={`h-1.5 w-8 rounded-full ${step >= 1 ? "bg-[#6B21A8]" : "bg-[#E8E8E4]"}`} />
            <div className={`h-1.5 w-8 rounded-full ${step >= 2 ? "bg-[#6B21A8]" : "bg-[#E8E8E4]"}`} />
          </div>
          <div className="w-11" />
        </div>
      )}

      {/* Content */}
      {!success && (
        <main className="flex-1 overflow-y-auto px-6 pb-24">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col pt-4"
              >
                <h1 className="text-[28px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
                  Basic Info
                </h1>
                
                {/* Dignity Callout */}
                <div className="mt-6 flex items-start gap-4 rounded-[20px] bg-[#FAF5FF] p-5 border border-[#E9D5FF]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#6B21A8]/10">
                    <Shield size={20} className="text-[#6B21A8]" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-[#6B21A8]" style={{ fontFamily: "var(--font-outfit)" }}>Judgment-Free Zone</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                      You are not alone. Your information is kept strictly private and is only used to connect you with nearby food sources.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-6">
                  <div>
                    <label className="mb-2 block text-[13px] font-bold text-[#4A4A4A] uppercase tracking-wider" style={{ fontFamily: "var(--font-jakarta)" }}>
                      What should we call you?
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nickname or First Name"
                      className="w-full rounded-[16px] border border-[#E8E8E4] bg-white px-4 py-4 text-[16px] font-medium text-[#0A0A0A] focus:border-[#6B21A8] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[13px] font-bold text-[#4A4A4A] uppercase tracking-wider" style={{ fontFamily: "var(--font-jakarta)" }}>
                      Which neighborhood are you in?
                    </label>
                    <input
                      type="text"
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                      placeholder="e.g. Indiranagar, Sector 4"
                      className="w-full rounded-[16px] border border-[#E8E8E4] bg-white px-4 py-4 text-[16px] font-medium text-[#0A0A0A] focus:border-[#6B21A8] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[13px] font-bold text-[#4A4A4A] uppercase tracking-wider" style={{ fontFamily: "var(--font-jakarta)" }}>
                      Family Size (People to feed)
                    </label>
                    <div className="flex items-center justify-between rounded-[16px] border border-[#E8E8E4] bg-white px-6 py-3">
                      <button 
                        onClick={() => setFamilySize(Math.max(1, familySize - 1))}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F7F5F0] text-[#0A0A0A]"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="text-[24px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
                        {familySize}
                      </span>
                      <button 
                        onClick={() => setFamilySize(Math.min(15, familySize + 1))}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F7F5F0] text-[#0A0A0A]"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col pt-4"
              >
                <h1 className="text-[28px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
                  Needs & Preferences
                </h1>
                
                <div className="mt-8 flex flex-col gap-8">
                  <div>
                    <label className="mb-2 block text-[13px] font-bold text-[#4A4A4A] uppercase tracking-wider" style={{ fontFamily: "var(--font-jakarta)" }}>
                      Primary Support Needed
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: "daily", icon: Utensils, label: "Daily Meals" },
                        { id: "ration", icon: Package, label: "Dry Ration Kits" },
                        { id: "weekend", icon: Calendar, label: "Weekend Support" },
                        { id: "special", icon: Star, label: "Special Needs" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setSupportType(item.id)}
                          className={`flex flex-col items-center gap-2 rounded-[16px] border p-4 transition-all ${
                            supportType === item.id
                              ? "border-[#6B21A8] bg-[#FAF5FF] text-[#6B21A8]"
                              : "border-[#E8E8E4] bg-white text-[#4A4A4A]"
                          }`}
                        >
                          <item.icon size={24} />
                          <span className="text-[14px] font-bold" style={{ fontFamily: "var(--font-jakarta)" }}>{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-[13px] font-bold text-[#4A4A4A] uppercase tracking-wider" style={{ fontFamily: "var(--font-jakarta)" }}>
                      Dietary Requirements / Allergies (Optional)
                    </label>
                    <textarea
                      value={dietary}
                      onChange={(e) => setDietary(e.target.value)}
                      placeholder="e.g. No peanuts, Vegetarian..."
                      rows={3}
                      className="w-full rounded-[16px] border border-[#E8E8E4] bg-white px-4 py-3 text-[16px] font-medium text-[#0A0A0A] focus:border-[#6B21A8] focus:outline-none resize-none"
                    />
                  </div>

                  {/* Notifications */}
                  <div className="flex items-center justify-between rounded-[20px] bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FAF5FF]">
                        <Bell size={20} className="text-[#6B21A8]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[14px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-jakarta)" }}>Alerts</p>
                        <p className="text-[12px] text-[#4A4A4A] mt-0.5">Notify when food is near</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setNotifications(!notifications)}
                      className={`relative flex h-7 w-12 items-center rounded-full p-1 transition-colors ${
                        notifications ? "bg-[#6B21A8]" : "bg-[#E8E8E4]"
                      }`}
                    >
                      <motion.div
                        className="h-5 w-5 rounded-full bg-white shadow-sm"
                        layout
                        animate={{ x: notifications ? 20 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      )}

      {/* Bottom Button */}
      {!success && (
        <div className="fixed bottom-0 left-0 right-0 bg-white p-6 shadow-[0_-8px_20px_rgba(0,0,0,0.04)]">
          <button
            onClick={handleNext}
            disabled={(step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid)}
            className="flex h-14 w-full items-center justify-center rounded-full bg-[#6B21A8] text-[17px] font-bold text-white transition-opacity disabled:opacity-50 shadow-[0_8px_20px_rgba(107,33,168,0.25)]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            {step === 1 ? "Continue" : "Complete Profile"}
          </button>
        </div>
      )}

      {/* Success Screen */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#6B21A8] px-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, delay: 0.3 }}
              className="flex h-28 w-28 items-center justify-center rounded-full bg-white/20"
            >
              <Heart size={56} className="text-white" fill="white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center text-[36px] font-extrabold text-white"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Welcome Home
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-3 text-center text-[16px] text-white/90 leading-relaxed"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              We are here to support you. Let's find some food nearby.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              onClick={finishSetup}
              className="absolute bottom-10 left-6 right-6 flex h-14 items-center justify-center rounded-full bg-white text-[17px] font-bold text-[#6B21A8] shadow-xl"
            >
              Find Food Now
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
