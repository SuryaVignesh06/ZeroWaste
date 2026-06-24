"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { LogOut, ChevronRight, Settings, Bell, ShieldQuestion, Star, MapPin, Bike, Package } from "lucide-react";

export function VolunteerProfile() {
  const setScreen = useAppStore((s) => s.setScreen);
  const setRole = useAppStore((s) => s.setRole);
  const profile = useAppStore((s) => s.volunteerProfile);

  const handleLogout = () => {
    setRole(null);
    setScreen("login");
  };

  return (
    <div className="flex h-full flex-col bg-[#F7F5F0]">
      {/* Header Profile Section */}
      <div className="bg-white px-6 pt-16 pb-8 rounded-b-[32px] shadow-sm">
        <div className="flex items-center gap-4">
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#F5E6C8] border-2 border-[#D97706]">
            <span className="text-[28px] font-bold text-[#D97706]" style={{ fontFamily: "var(--font-outfit)" }}>
              {profile?.name?.charAt(0) || "V"}
            </span>
            <div className="absolute bottom-0 right-0 h-5 w-5 rounded-full border-[3px] border-white bg-[#10B981]" />
          </div>
          <div className="flex-1">
            <h1 className="text-[24px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
              {profile?.name || "Volunteer Name"}
            </h1>
            <div className="mt-1 flex items-center gap-1.5 text-[#4A4A4A]">
              <MapPin size={14} />
              <span className="text-[13px] font-medium" style={{ fontFamily: "var(--font-jakarta)" }}>
                {profile?.location || "Bangalore, India"}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-8 flex gap-3">
          <div className="flex-1 rounded-[20px] bg-[#FFFBEB] p-4 border border-[#FEF3C7]">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FDE68A] text-[#D97706] mb-3">
              <Package size={20} />
            </div>
            <h3 className="text-[24px] font-bold text-[#D97706]" style={{ fontFamily: "var(--font-outfit)" }}>142</h3>
            <p className="text-[12px] font-bold text-[#D97706]/70 uppercase tracking-wider mt-0.5">Pickups</p>
          </div>
          <div className="flex-1 rounded-[20px] bg-[#F0F7F2] p-4 border border-[#DCFCE7]">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#BBF7D0] text-[#16A34A] mb-3">
              <Star size={20} fill="currentColor" />
            </div>
            <h3 className="text-[24px] font-bold text-[#16A34A]" style={{ fontFamily: "var(--font-outfit)" }}>4.9</h3>
            <p className="text-[12px] font-bold text-[#16A34A]/70 uppercase tracking-wider mt-0.5">Rating</p>
          </div>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto px-6 py-6 pb-32">
        {/* Vehicle Info */}
        <div className="mb-6 rounded-[24px] bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.04)] border border-[#E8E8E4] flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5E6C8]">
            <Bike size={24} className="text-[#D97706]" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-[#8A8A8A] uppercase tracking-wider mb-0.5" style={{ fontFamily: "var(--font-jakarta)" }}>Active Vehicle</p>
            <p className="text-[16px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
              {profile?.vehicle === "bicycle" ? "Bicycle" : profile?.vehicle === "two_wheeler" ? "Motorcycle / Scooter" : profile?.vehicle === "on_foot" ? "Walking" : "Vehicle"}
            </p>
          </div>
          <button className="ml-auto text-[13px] font-bold text-[#D97706]">Edit</button>
        </div>

        {/* Settings List */}
        <div className="flex flex-col gap-3">
          <h2 className="mb-1 ml-2 text-[14px] font-bold text-[#8A8A8A] uppercase tracking-wider" style={{ fontFamily: "var(--font-jakarta)" }}>
            Preferences
          </h2>
          
          <button className="flex items-center gap-4 rounded-[20px] bg-white p-4 shadow-sm border border-[#E8E8E4]">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F7F5F0]">
              <Settings size={20} className="text-[#0A0A0A]" />
            </div>
            <span className="flex-1 text-left text-[16px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Account Settings</span>
            <ChevronRight size={20} className="text-[#8A8A8A]" />
          </button>

          <button className="flex items-center gap-4 rounded-[20px] bg-white p-4 shadow-sm border border-[#E8E8E4]">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F7F5F0]">
              <Bell size={20} className="text-[#0A0A0A]" />
            </div>
            <span className="flex-1 text-left text-[16px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Push Notifications</span>
            <ChevronRight size={20} className="text-[#8A8A8A]" />
          </button>

          <button className="flex items-center gap-4 rounded-[20px] bg-white p-4 shadow-sm border border-[#E8E8E4]">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F7F5F0]">
              <ShieldQuestion size={20} className="text-[#0A0A0A]" />
            </div>
            <span className="flex-1 text-left text-[16px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Help & Support</span>
            <ChevronRight size={20} className="text-[#8A8A8A]" />
          </button>

          <button 
            onClick={handleLogout}
            className="mt-4 flex items-center gap-4 rounded-[20px] bg-white p-4 shadow-sm border border-[#FEF2F2]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FEF2F2]">
              <LogOut size={20} className="text-[#EF4444]" />
            </div>
            <span className="flex-1 text-left text-[16px] font-bold text-[#EF4444]" style={{ fontFamily: "var(--font-outfit)" }}>Log Out</span>
          </button>
        </div>
      </main>
    </div>
  );
}
