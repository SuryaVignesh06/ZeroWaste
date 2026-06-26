"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { slideInRight } from "@/lib/animations";
import { ArrowLeft, MapPin, Navigation, Info, ShieldCheck } from "lucide-react";

export function ReservationQR() {
  const { setScreen } = useAppStore();
  
  // Hardcoded mock data for now
  const isDonation = false; 

  return (
    <div className="flex h-full flex-col bg-[#1A1A1A]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-12">
        <button
          onClick={() => setScreen("recipientHome")}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md"
        >
          <ArrowLeft size={20} className="text-white" />
        </button>
        <h1 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-outfit)" }}>
          Your QR Code
        </h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 px-6 pb-10 flex flex-col items-center justify-center">
        <motion.div variants={slideInRight} initial="initial" animate="animate" className="w-full max-w-sm">
          
          <div className="bg-white rounded-[32px] overflow-hidden shadow-2xl relative">
            {/* Top section */}
            <div className="p-8 pb-4 text-center">
              <h2 className="text-xl font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Organic Tomatoes</h2>
              <p className="text-[#8A8A8A] mt-1 text-sm">FreshMart</p>
            </div>

            {/* QR Code Area */}
            <div className="px-8 py-6 flex items-center justify-center relative">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-dashed border-t-2 border-dashed border-[#E8E8E4]" />
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#1A1A1A]" />
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#1A1A1A]" />
              
              <div className="w-48 h-48 bg-white border border-[#E8E8E4] rounded-2xl p-2 relative z-10 shadow-sm flex items-center justify-center">
                {/* Fake QR code for UI demo */}
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ZW-12345" alt="QR Code" className="w-full h-full object-contain mix-blend-multiply" />
              </div>
            </div>

            {/* Bottom Section */}
            <div className="px-8 pb-8 pt-2 text-center">
              <p className="text-[15px] text-[#4A4A4A] font-medium tracking-widest">ZW-12345</p>
              
              <div className="mt-6 flex justify-center">
                {isDonation ? (
                  <div className="bg-[#F0F7F2] text-[#1A6B3C] px-4 py-2 rounded-xl font-bold text-lg">
                    Free Pickup
                  </div>
                ) : (
                  <div className="bg-[#FFF7ED] text-[#D97706] px-4 py-2 rounded-xl">
                    <p className="text-[10px] font-bold uppercase">Pay at Store</p>
                    <p className="font-bold text-xl leading-none mt-0.5">₹40.00</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <button className="flex items-center justify-center gap-2 w-full py-4 rounded-full bg-white/10 backdrop-blur-md text-white font-semibold">
              <Navigation size={18} /> Get Directions
            </button>
            <div className="flex items-center justify-center gap-2 text-white/50 text-sm">
              <ShieldCheck size={16} /> Show this code to the provider
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
