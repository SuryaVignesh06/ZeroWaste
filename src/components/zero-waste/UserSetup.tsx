"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { Camera, MapPin, ChevronLeft, CheckCircle2, ShoppingBag, HeartHandshake, Bike, Sparkles, Bell } from "lucide-react";

export function UserSetup() {
  const setScreen = useAppStore((s) => s.setScreen);
  const saveUserProfile = useAppStore((s) => s.saveUserProfile);
  const completeSetup = useAppStore((s) => s.completeSetup);

  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);

  // Step 1 Data
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [showLocationDrawer, setShowLocationDrawer] = useState(false);

  // Step 2 Data
  const [interest, setInterest] = useState("");
  const [dietary, setDietary] = useState<string[]>([]);
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const handleNext = () => {
    if (step === 1) {
      if (name && location) setStep(2);
    } else if (step === 2) {
      if (interest) {
        saveUserProfile({
          userName: name,
          userLocationText: location,
          userPreferences: { interest, dietary, alertsEnabled },
        });
        setSuccess(true);
      }
    }
  };

  const finishSetup = () => {
    completeSetup();
    setScreen("home");
  };

  const CITIES = ["Koramangala, Bangalore", "Indiranagar, Bangalore", "Jayanagar, Bangalore", "HSR Layout, Bangalore"];

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
            <div className={`h-1.5 w-8 rounded-full ${step >= 1 ? "bg-[#1A6B3C]" : "bg-[#E8E8E4]"}`} />
            <div className={`h-1.5 w-8 rounded-full ${step >= 2 ? "bg-[#1A6B3C]" : "bg-[#E8E8E4]"}`} />
          </div>
          <div className="w-11" /> {/* Spacer */}
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
                  Create your profile
                </h1>
                <p className="mt-1 text-[15px] text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Tell us a bit about yourself.
                </p>

                {/* Avatar Uploader */}
                <div className="mt-8 flex justify-center">
                  <div className="relative">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#E8E8E4] overflow-hidden border-4 border-white shadow-sm">
                      {initials ? (
                        <span className="text-[32px] font-bold text-[#1A6B3C]" style={{ fontFamily: "var(--font-outfit)" }}>{initials}</span>
                      ) : (
                        <UserPlaceholder />
                      )}
                    </div>
                    <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#1A6B3C] border-2 border-white text-white shadow-sm">
                      <Camera size={14} />
                    </button>
                  </div>
                </div>

                {/* Fields */}
                <div className="mt-10 flex flex-col gap-5">
                  <div>
                    <label className="mb-2 block text-[13px] font-bold text-[#4A4A4A] uppercase tracking-wider" style={{ fontFamily: "var(--font-jakarta)" }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full rounded-[16px] border border-[#E8E8E4] bg-white px-4 py-4 text-[16px] font-medium text-[#0A0A0A] focus:border-[#1A6B3C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[13px] font-bold text-[#4A4A4A] uppercase tracking-wider" style={{ fontFamily: "var(--font-jakarta)" }}>
                      Location
                    </label>
                    <div
                      onClick={() => setShowLocationDrawer(true)}
                      className="flex w-full items-center gap-3 rounded-[16px] border border-[#E8E8E4] bg-white px-4 py-4 text-[16px]"
                    >
                      <MapPin size={18} className="text-[#8A8A8A]" />
                      <span className={`font-medium ${location ? "text-[#0A0A0A]" : "text-[#8A8A8A]"}`}>
                        {location || "Search your area"}
                      </span>
                    </div>
                    <button className="mt-2 text-[13px] font-semibold text-[#1A6B3C]" style={{ fontFamily: "var(--font-jakarta)" }}>
                      Use my current location
                    </button>
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
                  Your preferences
                </h1>
                <p className="mt-1 text-[15px] text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                  What are you most interested in?
                </p>

                {/* 2x2 Grid */}
                <div className="mt-8 grid grid-cols-2 gap-3">
                  {[
                    { id: "buy", icon: ShoppingBag, label: "Buying Groceries" },
                    { id: "donate", icon: HeartHandshake, label: "Donating Food" },
                    { id: "volunteer", icon: Bike, label: "Volunteering" },
                    { id: "all", icon: Sparkles, label: "All of the above" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setInterest(item.id)}
                      className={`flex flex-col items-center justify-center gap-3 rounded-[20px] border p-4 transition-all ${
                        interest === item.id
                          ? "border-[#1A6B3C] bg-[#F0F7F2] text-[#1A6B3C]"
                          : "border-[#E8E8E4] bg-white text-[#4A4A4A]"
                      }`}
                    >
                      <item.icon size={28} />
                      <span className="text-[14px] font-bold text-center" style={{ fontFamily: "var(--font-jakarta)" }}>{item.label}</span>
                    </button>
                  ))}
                </div>

                {/* Dietary */}
                <div className="mt-10">
                  <label className="mb-3 block text-[13px] font-bold text-[#4A4A4A] uppercase tracking-wider" style={{ fontFamily: "var(--font-jakarta)" }}>
                    Dietary Preferences (Optional)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Vegetarian", "Vegan", "Gluten-Free", "Halal", "Jain"].map((diet) => (
                      <button
                        key={diet}
                        onClick={() => {
                          setDietary((prev) =>
                            prev.includes(diet) ? prev.filter((d) => d !== diet) : [...prev, diet]
                          );
                        }}
                        className={`rounded-full px-4 py-2 text-[14px] font-semibold transition-colors ${
                          dietary.includes(diet)
                            ? "bg-[#1A6B3C] text-white"
                            : "bg-white text-[#4A4A4A] border border-[#E8E8E4]"
                        }`}
                      >
                        {diet}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notifications */}
                <div className="mt-10 flex items-center justify-between rounded-[20px] bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F7F2]">
                      <Bell size={20} className="text-[#1A6B3C]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[14px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-jakarta)" }}>Alerts</p>
                      <p className="text-[12px] text-[#4A4A4A] mt-0.5">Grocery discounts near you</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setAlertsEnabled(!alertsEnabled)}
                    className={`relative flex h-7 w-12 items-center rounded-full p-1 transition-colors ${
                      alertsEnabled ? "bg-[#1A6B3C]" : "bg-[#E8E8E4]"
                    }`}
                  >
                    <motion.div
                      className="h-5 w-5 rounded-full bg-white shadow-sm"
                      layout
                      animate={{ x: alertsEnabled ? 20 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </button>
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
            disabled={(step === 1 && (!name || !location)) || (step === 2 && !interest)}
            className="flex h-14 w-full items-center justify-center rounded-full bg-[#1A6B3C] text-[17px] font-bold text-white transition-opacity disabled:opacity-50 shadow-[0_8px_20px_rgba(26,107,60,0.25)]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            {step === 1 ? "Continue" : "Finish Setup"}
          </button>
        </div>
      )}

      {/* Location Bottom Sheet (Mock) */}
      <AnimatePresence>
        {showLocationDrawer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLocationDrawer(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-50 rounded-t-[32px] bg-white px-6 pb-10 pt-4"
            >
              <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-[#E8E8E4]" />
              <h3 className="text-[20px] font-bold text-[#0A0A0A] mb-4" style={{ fontFamily: "var(--font-outfit)" }}>Select Area</h3>
              <div className="flex flex-col gap-2">
                {CITIES.map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setLocation(city);
                      setShowLocationDrawer(false);
                    }}
                    className="flex items-center gap-3 rounded-[16px] p-4 text-left transition-colors hover:bg-[#F7F5F0] active:bg-[#F7F5F0]"
                  >
                    <MapPin size={18} className="text-[#8A8A8A]" />
                    <span className="text-[16px] font-medium text-[#0A0A0A]">{city}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Success Screen */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1A6B3C] px-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, delay: 0.3 }}
              className="flex h-28 w-28 items-center justify-center rounded-full bg-white/20"
            >
              <CheckCircle2 size={56} className="text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center text-[36px] font-extrabold text-white"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              You're all set!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-3 text-center text-[16px] text-white/80"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Welcome to the Zero Waste community. Let's make an impact together.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              onClick={finishSetup}
              className="absolute bottom-10 left-6 right-6 flex h-14 items-center justify-center rounded-full bg-white text-[17px] font-bold text-[#1A6B3C] shadow-xl"
            >
              Explore Zero Waste
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function UserPlaceholder() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#A0A0A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
