"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { ArrowLeft, Leaf, Send } from "lucide-react";

import { ScreenWrapper } from "../ui/ScreenWrapper";
import { IconButton } from "../ui/Buttons/IconButton";
import { springGentle, springBouncy } from "@/lib/animations";
import { CelebrationScreen } from "./CelebrationScreen";

// ─── Helper: derive celebration mode from role ─────────────────────────────

function getCelebrationMode(activePanel: string, subRole: string): "donor" | "shopkeeper" | "volunteer" {
  if (activePanel === "volunteer") return "volunteer";
  if (subRole === "shopkeeper") return "shopkeeper";
  return "donor"; // donor_shopkeeper+donor, ngo_receiver, etc.
}

function getCelebrationContent(mode: "donor" | "shopkeeper" | "volunteer") {
  switch (mode) {
    case "donor":
      return {
        title: "Welcome, Hero! 🫶",
        subtitle: "Your account is verified! Start donating surplus food and save lives today.",
        points: 20,
        ctaLabel: "Start Saving Lives",
      };
    case "shopkeeper":
      return {
        title: "Shop Verified! 🏪",
        subtitle: "Your store is now live on ZeroWaste. List your near-expiry items and make them count!",
        points: 15,
        ctaLabel: "Open My Shop",
      };
    case "volunteer":
      return {
        title: "Ready to Ride! 🚴",
        subtitle: "Welcome aboard! You're now part of a network delivering hope to kids every day!",
        points: 25,
        ctaLabel: "Start Volunteering",
      };
  }
}

// ─── OTP Digit Box ─────────────────────────────────────────────────────────

interface OtpBoxProps {
  digit: string;
  idx: number;
  isFocused: boolean;
  hasError: boolean;
  isSuccess: boolean;
  inputRef: (el: HTMLInputElement | null) => void;
  onChange: (i: number, val: string) => void;
  onKeyDown: (i: number, e: React.KeyboardEvent) => void;
  onFocus: (i: number) => void;
}

