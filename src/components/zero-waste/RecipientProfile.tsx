"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { springGentle, springBouncy } from "@/lib/animations";
import { User as UserIcon, CheckCircle2, ShieldCheck, Bell, MapPin, Globe, LogOut, ChevronRight } from "lucide-react";
import { LightCard } from "../ui/Cards/LightCard";
import { StatCardPair } from "../ui/Cards/StatCardPair";
import { IconButton } from "../ui/Buttons/IconButton";

export function RecipientProfile() {
  const recipientUser = useAppStore((s) => s.recipientUser);
  const setActiveScreen = useAppStore((s) => s.setActiveScreen);
  const logout = useAppStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    setActiveScreen("roleSelect");
  };

  if (!recipientUser) return null;

  return (
    <div className="flex flex-col h-full bg-[#F7F5F0] overflow-y-auto pb-24">
      {/* Top Banner (Header) */}
      <div 
        className="relative flex flex-col items-center justify-center overflow-hidden px-6 pt-16 pb-12" 
        style={{ 
          background: "linear-gradient(180deg, #6b21a8 0%, #86198F 75%, #a21caf 100%)",
          borderRadius: "0 0 40px 40px",
          zIndex: 10
        }}
      >
        <div className="absolute top-[-20px] left-[-20px] h-[80px] w-[80px] rounded-full bg-white/5" />
        <div className="absolute bottom-[-40px] right-[-40px] h-[200px] w-[200px] rounded-full bg-white/5" />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={springGentle}
          className="mb-4 flex h-20 w-20 items-center justify-center rounded-[24px] bg-white shadow-[0_8px_32px_rgba(0,0,0,0.15)] relative"
        >
          <UserIcon size={40} className="text-[#86198F]" />
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
          {recipientUser.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springGentle, delay: 0.15 }}
          className="text-white/80 text-[15px] font-medium mt-1 flex items-center gap-1.5"
        >
          Recipient • <MapPin size={14} /> {recipientUser.city}
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
              label: "Reservations", 
              value: recipientUser.totalReservations, 
              className: "shadow-md"
            }}
            stat2={{ 
              label: "Household", 
              value: recipientUser.householdSize, 
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
              <ShieldCheck size={20} className="text-[#86198F]" /> Account Status
            </h3>
            <div className="flex flex-col gap-4 text-[15px]" style={{ fontFamily: "var(--font-jakarta)" }}>
              <div className="flex justify-between items-center pb-1">
                <span className="text-[#8A8A8A] font-semibold">Verification</span>
                <span className="font-bold text-[#3A7D52] uppercase px-3 py-1 bg-[#3A7D52]/10 rounded-full text-[12px] tracking-wide">{recipientUser.verificationStatus}</span>
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
                <div className="w-10 h-10 rounded-full bg-[#fce7f3] flex items-center justify-center text-[#db2777]">
                  <Bell size={18} />
                </div>
                <span className="font-bold text-[#0A0A0A] text-[16px]">Push Notifications</span>
              </div>
              <ChevronRight size={20} className="text-[#8A8A8A]" />
            </button>
            <div className="h-[1px] w-full bg-[#FAFAF8]" />
            <button className="w-full flex items-center justify-between p-4 hover:bg-[#FAFAF8] rounded-xl transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#dbeafe] flex items-center justify-center text-[#2563eb]">
                  <MapPin size={18} />
                </div>
                <span className="font-bold text-[#0A0A0A] text-[16px]">Update Location</span>
              </div>
              <ChevronRight size={20} className="text-[#8A8A8A]" />
            </button>
            <div className="h-[1px] w-full bg-[#FAFAF8]" />
            <button className="w-full flex items-center justify-between p-4 hover:bg-[#FAFAF8] rounded-xl transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#fef3c7] flex items-center justify-center text-[#d97706]">
                  <Globe size={18} />
                </div>
                <span className="font-bold text-[#0A0A0A] text-[16px]">Language</span>
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
