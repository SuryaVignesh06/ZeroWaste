"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";

export function Otp() {
  const setScreen = useAppStore((s) => s.setScreen);
  const phoneNumber = useAppStore((s) => s.phoneNumber);
  const isNewUser = useAppStore((s) => s.isNewUser);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [success, setSuccess] = useState(false);
  const [readingSms, setReadingSms] = useState(true);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const id = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(id);
    }
  }, [countdown]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
    
    // Simulate Web OTP API reading
    const smsTimer = setTimeout(() => {
      setReadingSms(false);
    }, 2500);
    
    return () => clearTimeout(smsTimer);
  }, []);

  const handleChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[i] = val;
    setOtp(newOtp);
    setError(false);

    if (val && i < 3) {
      inputRefs.current[i + 1]?.focus();
    }

    if (newOtp.every((d) => d) && newOtp.join("").length === 4) {
      setTimeout(() => handleVerify(newOtp.join("")), 400);
    }
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
  };

  const handleVerify = (code: string) => {
    if (code.length === 4) {
      setSuccess(true);
      setTimeout(() => {
        // Navigate based on whether the user is new
        if (isNewUser) {
          setScreen("role-select");
        } else {
          // If not new, send to their respective dashboard
          const role = useAppStore.getState().role;
          if (role === "ngo") setScreen("ngo-feed");
          else if (role === "volunteer") setScreen("volunteer-map");
          else setScreen("home");
        }
      }, 1500); // Wait for the expanding green circle animation
    } else {
      setError(true);
    }
  };

  const maskedPhone = phoneNumber
    ? `+91 ${phoneNumber.slice(0, 5)} ${phoneNumber.slice(5)}`
    : "+91 XXXXX XXXXX";

  const allFilled = otp.every((d) => d);

  return (
    <div className="relative flex h-full flex-col bg-[#F7F5F0]">
      {/* Back button */}
      <button
        onClick={() => setScreen("login")}
        className="absolute left-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm"
      >
        <ArrowLeft size={20} className="text-[#0A0A0A]" />
      </button>

      {/* Content */}
      <div className="relative flex flex-1 flex-col px-8 pt-28">
        
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[30px] font-bold text-[#0A0A0A]"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Verify your number
        </motion.h1>

        {/* Subtitle with phone */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-3 flex flex-col items-start gap-1"
        >
          <p className="text-[16px] font-medium text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>
            Enter the 4-digit code sent to
          </p>
          <div className="flex items-center gap-3">
            <p className="text-[17px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
              {maskedPhone}
            </p>
            <button
              onClick={() => setScreen("login")}
              className="text-[14px] font-semibold text-[#1A6B3C] underline"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Change
            </button>
          </div>
        </motion.div>

        {/* OTP input grid */}
        <div className="mt-12 flex justify-between gap-2">
          {otp.map((digit, i) => (
            <motion.input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                x: error ? [0, -10, 10, -10, 10, 0] : 0,
              }}
              transition={{ delay: i * 0.05, duration: error ? 0.4 : 0.3 }}
              type="tel"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="h-[72px] w-[72px] rounded-[20px] text-center text-[32px] font-bold text-[#0A0A0A] focus:outline-none transition-all duration-200"
              style={{
                fontFamily: "var(--font-outfit)",
                border: `2px solid ${error ? "#EF4444" : digit ? "#1A6B3C" : "#E8E8E4"}`,
                background: digit ? "#F0F7F2" : "#FFFFFF",
                boxShadow: digit && !error
                  ? "0 0 0 4px rgba(26,107,60,0.1)"
                  : "0px 4px 12px rgba(0,0,0,0.03)",
              }}
            />
          ))}
        </div>

        {/* Status / Error row */}
        <div className="mt-6 flex h-6 items-center justify-center">
          <AnimatePresence mode="wait">
            {error ? (
              <motion.p
                key="error"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-[14px] font-medium text-[#EF4444]"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Invalid code. Please try again.
              </motion.p>
            ) : readingSms ? (
              <motion.div
                key="reading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-[#8A8A8A]"
              >
                <ShieldCheck size={16} />
                <span className="text-[13px] font-medium" style={{ fontFamily: "var(--font-jakarta)" }}>Reading SMS...</span>
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="h-1.5 w-1.5 rounded-full bg-[#1A6B3C]"
                />
              </motion.div>
            ) : countdown > 0 ? (
              <motion.p
                key="countdown"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[14px] text-[#8A8A8A]" 
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Resend OTP in <span className="font-bold text-[#0A0A0A]">0:{countdown.toString().padStart(2, "0")}</span>
              </motion.p>
            ) : (
              <motion.button
                key="resend"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => {
                  setCountdown(30);
                  setOtp(["", "", "", ""]);
                  setError(false);
                  inputRefs.current[0]?.focus();
                }}
                className="text-[14px] font-bold text-[#1A6B3C]"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Resend OTP
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Verify button */}
      <div className="px-8 pb-10">
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileTap={{ scale: allFilled ? 0.96 : 1 }}
          onClick={() => handleVerify(otp.join(""))}
          disabled={!allFilled}
          className="relative flex h-[56px] w-full items-center justify-center rounded-full text-[17px] font-semibold transition-all duration-200 disabled:opacity-50 overflow-hidden"
          style={{
            background: allFilled ? "#1A6B3C" : "#E8E8E4",
            color: allFilled ? "white" : "#8A8A8A",
            fontFamily: "var(--font-outfit)",
            boxShadow: allFilled ? "0px 8px 24px rgba(26,107,60,0.25)" : "none",
          }}
        >
          <span className="relative z-10">Verify and Continue</span>
          
          {/* Expanding Green Circle Success Transition */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 40, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute left-1/2 top-1/2 z-0 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1A6B3C]"
              />
            )}
          </AnimatePresence>
        </motion.button>
      </div>
      
      {/* Success full screen overlay overlay to maintain state during transition */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1A6B3C]"
          >
             <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.2 }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20"
            >
              <CheckCircle2 size={40} className="text-white" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-[22px] font-bold text-white"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Verified Successfully!
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
