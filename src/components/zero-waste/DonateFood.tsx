"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore, DonationForm } from "@/lib/store";
import {
  ArrowLeft, Camera, Image as ImageIcon, Minus, Plus, Flame, Package, Clock, Navigation, 
  MapPin, CheckCircle, Leaf, Star, ChevronRight, AlertTriangle
} from "lucide-react";

export function DonateFood() {
  const step = useAppStore((s) => s.donateStep);
  const setStep = useAppStore((s) => s.setDonateStep);
  const form = useAppStore((s) => s.donateForm);
  const setForm = useAppStore((s) => s.setDonateForm);
  const resetForm = useAppStore((s) => s.resetDonateForm);
  const setScreen = useAppStore((s) => s.setScreen);
  const nextStep = useAppStore((s) => s.nextDonateStep);
  const prevStep = useAppStore((s) => s.prevDonateStep);
  const submitDonation = useAppStore((s) => s.submitDonation);
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const handleNext = () => {
    if (step === 3) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 1500);
    } else {
      nextStep();
    }
  };

  const handleDiscard = () => {
    if (confirm("Discard donation?")) {
      resetForm();
      setScreen("userHome");
    }
  };

  if (success) {
    return <SuccessScreen />;
  }

  const isStep1Valid = form.foodName.trim().length > 0;
  const isStep2Valid = form.pickupAddress.trim().length > 0;

  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }} className="bg-[#F7F5F0]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[rgba(247,245,240,0.95)] backdrop-blur-md px-5 pt-4 pb-2 flex items-center justify-between">
        <button
          onClick={step === 1 ? handleDiscard : prevStep}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white transition-transform active:scale-95 shadow-[0px_2px_16px_rgba(0,0,0,0.06)]"
        >
          <ArrowLeft size={20} className="text-[#0A0A0A]" />
        </button>
        <div className="text-[20px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
          Donate Food
        </div>
        <div className="text-[13px] font-medium text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
          Step {step} of 3
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-[3px] bg-[#E8E8E4]">
        <motion.div
          className="h-full bg-[#1A6B3C]"
          animate={{ width: `${(step / 3) * 100}%` }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        />
      </div>

      <main style={{ flex: 1, minHeight: 0, overflowY: "auto", paddingBottom: "100px" }}>
        <AnimatePresence mode="wait">
          {step === 1 && <Step1 key="step1" form={form} setForm={setForm} />}
          {step === 2 && <Step2 key="step2" form={form} setForm={setForm} />}
          {step === 3 && <Step3 key="step3" form={form} setForm={setForm} />}
        </AnimatePresence>
      </main>

      {/* Bottom Nav Button */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-[rgba(247,245,240,0.95)] backdrop-blur-md">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleNext}
          disabled={(step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid) || loading}
          className={`flex h-14 w-full items-center justify-center rounded-full text-[17px] font-semibold ${
            (step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid)
              ? "bg-[#E8E8E4] text-[#8A8A8A]"
              : "bg-[#1A6B3C] text-white shadow-[0px_8px_24px_rgba(26,107,60,0.25)]"
          }`}
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          {loading ? (
            "Notifying NGOs..."
          ) : step === 3 ? (
            <>
              Submit Rescue
            </>
          ) : (
            `Next Step`
          )}
        </motion.button>
      </div>
    </div>
  );
}

function Step1({ form, setForm }: { form: DonationForm, setForm: any }) {
  const CATEGORIES = ["Cooked Meal", "Vegetables", "Bakery", "Dairy", "Packaged", "Mixed", "Other"];
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="px-6 mt-6"
    >
      <h2 className="text-[22px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Tell us about the food</h2>
      <p className="mt-1.5 text-[14px] text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>Be accurate so NGOs can plan effectively.</p>

      {/* Photo Upload Zone */}
      <div className="mt-6 flex h-[200px] w-full flex-col items-center justify-center gap-3 rounded-[24px] border-2 border-dashed border-[#D0D0CC] bg-white shadow-[0px_2px_16px_rgba(0,0,0,0.06)]">
        <Camera size={36} className="text-[#8A8A8A]" />
        <div className="text-[16px] font-semibold text-[#4A4A4A]" style={{ fontFamily: "var(--font-outfit)" }}>Add food photos</div>
        <div className="text-[13px] font-normal text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>Tap to take photo or upload from gallery</div>
      </div>

      {/* Food Name */}
      <div className="mt-6">
        <label className="text-[13px] font-semibold text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>Food Name or Description</label>
        <input
          value={form.foodName}
          onChange={(e) => setForm({ foodName: e.target.value })}
          placeholder="e.g. Biryani, Bread, Mixed vegetables"
          className="mt-1 h-12 w-full border-b-[2px] border-[#E8E8E4] bg-transparent text-[16px] font-medium text-[#0A0A0A] placeholder-[#8A8A8A] transition-colors focus:border-[#1A6B3C] focus:outline-none rounded-none px-0"
          style={{ fontFamily: "var(--font-outfit)" }}
        />
      </div>

      {/* Category */}
      <div className="mt-6 mb-8">
        <label className="text-[13px] font-semibold text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>Category</label>
        <div className="mt-3 flex flex-wrap gap-2">
          {["Cooked", "Raw", "Packaged"].map(cat => (
            <button
              key={cat}
              onClick={() => setForm({ category: cat })}
              className="flex h-10 items-center rounded-full px-5"
              style={{
                background: form.category === cat ? "#1A6B3C" : "transparent",
                color: form.category === cat ? "white" : "#0A0A0A",
                border: form.category === cat ? "none" : "1px solid #E8E8E4",
                fontFamily: form.category === cat ? "var(--font-outfit)" : "var(--font-jakarta)",
                fontWeight: form.category === cat ? 600 : 500,
                fontSize: "14px"
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Step2({ form, setForm }: { form: DonationForm, setForm: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="px-6 mt-6 pb-12"
    >
      <h2 className="text-[22px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Quantity & Condition</h2>
      
      {/* Warning Banner */}
      <div className="mt-4 flex items-start gap-3 rounded-[16px] bg-[#F5E6C8] p-4">
        <AlertTriangle size={20} className="text-[#D97706] shrink-0 mt-0.5" />
        <p className="text-[13px] font-medium text-[#D97706] leading-tight" style={{ fontFamily: "var(--font-jakarta)" }}>
          Food must be safe for human consumption. Do not list spoiled or unsafe items.
        </p>
      </div>

      {/* Servings */}
      <div className="mt-8">
        <label className="text-[14px] font-semibold text-[#0A0A0A]" style={{ fontFamily: "var(--font-jakarta)" }}>How many servings?</label>
        <div className="mt-4 flex items-center justify-center gap-5">
          <button
            onClick={() => setForm({ servings: Math.max(1, form.servings - 1) })}
            className="flex h-[52px] w-[52px] items-center justify-center rounded-full border-[1.5px] border-[#E8E8E4] bg-white active:scale-95"
          >
            <Minus size={22} className={form.servings <= 1 ? "text-[#AEAEB2]" : "text-[#0A0A0A]"} />
          </button>
          
          <motion.div
            key={form.servings}
            initial={{ scale: 1.25 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="min-w-[60px] text-center text-[40px] font-extrabold text-[#0A0A0A]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            {form.servings}
          </motion.div>
          
          <button
            onClick={() => setForm({ servings: form.servings + 1 })}
            className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#1A6B3C] shadow-[0px_8px_24px_rgba(26,107,60,0.25)] active:scale-95"
          >
            <Plus size={22} className="text-white" />
          </button>
        </div>

        <div className="mt-5 flex justify-center gap-2">
          {[10, 25, 50, 100, "200+"].map(num => (
            <button
              key={num}
              onClick={() => setForm({ servings: typeof num === 'number' ? num : 200 })}
              className="flex h-9 w-12 items-center justify-center rounded-full border-[1px] border-[#E8E8E4] bg-transparent text-[12px] font-semibold text-[#4A4A4A]"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Food Condition */}
      <div className="mt-8 mb-10">
        <label className="text-[14px] font-semibold text-[#0A0A0A]" style={{ fontFamily: "var(--font-jakarta)" }}>Condition</label>
        <div className="mt-3 flex flex-col gap-3">
          <button
            onClick={() => setForm({ condition: "freshly_cooked" })}
            className={`flex items-center gap-4 h-[72px] rounded-[16px] border-[1.5px] px-4 w-full ${form.condition === "freshly_cooked" ? "border-[#1A6B3C] bg-[#F0F7F2]" : "border-[#E8E8E4] bg-white"}`}
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${form.condition === "freshly_cooked" ? "bg-[#C8E8D0]" : "bg-[#F5F5F7]"}`}>
              <Flame size={20} className={form.condition === "freshly_cooked" ? "text-[#1A6B3C]" : "text-[#8A8A8A]"} />
            </div>
            <div className="text-left flex-1">
              <div className="text-[14px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Freshly Cooked</div>
              <div className="text-[11px] font-normal text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>Prepared within last 4 hours</div>
            </div>
          </button>
          
          <button
            onClick={() => setForm({ condition: "needs_quick_pickup" })}
            className={`flex items-center gap-4 h-[72px] rounded-[16px] border-[1.5px] px-4 w-full ${form.condition === "needs_quick_pickup" ? "border-[#DC2626] bg-[#FFF5F5]" : "border-[#E8E8E4] bg-white"}`}
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${form.condition === "needs_quick_pickup" ? "bg-[#FEE2E2]" : "bg-[#F5F5F7]"}`}>
              <Clock size={20} className={form.condition === "needs_quick_pickup" ? "text-[#DC2626]" : "text-[#8A8A8A]"} />
            </div>
            <div className="text-left flex-1">
              <div className="text-[14px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Needs Quick Pickup</div>
              <div className="text-[11px] font-normal text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>Must be picked up within 2 hours</div>
            </div>
          </button>

          <button
            onClick={() => setForm({ condition: "good_condition" })}
            className={`flex items-center gap-4 h-[72px] rounded-[16px] border-[1.5px] px-4 w-full ${form.condition === "good_condition" ? "border-[#1A6B3C] bg-[#F0F7F2]" : "border-[#E8E8E4] bg-white"}`}
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${form.condition === "good_condition" ? "bg-[#C8E8D0]" : "bg-[#F5F5F7]"}`}>
              <Package size={20} className={form.condition === "good_condition" ? "text-[#1A6B3C]" : "text-[#8A8A8A]"} />
            </div>
            <div className="text-left flex-1">
              <div className="text-[14px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Good Condition</div>
              <div className="text-[11px] font-normal text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>Packaged or stable food</div>
            </div>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function Step3({ form, setForm }: { form: DonationForm, setForm: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="px-6 mt-6 pb-12"
    >
      <h2 className="text-[22px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Pickup Location</h2>
      
      {/* Map Thumbnail */}
      <div className="mt-5 relative h-[150px] w-full overflow-hidden rounded-[20px] bg-[#E8E8E4]">
        <div className="absolute inset-0 bg-[#E8E8E4] opacity-50" style={{ backgroundImage: "linear-gradient(0deg, #D0D0CC 1px, transparent 1px), linear-gradient(90deg, #D0D0CC 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <MapPin size={36} className="text-[#1A6B3C]" fill="#1A6B3C" stroke="white" strokeWidth={2} />
        </div>
        <div className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur-md px-3 py-1.5 text-[11px] font-bold text-[#0A0A0A] shadow-sm flex items-center gap-1.5" style={{ fontFamily: "var(--font-jakarta)" }}>
          <div className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" style={{ animation: "pulse-ring-anim 2s infinite" }} />
          GPS Active
        </div>
      </div>

      {/* Pickup Address */}
      <div className="mt-5">
        <label className="text-[14px] font-semibold text-[#0A0A0A]" style={{ fontFamily: "var(--font-jakarta)" }}>Pickup Address</label>
        <div className="relative mt-2">
          <MapPin size={18} className="absolute left-4 top-4 text-[#8A8A8A]" />
          <textarea
            value={form.pickupAddress}
            onChange={(e) => setForm({ pickupAddress: e.target.value })}
            placeholder="Enter complete address"
            className="h-[80px] w-full rounded-[16px] border-[1.5px] border-[#E8E8E4] bg-white p-4 pl-11 text-[15px] font-medium text-[#0A0A0A] placeholder-[#8A8A8A] focus:border-[#1A6B3C] focus:outline-none"
            style={{ fontFamily: "var(--font-jakarta)", resize: "none" }}
          />
        </div>
      </div>

      {/* Notify All NGOs */}
      <div className="mt-8 rounded-[16px] bg-white p-4 border border-[#E8E8E4] shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[15px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Notify all nearby NGOs</div>
            <div className="mt-0.5 text-[12px] font-normal text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>Instantly alert all verified NGOs in a 5km radius.</div>
          </div>
          
          <button 
            onClick={() => setForm({ notifyAllNGOs: !form.notifyAllNGOs })}
            className="relative flex h-[32px] w-[54px] items-center rounded-full p-[2px] transition-colors"
            style={{ backgroundColor: form.notifyAllNGOs ? "#1A6B3C" : "#E8E8E4" }}
          >
            <motion.div
              className="h-[28px] w-[28px] rounded-full bg-white shadow-sm"
              animate={{ x: form.notifyAllNGOs ? 22 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function SuccessScreen() {
  const submitDonation = useAppStore((s) => s.submitDonation);
  const setScreen = useAppStore((s) => s.setScreen);
  const form = useAppStore((s) => s.donateForm);
  const resetForm = useAppStore((s) => s.resetDonateForm);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-[#F7F5F0] px-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.1, 1] }}
        transition={{ type: "spring", damping: 12, stiffness: 200, duration: 0.5 }}
        className="flex h-[120px] w-[120px] items-center justify-center rounded-full bg-[#C8E8D0]"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2, duration: 0.4 }}
        >
          <CheckCircle size={56} className="text-[#1A6B3C]" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, staggerChildren: 0.08 }}
        className="flex w-full flex-col items-center"
      >
        <h1 className="mt-6 text-center text-[32px] font-extrabold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
          Donation Listed!
        </h1>
        <p className="mt-2 text-center text-[16px] font-normal leading-[1.6] text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>
          Nearby NGOs have been notified. You will receive updates as your donation is claimed and delivered.
        </p>

        <div className="mt-6 inline-flex items-center gap-3 rounded-[20px] bg-white px-5 py-4 shadow-[0px_2px_16px_rgba(0,0,0,0.06)]">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C8E8D0]">
            <Leaf size={20} className="text-[#1A6B3C]" />
          </div>
          <div>
            <div className="text-[15px] font-semibold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>{form.foodName}</div>
            <div className="text-[12px] font-normal text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>~{form.servings} servings</div>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2.5 rounded-[16px] border border-[#C8E8D0] bg-[#F0F7F2] px-5 py-3.5 w-full justify-center">
          <Star size={18} fill="#D97706" className="text-[#D97706]" />
          <span className="text-[15px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
            +{form.servings * 3} Impact Points earned
          </span>
        </div>

        <div className="mt-5 w-full rounded-[16px] border border-[#E8E8E4] bg-[#FAFAF8] p-4">
          <div className="text-[13px] font-medium text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>Notified 4 NGOs near you</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Robin Hood Army", "Feeding India", "SMILE NGO", "No Food Waste"].map(ngo => (
              <div key={ngo} className="rounded-full bg-[#F5F5F7] px-3 py-1.5 text-[11px] text-[#0A0A0A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                {ngo}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex w-full flex-col gap-3">
          <button
            onClick={() => submitDonation()}
            className="flex h-14 w-full items-center justify-center rounded-full bg-[#0A0A0A] text-[17px] font-semibold text-white"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Track my Donation
          </button>
          <button
            onClick={() => { resetForm(); setScreen("userHome"); }}
            className="flex h-14 w-full items-center justify-center rounded-full border-[1.5px] border-[#E8E8E4] bg-transparent text-[17px] font-semibold text-[#0A0A0A]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Back to Home
          </button>
          <button
            onClick={() => { resetForm(); }}
            className="mt-1 text-center text-[14px] font-semibold text-[#1A6B3C] underline"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Donate Again
          </button>
        </div>
      </motion.div>
    </div>
  );
}
