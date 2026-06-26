"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { staggerChildren, fadeInUp, springGentle } from "@/lib/animations";
import { Users, Search, MessageCircle, Phone, Star } from "lucide-react";
import { ScreenWrapper } from "../ui/ScreenWrapper";
import { LightCard } from "../ui/Cards/LightCard";
import { Avatar } from "../ui/Display/Avatar";

export function NGOVolunteers() {
  const ngoVolunteers = useAppStore((s) => s.ngoVolunteers) || [];
  const [filter, setFilter] = useState("All");

  const tabs = ["All", "Online", "On Delivery", "Offline"];

  return (
    <ScreenWrapper>
      <div className="flex flex-col gap-6 pt-6 relative z-10 pb-24">
        
        {/* Header */}
        <motion.div 
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...springGentle, delay: 0 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Users size={28} className="text-[#1B5E8A]" />
            <h1 className="text-h1">Volunteers</h1>
          </div>
          <p className="text-body text-text-secondary mt-1">Manage your active volunteer network</p>
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="flex gap-2 overflow-x-auto pb-2 no-scrollbar"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2 rounded-full font-bold text-[14px] whitespace-nowrap transition-colors ${
                filter === tab 
                  ? "bg-[#1B5E8A] text-white shadow-[0_4px_12px_rgba(27,94,138,0.25)]" 
                  : "bg-white text-[#8A8A8A] border border-[#E8E8E4]"
              }`}
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* List */}
        <motion.div 
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="flex flex-col gap-4"
        >
          <AnimatePresence mode="popLayout">
            {ngoVolunteers.length > 0 ? (
              ngoVolunteers.map(v => (
                <motion.div key={v.id} variants={fadeInUp} layoutId={`vol-${v.id}`}>
                  <LightCard className="p-4 flex flex-col gap-4 relative overflow-hidden">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar src={v.avatar} size="lg" className="border-2 border-white shadow-sm" />
                        <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${v.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[17px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>{v.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[13px] font-semibold text-[#8A8A8A] bg-[#FAFAF8] px-2 py-0.5 rounded-md" style={{ fontFamily: "var(--font-jakarta)" }}>{v.type}</span>
                          <span className="flex items-center gap-0.5 text-[13px] font-bold text-[#F5B840]">
                            <Star size={12} fill="currentColor" /> {v.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 w-full pt-2 border-t border-[#FAFAF8]">
                      <button className="flex-1 h-10 rounded-xl bg-[#E3EEF6] text-[#1B5E8A] font-bold text-[14px] flex items-center justify-center gap-2 active:scale-95 transition-all">
                        <MessageCircle size={16} /> Chat
                      </button>
                      <button className="flex-1 h-10 rounded-xl bg-[#E3F2EA] text-[#3A7D52] font-bold text-[14px] flex items-center justify-center gap-2 active:scale-95 transition-all">
                        <Phone size={16} /> Call
                      </button>
                    </div>
                  </LightCard>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-500 mt-8">No volunteers match this filter.</p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </ScreenWrapper>
  );
}
