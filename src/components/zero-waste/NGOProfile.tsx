"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { springGentle, springBouncy } from "@/lib/animations";
import { Building2, CheckCircle2, ShieldCheck, FileText, Settings, LogOut, ChevronRight } from "lucide-react";
import { LightCard } from "../ui/Cards/LightCard";
import { StatCardPair } from "../ui/Cards/StatCardPair";
import { IconButton } from "../ui/Buttons/IconButton";

export function NGOProfile() {
  const ngoUser = useAppStore((s) => s.ngoUser);
  const setActiveScreen = useAppStore((s) => s.setActiveScreen);
  const logout = useAppStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    setActiveScreen("roleSelect");
  };

  if (!ngoUser) return null;

  return (
    <div className="flex flex-col h-full bg-[#F7F5F0] overflow-y-auto pb-24">
      {/* Top Banner (Header) */}
      <div 
        className="relative flex flex-col items-center justify-center overflow-hidden px-6 pt-16 pb-12" 
        style={{ 
          background: "linear-gradient(180deg, #0f3652 0%, #1B5E8A 75%, #134363 100%)",
          borderRadius: "0 0 40px 40px",
          zIndex: 10
        }}
      >
        <div className="absolute top-[-20px] left-[-20px] h-[80px] w-[80px] rounded-full bg-white/5" />
        <div className="absolute bottom-[-40px] right-[-40px] h-[200px] w-[200px] rounded-full bg-white/5" />

        <div className="absolute top-12 right-6">
          <IconButton icon={<Settings size={20} className="text-white" />} variant="light" className="bg-white/10 border border-white/20" />
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={springGentle}
          className="mb-4 flex h-20 w-20 items-center justify-center rounded-[24px] bg-white shadow-[0_8px_32px_rgba(0,0,0,0.15)] relative"
        >
          <Building2 size={40} className="text-[#1B5E8A]" />
          <div className="absolute -bottom-2 -right-2 bg-[#3A7D52] text-white p-1 rounded-full border-2 border-white">
            <CheckCircle2 size={16} />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springGentle, delay: 0.1 }}
          className="text-[28px] font-extrabold text-white text-center"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          {ngoUser.ngoName}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springGentle, delay: 0.15 }}
          className="text-white/80 text-[15px] font-medium mt-1"
        >
          Food Bank • Official Partner
        </motion.p>
      </div>

      <div className="relative z-20 px-4 -mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springBouncy, delay: 0.2 }}
        >
          <StatCardPair 
            stat1={{ 
              label: "Volunteers", 
              value: ngoUser.activeVolunteers, 
              className: "shadow-md"
            }}
            stat2={{ 
              label: "Distributed", 
              value: ngoUser.totalMealsDistributed, 
              className: "shadow-md"
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springBouncy, delay: 0.3 }}
          className="mt-4"
        >
          <LightCard className="p-6">
            <h3 className="font-bold text-[18px] text-[#0A0A0A] mb-5 flex items-center gap-2" style={{ fontFamily: "var(--font-outfit)" }}>
              <ShieldCheck size={20} className="text-[#1B5E8A]" /> Registration Details
            </h3>
            <div className="flex flex-col gap-4 text-[15px]" style={{ fontFamily: "var(--font-jakarta)" }}>
              <div className="flex justify-between items-center border-b border-[#FAFAF8] pb-3">
                <span className="text-[#8A8A8A] font-semibold">NGO ID</span>
                <span className="font-bold text-[#0A0A0A]">{ngoUser.ngoId}</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#FAFAF8] pb-3">
                <span className="text-[#8A8A8A] font-semibold">Category</span>
                <span className="font-bold text-[#0A0A0A]">{ngoUser.category}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#8A8A8A] font-semibold">Reg Number</span>
                <span className="font-bold text-[#0A0A0A] uppercase">{ngoUser.registrationNumber}</span>
              </div>
            </div>
          </LightCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springBouncy, delay: 0.4 }}
          className="mt-4"
        >
          <LightCard className="p-2">
            <button className="w-full flex items-center justify-between p-4 hover:bg-[#FAFAF8] rounded-xl transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E3EEF6] flex items-center justify-center text-[#1B5E8A]">
                  <FileText size={18} />
                </div>
                <span className="font-bold text-[#0A0A0A] text-[16px]">Tax Certificates</span>
              </div>
              <ChevronRight size={20} className="text-[#8A8A8A]" />
            </button>
          </LightCard>
        </motion.div>

        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="w-full h-14 mt-8 rounded-2xl border-2 border-[#FF6B6B]/20 text-[#FF6B6B] font-bold text-[16px] flex items-center justify-center gap-2 bg-white shadow-sm"
        >
          <LogOut size={20} />
          Log Out
        </motion.button>
      </div>
    </div>
  );
}
