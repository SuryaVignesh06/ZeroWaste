"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { ChevronLeft, Camera, Bike, Car, Truck, Footprints, Sun, CloudSun, Moon, RefreshCw, MapPin, CheckCircle2 } from "lucide-react";

export function VolunteerSetup() {
  const setScreen = useAppStore((s) => s.setScreen);
  const saveVolunteerProfile = useAppStore((s) => s.saveVolunteerProfile);
  const completeSetup = useAppStore((s) => s.completeSetup);

  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);

  // Step 1
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [availability, setAvailability] = useState("");
  const [showLocationDrawer, setShowLocationDrawer] = useState(false);

  // Step 2
  const [radius, setRadius] = useState(5);
  const [consents, setConsents] = useState({
    license: false,
    hygiene: false,
    unpaid: false,
    background: false,
  });

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const isStep1Valid = name && location && vehicle && availability;
  const isStep2Valid =
    (vehicle === "on_foot" || vehicle === "bicycle" || consents.license) &&
    consents.hygiene &&
    consents.unpaid &&
    consents.background;

  const handleNext = () => {
    if (step === 1 && isStep1Valid) setStep(2);
    else if (step === 2 && isStep2Valid) {
      saveVolunteerProfile({ name, location, vehicle, availability, radius, consents });
      setSuccess(true);
    }
  };

  const finishSetup = () => {
    completeSetup();
    setScreen("volunteerHome" as any);
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
            <div className={`h-1.5 w-8 rounded-full ${step >= 1 ? "bg-[#D97706]" : "bg-[#E8E8E4]"}`} />
            <div className={`h-1.5 w-8 rounded-full ${step >= 2 ? "bg-[#D97706]" : "bg-[#E8E8E4]"}`} />
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
                  Personal Details
                </h1>
                <p className="mt-1 text-[15px] text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Set up your volunteer profile.
                </p>

                {/* Avatar Uploader */}
                <div className="mt-8 flex justify-center">
                  <div className="relative">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#E8E8E4] overflow-hidden border-4 border-white shadow-sm">
                      {initials ? (
                        <span className="text-[32px] font-bold text-[#D97706]" style={{ fontFamily: "var(--font-outfit)" }}>{initials}</span>
                      ) : (
                        <UserPlaceholder />
                      )}
                    </div>
                    <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#D97706] border-2 border-white text-white shadow-sm">
                      <Camera size={14} />
                    </button>
                  </div>
                </div>

                <div className="mt-10 flex flex-col gap-6">
                  <div>
                    <label className="mb-2 block text-[13px] font-bold text-[#4A4A4A] uppercase tracking-wider" style={{ fontFamily: "var(--font-jakarta)" }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Arun Kumar"
                      className="w-full rounded-[16px] border border-[#E8E8E4] bg-white px-4 py-4 text-[16px] font-medium text-[#0A0A0A] focus:border-[#D97706] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[13px] font-bold text-[#4A4A4A] uppercase tracking-wider" style={{ fontFamily: "var(--font-jakarta)" }}>
                      Primary Location
                    </label>
                    <div
                      onClick={() => setShowLocationDrawer(true)}
                      className="flex w-full items-center gap-3 rounded-[16px] border border-[#E8E8E4] bg-white px-4 py-4 text-[16px]"
                    >
                      <MapPin size={18} className="text-[#8A8A8A]" />
                      <span className={`font-medium ${location ? "text-[#0A0A0A]" : "text-[#8A8A8A]"}`}>
                        {location || "Select operating area"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-[13px] font-bold text-[#4A4A4A] uppercase tracking-wider" style={{ fontFamily: "var(--font-jakarta)" }}>
                      Vehicle Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: "bicycle", icon: Bike, label: "Bicycle" },
                        { id: "2wheeler", icon: Bike, label: "2-Wheeler" },
                        { id: "4wheeler", icon: Car, label: "4-Wheeler" },
                        { id: "on_foot", icon: Footprints, label: "On Foot" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setVehicle(item.id)}
                          className={`flex flex-col items-center gap-2 rounded-[16px] border p-4 transition-all ${
                            vehicle === item.id
                              ? "border-[#D97706] bg-[#FFFBEB] text-[#D97706]"
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
                      Typical Availability
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: "morning", icon: Sun, label: "Morning" },
                        { id: "afternoon", icon: CloudSun, label: "Afternoon" },
                        { id: "evening", icon: Moon, label: "Evening" },
                        { id: "flexible", icon: RefreshCw, label: "Flexible" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setAvailability(item.id)}
                          className={`flex flex-col items-center gap-2 rounded-[16px] border p-4 transition-all ${
                            availability === item.id
                              ? "border-[#D97706] bg-[#FFFBEB] text-[#D97706]"
                              : "border-[#E8E8E4] bg-white text-[#4A4A4A]"
                          }`}
                        >
                          <item.icon size={24} />
                          <span className="text-[14px] font-bold" style={{ fontFamily: "var(--font-jakarta)" }}>{item.label}</span>
                        </button>
                      ))}
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
                  Zone & Consent
                </h1>
                
                <div className="mt-8 flex flex-col gap-8">
                  {/* Slider */}
                  <div>
                    <div className="mb-2 flex justify-between">
                      <label className="text-[13px] font-bold text-[#4A4A4A] uppercase tracking-wider" style={{ fontFamily: "var(--font-jakarta)" }}>
                        Default Active Zone
                      </label>
                      <span className="font-bold text-[#D97706]">{radius} km</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="15"
                      value={radius}
                      onChange={(e) => setRadius(parseInt(e.target.value))}
                      className="w-full accent-[#D97706]"
                    />
                    <div className="flex justify-between mt-1 text-[11px] text-[#8A8A8A]">
                      <span>1 km</span>
                      <span>15 km</span>
                    </div>
                  </div>

                  {/* Consents */}
                  <div>
                    <label className="mb-4 block text-[13px] font-bold text-[#4A4A4A] uppercase tracking-wider" style={{ fontFamily: "var(--font-jakarta)" }}>
                      Mandatory Consents
                    </label>
                    <div className="flex flex-col gap-4">
                      {vehicle !== "on_foot" && vehicle !== "bicycle" && (
                        <Checkbox
                          label="I have a valid driving license."
                          checked={consents.license}
                          onChange={(v: boolean) => setConsents({ ...consents, license: v })}
                        />
                      )}
                      <Checkbox
                        label="I will maintain food safety and hygiene protocols."
                        checked={consents.hygiene}
                        onChange={(v: boolean) => setConsents({ ...consents, hygiene: v })}
                      />
                      <Checkbox
                        label="I understand this is unpaid volunteer work."
                        checked={consents.unpaid}
                        onChange={(v: boolean) => setConsents({ ...consents, unpaid: v })}
                      />
                      <Checkbox
                        label="I agree to the background check policy."
                        checked={consents.background}
                        onChange={(v: boolean) => setConsents({ ...consents, background: v })}
                      />
                    </div>
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
            className="flex h-14 w-full items-center justify-center rounded-full bg-[#D97706] text-[17px] font-bold text-white transition-opacity disabled:opacity-50 shadow-[0_8px_20px_rgba(217,119,6,0.25)]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            {step === 1 ? "Continue" : "Complete Profile"}
          </button>
        </div>
      )}

      {/* Location Drawer */}
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
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#D97706] px-6"
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
              Ready to Roll!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-3 text-center text-[16px] text-white/90"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              You're all set to start rescuing food and delivering hope.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              onClick={finishSetup}
              className="absolute bottom-10 left-6 right-6 flex h-14 items-center justify-center rounded-full bg-white text-[17px] font-bold text-[#D97706] shadow-xl"
            >
              Go to Volunteer Hub
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Checkbox({ label, checked, onChange }: any) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="flex items-start gap-4 text-left group"
    >
      <div
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-[8px] border-2 transition-colors ${
          checked ? "border-[#D97706] bg-[#D97706]" : "border-[#E8E8E4] bg-white group-hover:border-[#D97706]"
        }`}
      >
        {checked && <CheckCircle2 size={16} className="text-white" />}
      </div>
      <span className="text-[15px] font-medium leading-relaxed text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>
        {label}
      </span>
    </button>
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
