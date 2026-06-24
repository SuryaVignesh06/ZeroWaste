"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { Building2, HeartHandshake, ChevronLeft } from "lucide-react";

export function NgoRecipientChoice() {
  const setScreen = useAppStore((s) => s.setScreen);

  return (
    <div className="flex h-full flex-col bg-[#F7F5F0]">
      {/* Header */}
      <div className="px-6 pt-16 pb-6">
        <button
          onClick={() => setScreen("role-select")}
          className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm border border-[#E8E8E4]"
        >
          <ChevronLeft size={20} className="text-[#0A0A0A]" />
        </button>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[30px] font-bold text-[#0A0A0A]"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          What best describes you?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-2 text-[15px] text-[#4A4A4A]"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Select your organization type to continue.
        </motion.p>
      </div>

      <div className="flex flex-col gap-4 px-6 mt-4">
        {/* NGO Choice */}
        <motion.button
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setScreen("ngo-auth-choice")}
          className="relative flex flex-col gap-4 overflow-hidden rounded-[24px] bg-white p-6 text-left shadow-[0_2px_16px_rgba(0,0,0,0.04)] border border-[#E8E8E4] transition-all"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#EBF0FF]">
            <Building2 size={24} className="text-[#1E3A8A]" />
          </div>
          <div>
            <h3 className="text-[20px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
              Non-Profit Organization (NGO)
            </h3>
            <p className="mt-1 text-[14px] text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>
              I want to register an organization to receive and distribute bulk food donations.
            </p>
          </div>
        </motion.button>

        {/* Recipient Choice */}
        <motion.button
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setScreen("recipient-setup")}
          className="relative flex flex-col gap-4 overflow-hidden rounded-[24px] bg-white p-6 text-left shadow-[0_2px_16px_rgba(0,0,0,0.04)] border border-[#E8E8E4] transition-all mt-2"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#F0F7F2]">
            <HeartHandshake size={24} className="text-[#1A6B3C]" />
          </div>
          <div>
            <h3 className="text-[20px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
              Individual Recipient
            </h3>
            <p className="mt-1 text-[14px] text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>
              I am an individual requesting food assistance for myself or my family.
            </p>
          </div>
        </motion.button>
      </div>
    </div>
  );
}
