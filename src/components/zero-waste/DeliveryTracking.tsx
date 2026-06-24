"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { ArrowLeft, Phone, Shield, MapPin, Bike, Navigation, Star, MessageSquare } from "lucide-react";

export function DeliveryTracking() {
  const setScreen = useAppStore((s) => s.setScreen);
  const activeTrackingId = useAppStore((s) => s.activeTrackingId);
  const donations = useAppStore((s) => s.donations);
  
  const donation = donations.find(d => d.id === activeTrackingId);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate volunteer moving
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          return 100;
        }
        return p + 0.5;
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);

  if (!donation) {
    return (
      <div className="flex flex-1 items-center justify-center bg-[#F7F5F0]">
        <button onClick={() => setScreen("ngo-feed")} className="text-[15px] font-medium text-[#1A6B3C] underline">Go Back</button>
      </div>
    );
  }

  // A simple path from bottom-left to top-right
  const startX = 80;
  const startY = 650;
  const endX = 300;
  const endY = 150;
  
  const currentX = startX + (endX - startX) * (progress / 100);
  const currentY = startY + (endY - startY) * (progress / 100);

  return (
    <div style={{ flex: 1, minHeight: 0, position: "relative" }} className="bg-[#E8E2D9] overflow-hidden">
      
      {/* Fake Map Background */}
      <svg className="absolute inset-0 h-full w-full opacity-80" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
        <path d="M-50 100 Q 100 50 150 200 T 300 400 T 500 200 L 500 -50 L -50 -50 Z" fill="#C8E8D0" opacity="0.4" />
        <path d="M200 600 Q 300 500 450 700 T 400 900 L 100 900 Z" fill="#C8E8D0" opacity="0.3" />
        
        {/* Roads */}
        <g stroke="#ffffff" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 50 -50 L 100 200 L 300 350 L 250 600 L 50 900" />
          <path d="M -50 300 L 300 350 L 500 200" />
          <path d="M 250 600 L 500 550" />
        </g>
        
        {/* Route Line */}
        <path 
          d={`M ${startX} ${startY} L ${endX} ${endY}`} 
          stroke="#1A6B3C" 
          strokeWidth="6" 
          strokeDasharray="10 10" 
          fill="none" 
          opacity="0.5" 
        />
        
        {/* Active Filled Route */}
        <path 
          d={`M ${startX} ${startY} L ${endX} ${endY}`} 
          stroke="#1A6B3C" 
          strokeWidth="6" 
          fill="none" 
          strokeDasharray="400"
          strokeDashoffset={400 - (progress / 100) * 400}
        />
      </svg>

      {/* Origin Pin (Donor) */}
      <div className="absolute z-10" style={{ left: startX, top: startY, transform: "translate(-50%, -50%)" }}>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border-2 border-[#E8E8E4]">
          <MapPin size={20} className="text-[#8A8A8A]" />
        </div>
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 rounded bg-white px-2 py-0.5 text-[10px] font-bold shadow-sm whitespace-nowrap text-[#4A4A4A]">
          Pickup
        </div>
      </div>

      {/* Destination Pin (NGO) */}
      <div className="absolute z-10" style={{ left: endX, top: endY, transform: "translate(-50%, -50%)" }}>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1A6B3C] shadow-lg ring-4 ring-[#1A6B3C]/20">
          <MapPin size={22} className="text-white fill-white" />
        </div>
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 rounded bg-[#0A0A0A] px-2 py-0.5 text-[10px] font-bold text-white shadow-sm whitespace-nowrap">
          NSS Chapter
        </div>
      </div>

      {/* Moving Vehicle */}
      <motion.div 
        className="absolute z-20 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-xl ring-2 ring-[#1A6B3C]"
        animate={{ left: currentX, top: currentY }}
        transition={{ type: "tween", ease: "linear", duration: 0.1 }}
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <Bike size={26} className="text-[#1A6B3C]" />
        
        {/* ETA Tooltip on Vehicle */}
        <div className="absolute -top-10 whitespace-nowrap rounded-full bg-[#0A0A0A] px-3 py-1.5 text-[12px] font-bold text-white shadow-lg" style={{ fontFamily: "var(--font-outfit)" }}>
          {Math.max(1, Math.ceil(15 * (1 - progress / 100)))} mins away
          {/* Arrow pointer */}
          <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#0A0A0A]" />
        </div>
      </motion.div>

      {/* Header Back Button */}
      <div className="absolute top-0 inset-x-0 p-5 z-30">
        <button
          onClick={() => setScreen("ngo-feed")}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md active:scale-95 transition-transform border border-[#E8E8E4]"
        >
          <ArrowLeft size={24} className="text-[#0A0A0A]" />
        </button>
      </div>

      {/* Bottom Sheet - Swiggy/Blinkit Style */}
      <div className="absolute bottom-0 inset-x-0 z-30 pointer-events-none">
        <div 
          className="bg-white rounded-t-[32px] p-6 pb-8 pointer-events-auto w-full shadow-[0_-8px_32px_rgba(0,0,0,0.08)]"
        >
          <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-[#E8E8E4]" />
          
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[24px] font-extrabold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
                {progress < 50 ? "Heading to pickup" : "On the way to you"}
              </h2>
              <p className="text-[14px] font-medium text-[#4A4A4A] mt-1" style={{ fontFamily: "var(--font-jakarta)" }}>
                {donation.title} • {donation.donorName}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[24px] font-extrabold text-[#1A6B3C]" style={{ fontFamily: "var(--font-outfit)" }}>
                {Math.max(1, Math.ceil(15 * (1 - progress / 100)))}
              </span>
              <span className="text-[12px] font-bold uppercase tracking-wide text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                Mins
              </span>
            </div>
          </div>

          <div className="mt-6 h-[1px] w-full bg-[#F0F0EC]" />

          {/* Volunteer Profile Row */}
          <div className="mt-5 flex items-center gap-4">
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#1A6B3C] to-[#22C55E] text-white font-bold text-[20px]" style={{ fontFamily: "var(--font-outfit)" }}>
                V
              </div>
              <div className="absolute -bottom-1 -right-1 rounded-full border-2 border-white bg-[#D97706] p-1">
                <Star size={10} className="text-white fill-white" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-[16px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Vijay Kumar</h3>
                <span className="rounded bg-[#F0F7F2] px-1.5 py-0.5 text-[10px] font-bold text-[#1A6B3C]">4.9 ★</span>
              </div>
              <p className="text-[13px] font-medium text-[#8A8A8A] mt-0.5" style={{ fontFamily: "var(--font-jakarta)" }}>
                Volunteer • Green Honda Activa
              </p>
            </div>
            <div className="flex gap-2">
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F4FF] text-[#1E3A8A] active:scale-95 transition-transform">
                <MessageSquare size={18} />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F7F2] text-[#1A6B3C] active:scale-95 transition-transform">
                <Phone size={18} />
              </button>
            </div>
          </div>

          {/* Verification Code Box */}
          <div className="mt-6 flex items-center justify-between rounded-[20px] border border-[#E8E8E4] bg-[#FAFAF8] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                <Shield size={18} className="text-[#0A0A0A]" />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Delivery PIN
                </div>
                <div className="text-[13px] font-semibold text-[#0A0A0A] mt-0.5" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Share to receive food
                </div>
              </div>
            </div>
            <div className="text-[28px] font-extrabold tracking-[4px] text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
              8421
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
