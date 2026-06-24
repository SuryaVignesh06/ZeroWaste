"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { ShieldCheck, CheckCircle2, Loader2 } from "lucide-react";

export function Login() {
  const setScreen = useAppStore((s) => s.setScreen);
  const setPhoneNumber = useAppStore((s) => s.setPhoneNumber);
  const isNewUser = useAppStore((s) => s.isNewUser);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const isValid = phone.length === 10;

  const handleSendOtp = () => {
    if (!isValid) return;
    setLoading(true);
    setPhoneNumber(phone);
    
    // Simulate sending OTP
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setScreen("otp");
      }, 400);
    }, 1500);
  };

  return (
    <div className="flex h-full flex-col bg-[#F7F5F0]">
      {/* Top Visual Zone */}
      <div 
        className="relative flex flex-col items-center justify-center overflow-hidden px-8" 
        style={{ 
          height: "45%", 
          background: "linear-gradient(180deg, #0A2E1A 0%, #1A6B3C 75%, transparent 100%)",
          borderRadius: "0 0 48px 48px",
          zIndex: 10
        }}
      >
        {/* Decorative Elements */}
        <div className="absolute top-[-20px] left-[-20px] h-[80px] w-[80px] rounded-full bg-white/5" />
        <div className="absolute bottom-[40px] right-[-40px] h-[200px] w-[200px] rounded-full bg-white/5" />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-4 flex h-12 w-12 items-center justify-center rounded-[12px] bg-white/10 backdrop-blur-md"
        >
          <svg width="32" height="32" viewBox="0 0 56 56" fill="none">
            <rect x="14" y="14" width="28" height="28" rx="8" transform="rotate(45 28 28)" fill="white" />
            <path d="M28 20 L33 28 L28 36 L23 28 Z" fill="#1A6B3C" />
          </svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="text-[24px] font-extrabold tracking-[2px] text-white"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          ZERO WASTE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
          className="mt-3 text-center text-[14px] font-normal leading-relaxed text-white/75"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Food rescue. Affordable groceries. Community impact.
        </motion.p>
      </div>

      {/* Bottom Auth Panel */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 28, stiffness: 200, delay: 0.3 }}
        className="relative z-20 mx-4 -mt-6 flex flex-1 flex-col bg-white"
        style={{
          borderRadius: "32px 32px 0 0",
          boxShadow: "0px -8px 40px rgba(0,0,0,0.08)",
          padding: "32px 24px 40px"
        }}
      >
        <h2 className="text-[30px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
          Welcome
        </h2>
        <p className="mt-1 text-[15px] text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>
          Enter your mobile number to get started.
        </p>

        {/* Phone Input */}
        <div 
          className="mt-7 flex h-[60px] w-full items-center rounded-[16px] transition-all duration-200"
          style={{
            background: "#FAFAF8",
            border: `1.5px solid ${isValid ? "#1A6B3C" : "#E8E8E4"}`,
            boxShadow: isValid ? "0 0 0 4px rgba(26,107,60,0.08)" : "none"
          }}
        >
          <div className="flex h-[60%] items-center border-r border-[#E8E8E4] px-4">
            <span className="text-[17px] font-semibold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
              +91
            </span>
          </div>
          <div className="flex flex-1 items-center px-4 relative">
            <input
              type="tel"
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              placeholder="Mobile number"
              className="w-full bg-transparent text-[17px] font-medium text-[#0A0A0A] placeholder:text-[#8A8A8A] focus:outline-none tracking-wide"
              style={{ fontFamily: "var(--font-outfit)" }}
            />
            <AnimatePresence>
              {isValid && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ type: "spring", duration: 0.2 }}
                  className="absolute right-4"
                >
                  <CheckCircle2 size={20} className="text-[#1A6B3C]" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Send OTP Button */}
        <motion.button
          whileTap={{ scale: isValid && !loading ? 0.96 : 1 }}
          onClick={handleSendOtp}
          disabled={!isValid || loading || success}
          className="mt-5 flex h-[56px] w-full items-center justify-center rounded-full transition-all duration-200"
          style={{
            background: success ? "#22C55E" : isValid ? "#1A6B3C" : "#E8E8E4",
            color: isValid || success ? "white" : "#8A8A8A",
            boxShadow: isValid && !success ? "0px 8px 24px rgba(26,107,60,0.25)" : "none"
          }}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2 size={20} className="animate-spin text-white" />
              <span className="text-[15px] font-medium text-white" style={{ fontFamily: "var(--font-jakarta)" }}>Sending...</span>
            </div>
          ) : success ? (
            <div className="flex items-center gap-2">
              <CheckCircle2 size={20} className="text-white" />
              <span className="text-[17px] font-semibold text-white" style={{ fontFamily: "var(--font-outfit)" }}>OTP Sent!</span>
            </div>
          ) : (
            <span className="text-[17px] font-semibold" style={{ fontFamily: "var(--font-outfit)" }}>Send OTP</span>
          )}
        </motion.button>

        {/* Privacy Note */}
        <div className="mt-5 flex items-center justify-center gap-1.5">
          <ShieldCheck size={13} className="text-[#8A8A8A]" />
          <span className="text-[12px] text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
            Your number is only used for verification.
          </span>
        </div>

        {/* Terms */}
        <div className="mt-3 text-center text-[11px] text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
          By continuing you agree to our <button className="font-semibold text-[#1A6B3C] underline">Terms of Service</button> and <button className="font-semibold text-[#1A6B3C] underline">Privacy Policy</button>
        </div>
      </motion.div>
    </div>
  );
}
