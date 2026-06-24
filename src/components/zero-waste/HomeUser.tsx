"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { staggerContainer, cardVariants } from "@/lib/animations";
import { formatINR } from "./Countdown";
import {
  MapPin, Search, Bell, ChevronDown, ArrowUpRight, Camera,
  ChevronRight, Users, ShoppingBag, Building2, Leaf, Plus, Utensils
} from "lucide-react";

export function HomeUser() {
  const products = useAppStore((s) => s.products);
  const donations = useAppStore((s) => s.donations);
  const setScreen = useAppStore((s) => s.setScreen);
  const setActiveProduct = useAppStore((s) => s.setActiveProduct);
  const addToCart = useAppStore((s) => s.addToCart);

  const [mealsRescued, setMealsRescued] = useState(0);
  const [totalMealsRescued, setTotalMealsRescued] = useState(0);
  const [availableRescues, setAvailableRescues] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Count-up animations
    const duration = 800;
    const steps = 60;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setMealsRescued(Math.min(248, Math.round((currentStep / steps) * 248)));
      setTotalMealsRescued(Math.min(248, Math.round((currentStep / steps) * 248)));
      setAvailableRescues(Math.min(3, Math.round((currentStep / steps) * 3)));
      if (currentStep >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  const rescueDonations = donations.filter((d) => d.status === "listed").slice(0, 5);
  const topDeals = products.slice(0, 6);

  return (
    <div
      style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}
      className="bg-[#F7F5F0]"
      onScroll={(e) => setScrolled((e.target as HTMLDivElement).scrollTop > 20)}
    >
      {/* Sticky header */}
      <div
        className="sticky top-0 z-50 flex items-center justify-between px-5 py-3 transition-shadow"
        style={{
          background: "rgba(247,245,240,0.92)",
          backdropFilter: "blur(16px)",
          height: "72px",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.04)" : "none"
        }}
      >
        <div className="flex items-center gap-2.5">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <rect x="8" y="8" width="16" height="16" rx="6" transform="rotate(45 16 16)" fill="#1A6B3C" />
            <path d="M16 11 L19 16 L16 21 L13 16 Z" fill="white" />
          </svg>
          <span className="text-[18px] font-bold text-[#0A0A0A] ml-1" style={{ fontFamily: "var(--font-outfit)" }}>
            Zero Waste
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Marketplace search removed as per request */}
          <button
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white transition-transform active:scale-95"
            style={{ boxShadow: "0px 2px 16px rgba(0,0,0,0.06)" }}
          >
            <Bell size={20} className="text-[#0A0A0A]" />
            <span
              className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[#DC2626]"
              style={{ animation: "pulse-ring-anim 1.5s ease-out infinite" }}
            />
          </button>
        </div>
      </div>

      <main style={{ flex: 1, minHeight: 0, overflowY: "auto", paddingBottom: "120px" }}>
        {/* Greeting + Location */}
        <div className="px-5 mt-2">
          <div className="flex items-center gap-1.5">
            <MapPin size={14} className="text-[#1A6B3C]" />
            <span className="text-[13px] font-medium text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>
              Koramangala, Bangalore
            </span>
            <ChevronDown size={14} className="text-[#8A8A8A] ml-0.5" />
          </div>
          <h1 className="mt-2 text-[26px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
            Good morning, Arjun
          </h1>
          <div className="mt-1 flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-[#22C55E]" style={{ animation: "pulse-ring-anim 2s infinite" }} />
            <span className="text-[13px] font-normal text-[#1A6B3C]" style={{ fontFamily: "var(--font-jakarta)" }}>
              <span className="font-bold">{availableRescues}</span> food rescues available near you
            </span>
          </div>
        </div>

        {/* Personal Impact Summary Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          className="mt-5 px-5"
        >
          <div
            className="relative w-full rounded-[20px] p-5 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0A2E1A 0%, #1A6B3C 100%)",
              boxShadow: "0px 8px 24px rgba(26,107,60,0.25)"
            }}
          >
            <div className="flex items-center justify-between relative z-10">
              <div>
                <div className="text-[12px] font-semibold tracking-[1px] uppercase text-white/70" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Your Impact
                </div>
                <div className="mt-1.5 text-[28px] font-extrabold text-white" style={{ fontFamily: "var(--font-outfit)" }}>
                  {mealsRescued} Meals Rescued
                </div>
                <div className="mt-1 text-[12px] font-normal text-white/60" style={{ fontFamily: "var(--font-jakarta)" }}>
                  This month
                </div>
              </div>
              <div className="flex flex-col gap-2 text-right">
                <div>
                  <div className="text-[16px] font-bold text-white" style={{ fontFamily: "var(--font-outfit)" }}>18.4kg</div>
                  <div className="text-[10px] font-normal text-white/65" style={{ fontFamily: "var(--font-jakarta)" }}>CO₂ Saved</div>
                </div>
                <div>
                  <div className="text-[16px] font-bold text-white" style={{ fontFamily: "var(--font-outfit)" }}>₹1,240</div>
                  <div className="text-[10px] font-normal text-white/65" style={{ fontFamily: "var(--font-jakarta)" }}>Money Saved</div>
                </div>
                <div>
                  <div className="text-[16px] font-bold text-white" style={{ fontFamily: "var(--font-outfit)" }}>320pts</div>
                  <div className="text-[10px] font-normal text-white/65" style={{ fontFamily: "var(--font-jakarta)" }}>Impact Points</div>
                </div>
              </div>
            </div>
            
            <svg className="absolute -bottom-5 -right-5 w-[120px] h-[120px] text-white opacity-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 12L12 22L22 12L12 2Z" />
            </svg>
          </div>
        </motion.div>

        {/* 2x2 Impact Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="mt-4 grid grid-cols-2 gap-3 px-5"
        >
          {/* Card 1 — Meals Rescued */}
          <motion.div
            variants={cardVariants}
            className="relative overflow-hidden p-5 shadow-sm bg-[#C8D8F0]"
            style={{ borderRadius: "24px", minHeight: "160px", boxShadow: "0px 2px 16px rgba(0,0,0,0.06)" }}
          >
            <div className="flex items-start justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[1px] text-[#1E3A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                My Impact
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/70">
                <ArrowUpRight size={16} className="text-[#1E3A8A]" />
              </div>
            </div>
            <div className="mt-5 text-[36px] font-extrabold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
              {totalMealsRescued}
            </div>
            <div className="mt-1 text-[13px] font-medium text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>
              Meals Rescued
            </div>
            <div className="mt-2 text-[11px] font-normal text-[#1E3A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
              +12 this week
            </div>
            <div className="absolute -bottom-5 -right-5 h-20 w-20 rounded-full bg-[#1E3A8A] opacity-10 translate-x-5 translate-y-5" />
          </motion.div>

          {/* Card 2 — CO2 Prevented */}
          <motion.div
            variants={cardVariants}
            className="relative overflow-hidden p-5 shadow-sm bg-[#F5E6C8]"
            style={{ borderRadius: "24px", minHeight: "160px", boxShadow: "0px 2px 16px rgba(0,0,0,0.06)" }}
          >
            <div className="flex items-start justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[1px] text-[#D97706]" style={{ fontFamily: "var(--font-jakarta)" }}>
                CO₂ Reduced
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/70">
                <ArrowUpRight size={16} className="text-[#D97706]" />
              </div>
            </div>
            <div className="mt-5 text-[36px] font-extrabold text-[#0A0A0A] leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
              18.4<span className="text-[16px] block">kg</span>
            </div>
            <div className="mt-1 text-[13px] font-medium text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>
              CO₂ Prevented
            </div>
            <div className="mt-2 text-[11px] font-normal text-[#D97706]" style={{ fontFamily: "var(--font-jakarta)" }}>
              Environmental impact
            </div>
            <div className="absolute -bottom-5 -right-5 h-20 w-20 rounded-full bg-[#D97706] opacity-10 translate-x-5 translate-y-5" />
          </motion.div>

          {/* Card 3 — Money Saved */}
          <motion.div
            variants={cardVariants}
            className="relative overflow-hidden p-5 shadow-sm bg-[#C8E8D0]"
            style={{ borderRadius: "24px", minHeight: "160px", boxShadow: "0px 2px 16px rgba(0,0,0,0.06)" }}
          >
            <div className="flex items-start justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[1px] text-[#1A6B3C]" style={{ fontFamily: "var(--font-jakarta)" }}>
                Money Saved
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/70">
                <ArrowUpRight size={16} className="text-[#1A6B3C]" />
              </div>
            </div>
            <div className="mt-5 text-[36px] font-extrabold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
              ₹1,240
            </div>
            <div className="mt-1 text-[13px] font-medium text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>
              Saved on Groceries
            </div>
            <div className="mt-2 text-[11px] font-normal text-[#1A6B3C]" style={{ fontFamily: "var(--font-jakarta)" }}>
              vs retail prices
            </div>
            <div className="absolute -bottom-5 -right-5 h-20 w-20 rounded-full bg-[#1A6B3C] opacity-10 translate-x-5 translate-y-5" />
          </motion.div>

          {/* Card 4 — Donate Food (MODIFIED) */}
          <motion.button
            variants={cardVariants}
            whileTap={{ scale: 0.96 }}
            onClick={() => setScreen("donateFood")}
            className="relative overflow-hidden p-5 text-left shadow-sm bg-[#F0D8C8]"
            style={{ borderRadius: "24px", minHeight: "160px", boxShadow: "0px 2px 16px rgba(0,0,0,0.06)" }}
          >
            <div className="flex items-start justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[1px] text-[#C25A2A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                DONATE
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/70">
                <ArrowUpRight size={16} className="text-[#C25A2A]" />
              </div>
            </div>
            <Camera size={32} className="text-[#C25A2A] mt-4" />
            <div className="mt-3 text-[20px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
              Donate Food
            </div>
            <div className="mt-1.5 text-[13px] font-normal text-[#6A4A3A]" style={{ fontFamily: "var(--font-jakarta)" }}>
              List surplus food for rescue
            </div>
            <div className="absolute -bottom-5 -right-5 h-20 w-20 rounded-full bg-[#C25A2A] opacity-10 translate-x-5 translate-y-5" />
          </motion.button>
        </motion.div>

        {/* Nearby Rescues */}
        <div className="mt-7 px-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
              Nearby Rescues
            </h2>
            <button onClick={() => setScreen("ngoFeed")} className="text-[13px] font-medium text-[#1A6B3C]" style={{ fontFamily: "var(--font-jakarta)" }}>
              View all
            </button>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="mt-4 flex gap-3 overflow-x-auto pb-4 -mx-5 px-5"
            style={{ scrollbarWidth: "none" }}
          >
            {rescueDonations.map((d) => {
              const hoursToExpiry = (new Date(d.expiryDeadline).getTime() - Date.now()) / 3600000;
              const isUrgent = hoursToExpiry < 2;
              
              let bgGradient = "linear-gradient(135deg, #1A6B3C, #22C55E)";
              if (d.category === "Bakery") bgGradient = "linear-gradient(135deg, #C25A2A, #D97706)";
              if (d.category === "Vegetables") bgGradient = "linear-gradient(135deg, #16A34A, #4ADE80)";
              if (d.category === "Dairy") bgGradient = "linear-gradient(135deg, #1E3A8A, #3B82F6)";

              return (
                <motion.div
                  key={d.id}
                  variants={cardVariants}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setScreen("ngoFeed")}
                  className="flex-shrink-0 overflow-hidden bg-white rounded-[20px]"
                  style={{ width: "200px", boxShadow: "0px 2px 16px rgba(0,0,0,0.06)" }}
                >
                  <div className="relative h-[110px] w-full flex items-center justify-center" style={{ background: bgGradient }}>
                    <Utensils size={32} className="text-white opacity-90" />
                    
                    <div
                      className="absolute top-2 left-2 rounded-full px-2.5 py-1 text-[10px] font-bold text-white flex items-center gap-1"
                      style={{ background: isUrgent ? "#DC2626" : (hoursToExpiry <= 3 ? "#D97706" : "#1A6B3C"), fontFamily: "var(--font-outfit)" }}
                    >
                      {isUrgent ? "URGENT" : (hoursToExpiry <= 3 ? `${Math.floor(hoursToExpiry)}h left` : "Today")}
                    </div>
                    
                    <div
                      className="absolute top-2 right-2 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white"
                      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", fontFamily: "var(--font-jakarta)" }}
                    >
                      {d.pickupDistanceKm} km
                    </div>
                  </div>
                  <div className="p-3.5">
                    <h4 className="line-clamp-2 text-[14px] font-semibold text-[#0A0A0A] leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
                      {d.title}
                    </h4>
                    <p className="mt-1 text-[12px] font-normal text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                      {d.donorName}
                    </p>
                    <div className="mt-1.5 flex items-center gap-1">
                      <Users size={12} className="text-[#1A6B3C]" />
                      <span className="text-[12px] font-semibold text-[#1A6B3C]" style={{ fontFamily: "var(--font-jakarta)" }}>~{d.servings} servings</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[12px] font-semibold text-[#1A6B3C]" style={{ fontFamily: "var(--font-jakarta)" }}>Volunteer to Rescue</span>
                      <ChevronRight size={14} className="text-[#1A6B3C]" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </main>

    </div>
  );
}
