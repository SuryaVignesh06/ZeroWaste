"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { slideInRight } from "@/lib/animations";
import { 
  ArrowLeft, MapPin, Navigation, Phone, 
  CheckCircle2, Building2, Package, Camera
} from "lucide-react";
import { CelebrationScreen } from "./CelebrationScreen";

export function PickupDetail() {
  const { setActiveScreen, activeMission, completeMission } = useAppStore();
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [loading, setLoading] = useState(false);
  const [pickupPhotoTaken, setPickupPhotoTaken] = useState(false);
  const [deliveryPhotoTaken, setDeliveryPhotoTaken] = useState(false);

  // Steps:
  // 1: Go to Provider
  // 2: Upload photo of picked up food (simulate)
  // 3: Go to NGO
  // 4: Drop off confirmation
  // 5: Celebration!

  const handleNextStep = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (step === 4) {
        completeMission();
      }
      setStep((s) => (s < 5 ? (s + 1) as any : 5));
    }, 1200);
  };

  // Step 5 = full-screen celebration
  if (step === 5) {
    return (
      <CelebrationScreen
        mode="volunteer"
        title="Delivery Complete! 🚴"
        subtitle={`${activeMission?.servings || 45} meals delivered! Kids at ${activeMission?.ngoName || "Helping Hands NGO"} are smiling because of you! 😊`}
        points={100}
        ctaLabel="Back to Dashboard"
        onDone={() => setActiveScreen("volunteerHome")}
      />
    );
  }

  if (!activeMission) return null;

  return (
    <div className="flex h-full flex-col" style={{ background: "#F7F5F0" }}>
      {/* Header */}
      <div className="sticky top-0 z-30 flex items-center justify-between px-4 py-4"
        style={{ background: "rgba(255,255,255,0.90)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}
      >
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => setActiveScreen("volunteerHome")}
          className="flex h-10 w-10 items-center justify-center rounded-full"
          style={{ background: "#F7F5F0" }}
        >
          <ArrowLeft size={20} className="text-[#0A0A0A]" />
        </motion.button>
        <h1 className="text-lg font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
          Active Mission 🏍️
        </h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-6">
        {/* ── Progress Stepper ── */}
        <div className="flex items-center justify-between px-1">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <motion.div
                initial={false}
                animate={{
                  scale: step === i ? 1.18 : 1,
                  background: step > i ? "#E65100" : step === i ? "#FF8F00" : "#E8E8E4",
                }}
                transition={{ type: "spring", stiffness: 500, damping: 22 }}
                className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm z-10"
                style={{ color: step >= i ? "#fff" : "#8A8A8A" }}
              >
                {step > i ? <CheckCircle2 size={16} /> : i}
              </motion.div>
              {i < 4 && (
                <motion.div
                  className="flex-1 h-1.5 mx-1.5 rounded-full"
                  initial={false}
                  animate={{ background: step > i ? "#E65100" : "#E8E8E4" }}
                  transition={{ duration: 0.4 }}
                />
              )}
            </div>
          ))}
        </div>

        {/* ── Step Content ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={slideInRight}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
          >
            {/* Step 1: Go to Provider */}
            {step === 1 && (
              <div className="bg-white rounded-[28px] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/70 flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center">
                    <MapPin size={26} className="text-[#E65100]" />
                  </div>
                  <div>
                    <h2 className="text-[22px] font-black text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
                      Go to Provider 🏍️
                    </h2>
                    <p className="text-[#8A8A8A] text-sm">Pick up {activeMission.servings} meals from the donor</p>
                  </div>
                </div>
                <div className="bg-orange-50 rounded-2xl p-4 flex justify-between items-center border border-orange-100">
                  <div>
                    <p className="font-bold text-[#0A0A0A] text-lg">{activeMission.providerName}</p>
                    <p className="text-[#4A4A4A] text-sm mt-0.5 flex items-center gap-1">
                      <MapPin size={12} /> {activeMission.providerLocation.address}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <motion.button whileTap={{ scale: 0.88 }} className="h-11 w-11 rounded-full bg-white shadow-md flex items-center justify-center text-[#E65100] border border-orange-100">
                      <Phone size={18} />
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.88 }} className="h-11 w-11 rounded-full bg-[#E65100] shadow-md flex items-center justify-center text-white">
                      <Navigation size={18} />
                    </motion.button>
                  </div>
                </div>

                {/* Motivational tip */}
                <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-3 flex items-center gap-3">
                  <span className="text-2xl">⚡</span>
                  <p className="font-jakarta text-[13px] text-[#5A4A00]">
                    <strong>Quick Tip:</strong> Bring a clean container or bag for pickup!
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Verify Pickup */}
            {step === 2 && (
              <div className="bg-white rounded-[28px] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/70 flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center">
                    <Package size={26} className="text-[#E65100]" />
                  </div>
                  <div>
                    <h2 className="text-[22px] font-black text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
                      Verify Pickup 📦
                    </h2>
                    <p className="text-[#8A8A8A] text-sm">Upload a photo to confirm pickup</p>
                  </div>
                </div>

                {!pickupPhotoTaken ? (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPickupPhotoTaken(true)}
                    className="h-48 w-full bg-gray-50 hover:bg-orange-50/50 rounded-2xl border-2 border-dashed border-gray-300 hover:border-orange-200 transition-colors flex flex-col items-center justify-center gap-4"
                  >
                    <div className="h-16 w-16 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                      <Camera size={28} className="text-[#4A4A4A]" />
                    </div>
                    <div className="text-center">
                      <span className="font-bold text-[#0A0A0A] block">Tap to Open Camera</span>
                      <span className="text-xs text-[#8A8A8A]">Snap a picture of the food</span>
                    </div>
                  </motion.button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-48 w-full bg-green-50 rounded-2xl border-2 border-dashed border-green-200 flex flex-col items-center justify-center gap-3 relative overflow-hidden"
                  >
                    {/* Simulated image background overlay */}
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400')] bg-cover bg-center opacity-30 mix-blend-overlay" />
                    
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      className="h-14 w-14 rounded-full bg-white shadow-md flex items-center justify-center relative z-10"
                    >
                      <CheckCircle2 size={28} className="text-[#43A047]" />
                    </motion.div>
                    <span className="font-outfit font-bold text-[#43A047] text-[16px] relative z-10">✅ Photo Verified</span>
                    <span className="font-jakarta text-[12px] text-[#1A4A1A] font-bold relative z-10">{activeMission.servings} meals confirmed</span>
                  </motion.div>
                )}

                <div className="bg-green-50 border border-green-100 rounded-2xl p-3 flex items-center gap-3">
                  <span className="text-2xl">🎯</span>
                  <p className="font-jakarta text-[13px] text-[#1A4A1A]">
                    <strong>Almost there!</strong> 2 more steps to earn 100 points!
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Go to NGO */}
            {step === 3 && (
              <div className="bg-white rounded-[28px] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/70 flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center">
                    <Building2 size={26} className="text-[#E65100]" />
                  </div>
                  <div>
                    <h2 className="text-[22px] font-black text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
                      Deliver to NGO 🏫
                    </h2>
                    <p className="text-[#8A8A8A] text-sm">Deliver the {activeMission.servings} meals to {activeMission.ngoName.split(' ')[0]}</p>
                  </div>
                </div>
                <div className="bg-orange-50 rounded-2xl p-4 flex justify-between items-center border border-orange-100">
                  <div>
                    <p className="font-bold text-[#0A0A0A] text-lg">{activeMission.ngoName}</p>
                    <p className="text-[#4A4A4A] text-sm mt-0.5 flex items-center gap-1">
                      <MapPin size={12} /> {activeMission.ngoLocation.address}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <motion.button whileTap={{ scale: 0.88 }} className="h-11 w-11 rounded-full bg-white shadow-md flex items-center justify-center text-[#E65100] border border-orange-100">
                      <Phone size={18} />
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.88 }} className="h-11 w-11 rounded-full bg-[#E65100] shadow-md flex items-center justify-center text-white">
                      <Navigation size={18} />
                    </motion.button>
                  </div>
                </div>

                {/* Kids visual motivator */}
                <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-4 flex items-center gap-3">
                  <span className="text-3xl">👧👦</span>
                  <p className="font-jakarta text-[13px] text-[#5A4A00]">
                    <strong>{activeMission.servings} kids</strong> at {activeMission.ngoName.split(' ')[0]} are waiting and excited for this meal! 🎉
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Final Confirmation */}
            {step === 4 && (
              <div className="bg-white rounded-[28px] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/70 flex flex-col items-center text-center gap-5">
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 14 }}
                  className="w-24 h-24 rounded-full bg-orange-50 border-4 border-orange-100 flex items-center justify-center"
                >
                  <span className="text-5xl">🎁</span>
                </motion.div>

                <div>
                  <h2 className="text-[24px] font-black text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
                    Confirm Delivery! ✅
                  </h2>
                  <p className="text-[#8A8A8A] text-sm mt-2 max-w-[240px]">
                    Tap below to confirm you've successfully handed over the {activeMission.servings} meals.
                  </p>
                </div>

                {/* Floating emojis preview */}
                <div className="flex gap-3 text-3xl">
                  {["👧", "😊", "🥳", "👦", "🎉"].map((e, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + i * 0.08, type: "spring", stiffness: 400 }}
                    >
                      {e}
                    </motion.span>
                  ))}
                </div>

                {!deliveryPhotoTaken ? (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setDeliveryPhotoTaken(true)}
                    className="h-32 w-full bg-gray-50 hover:bg-orange-50/50 rounded-2xl border-2 border-dashed border-gray-300 hover:border-orange-200 transition-colors flex flex-col items-center justify-center gap-2 mt-2"
                  >
                    <div className="h-12 w-12 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                      <Camera size={24} className="text-[#4A4A4A]" />
                    </div>
                    <span className="font-bold text-[#0A0A0A] text-sm">Take Delivery Photo</span>
                  </motion.button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-32 w-full bg-green-50 rounded-2xl border-2 border-dashed border-green-200 flex flex-col items-center justify-center gap-2 relative overflow-hidden mt-2"
                  >
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400')] bg-cover bg-center opacity-30 mix-blend-overlay" />
                    <CheckCircle2 size={28} className="text-[#43A047] relative z-10" />
                    <span className="font-outfit font-bold text-[#43A047] text-[15px] relative z-10">Delivery Photo Uploaded!</span>
                  </motion.div>
                )}

                <div className="w-full bg-orange-50 border border-orange-100 rounded-2xl p-4 text-left">
                  <p className="font-outfit font-bold text-[15px] text-[#E65100]">Mission Summary</p>
                  <div className="flex justify-between mt-2">
                    <span className="font-jakarta text-[13px] text-[#4A4A4A]">Meals delivered</span>
                    <span className="font-outfit font-bold text-[#0A0A0A]">{activeMission.servings} meals</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="font-jakarta text-[13px] text-[#4A4A4A]">Points to earn</span>
                    <span className="font-outfit font-bold text-[#E65100]">+100 pts ⭐</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── CTA Button ── */}
      <div className="p-5 border-t border-black/5" style={{ background: "rgba(255,255,255,0.90)", backdropFilter: "blur(16px)" }}>
        <motion.button
          disabled={loading || (step === 2 && !pickupPhotoTaken) || (step === 4 && !deliveryPhotoTaken)}
          onClick={handleNextStep}
          whileTap={{ scale: 0.95 }}
          className="h-[58px] w-full rounded-full text-[17px] font-black text-white relative overflow-hidden"
          style={{
            background: loading
              ? "#BDBDBD"
              : "linear-gradient(135deg, #FF8F00, #E65100)",
            fontFamily: "var(--font-outfit)",
            boxShadow: loading ? "none" : "0 8px 28px rgba(230,81,0,0.35)",
          }}
        >
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.span
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2"
              >
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                Processing...
              </motion.span>
            ) : (
              <motion.span
                key={step}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="block"
              >
                {step === 1 && "✅ I've Arrived at Provider"}
                {step === 2 && "📸 Confirm Pickup"}
                {step === 3 && "🏫 I've Arrived at NGO"}
                {step === 4 && "🎉 Confirm Delivery!"}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
