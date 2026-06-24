"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { Building2, LogIn, ChevronLeft } from "lucide-react";

export function NgoAuthChoice() {
  const setScreen = useAppStore((s) => s.setScreen);

  return (
    <div className="flex h-full flex-col bg-[#F7F5F0]">
      {/* Top Header */}
      <div className="px-4 pt-12 pb-4">
        <button
          onClick={() => setScreen("role-select")}
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
          NGO / Recipient Access
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-2 text-[15px] text-[#4A4A4A]"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Are you an existing member or registering a new organization?
        </motion.p>

        <div className="mt-12 flex flex-col gap-5">
          <motion.button
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setScreen("ngo-login" as any)}
            className="flex items-center gap-4 rounded-[24px] border border-[#E8E8E4] bg-white p-6 shadow-sm"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1E3A8A]">
              <LogIn size={20} className="text-white" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-[18px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Login</h3>
              <p className="text-[13px] text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>I already have an account</p>
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setScreen("ngo-setup")}
            className="flex items-center gap-4 rounded-[24px] border border-[#E8E8E4] bg-white p-6 shadow-sm"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E9D5FF]">
              <Building2 size={20} className="text-[#6B21A8]" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-[18px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Register New</h3>
              <p className="text-[13px] text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>Set up a new organization</p>
            </div>
          </motion.button>
        </div>
      </main>
    </div>
  );
}
