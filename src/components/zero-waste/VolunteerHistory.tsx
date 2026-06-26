"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { ArrowLeft, History, MapPin, PackageCheck, Award, Calendar, ChevronDown, Filter } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function VolunteerHistory() {
  const { setActiveScreen, completedMissions } = useAppStore();
  const [filter, setFilter] = useState("all"); // "all", "this_week", "this_month"

  return (
    <div className="flex flex-1 flex-col bg-[#F7F5F0] overflow-y-auto pb-24 h-full text-[#0A0A0A]">
      {/* Header */}
      <div className="sticky top-0 z-30 flex justify-between items-center px-5 py-4 bg-[rgba(247,245,240,0.92)] backdrop-blur-xl border-b border-gray-200">
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => setActiveScreen("volunteerHome")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm border border-gray-200 text-[#0A0A0A]"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <h1 className="text-xl font-bold" style={{ fontFamily: "var(--font-outfit)" }}>Pickups</h1>
        </div>
        <button className="flex items-center gap-1.5 text-sm font-bold bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-200">
          <Filter size={14} /> Filter
        </button>
      </div>

      <div className="px-5 mt-4">
        {/* Summary Stats for Pickups */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 bg-[#1B5E8A] text-white rounded-[16px] p-4 shadow-sm relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/10 rounded-full blur-xl" />
            <p className="text-white/80 text-xs font-bold uppercase tracking-wider mb-1">Total</p>
            <p className="font-bold text-2xl" style={{ fontFamily: "var(--font-outfit)" }}>34</p>
          </div>
          <div className="flex-1 bg-[#4CAF7D] text-white rounded-[16px] p-4 shadow-sm relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/10 rounded-full blur-xl" />
            <p className="text-white/80 text-xs font-bold uppercase tracking-wider mb-1">This Week</p>
            <p className="font-bold text-2xl" style={{ fontFamily: "var(--font-outfit)" }}>4</p>
          </div>
        </div>

        <h2 className="text-sm font-bold text-[#8A8A8A] uppercase tracking-wider mb-3">Recent Activity</h2>

        {completedMissions.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-12 text-center bg-white rounded-[24px] p-8 border border-gray-100 shadow-sm">
            <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <History size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>No Pickups Yet</h3>
            <p className="text-[#8A8A8A] text-sm mt-2 leading-relaxed" style={{ fontFamily: "var(--font-jakarta)" }}>
              Your completed rescues will appear here. Go to the map to find your first pickup!
            </p>
          </div>
        ) : (
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex flex-col gap-4"
          >
            {completedMissions.map((mission) => (
              <motion.div
                key={mission.id}
                variants={fadeUp}
                className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#4CAF7D]/10 flex items-center justify-center text-[#4CAF7D]">
                      <PackageCheck size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-[#0A0A0A] text-[16px] leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
                        {mission.servings} Meals Delivered
                      </p>
                      <p className="text-xs text-[#8A8A8A] font-medium mt-0.5 flex items-center gap-1" style={{ fontFamily: "var(--font-jakarta)" }}>
                        <Calendar size={12} />
                        {mission.completedAt?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-[#E8A020]/10 text-[#E8A020] px-2.5 py-1 rounded-full text-xs font-bold border border-[#E8A020]/20">
                    <Award size={14} /> +{mission.pointsAwarded || 15} pts
                  </div>
                </div>

                <div className="bg-[#F7F5F0] rounded-xl p-3 flex flex-col gap-3 relative">
                  <div className="absolute left-[23px] top-5 bottom-5 w-[2px] bg-gray-200" />
                  
                  <div className="flex items-start gap-3 relative z-10">
                    <div className="w-6 h-6 rounded-full bg-white border-2 border-[#1B5E8A] flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-[#1B5E8A]" />
                    </div>
                    <div>
                      <span className="font-bold text-[#0A0A0A] text-sm">{mission.providerName}</span>
                      <p className="text-xs text-[#8A8A8A] mt-0.5">Pickup</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 relative z-10">
                    <div className="w-6 h-6 rounded-full bg-white border-2 border-[#4CAF7D] flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-[#4CAF7D]" />
                    </div>
                    <div>
                      <span className="font-bold text-[#0A0A0A] text-sm">{mission.ngoName}</span>
                      <p className="text-xs text-[#8A8A8A] mt-0.5">Delivery</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
