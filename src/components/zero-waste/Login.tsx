"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { ArrowLeft, Building2, CheckCircle2, Lock, User as UserIcon } from "lucide-react";
import { ScreenWrapper } from "../ui/ScreenWrapper";
import { IconButton } from "../ui/Buttons/IconButton";

export function Login() {
  const login = useAppStore((s) => s.login);
  const setActiveScreen = useAppStore((s) => s.setActiveScreen);
  const [ngoId, setNgoId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const isValid = ngoId.length > 3 && password.length > 3;

  const handleLogin = () => {
    if (!isValid) return;
    setLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        login("ngo");
      }, 600);
    }, 1500);
  };

  return (
    <ScreenWrapper scrollable={false}>
      {/* Back button */}
      <div className="absolute left-6 top-12 z-20">
        <IconButton
          icon={<ArrowLeft size={20} />}
          onClick={() => setActiveScreen("roleSelect")}
          variant="light"
        />
      </div>

      <div className="flex h-full flex-col bg-[#F7F5F0]">
        {/* Top Visual Zone */}
        <div 
          className="relative flex flex-col items-center justify-center overflow-hidden px-8" 
          style={{ 
            height: "45%", 
            background: "linear-gradient(180deg, #0f3652 0%, #1B5E8A 75%, transparent 100%)",
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
            className="mb-4 flex h-16 w-16 items-center justify-center rounded-[16px] bg-white/10 backdrop-blur-md border border-white/20"
          >
            <Building2 size={32} className="text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="text-[24px] font-extrabold tracking-[1px] text-white"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            NGO PORTAL
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
            className="mt-3 text-center text-[14px] font-normal leading-relaxed text-white/75"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Log in with your official organization credentials.
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
          <h2 className="text-[26px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
            Welcome Back
          </h2>
          <p className="mt-1 text-[15px] text-[#4A4A4A] mb-6" style={{ fontFamily: "var(--font-jakarta)" }}>
            Sign in to manage requests and volunteers.
          </p>

          {/* NGO ID Input */}
          <div 
            className="flex h-[60px] w-full items-center rounded-[16px] px-4 transition-all duration-200 mb-4"
            style={{
              background: "#FAFAF8",
              border: `1.5px solid ${ngoId ? "#1B5E8A" : "#E8E8E4"}`,
            }}
          >
            <UserIcon size={20} className="text-[#8A8A8A] mr-3" />
            <input
              type="text"
              value={ngoId}
              onChange={(e) => setNgoId(e.target.value)}
              placeholder="NGO ID (e.g. FI-2023-89)"
              className="w-full bg-transparent text-[16px] font-medium text-[#0A0A0A] placeholder:text-[#8A8A8A] focus:outline-none"
              style={{ fontFamily: "var(--font-jakarta)" }}
            />
          </div>

          {/* Password Input */}
          <div 
            className="flex h-[60px] w-full items-center rounded-[16px] px-4 transition-all duration-200 mb-6"
            style={{
              background: "#FAFAF8",
              border: `1.5px solid ${password ? "#1B5E8A" : "#E8E8E4"}`,
            }}
          >
            <Lock size={20} className="text-[#8A8A8A] mr-3" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-transparent text-[16px] font-medium text-[#0A0A0A] placeholder:text-[#8A8A8A] focus:outline-none tracking-wide"
              style={{ fontFamily: "var(--font-jakarta)" }}
            />
          </div>

          <motion.button
            whileTap={{ scale: isValid && !loading ? 0.96 : 1 }}
            onClick={handleLogin}
            disabled={!isValid || loading || success}
            className="mt-2 flex h-[56px] w-full items-center justify-center rounded-[16px] transition-all duration-200"
            style={{
              background: success ? "#22C55E" : isValid ? "#1B5E8A" : "#E8E8E4",
              color: isValid || success ? "white" : "#8A8A8A",
              boxShadow: isValid && !success ? "0px 8px 24px rgba(27,94,138,0.25)" : "none"
            }}
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="h-6 w-6 rounded-full border-2 border-white/30 border-t-white"
              />
            ) : success ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                <CheckCircle2 size={24} />
              </motion.div>
            ) : (
              <span className="text-[17px] font-bold" style={{ fontFamily: "var(--font-outfit)" }}>
                Log In
              </span>
            )}
          </motion.button>
          
          <button className="mt-6 text-center text-[14px] font-medium text-[#1B5E8A] underline-offset-2 hover:underline">
            Forgot Password?
          </button>
        </motion.div>
      </div>
    </ScreenWrapper>
  );
}
