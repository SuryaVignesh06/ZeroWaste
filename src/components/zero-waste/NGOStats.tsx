"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { springGentle, springBouncy } from "@/lib/animations";
import { BarChart3, Radio, Plus } from "lucide-react";
import { ScreenWrapper } from "../ui/ScreenWrapper";
import { LightCard } from "../ui/Cards/LightCard";

export function NGOStats() {
  const ngoUser = useAppStore((s) => s.ngoUser);

  if (!ngoUser) return null;

  return (
    <ScreenWrapper>
      <div className="flex flex-col gap-6 pt-6 relative z-10 pb-24">
        
        {/* Header */}
        <motion.div 
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...springGentle, delay: 0 }}
        >
          <h1 className="text-h1 mb-1">Stats & Requests</h1>
          <p className="text-body text-text-secondary">Track impact and broadcast food needs</p>
        </motion.div>

        {/* Big Impact Card */}
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...springBouncy, delay: 0.1 }}
        >
          <div className="p-6 rounded-[24px] bg-gradient-to-br from-[#1B5E8A] to-[#134363] border-none text-white relative overflow-hidden shadow-[0_12px_32px_rgba(27,94,138,0.3)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 size={20} className="text-white/80" />
                <h3 className="font-bold text-[16px] text-white/90" style={{ fontFamily: "var(--font-outfit)" }}>Meals this week</h3>
              </div>
              <p className="text-[48px] font-bold text-[#F5B840] leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
                {ngoUser.totalMealsDistributed}
              </p>
              <div className="mt-2 text-[14px] text-white/70 font-medium" style={{ fontFamily: "var(--font-jakarta)" }}>
                +14% from last week
              </div>
            </div>
          </div>
        </motion.div>

        {/* Broadcast Form */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springBouncy, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Radio className="text-[#1B5E8A]" size={24} />
            <h2 className="text-[20px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Pull a Request</h2>
          </div>
          <p className="text-[14px] text-[#4A4A4A] mb-4" style={{ fontFamily: "var(--font-jakarta)" }}>
            Notify nearby donors about urgent requirements.
          </p>

          <LightCard className="p-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#8A8A8A] uppercase tracking-wider" style={{ fontFamily: "var(--font-outfit)" }}>Food Type</label>
              <input type="text" placeholder="e.g. Rice & Curry" className="w-full bg-[#FAFAF8] border border-[#E8E8E4] rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:border-[#1B5E8A] transition-colors" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#8A8A8A] uppercase tracking-wider" style={{ fontFamily: "var(--font-outfit)" }}>Quantity Needed</label>
              <input type="number" placeholder="e.g. 50 servings" className="w-full bg-[#FAFAF8] border border-[#E8E8E4] rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:border-[#1B5E8A] transition-colors" />
            </div>
            
            <button className="mt-2 w-full h-12 rounded-xl bg-[#1B5E8A] text-white font-bold text-[16px] flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all">
              <Radio size={18} />
              Broadcast Now
            </button>
          </LightCard>
        </motion.div>

      </div>
    </ScreenWrapper>
  );
}
