"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { ScreenWrapper } from "../ui/ScreenWrapper";
import { LightCard } from "../ui/Cards/LightCard";
import { Settings, LogOut, ChevronLeft, User, Bell, Shield, HelpCircle, ChevronRight } from "lucide-react";
import { springGentle, fadeInUp, staggerChildren } from "@/lib/animations";

export function SettingsScreen() {
  const { setActiveScreen, logout, activePanel } = useAppStore();

  const handleLogout = () => {
    logout();
    setActiveScreen("roleSelect");
  };

  const handleBack = () => {
    // Go back to the profile screen based on activePanel
    if (activePanel === "donor_shopkeeper") setActiveScreen("profile");
    else if (activePanel === "ngo_receiver") {
       const subRole = useAppStore.getState().activePanel2SubRole;
       if (subRole === "ngo") setActiveScreen("ngoProfile");
       else setActiveScreen("recipientProfile");
    }
    else if (activePanel === "volunteer") setActiveScreen("volunteerProfile");
    else setActiveScreen("home");
  };

  const settingsOptions = [
    { icon: User, label: "Account Settings", color: "text-blue-500", bg: "bg-blue-50" },
    { icon: Bell, label: "Notifications", color: "text-amber-500", bg: "bg-amber-50" },
    { icon: Shield, label: "Privacy & Security", color: "text-emerald-500", bg: "bg-emerald-50" },
    { icon: HelpCircle, label: "Help & Support", color: "text-purple-500", bg: "bg-purple-50" },
  ];

  return (
    <ScreenWrapper>
      <div className="flex flex-col h-full bg-[#F7F5F0] pt-4 pb-12">
        {/* Header */}
        <div className="flex items-center gap-4 px-4 mb-6">
          <button 
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100"
          >
            <ChevronLeft size={20} className="text-gray-800" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-outfit)" }}>Settings</h1>
        </div>

        {/* Options */}
        <motion.div 
          className="px-4 flex flex-col gap-4"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          <LightCard className="p-2">
            {settingsOptions.map((opt, i) => (
              <motion.button 
                key={i}
                variants={fadeInUp}
                className="w-full flex items-center justify-between p-4 hover:bg-[#FAFAF8] transition-colors border-b border-gray-50 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${opt.bg} flex items-center justify-center ${opt.color}`}>
                    <opt.icon size={20} />
                  </div>
                  <span className="font-bold text-gray-800 text-[16px]">{opt.label}</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </motion.button>
            ))}
          </LightCard>

          <motion.button 
            variants={fadeInUp}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="w-full h-14 mt-4 rounded-2xl border-2 border-[#FF6B6B]/20 text-[#FF6B6B] font-bold text-[16px] flex items-center justify-center gap-2 bg-white shadow-sm"
          >
            <LogOut size={20} />
            Log Out
          </motion.button>
        </motion.div>
      </div>
    </ScreenWrapper>
  );
}
