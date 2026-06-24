"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { ChevronLeft, Lock, Phone } from "lucide-react";

export function VolunteerLogin() {
  const setScreen = useAppStore((s) => s.setScreen);
  const completeSetup = useAppStore((s) => s.completeSetup);

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Simulate successful login
    completeSetup();
    setScreen("volunteerHome");
  };

  return (
    <div className="flex h-full flex-col bg-[#F7F5F0]">
      {/* Top Header */}
      <div className="px-4 pt-12 pb-4">
        <button
          onClick={() => setScreen("volunteer-auth-choice" as any)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <ChevronLeft size={20} className="text-[#0A0A0A]" />
        </button>
      </div>

      <main className="flex-1 px-6 pt-6">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[30px] font-bold text-[#0A0A0A]"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Welcome Back, Partner
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-2 text-[15px] text-[#4A4A4A]"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Enter your credentials to access your dashboard.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 flex flex-col gap-5"
        >
          <div>
            <label className="mb-2 block text-[13px] font-bold text-[#4A4A4A] uppercase tracking-wider" style={{ fontFamily: "var(--font-jakarta)" }}>
              Registered Phone Number
            </label>
            <div className="flex items-center gap-3 rounded-[16px] border border-[#E8E8E4] bg-white px-4 py-4 focus-within:border-[#D97706] transition-colors">
              <Phone size={18} className="text-[#8A8A8A]" />
              <span className="text-[16px] font-medium text-[#4A4A4A]">+91</span>
              <div className="h-5 w-[1px] bg-[#E8E8E4]" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="Enter mobile number"
                className="w-full bg-transparent text-[16px] font-medium text-[#0A0A0A] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[13px] font-bold text-[#4A4A4A] uppercase tracking-wider" style={{ fontFamily: "var(--font-jakarta)" }}>
              Password / PIN
            </label>
            <div className="flex items-center gap-3 rounded-[16px] border border-[#E8E8E4] bg-white px-4 py-4 focus-within:border-[#D97706] transition-colors">
              <Lock size={18} className="text-[#8A8A8A]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-transparent text-[16px] font-medium text-[#0A0A0A] focus:outline-none"
              />
            </div>
          </div>
        </motion.div>
      </main>

      {/* Fixed Bottom Action Button */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200, delay: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white px-6 pb-10 pt-4 shadow-[0_-8px_32px_rgba(0,0,0,0.06)] rounded-t-[32px]"
      >
        <button
          onClick={handleLogin}
          disabled={phone.length !== 10 || !password}
          className="flex h-14 w-full items-center justify-center rounded-full bg-[#D97706] text-[17px] font-bold text-white transition-all disabled:opacity-50"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Login
        </button>
      </motion.div>
    </div>
  );
}
