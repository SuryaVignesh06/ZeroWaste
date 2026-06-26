"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { staggerChildren, fadeInUp, springGentle, springBouncy, tapBounce } from "@/lib/animations";
import { 
  Building2, 
  MapPin, 
  CheckCircle2, 
  HeartHandshake, 
  Utensils, 
  ChevronRight, 
  Radio,
  Clock,
  ArrowRight
} from "lucide-react";

import { ScreenWrapper } from "../ui/ScreenWrapper";
import { StatCardPair } from "../ui/Cards/StatCardPair";
import { LightCard } from "../ui/Cards/LightCard";
import { Avatar } from "../ui/Display/Avatar";

export function NGOHome() {
  const ngoUser = useAppStore((s) => s.ngoUser);
  const { setActiveScreen, pullRequests } = useAppStore();

  if (!ngoUser) return null;

  // We can treat unassigned pull requests as "Live Food Available"
  // For the demo data, we'll filter them.
  const liveDonations = pullRequests.filter(pr => pr.status === "open");

  return (
    <ScreenWrapper>
      <div className="flex flex-col gap-5 pt-4 relative z-10 pb-24">
        
        {/* ── Header ── */}
        <motion.div 
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...springGentle, delay: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 size={16} className="text-[#3A7D52]" />
              <p className="text-body-sm text-[#3A7D52] font-semibold tracking-wide uppercase">Government Verified</p>
            </div>
            <h1 className="text-display mt-0.5 leading-tight text-[#0A0A0A]">{ngoUser.ngoName}</h1>
            <p className="text-body flex items-center gap-1.5 mt-1 text-[#4A4A4A]">
              <MapPin size={16} />
              {ngoUser.town}, {ngoUser.city}
            </p>
          </div>

          <motion.div
            {...tapBounce}
            onClick={() => setActiveScreen("ngoProfile")}
            className="w-14 h-14 rounded-[20px] bg-white/90 shadow-[0_8px_28px_rgba(0,0,0,0.10)] flex items-center justify-center border border-white/60 cursor-pointer shrink-0"
            style={{ backdropFilter: "blur(20px)" }}
          >
            <Building2 size={24} className="text-[#1B5E8A]" />
          </motion.div>
        </motion.div>

        {/* ── Stats Row ── */}
        <motion.div 
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...springBouncy, delay: 0.08 }}
        >
          <StatCardPair 
            stat1={{ 
              label: "Meals Distributed", 
              value: ngoUser.totalMealsDistributed, 
              icon: <HeartHandshake />, 
              iconColor: "text-[#3A7D52]",
              className: "!bg-[#3A7D52]/10 !border-[#3A7D52]/20"
            }}
            stat2={{ 
              label: "Accepted Today", 
              value: ngoUser.totalAccepted, 
              icon: <Utensils />, 
              iconColor: "text-[#1B5E8A]",
              className: "!bg-[#1B5E8A]/10 !border-[#1B5E8A]/20"
            }}
          />
        </motion.div>

        {/* ── Quick Action: Request Food ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springBouncy, delay: 0.12 }}
          onClick={() => setActiveScreen("ngoStats")}
        >
          <div className="flex items-center gap-4 p-4 rounded-[24px] cursor-pointer bg-gradient-to-r from-[#1B5E8A] to-[#134363] border-none shadow-[0_12px_32px_rgba(27,94,138,0.3)] group overflow-hidden relative">
            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
            
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20 shrink-0">
              <Radio className="text-white" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-[17px] font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-outfit)" }}>Broadcast Request</h3>
              <p className="text-[13px] text-white/80 font-medium" style={{ fontFamily: "var(--font-jakarta)" }}>Notify donors for urgent food needs</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <ChevronRight className="text-white" size={18} />
            </div>
          </div>
        </motion.div>

        {/* ── Live Food Feed ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-2"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[20px] font-bold text-[#0A0A0A] flex items-center gap-2" style={{ fontFamily: "var(--font-outfit)" }}>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              Live Donations
            </h2>
          </div>

          <motion.div 
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="flex flex-col gap-4"
          >
            <AnimatePresence mode="popLayout">
              {liveDonations.length === 0 ? (
                <motion.div
                  variants={fadeInUp}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#1B5E8A]/10 flex items-center justify-center mb-4">
                    <Radio size={28} className="text-[#1B5E8A]" />
                  </div>
                  <p className="text-[16px] font-semibold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>No live donations nearby.</p>
                  <p className="text-[14px] text-[#4A4A4A] mt-1 max-w-[200px]" style={{ fontFamily: "var(--font-jakarta)" }}>Broadcast a request to notify donors in your area.</p>
                </motion.div>
              ) : (
                liveDonations.map((pr) => (
                  <motion.div
                    key={pr.id}
                    variants={fadeInUp}
                    layoutId={`pr-${pr.id}`}
                  >
                    <LightCard className="p-4 flex flex-col gap-4 relative overflow-hidden">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 rounded-[16px] overflow-hidden shrink-0 bg-[#E8E8E4]">
                          <img 
                            src={pr.id.includes("b") ? "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80" : "https://images.unsplash.com/photo-1628294895950-9805252327bc?w=400&q=80"}
                            alt={pr.foodType}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[12px] font-bold text-[#3A7D52] bg-[#3A7D52]/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                              Freshly Cooked
                            </span>
                            <span className="text-[12px] font-semibold text-[#8A8A8A] flex items-center gap-1">
                              <MapPin size={12} /> {pr.distance} km
                            </span>
                          </div>
                          <h3 className="text-[18px] font-bold text-[#0A0A0A] leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
                            {pr.foodType}
                          </h3>
                          <div className="flex items-center gap-3 mt-auto">
                            <span className="text-[14px] font-semibold text-[#1A1A1A] flex items-center gap-1" style={{ fontFamily: "var(--font-jakarta)" }}>
                              <Utensils size={14} className="text-[#8A8A8A]" />
                              {pr.servingsNeeded} Servings
                            </span>
                            <span className="text-[14px] font-semibold text-[#1A1A1A] flex items-center gap-1" style={{ fontFamily: "var(--font-jakarta)" }}>
                              <Clock size={14} className="text-[#8A8A8A]" />
                              12m ago
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <button className="w-full h-11 rounded-full bg-[#1B5E8A] text-white font-bold text-[15px] flex items-center justify-center shadow-[0_4px_12px_rgba(27,94,138,0.2)] active:scale-95 transition-all" style={{ fontFamily: "var(--font-outfit)" }}>
                        Reserve Food
                      </button>
                    </LightCard>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* ── Active Volunteers ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-2 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[20px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Active Volunteers</h2>
            <button 
              onClick={() => setActiveScreen("ngoVolunteers")}
              className="text-[14px] font-semibold text-[#1B5E8A]"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              View All
            </button>
          </div>
          
          <LightCard className="p-4 flex items-center justify-between cursor-pointer" onClick={() => setActiveScreen("ngoVolunteers")}>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <Avatar src="https://i.pravatar.cc/100?img=11" fallback="V1" size="md" className="border-2 border-white relative z-20" />
                <Avatar src="https://i.pravatar.cc/100?img=12" fallback="V2" size="md" className="border-2 border-white relative z-10" />
                <Avatar src="https://i.pravatar.cc/100?img=13" fallback="V3" size="md" className="border-2 border-white relative z-0" />
              </div>
              <div>
                <p className="text-[16px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>12 On Duty</p>
                <p className="text-[13px] font-medium text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>Ready for pickup</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#FAFAF8] flex items-center justify-center text-[#8A8A8A]">
              <ChevronRight size={20} />
            </div>
          </LightCard>
        </motion.div>

      </div>
    </ScreenWrapper>
  );
}
