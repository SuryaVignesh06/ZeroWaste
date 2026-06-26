"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { ArrowLeft, SlidersHorizontal, Utensils, Store, FileText, ChevronRight, Award } from "lucide-react";
import { ScreenWrapper } from "../ui/ScreenWrapper";
import { GlassSurface } from "../ui/GlassSurface";
import { staggerChildren, fadeInUp } from "@/lib/animations";

export function ActivityHistory() {
  const { user, donationHistory, setActiveScreen } = useAppStore();
  const [activeTab, setActiveTab] = useState<"all" | "donations" | "sales">("all");

  if (!user) return null;

  // Calculate stats dynamically
  const totalTaxValue = donationHistory.reduce((acc, curr) => acc + (curr.taxValue || 0), 0);
  const eligiblePercentage = 78; // Mock value matching the gauge

  const filteredHistory = donationHistory.filter(item => {
    if (activeTab === "all") return true;
    if (activeTab === "donations") return item.type === "donation";
    if (activeTab === "sales") return item.type === "sell";
    return true;
  });

  return (
    <ScreenWrapper className="bg-transparent pb-32">
      {/* =========================================
          ZONE 1 — HEADER TOP BAR
      ========================================= */}
      <div className="flex items-center justify-between pt-6 pb-4 relative z-20">
        {/* Back Arrow */}
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => setActiveScreen("profile")}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white/15 border border-white/25 backdrop-blur-[10px] shadow-sm text-white"
        >
          <ArrowLeft size={20} />
        </motion.button>

        {/* Center Toggle Switch */}
        <div className="flex bg-white/10 border border-white/20 p-0.5 rounded-full backdrop-blur-md">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-1.5 rounded-full font-jakarta text-[12px] font-bold transition-all ${
              activeTab === "all" ? "bg-white text-[#121214] shadow-sm" : "text-white/75 hover:text-white"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab("donations")}
            className={`px-4 py-1.5 rounded-full font-jakarta text-[12px] font-bold transition-all ${
              activeTab === "donations" ? "bg-white text-[#121214] shadow-sm" : "text-white/75 hover:text-white"
            }`}
          >
            Donations
          </button>
          <button
            onClick={() => setActiveTab("sales")}
            className={`px-4 py-1.5 rounded-full font-jakarta text-[12px] font-bold transition-all ${
              activeTab === "sales" ? "bg-white text-[#121214] shadow-sm" : "text-white/75 hover:text-white"
            }`}
          >
            Sales
          </button>
        </div>

        {/* Filter Button */}
        <motion.button 
          whileTap={{ scale: 0.9 }}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white/15 border border-white/25 backdrop-blur-[10px] shadow-sm text-white"
        >
          <SlidersHorizontal size={18} />
        </motion.button>
      </div>

      <h1 className="font-outfit text-[28px] font-light leading-[1.2] tracking-tight text-white mb-6">
        History
      </h1>

      {/* =========================================
          ZONE 2 — TAX RECEIPT RADIAL GAUGE CARD (Light)
      ========================================= */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[28px] border border-white/60 bg-white/80 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-md mb-6"
      >
        <div className="flex items-center gap-5">
          {/* Radial Gauge */}
          <div className="relative flex items-center justify-center w-24 h-24 shrink-0 bg-white/40 rounded-full border border-white/50">
            <svg className="w-20 h-20 transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="32"
                stroke="rgba(0,0,0,0.05)"
                strokeWidth="6"
                fill="transparent"
              />
              <motion.circle
                cx="40"
                cy="40"
                r="32"
                stroke="#F2D15A"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray="201"
                initial={{ strokeDashoffset: 201 }}
                animate={{ strokeDashoffset: 201 - (201 * eligiblePercentage) / 100 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="font-outfit text-[17px] font-bold text-text-primary leading-none">
                {eligiblePercentage}%
              </span>
              <span className="font-jakarta text-[8px] font-semibold text-text-secondary mt-0.5 tracking-tighter uppercase">
                Eligible
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="font-outfit text-[16px] font-bold text-text-primary leading-tight">
              Tax Receipt Status
            </h3>
            <p className="font-jakarta text-[12px] text-text-secondary mt-1">
              80G certificate ready to download.
            </p>
            <div className="font-outfit text-[15px] font-bold text-text-primary mt-2 flex items-center gap-1">
              <span>Claim value:</span>
              <span className="text-accent-gold-dark font-extrabold">₹{totalTaxValue.toLocaleString()}</span>
            </div>
            
            <button
              onClick={() => setActiveScreen("tax-receipt")}
              className="mt-3 inline-flex items-center gap-1.5 self-start bg-text-primary hover:bg-black text-white font-outfit text-[12px] font-bold px-4 py-2 rounded-full shadow-button active:scale-95 transition-all"
            >
              <FileText size={13} />
              Get Tax Receipt
            </button>
          </div>
        </div>
      </motion.div>

      {/* =========================================
          ZONE 3 — SESSION HISTORY CONTAINER (Dark)
      ========================================= */}
      <motion.div 
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="bg-[#1C1C1E]/90 border border-white/10 backdrop-blur-md rounded-[32px] p-5 shadow-lg relative flex flex-col flex-1"
      >
        {/* Header Row */}
        <div className="flex justify-between items-center mb-4 px-1">
          <h2 className="font-outfit text-[17px] font-bold text-white tracking-[-0.2px]">
            Activity Log
          </h2>
          <span className="font-jakarta text-[13px] text-white/50 font-semibold tracking-wide">
            {filteredHistory.length}/{donationHistory.length}
          </span>
        </div>

        {/* Scrollable list */}
        <div className="flex flex-col gap-3 max-h-[360px] overflow-y-auto pr-1">
          {filteredHistory.map((item) => {
            const isDonation = item.type === "donation";
            const dateStr = item.date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            });

            return (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                className="bg-white/5 border border-white/10 rounded-[20px] p-3.5 flex justify-between items-center transition-all hover:bg-white/10"
              >
                <div className="flex items-center gap-3.5">
                  {/* Left Avatar Icon Circle */}
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center text-white backdrop-blur-md shadow-inner border border-white/15 ${
                    isDonation ? "bg-[#F2D15A]/15 text-[#F2D15A]" : "bg-[#9BC84A]/15 text-[#9BC84A]"
                  }`}>
                    {isDonation ? <Utensils size={18} /> : <Store size={18} />}
                  </div>

                  <div>
                    <h4 className="font-outfit text-white text-[15px] font-bold tracking-tight">
                      {item.foodName}
                    </h4>
                    <p className="font-jakarta text-white/50 text-[11px] mt-0.5 font-medium">
                      {dateStr} • {isDonation ? `${item.servings} servings` : `${item.quantity || 1} units`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {isDonation ? (
                    <div className="bg-[#F2D15A]/20 text-[#F2D15A] border border-[#F2D15A]/30 font-bold font-jakarta text-[11px] px-2.5 py-1 rounded-lg">
                      +{item.pointsEarned} pts
                    </div>
                  ) : (
                    <div className="bg-[#9BC84A]/20 text-[#9BC84A] border border-[#9BC84A]/30 font-bold font-jakarta text-[11px] px-2.5 py-1 rounded-lg">
                      ₹{item.earnedAmount || 0} Sold
                    </div>
                  )}
                  <ChevronRight size={14} className="text-white/30" />
                </div>
              </motion.div>
            );
          })}

          {filteredHistory.length === 0 && (
            <div className="text-center py-12 text-white/40 font-jakarta text-[13px]">
              No transactions match this category.
            </div>
          )}
        </div>
      </motion.div>
    </ScreenWrapper>
  );
}
