"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { 
  ArrowLeft, Settings, Award, Navigation, Star, 
  ShieldCheck, Clock, FileText, ChevronRight, CheckCircle2,
  TrendingUp, Download
} from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function VolunteerProfile() {
  const { setActiveScreen, volunteerProfile } = useAppStore();

  if (!volunteerProfile) return null;

  return (
    <div className="flex flex-1 flex-col bg-[#F7F5F0] overflow-y-auto pb-24 h-full text-[#0A0A0A]">
      {/* HEADER */}
      <div className="pt-20 pb-12 px-6 relative overflow-hidden bg-[#1B5E8A] rounded-b-[40px] shadow-sm min-h-[220px]">
        <div className="flex justify-between items-center relative z-10 mb-6">
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => setActiveScreen("volunteerHome")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border border-gray-100 text-[#1B5E8A]"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.88 }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border border-gray-100 text-[#1B5E8A]"
          >
            <Settings size={20} />
          </motion.button>
        </div>

        <div className="flex items-center gap-4 relative z-10 mt-2">
          <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-[#E8A020] to-[#E8C547] flex items-center justify-center shadow-lg border-2 border-white">
            <span className="text-white font-bold text-2xl" style={{ fontFamily: "var(--font-outfit)" }}>
              {volunteerProfile.displayName?.charAt(0) || "V"}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-black text-white leading-tight tracking-tight" style={{ fontFamily: "var(--font-outfit)" }}>
              {volunteerProfile.displayName || "Volunteer"}
            </h1>
            <p className="text-[#E8A020] font-bold flex items-center gap-1.5 mt-0.5 text-xs tracking-wider" style={{ fontFamily: "var(--font-jakarta)" }}>
              <ShieldCheck size={14} /> LEVEL {volunteerProfile.rank} RIDER
            </p>
          </div>
        </div>

        {/* Level Progress */}
        <div className="mt-8 relative z-10">
          <div className="flex justify-between text-xs font-bold mb-2">
            <span className="text-white/80">XP Progress</span>
            <span className="text-[#E8A020]">1240 / 1500</span>
          </div>
          <div className="h-2.5 w-full bg-black/20 rounded-full overflow-hidden border border-white/10">
            <div className="h-full bg-[#E8A020] rounded-full" style={{ width: '82%' }} />
          </div>
        </div>
      </div>

      <div className="px-5 mt-6 flex flex-col gap-6">
        
        {/* STATS ROW (4 Columns) */}
        <motion.div variants={staggerContainer} initial="initial" animate="animate" className="flex gap-2">
          <motion.div variants={fadeUp} className="flex-1 bg-white border border-[#E5E5E5] rounded-2xl p-3 text-center flex flex-col items-center justify-center shadow-sm">
            <p className="text-[#0A0A0A] font-bold text-lg leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>{volunteerProfile.totalDeliveries}</p>
            <p className="text-[#8A8A8A] text-[10px] font-bold uppercase mt-1">Pickups</p>
          </motion.div>
          <motion.div variants={fadeUp} className="flex-1 bg-white border border-[#E5E5E5] rounded-2xl p-3 text-center flex flex-col items-center justify-center shadow-sm">
            <p className="text-[#E8A020] font-bold text-lg leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>{volunteerProfile.impactPoints}</p>
            <p className="text-[#8A8A8A] text-[10px] font-bold uppercase mt-1">Pts</p>
          </motion.div>
          <motion.div variants={fadeUp} className="flex-1 bg-white border border-[#E5E5E5] rounded-2xl p-3 text-center flex flex-col items-center justify-center shadow-sm">
            <p className="text-[#0A0A0A] font-bold text-lg leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>{volunteerProfile.totalHours}h</p>
            <p className="text-[#8A8A8A] text-[10px] font-bold uppercase mt-1">Hours</p>
          </motion.div>
          <motion.div variants={fadeUp} className="flex-1 bg-white border border-[#E5E5E5] rounded-2xl p-3 text-center flex flex-col items-center justify-center shadow-sm">
            <p className="text-[#0A0A0A] font-bold text-lg leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>{volunteerProfile.distanceCovered.toFixed(0)}</p>
            <p className="text-[#8A8A8A] text-[10px] font-bold uppercase mt-1">km</p>
          </motion.div>
        </motion.div>

        {/* IMPACT GRAPH */}
        <motion.div variants={fadeUp} className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold flex items-center gap-2 text-[#0A0A0A]"><TrendingUp size={18} className="text-[#1B5E8A]"/> Impact This Week</h3>
            <span className="text-xs font-bold bg-[#F7F5F0] px-2 py-1 rounded-md text-[#4A4A4A]">Hours</span>
          </div>
          
          <div className="bg-[#F7F5F0] rounded-xl p-4 h-32 flex items-end justify-between relative border border-gray-200">
            {volunteerProfile.weeklyHours.map((h, i) => (
              <div key={i} className="w-6 bg-gradient-to-t from-[#4CAF7D]/20 to-[#4CAF7D] rounded-t-sm relative group" style={{ height: `${Math.max((h / 30) * 100, 4)}%` }}>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-white shadow-md text-xs font-bold px-2 py-1 rounded transition-opacity text-[#0A0A0A]">
                  {h}h
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 px-1 text-[#8A8A8A] text-xs font-medium">
            <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
          </div>
        </motion.div>

        {/* NSS/GOVERNMENT BENEFITS */}
        {volunteerProfile.volunteerType === "nss" && (
          <motion.div variants={fadeUp} className="bg-[#0F2942] rounded-[20px] p-5 shadow-sm border border-gray-100 text-white relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#4CAF7D]/20 blur-xl rounded-full" />
            <h3 className="font-bold flex items-center gap-2 mb-2 text-white"><ShieldCheck size={18} className="text-[#4CAF7D]"/> NSS Service Hours</h3>
            <p className="text-sm text-white/90 mb-4">{volunteerProfile.institution} • {volunteerProfile.role}</p>

            <div className="bg-white/10 rounded-xl p-3 flex justify-between items-center mb-3">
              <div>
                <p className="text-xs text-white/60 font-bold uppercase tracking-wide">Approved Hours</p>
                <p className="font-bold text-xl">{volunteerProfile.totalHours} / 120</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#4CAF7D] font-bold">In Good Standing</p>
              </div>
            </div>

            <button className="w-full bg-[#4CAF7D] text-white py-2.5 rounded-full font-bold text-sm shadow-sm flex justify-center items-center gap-2">
              <Download size={16} /> Download Verification Letter
            </button>
          </motion.div>
        )}

        {/* CERTIFICATES & REWARDS */}
        <motion.div variants={fadeUp}>
          <h3 className="font-bold text-[#0A0A0A] flex items-center gap-2 mb-3 px-1"><Award size={18} className="text-[#E8A020]"/> Certificates & Badges</h3>
          
          <div className="space-y-3">
            <div className="bg-white rounded-[16px] p-4 shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:border-[#1B5E8A] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1B5E8A]/10 flex items-center justify-center text-[#1B5E8A]">
                  <FileText size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-[#0A0A0A] text-sm">25 Hours Milestone</h4>
                  <p className="text-xs text-[#8A8A8A]">Issued: Sep 10, 2026</p>
                </div>
              </div>
              <Download size={18} className="text-[#1B5E8A]" />
            </div>

            <div className="bg-white rounded-[16px] p-4 shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:border-[#4CAF7D] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#4CAF7D]/10 flex items-center justify-center text-[#4CAF7D]">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-[#0A0A0A] text-sm">Top 10% Contributor</h4>
                  <p className="text-xs text-[#8A8A8A]">Awarded for Sep 2026</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-[#4CAF7D]" />
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
