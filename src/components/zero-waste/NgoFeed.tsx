"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { Countdown } from "./Countdown";
import {
  MapPin, Clock, Users, Flame, CheckCircle, Navigation, X,
  Building2, Home, Utensils, GraduationCap, CalendarDays, Settings,
  SlidersHorizontal,
} from "lucide-react";

const DONOR_ICONS: Record<string, any> = {
  "marriage-hall": Building2,
  restaurant: Utensils,
  hostel: GraduationCap,
  household: Home,
  event: CalendarDays,
};

// Radar positions for donations (calculated as if on a radar)
const RADAR_POSITIONS = [
  { x: 50, y: 20, angle: 0, distance: 0.8 },
  { x: 80, y: 35, angle: 45, distance: 1.2 },
  { x: 25, y: 45, angle: 135, distance: 2.0 },
  { x: 65, y: 65, angle: 90, distance: 0.5 },
  { x: 40, y: 80, angle: 180, distance: 3.4 },
];

export function NgoFeed() {
  const donations = useAppStore((s) => s.donations);
  const acceptDonation = useAppStore((s) => s.acceptDonation);
  const setScreen = useAppStore((s) => s.setScreen);
  const [activeDonation, setActiveDonation] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [foodTypeFilter, setFoodTypeFilter] = useState<string>("All");
  const [distanceFilter, setDistanceFilter] = useState<number>(5);
  const [urgencyFilter, setUrgencyFilter] = useState<string>("All");

  const MAP_API_KEY = "jdxx9Tt17yH2kb6a4tzq";

  const listed = donations.filter((d) => d.status === "listed").filter(d => {
    if (foodTypeFilter !== "All" && !d.title.toLowerCase().includes(foodTypeFilter.toLowerCase().split(" ")[0])) return false;
    if (d.pickupDistanceKm > distanceFilter) return false;
    const hoursToExpiry = (new Date(d.expiryDeadline).getTime() - Date.now()) / 3600000;
    if (urgencyFilter === "Urgent" && hoursToExpiry >= 2) return false;
    if (urgencyFilter === "Normal" && hoursToExpiry < 2) return false;
    return true;
  });

  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }} className="bg-[var(--color-zw-bg)]">
      {/* Header — Deep Green Gradient */}
      <div
        className="relative px-5 pt-12 pb-6"
        style={{
          background: "linear-gradient(180deg, #0A2E1A 0%, #1A6B3C 100%)",
          height: "140px",
          flexShrink: 0,
        }}
      >
        {/* Top row */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[24px] font-bold text-white" style={{ fontFamily: "var(--font-outfit)" }}>
                NSS Chapter
              </h1>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <CheckCircle size={14} className="text-[#C8E8D0]" />
                <span className="text-[12px] font-medium text-[#C8E8D0]" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Verified NGO
                </span>
              </div>
              <div className="h-3 w-[1px] bg-white/20" />
              <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-0.5 backdrop-blur-md">
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="h-1.5 w-1.5 rounded-full bg-[#C8E8D0]"
                />
                <span className="text-[10px] font-bold text-[#C8E8D0]" style={{ fontFamily: "var(--font-outfit)" }}>
                  LIVE
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setScreen("ngoProfile")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
            <Settings size={20} className="text-white" />
          </button>
        </div>
      </div>

      {/* Stats row (overlap) */}
      <div className="-mt-8 px-5 relative z-10">
        <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-[0px_4px_20px_rgba(0,0,0,0.06)]">
          {[
            { value: "48", label: "Volunteers" },
            { value: "98%", label: "Success" },
            { value: "2.4k", label: "Rescues" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center flex-1 relative">
              <span className="text-[20px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
                {stat.value}
              </span>
              <span className="text-[11px] font-medium text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                {stat.label}
              </span>
              {i < 2 && <div className="absolute h-8 w-[1px] bg-[#E8E8E4] -right-[1px] top-1/2 -translate-y-1/2" />}
            </div>
          ))}
        </div>
      </div>

      {/* Scrollable content */}
      <main style={{ flex: 1, minHeight: 0, overflowY: "auto", paddingBottom: "120px" }}>
        {/* Radar section */}
        <div className="px-5 pt-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[20px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>
              Donations Near You
            </h2>
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 shadow-sm"
            >
              <SlidersHorizontal size={14} className="text-[var(--color-zw-ink)]" />
              <span className="text-[13px] font-semibold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-jakarta)" }}>
                Filter
              </span>
            </button>
          </div>

          {/* Available Volunteers Section */}
          <div className="mb-8 mt-2">
            <h3 className="text-[15px] font-bold text-[#0A0A0A] mb-3" style={{ fontFamily: "var(--font-outfit)" }}>
              Active Volunteers Directory
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-5 px-5">
              {[
                { name: "Rahul S.", dist: "0.8km", phone: "9876543210" },
                { name: "Ayesha M.", dist: "1.2km", phone: "9876543211" },
                { name: "Vikram K.", dist: "2.1km", phone: "9876543212" },
                { name: "Pooja R.", dist: "3.4km", phone: "9876543213" },
              ].map((vol, i) => (
                <div key={i} className="flex min-w-[140px] flex-col items-center rounded-[20px] border border-[#E8E8E4] bg-white p-4 shadow-[0px_4px_16px_rgba(0,0,0,0.03)] shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5E6C8]">
                    <Users size={24} className="text-[#D97706]" />
                  </div>
                  <div className="mt-3 text-center">
                    <div className="text-[14px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>{vol.name}</div>
                    <div className="mt-0.5 flex items-center justify-center gap-1 text-[11px] font-medium text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                      <MapPin size={10} /> {vol.dist}
                    </div>
                  </div>
                  <a href={`tel:${vol.phone}`} className="mt-4 flex h-9 w-full items-center justify-center rounded-full bg-[#1A6B3C] text-[13px] font-bold text-white shadow-sm transition-transform active:scale-95" style={{ fontFamily: "var(--font-outfit)" }}>
                    Call
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Radar visualization using API Key */}
          <div
            data-scanner-api-key={MAP_API_KEY}
            className="relative overflow-hidden mt-3"
            style={{
              height: "220px",
              borderRadius: "24px",
              background: "#FFFFFF",
              boxShadow: "0px 4px 16px rgba(0,0,0,0.04)"
            }}
          >
            <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[10px] font-medium text-[#1A6B3C] tracking-wide" style={{ fontFamily: "var(--font-jakarta)" }}>
              Looking for food nearby...
            </div>

            {/* Radar rings — concentric dashed */}
            {[60, 120, 180].map((size, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: size,
                  height: size,
                  left: "50%",
                  top: "50%",
                  marginLeft: -size / 2,
                  marginTop: -size / 2,
                  border: `1.5px dashed #C8E8D0`,
                  opacity: 0.8 - i * 0.15
                }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
              />
            ))}

            {/* Sweep line — conic gradient */}
            <motion.div
              className="absolute rounded-full"
              style={{
                left: "50%",
                top: "50%",
                width: "200px",
                height: "200px",
                marginLeft: "-100px",
                marginTop: "-100px",
                background: "conic-gradient(from 0deg, transparent 70%, rgba(34,197,94,0.3) 100%)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            {/* Center dot — NGO Location */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="relative flex flex-col items-center">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1A6B3C] shadow-[0px_0px_12px_rgba(26,107,60,0.5)]">
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>
              </div>
            </div>

            {/* Donor dots */}
            {listed.slice(0, 5).map((d, i) => {
              const pos = RADAR_POSITIONS[i % RADAR_POSITIONS.length];
              const Icon = DONOR_ICONS[d.donorType] ?? Building2;
              const hoursToExpiry = (new Date(d.expiryDeadline).getTime() - Date.now()) / 3600000;
              const isUrgent = hoursToExpiry < 2;
              const isActive = activeDonation === d.id;

              return (
                <motion.button
                  key={d.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 300, damping: 18 }}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => setActiveDonation(d.id)}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%`, zIndex: isActive ? 20 : 10 }}
                >
                  {/* Pulse ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[#22C55E]"
                    animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: i * 0.3 }}
                  />
                  {/* Dot */}
                  <div
                    className="relative h-3 w-3 rounded-full bg-[#22C55E]"
                    style={{
                      boxShadow: "0 0 8px rgba(34,197,94,0.8)",
                    }}
                  />

                  {/* Tooltip when active */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        className="absolute left-1/2 top-full z-30 mt-2 w-44 -translate-x-1/2 rounded-2xl bg-white p-3"
                        style={{ boxShadow: "0px 8px 32px rgba(0,0,0,0.2)" }}
                      >
                        <p className="text-[12px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
                          {d.donorName}
                        </p>
                        <p className="mt-0.5 text-[10px] text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                          {d.title}
                        </p>
                        <div className="mt-1.5 flex items-center gap-2 text-[10px]" style={{ fontFamily: "var(--font-jakarta)" }}>
                          <span className="flex items-center gap-0.5 text-[#1E3A8A]">
                            <MapPin size={9} /> {d.pickupDistanceKm}km
                          </span>
                          <span className="flex items-center gap-0.5 text-[#DC2626]">
                            <Clock size={9} />
                            <Countdown deadline={d.expiryDeadline} variant="compact" />
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>

          {/* Donor list removed as per spec */ }
        </div>

        {/* Donation feed list */}
        <div className="mt-6 px-5 pb-8">
          <h2 className="mb-4 text-[20px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
            New Rescue Requests
          </h2>
          <div className="flex flex-col gap-4">
            {listed.map((d, i) => {
              const Icon = DONOR_ICONS[d.donorType] ?? Building2;
              
              // Colors based on event type
              const isBulk = d.servings >= 50;
              const bgColor = isBulk ? "#F5D0FE" : (d.donorType === "event" || d.donorType === "marriage-hall" ? "#F5E6C8" : "#C8E8D0");
              const iconColor = isBulk ? "#86198F" : (d.donorType === "event" || d.donorType === "marriage-hall" ? "#D97706" : "#1A6B3C");

              return (
                <motion.div
                  key={d.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="relative flex flex-col overflow-hidden rounded-[20px] bg-white border border-[#E8E8E4] shadow-[0px_4px_16px_rgba(0,0,0,0.03)] p-4 w-full"
                >
                  <div className="flex gap-4">
                    {/* Left Icon Box */}
                    <div 
                      className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-[16px]"
                      style={{ backgroundColor: bgColor }}
                    >
                      <Icon size={28} style={{ color: iconColor }} />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center flex-1">
                      <div className="text-[15px] font-bold text-[#0A0A0A] flex items-center gap-2" style={{ fontFamily: "var(--font-outfit)" }}>
                        {d.servings} Servings · {d.title.split(" ")[0]}
                        {isBulk && (
                          <span className="rounded-full bg-[#86198F] px-1.5 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">Bulk</span>
                        )}
                        {((new Date(d.expiryDeadline).getTime() - Date.now()) / 3600000) < 2 && (
                          <span className="rounded-full bg-[#DC2626] px-1.5 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">Urgent</span>
                        )}
                      </div>
                      <div className="mt-1 flex items-center justify-between text-[13px] font-medium text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                        <span>{d.donorName}</span>
                        <a href="tel:1234567890" className="text-[#1A6B3C] text-[12px] font-bold underline" onClick={(e) => e.stopPropagation()}>Call Donor</a>
                      </div>
                      <div className="mt-1.5 flex items-center gap-3 text-[12px] font-medium text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                        <div className="flex items-center gap-1">
                          <MapPin size={12} />
                          {d.pickupDistanceKm} km away
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={12} className="text-[#DC2626]" />
                          <Countdown deadline={d.expiryDeadline} variant="compact" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Accept Button */}
                  <div className="mt-4">
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        acceptDonation(d.id);
                        useAppStore.getState().setActiveTrackingId(d.id);
                        setScreen("ngoDeliveryTracking");
                      }}
                      className="flex h-12 w-full items-center justify-center rounded-[12px] text-[15px] font-bold text-white shadow-sm"
                      style={{
                        background: "#1A6B3C",
                        fontFamily: "var(--font-outfit)",
                      }}
                    >
                      Accept & Dispatch
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Filter bottom sheet */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
              className="absolute inset-0 z-40"
              style={{ background: "rgba(0,0,0,0.4)" }}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="absolute inset-x-0 bottom-0 z-50 bg-white p-5"
              style={{ borderRadius: "28px 28px 0 0", boxShadow: "0px -8px 32px rgba(0,0,0,0.1)" }}
            >
              <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-[#E8E8E4]" />
              <div className="flex items-center justify-between">
                <h3 className="text-[20px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
                  Filter Donations
                </h3>
                <button onClick={() => setShowFilters(false)} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5F5F7]">
                  <X size={16} className="text-[#0A0A0A]" />
                </button>
              </div>

              <div className="mt-6 space-y-8">
                <div>
                  <label className="text-[18px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>
                    Food Type
                  </label>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["All", "Cooked Meals", "Raw Groceries", "Bakery", "Dairy", "Beverages", "Packaged"].map((type) => (
                      <button 
                        key={type} 
                        onClick={() => setFoodTypeFilter(type)}
                        className="rounded-full px-4 py-2 text-[14px] font-semibold transition-colors" 
                        style={{ 
                          background: foodTypeFilter === type ? "var(--color-zw-ink)" : "var(--color-zw-bg)", 
                          color: foodTypeFilter === type ? "#FFFFFF" : "var(--color-zw-ink-secondary)", 
                          fontFamily: "var(--font-jakarta)" 
                        }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-[18px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>
                      Distance
                    </label>
                    <span className="text-[14px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>
                      {distanceFilter}km
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={distanceFilter}
                    onChange={(e) => setDistanceFilter(Number(e.target.value))}
                    className="w-full accent-[var(--color-zw-ink)]"
                  />
                </div>

                <div>
                  <label className="text-[18px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>
                    Urgency
                  </label>
                  <div className="mt-3 flex gap-2">
                    {["All", "Urgent", "Normal"].map((u) => (
                      <button 
                        key={u} 
                        onClick={() => setUrgencyFilter(u)}
                        className="rounded-full px-5 py-2 text-[14px] font-semibold transition-colors" 
                        style={{ 
                          background: urgencyFilter === u ? "var(--color-zw-ink)" : "var(--color-zw-bg)", 
                          color: urgencyFilter === u ? "#FFFFFF" : "var(--color-zw-ink-secondary)", 
                          fontFamily: "var(--font-jakarta)" 
                        }}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowFilters(false)}
                className="mt-8 flex h-14 w-full items-center justify-center rounded-full text-[18px] font-bold text-white transition-transform active:scale-95"
                style={{ background: "var(--color-zw-ink)", fontFamily: "var(--font-outfit)" }}
              >
                Show Results ({listed.length})
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
