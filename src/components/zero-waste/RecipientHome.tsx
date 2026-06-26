"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { staggerChildren, fadeInUp, springGentle, springBouncy, tapBounce } from "@/lib/animations";
import { 
  User as UserIcon, 
  MapPin, 
  CheckCircle2, 
  Utensils, 
  ChevronRight, 
  Radio,
  Clock,
  ArrowRight,
  Store
} from "lucide-react";

import { ScreenWrapper } from "../ui/ScreenWrapper";
import { LightCard } from "../ui/Cards/LightCard";
import { Avatar } from "../ui/Display/Avatar";

export function RecipientHome() {
  const recipientUser = useAppStore((s) => s.recipientUser);
  const myRequests = useAppStore((s) => s.myRequests) || [];
  const { setActiveScreen } = useAppStore();

  if (!recipientUser) return null;

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
              <p className="text-body-sm text-[#3A7D52] font-semibold tracking-wide uppercase">Verified Member</p>
            </div>
            <h1 className="text-display mt-0.5 leading-tight text-[#0A0A0A]">Hello, {recipientUser.name.split(' ')[0]} 👋</h1>
            <p className="text-body flex items-center gap-1.5 mt-1 text-[#4A4A4A]">
              <MapPin size={16} />
              {recipientUser.town}, {recipientUser.city}
            </p>
          </div>

          <motion.div
            {...tapBounce}
            onClick={() => setActiveScreen("recipientProfile")}
            className="w-14 h-14 rounded-[20px] bg-white/90 shadow-[0_8px_28px_rgba(0,0,0,0.10)] flex items-center justify-center border border-white/60 cursor-pointer shrink-0"
            style={{ backdropFilter: "blur(20px)" }}
          >
            <UserIcon size={24} className="text-[#1B5E8A]" />
          </motion.div>
        </motion.div>

        {/* ── Quick Action: Store ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springBouncy, delay: 0.1 }}
          onClick={() => setActiveScreen("recipientStore")}
        >
          <div className="flex items-center gap-4 p-4 rounded-[24px] cursor-pointer bg-gradient-to-r from-[#86198F] to-[#D946EF] border-none shadow-[0_12px_32px_rgba(217,70,239,0.25)] group overflow-hidden relative">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
            
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30 shrink-0">
              <Store className="text-white" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-[17px] font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-outfit)" }}>Browse Food Store</h3>
              <p className="text-[13px] text-white/90 font-medium" style={{ fontFamily: "var(--font-jakarta)" }}>Find small-quantity food near you</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <ChevronRight className="text-white" size={18} />
            </div>
          </div>
        </motion.div>

        {/* ── My Requests ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-2"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[20px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
              My Requests
            </h2>
          </div>

          <motion.div 
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="flex flex-col gap-4"
          >
            <AnimatePresence mode="popLayout">
              {myRequests.length === 0 ? (
                <motion.div
                  variants={fadeInUp}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#1B5E8A]/10 flex items-center justify-center mb-4">
                    <Utensils size={28} className="text-[#1B5E8A]" />
                  </div>
                  <p className="text-[16px] font-semibold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>No active requests.</p>
                  <p className="text-[14px] text-[#4A4A4A] mt-1" style={{ fontFamily: "var(--font-jakarta)" }}>You can request food anytime.</p>
                </motion.div>
              ) : (
                myRequests.map((req) => (
                  <motion.div
                    key={req.id}
                    variants={fadeInUp}
                    layoutId={`req-${req.id}`}
                  >
                    <LightCard className="p-4 flex flex-col gap-3 relative overflow-hidden border-l-4 border-l-[#F5B840]">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-[18px] font-bold text-[#0A0A0A] leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
                            {req.foodType}
                          </h3>
                          <p className="text-[13px] text-[#8A8A8A] font-medium mt-1">Requested {new Date(req.createdAt).toLocaleDateString()}</p>
                        </div>
                        <span className={`text-[11px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
                          req.status === 'pending' ? 'bg-[#F5B840]/10 text-[#F5B840]' : 'bg-[#3A7D52]/10 text-[#3A7D52]'
                        }`}>
                          {req.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[14px] font-bold text-[#1B5E8A] bg-[#E3EEF6] px-3 py-1 rounded-lg">
                          {req.servingsNeeded} servings needed
                        </span>
                      </div>
                    </LightCard>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

      </div>
    </ScreenWrapper>
  );
}
