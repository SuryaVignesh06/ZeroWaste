"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { slideInRight } from "@/lib/animations";
import { ArrowLeft, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export function ReserveProduct() {
  const { setScreen, receiverType } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Hardcoded mock data for now
  const isDonation = false; 

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setScreen("reservationQR");
      }, 2000);
    }, 1500);
  };

  return (
    <div className="flex h-full flex-col bg-[#F7F5F0]">
      {/* Header */}
      <div className="sticky top-0 z-30 flex items-center justify-between bg-white px-4 py-4 shadow-sm">
        <button
          onClick={() => setScreen("productDetail")}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F7F5F0]"
        >
          <ArrowLeft size={20} className="text-[#0A0A0A]" />
        </button>
        <h1 className="text-lg font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
          Confirm Reservation
        </h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <motion.div variants={slideInRight} initial="initial" animate="animate" className="flex flex-col gap-6">
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#E8E8E4]">
            <h2 className="text-xl font-bold text-[#0A0A0A] mb-4" style={{ fontFamily: "var(--font-outfit)" }}>Summary</h2>
            
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-bold text-[#0A0A0A]">Organic Tomatoes</p>
                <p className="text-sm text-[#8A8A8A]">FreshMart • 1km away</p>
              </div>
              <img src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea" className="w-12 h-12 rounded-lg object-cover" />
            </div>

            <div className="h-px w-full bg-[#E8E8E4] my-4" />

            <div className="space-y-3">
              <div className="flex justify-between text-[15px]">
                <span className="text-[#4A4A4A]">Original Price</span>
                <span className="text-[#8A8A8A] line-through">₹80.00</span>
              </div>
              <div className="flex justify-between text-[15px]">
                <span className="text-[#4A4A4A]">Zero-Waste Discount</span>
                <span className="text-[#D97706] font-bold">-50%</span>
              </div>
              <div className="flex justify-between text-lg font-bold mt-2 pt-2 border-t border-[#E8E8E4]">
                <span className="text-[#0A0A0A]">Pay at Store</span>
                <span className="text-[#0A0A0A]">₹40.00</span>
              </div>
            </div>
          </div>

          <div className="bg-[#FFF7ED] rounded-[20px] p-4 flex gap-3 border border-[#FDE68A]">
            <Clock className="text-[#D97706] shrink-0" size={20} />
            <p className="text-[13px] text-[#D97706] font-medium leading-tight">
              Once reserved, you have <span className="font-bold">60 minutes</span> to pick up the item before the reservation expires.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="p-6 bg-white border-t border-[#E8E8E4]">
        <button
          disabled={loading || success}
          onClick={handleConfirm}
          className="h-[56px] w-full rounded-full text-[17px] font-bold text-white transition-all disabled:opacity-50 relative overflow-hidden"
          style={{ 
            background: isDonation ? "#1A6B3C" : "#D97706",
            fontFamily: "var(--font-outfit)",
            boxShadow: isDonation ? "0 8px 24px rgba(26,107,60,0.25)" : "0 8px 24px rgba(217,119,6,0.25)"
          }}
        >
          {loading ? (
            <span className="animate-pulse">Reserving...</span>
          ) : success ? (
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 size={20} />
              <span>Confirmed!</span>
            </div>
          ) : (
            <span>Confirm Reservation</span>
          )}
          
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 40, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute left-1/2 top-1/2 z-0 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ background: isDonation ? "#1A6B3C" : "#D97706" }}
              />
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
