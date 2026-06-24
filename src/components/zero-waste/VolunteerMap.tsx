"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { ChevronLeft, Phone, CheckCircle2, Navigation, Star, MapPin, Building2, ShieldCheck, ChevronRight } from "lucide-react";

export function VolunteerMap() {
  const setScreen = useAppStore((s) => s.setScreen);
  const [phase, setPhase] = useState<"pickup" | "dropoff" | "success">("pickup");

  // Simulated active delivery data
  const delivery = {
    donor: "Raj Marriage Hall",
    donorAddress: "124 Grand Trunk Rd, Block A",
    ngo: "Robin Hood Army",
    ngoAddress: "72 MG Road, Koramangala",
    meals: 80,
    eta: phase === "pickup" ? "12 mins" : "8 mins",
    distance: phase === "pickup" ? "2.4 km" : "1.8 km",
  };

  const handleAction = () => {
    if (phase === "pickup") {
      setPhase("dropoff");
    } else if (phase === "dropoff") {
      setPhase("success");
    }
  };

  const handleFinish = () => {
    setScreen("volunteerHome");
  };

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[#E2ECF6]">
      {/* Premium SVG Map Background mimicking Swiggy/Blinkit */}
      <div className="absolute inset-0 z-0 opacity-80">
        <svg width="100%" height="100%" viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          {/* Base */}
          <rect width="100%" height="100%" fill="#E5EFE9" />
          
          {/* Parks */}
          <path d="M -50 100 Q 150 150 200 50 T 350 -50 Z" fill="#C8E8D0" opacity="0.6" />
          <path d="M 250 400 Q 300 450 450 350 T 500 500 Z" fill="#C8E8D0" opacity="0.6" />
          
          {/* Water body */}
          <path d="M 0 600 Q 150 550 250 650 T 400 600 L 400 850 L 0 850 Z" fill="#C8D8F0" opacity="0.4" />
          
          {/* Roads */}
          <g stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M -20 200 L 150 250 L 250 450 L 450 500" />
            <path d="M 150 -20 L 150 250 L 100 500 L 50 850" />
            <path d="M 450 150 L 250 450 L 200 850" />
          </g>
          <g stroke="#F3F4F6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M -20 200 L 150 250 L 250 450 L 450 500" />
            <path d="M 150 -20 L 150 250 L 100 500 L 50 850" />
            <path d="M 450 150 L 250 450 L 200 850" />
          </g>

          {/* Simulated Route */}
          <path
            d={phase === "pickup" ? "M 120 400 Q 180 350 250 450" : "M 250 450 Q 350 400 350 200"}
            fill="none"
            stroke="#1A6B3C"
            strokeWidth="5"
            strokeDasharray="10 10"
            className="animate-[dash_20s_linear_infinite]"
          />
          
          {/* Pins */}
          {phase === "pickup" && (
            <>
              {/* User Location */}
              <circle cx="120" cy="400" r="10" fill="#1E3A8A" stroke="white" strokeWidth="3" className="drop-shadow-md" />
              {/* Pickup Target */}
              <g transform="translate(235, 415)">
                <path d="M15 0 C6.7 0 0 6.7 0 15 C0 26.2 15 40 15 40 C15 40 30 26.2 30 15 C30 6.7 23.3 0 15 0 Z" fill="#0A0A0A" />
                <circle cx="15" cy="15" r="6" fill="white" />
              </g>
            </>
          )}

          {phase === "dropoff" && (
            <>
              {/* User Location */}
              <circle cx="250" cy="450" r="10" fill="#1E3A8A" stroke="white" strokeWidth="3" className="drop-shadow-md" />
              {/* Dropoff Target */}
              <g transform="translate(335, 165)">
                <path d="M15 0 C6.7 0 0 6.7 0 15 C0 26.2 15 40 15 40 C15 40 30 26.2 30 15 C30 6.7 23.3 0 15 0 Z" fill="#1A6B3C" />
                <circle cx="15" cy="15" r="6" fill="white" />
              </g>
            </>
          )}
        </svg>
      </div>

      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
      `}</style>

      {/* Floating Header */}
      <AnimatePresence>
        {phase !== "success" && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="absolute left-4 right-4 top-12 z-10 flex items-center gap-3"
          >
            <button
              onClick={() => setScreen("volunteerHome")}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.1)] border border-[#E8E8E4]"
            >
              <ChevronLeft size={24} className="text-[#0A0A0A]" />
            </button>

            {/* ETA Pill */}
            <div className="flex flex-1 items-center justify-between rounded-full bg-white px-5 py-3 shadow-[0_4px_16px_rgba(0,0,0,0.1)] border border-[#E8E8E4]">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#1A6B3C] animate-pulse" />
                <span className="text-[17px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>{delivery.eta}</span>
              </div>
              <div className="h-4 w-[1px] bg-[#E8E8E4]" />
              <span className="text-[15px] font-bold text-[#8A8A8A]" style={{ fontFamily: "var(--font-outfit)" }}>{delivery.distance}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Swiggy-Style Bottom Sheet */}
      <AnimatePresence>
        {phase !== "success" && (
          <motion.div
            initial={{ y: 400 }}
            animate={{ y: 0 }}
            exit={{ y: 400 }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="absolute bottom-0 left-0 right-0 z-20 rounded-t-[32px] bg-white pt-3 pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.12)]"
          >
            {/* Drag Handle */}
            <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-[#E8E8E4]" />
            
            {/* Timeline */}
            <div className="px-6 mb-6">
              <div className="relative flex items-start gap-4">
                {/* Connecting Line */}
                <div className="absolute left-[15px] top-8 bottom-0 w-[2px] bg-dashed border-l-2 border-dashed border-[#E8E8E4] z-0" />

                <div className="relative z-10 flex flex-col items-center gap-1">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 bg-white ${phase === "pickup" ? "border-[#0A0A0A]" : "border-[#1A6B3C]"}`}>
                    {phase === "dropoff" ? <CheckCircle2 size={16} className="text-[#1A6B3C]" /> : <div className="h-2.5 w-2.5 rounded-full bg-[#0A0A0A]" />}
                  </div>
                </div>

                <div className={`flex-1 pb-6 ${phase === "dropoff" ? "opacity-50" : ""}`}>
                  <p className="text-[11px] font-bold text-[#8A8A8A] uppercase tracking-wider mb-0.5" style={{ fontFamily: "var(--font-jakarta)" }}>Pickup Address</p>
                  <h3 className="text-[18px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>{delivery.donor}</h3>
                  <p className="text-[14px] text-[#4A4A4A] mt-1">{delivery.donorAddress}</p>
                </div>
              </div>

              <div className="relative flex items-start gap-4">
                <div className="relative z-10 flex flex-col items-center gap-1">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${phase === "dropoff" ? "border-[#1A6B3C] bg-white" : "border-[#E8E8E4] bg-[#F7F5F0]"}`}>
                    {phase === "dropoff" ? <div className="h-2.5 w-2.5 rounded-full bg-[#1A6B3C]" /> : <div className="h-2 w-2 rounded-full bg-[#8A8A8A]" />}
                  </div>
                </div>

                <div className={`flex-1 ${phase === "pickup" ? "opacity-50" : ""}`}>
                  <p className="text-[11px] font-bold text-[#8A8A8A] uppercase tracking-wider mb-0.5" style={{ fontFamily: "var(--font-jakarta)" }}>Dropoff Address</p>
                  <h3 className="text-[18px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>{delivery.ngo}</h3>
                  <p className="text-[14px] text-[#4A4A4A] mt-1">{delivery.ngoAddress}</p>
                </div>
              </div>
            </div>

            <div className="h-[1px] w-full bg-[#F7F5F0] my-4" />

            {/* Actions Area */}
            <div className="px-6 flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EBF0FF]">
                  <Phone size={20} className="text-[#1E3A8A]" />
                </div>
                <div>
                  <p className="text-[15px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Contact {phase === "pickup" ? "Donor" : "NGO"}</p>
                  <p className="text-[12px] text-[#8A8A8A]">Call for instructions</p>
                </div>
              </div>
              <button className="flex h-12 items-center gap-2 rounded-full bg-[#F0F7F2] px-5 text-[#1A6B3C]">
                <Navigation size={18} />
                <span className="text-[14px] font-bold" style={{ fontFamily: "var(--font-outfit)" }}>Navigate</span>
              </button>
            </div>

            {/* Huge Swipe-like Button */}
            <div className="px-6">
              <button
                onClick={handleAction}
                className="group relative flex h-16 w-full items-center overflow-hidden rounded-full bg-[#1A6B3C] shadow-[0_8px_20px_rgba(26,107,60,0.25)] transition-transform active:scale-[0.98]"
              >
                <div className="absolute left-1.5 flex h-13 w-13 items-center justify-center rounded-full bg-white transition-transform group-hover:translate-x-1">
                  <ChevronRight size={24} className="text-[#1A6B3C]" />
                </div>
                <span className="w-full text-center text-[18px] font-bold text-white ml-8" style={{ fontFamily: "var(--font-outfit)" }}>
                  {phase === "pickup" ? "Mark Picked Up" : "Mark Delivered"}
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Overlay */}
      <AnimatePresence>
        {phase === "success" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#1A6B3C] px-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, delay: 0.2 }}
              className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20"
            >
              <ShieldCheck size={48} className="text-white" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-[32px] font-bold text-white text-center"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Delivery Complete!
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-2 text-[16px] text-white/90 text-center"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              You just delivered {delivery.meals} meals safely. Excellent job!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex w-full gap-4"
            >
              <div className="flex flex-1 flex-col items-center rounded-[20px] bg-white/10 p-4 backdrop-blur-sm">
                <span className="text-[24px] font-bold text-white">+150</span>
                <span className="text-[12px] uppercase tracking-wider text-white/70">Points</span>
              </div>
              <div className="flex flex-1 flex-col items-center rounded-[20px] bg-white/10 p-4 backdrop-blur-sm">
                <span className="text-[24px] font-bold text-white">4.2 km</span>
                <span className="text-[12px] uppercase tracking-wider text-white/70">Driven</span>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              onClick={handleFinish}
              className="absolute bottom-10 left-6 right-6 flex h-14 items-center justify-center rounded-full bg-white text-[17px] font-bold text-[#1A6B3C] shadow-xl"
            >
              Back to Dashboard
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