function OtpBox({ digit, idx, isFocused, hasError, isSuccess, inputRef, onChange, onKeyDown, onFocus }: OtpBoxProps) {
  return (
    <motion.div
      className="relative"
      animate={hasError ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
      transition={hasError ? { duration: 0.45, ease: "easeInOut" } : {}}
    >
      {/* Success particle burst per digit */}
      <AnimatePresence>
        {isSuccess && digit && (
          <>
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 1, scale: 0 }}
                animate={{
                  opacity: 0,
                  scale: 1.8,
                  x: Math.cos((i / 4) * Math.PI * 2) * 24,
                  y: Math.sin((i / 4) * Math.PI * 2) * 24,
                }}
                transition={{ duration: 0.5, delay: idx * 0.06 + i * 0.04, ease: "easeOut" }}
              >
                <div className="w-2 h-2 rounded-full" style={{ background: "#D4AF37" }} />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      <motion.div
        animate={{
          scale: isSuccess && digit ? 1.12 : isFocused ? 1.06 : 1,
          rotate: isSuccess && digit ? [0, -4, 4, 0] : 0,
        }}
        transition={{
          scale: { type: "spring", stiffness: 400, damping: 18 },
          rotate: { duration: 0.4, ease: "easeInOut" },
        }}
      >
        <input
          ref={inputRef}
          type="tel"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => onChange(idx, e.target.value.replace(/\D/, ""))}
          onKeyDown={(e) => onKeyDown(idx, e)}
          onFocus={() => onFocus(idx)}
          className="h-[64px] w-[64px] rounded-[22px] text-center text-[24px] font-black outline-none transition-all duration-200 select-none"
          style={{
            fontFamily: "var(--font-outfit)",
            background: isSuccess && digit
              ? "linear-gradient(135deg, #D4AF37, #F2D15A)"
              : hasError
              ? "rgba(255,107,107,0.10)"
              : digit
              ? "rgba(212,175,55,0.12)"
              : "rgba(0,0,0,0.04)",
            border: isSuccess && digit
              ? "2px solid #D4AF37"
              : hasError
              ? "2px solid rgba(255,107,107,0.70)"
              : isFocused
              ? "2px solid var(--accent-gold)"
              : digit
              ? "2px solid rgba(212,175,55,0.50)"
              : "2px solid rgba(0,0,0,0.08)",
            color: isSuccess && digit ? "#1A1A1A" : "var(--text-primary)",
            boxShadow: isFocused && !hasError
              ? "0 0 0 4px rgba(212,175,55,0.18), 0 4px 16px rgba(212,175,55,0.15)"
              : "0 2px 8px rgba(0,0,0,0.06)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────

export function Otp() {
  const login = useAppStore((s) => s.login);
  const setActiveScreen = useAppStore((s) => s.setActiveScreen);
  const activePanel = useAppStore((s) => s.activePanel);
  const subRole = useAppStore((s) => s.subRole);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [hasError, setHasError] = useState(false);
  const [focusedIdx, setFocusedIdx] = useState<number>(-1);
  const [countdown, setCountdown] = useState(30);
  const [otpSent, setOtpSent] = useState(false);

  // "verified" = show celebration, "idle" = normal
  const [verifiedState, setVerifiedState] = useState<"idle" | "verifying" | "verified">("idle");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const celebMode = getCelebrationMode(activePanel ?? "donor_shopkeeper", subRole ?? "donor");
  const celebContent = getCelebrationContent(celebMode);

  // Countdown timer
  useEffect(() => {
    if (step === "otp" && countdown > 0 && otpSent) {
      const id = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(id);
    }
  }, [countdown, step, otpSent]);

  const handleSendOtp = () => {
    if (phoneNumber.length === 10) {
      setStep("otp");
      setCountdown(30);
      setOtpSent(true);
      // Focus first input
      setTimeout(() => inputRefs.current[0]?.focus(), 200);
    }
  };

  const handleChange = (i: number, val: string) => {
    const newOtp = [...otp];
    newOtp[i] = val;
    setOtp(newOtp);
    setHasError(false);
    if (val && i < 3) {
      inputRefs.current[i + 1]?.focus();
    }
    if (newOtp.every((d) => d) && newOtp.join("").length === 4) {
      setTimeout(() => handleVerify(newOtp.join("")), 350);
    }
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
  };

  const handleVerify = (code: string) => {
    if (code.length !== 4) { setHasError(true); return; }

    setVerifiedState("verifying");

    // Brief "verifying" flash then show celebration
    setTimeout(() => {
      setVerifiedState("verified");
      // Actual login happens when user clicks CTA in celebration
    }, 800);
  };

  const handleCelebrationDone = () => {
    login(phoneNumber || "9876543210");
  };

  const allFilled = otp.every((d) => d);
  const isPhoneValid = phoneNumber.length === 10;

  // ── Full-screen celebration ──
  if (verifiedState === "verified") {
    return (
      <CelebrationScreen
        mode={celebMode}
        title={celebContent.title}
        subtitle={celebContent.subtitle}
        points={celebContent.points}
        ctaLabel={celebContent.ctaLabel}
        onDone={handleCelebrationDone}
      />
    );
  }

  return (
    <ScreenWrapper>
      {/* Back button */}
      <div className="absolute left-6 top-12 z-20">
        <IconButton
          icon={<ArrowLeft size={20} />}
          onClick={() => step === "otp" ? setStep("phone") : setActiveScreen("roleSelect")}
          variant="light"
        />
      </div>

      {/* Bottom sheet */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={springGentle}
        className="absolute bottom-0 left-0 right-0 z-10 flex flex-col rounded-t-[36px] px-8 pb-12 pt-5 shadow-[0_-16px_48px_rgba(0,0,0,0.10)]"
        style={{
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(24px)",
          minHeight: "62vh",
        }}
      >
        {/* Drag handle */}
        <div className="mx-auto mb-8 h-1.5 w-12 rounded-full bg-black/10" />

        {/* Logo */}
        <div className="flex items-center gap-2 mb-7 text-[#7CA13B]">
          <motion.div
            animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Leaf size={24} />
          </motion.div>
          <span className="font-outfit font-black text-[20px] text-[#1A1A1A]">ZeroWaste</span>
        </div>

        <AnimatePresence mode="wait">
          {/* ── Phone Step ── */}
          {step === "phone" && (
            <motion.div
              key="phone"
              initial={{ opacity: 0, x: -28, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -28, scale: 0.97 }}
              transition={springBouncy}
              className="flex flex-col flex-1"
            >
              <motion.h2
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ...springGentle, delay: 0.05 }}
                className="font-outfit font-black text-[28px] text-[#1A1A1A] leading-tight mb-2"
              >
                Enter your number
              </motion.h2>
              <motion.p
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ...springGentle, delay: 0.1 }}
                className="font-jakarta text-[15px] text-text-secondary mb-8"
              >
                We'll send a verification code via SMS
              </motion.p>

              <motion.div
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ...springBouncy, delay: 0.15 }}
                className="flex items-center rounded-full border-2 px-5 py-4 transition-all duration-300"
                style={{
                  background: isPhoneValid ? "rgba(212,175,55,0.07)" : "rgba(0,0,0,0.04)",
                  borderColor: isPhoneValid ? "#D4AF37" : "rgba(0,0,0,0.10)",
                  boxShadow: isPhoneValid
                    ? "0 0 0 4px rgba(212,175,55,0.14), 0 4px 20px rgba(212,175,55,0.12)"
                    : "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                {/* Country code badge */}
                <div className="flex items-center gap-2 mr-3 shrink-0">
                  <span className="text-[11px] bg-[#1A1A1A] text-white px-2 py-1 rounded-lg font-jakarta font-bold tracking-wide">IN</span>
                  <span className="font-outfit text-[17px] font-black text-[#1A1A1A]">+91</span>
                </div>
                <div className="h-5 w-px bg-black/12 mr-3 shrink-0" />
                <input
                  type="tel"
                  maxLength={10}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                  placeholder="9876543210"
                  className="flex-1 bg-transparent font-outfit text-[18px] font-bold text-[#1A1A1A] outline-none placeholder:text-[#C8C8C8] tracking-widest"
                  autoFocus
                />
                {/* Animated tick */}
                <AnimatePresence>
                  {isPhoneValid && (
                    <motion.div
                      initial={{ scale: 0, rotate: -90, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      exit={{ scale: 0, rotate: 90, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 520, damping: 22 }}
                      className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 ml-1"
                      style={{
                        background: "linear-gradient(135deg, #F2D15A, #D4AF37)",
                        boxShadow: "0 4px 14px rgba(212,175,55,0.45), inset 0 1px 0 rgba(255,255,255,0.40)",
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <motion.path
                          d="M3 8L6.5 11.5L13 4.5"
                          stroke="white"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.35, ease: "easeOut", delay: 0.1 }}
                        />
                      </svg>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <div className="mt-auto pt-8">
                <motion.button
                  onClick={handleSendOtp}
                  disabled={!isPhoneValid}
                  whileTap={isPhoneValid ? { scale: 0.96 } : {}}
                  whileHover={isPhoneValid ? { scale: 1.02 } : {}}
                  className="w-full h-[58px] rounded-full font-outfit font-black text-[17px] flex items-center justify-center gap-2.5 transition-all duration-300"
                  style={{
                    background: isPhoneValid
                      ? "linear-gradient(135deg, #F2D15A 0%, #D4AF37 100%)"
                      : "rgba(0,0,0,0.08)",
                    color: isPhoneValid ? "#1A1A1A" : "rgba(0,0,0,0.30)",
                    boxShadow: isPhoneValid
                      ? "0 8px 28px rgba(212,175,55,0.40), 0 2px 8px rgba(212,175,55,0.25)"
                      : "none",
                    cursor: isPhoneValid ? "pointer" : "not-allowed",
                  }}
                >
                  <Send size={18} />
                  Send OTP
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ── OTP Step ── */}
          {step === "otp" && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, x: 28, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 28, scale: 0.97 }}
              transition={springBouncy}
              className="flex flex-col flex-1"
            >
              <motion.h2
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ...springGentle, delay: 0.05 }}
                className="font-outfit font-black text-[28px] text-[#1A1A1A] leading-tight mb-2"
              >
                Enter OTP
              </motion.h2>
              <motion.p
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ...springGentle, delay: 0.1 }}
                className="font-jakarta text-[15px] text-text-secondary mb-8"
              >
                Sent to <span className="font-bold text-[#1A1A1A]">+91 {phoneNumber.slice(0, 5)} {phoneNumber.slice(5)}</span>
              </motion.p>

              {/* OTP Boxes */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springBouncy, delay: 0.15 }}
                className="flex justify-between gap-2 mb-6"
              >
                {otp.map((digit, i) => (
                  <OtpBox
                    key={i}
                    digit={digit}
                    idx={i}
                    isFocused={focusedIdx === i}
                    hasError={hasError}
                    isSuccess={verifiedState === "verifying"}
                    inputRef={(el) => { inputRefs.current[i] = el; }}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onFocus={setFocusedIdx}
                  />
                ))}
              </motion.div>

              {/* Error message */}
              <AnimatePresence>
                {hasError && (
                  <motion.p
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={springBouncy}
                    className="text-center font-jakarta text-[13px] text-[#FF6B6B] font-semibold mb-3"
                  >
                    ❌ Incorrect code — try again
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Verifying pulse */}
              <AnimatePresence>
                {verifiedState === "verifying" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-2 mb-3"
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.7, delay: i * 0.18, repeat: Infinity }}
                      />
                    ))}
                    <span className="font-jakarta text-[13px] text-[#D4AF37] font-bold ml-1">Verifying...</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Countdown / Resend */}
              <div className="flex justify-center mb-8">
                {countdown > 0 ? (
                  <p className="font-jakarta text-[14px] text-text-secondary">
                    Resend in{" "}
                    <motion.span
                      key={countdown}
                      initial={{ scale: 1.3, color: "#D4AF37" }}
                      animate={{ scale: 1, color: "#1A1A1A" }}
                      className="font-black inline-block"
                    >
                      00:{countdown.toString().padStart(2, "0")}
                    </motion.span>
                  </p>
                ) : (
                  <motion.button
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={springBouncy}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => {
                      setCountdown(30);
                      setOtp(["", "", "", ""]);
                      setHasError(false);
                      setTimeout(() => inputRefs.current[0]?.focus(), 100);
                    }}
                    className="font-jakarta text-[14px] font-bold text-[#D4AF37] underline underline-offset-2"
                  >
                    Resend OTP ↺
                  </motion.button>
                )}
              </div>

              <div className="mt-auto">
                <motion.button
                  onClick={() => handleVerify(otp.join(""))}
                  disabled={!allFilled || verifiedState === "verifying"}
                  whileTap={allFilled ? { scale: 0.96 } : {}}
                  whileHover={allFilled ? { scale: 1.02 } : {}}
                  className="w-full h-[58px] rounded-full font-outfit font-black text-[17px] flex items-center justify-center gap-2.5 transition-all duration-300 relative overflow-hidden"
                  style={{
                    background: allFilled && verifiedState !== "verifying"
                      ? "linear-gradient(135deg, #F2D15A 0%, #D4AF37 100%)"
                      : "rgba(0,0,0,0.08)",
                    color: allFilled && verifiedState !== "verifying" ? "#1A1A1A" : "rgba(0,0,0,0.30)",
                    boxShadow: allFilled && verifiedState !== "verifying"
                      ? "0 8px 28px rgba(212,175,55,0.40), 0 2px 8px rgba(212,175,55,0.25)"
                      : "none",
                    cursor: allFilled ? "pointer" : "not-allowed",
                  }}
                >
                  {verifiedState === "verifying" ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
                        className="inline-block w-5 h-5 border-2 border-[#D4AF37] border-t-transparent rounded-full"
                      />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M3.5 9.5L7.5 13.5L14.5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Verify &amp; Continue
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </ScreenWrapper>
  );
}
