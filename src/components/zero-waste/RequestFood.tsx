"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { fadeUp, slideInRight } from "@/lib/animations";
import { ArrowLeft, HandHeart, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import type { FoodRequest, UrgencyLevel } from "@/lib/types";

export function RequestFood() {
  const { setScreen, receiverType, submitFoodRequest, ngoProfile, recipientProfile } = useAppStore();
  const [servings, setServings] = useState("");
  const [urgency, setUrgency] = useState<"flexible" | "today" | "urgent">("flexible");
  const [dietaryNotes, setDietaryNotes] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    
    const request: FoodRequest = {
      id: `req_${Date.now()}`,
      receiverId: "user_123",
      receiverType: receiverType || "recipient",
      receiverName: receiverType === "ngo" ? (ngoProfile?.orgName || "NGO") : (recipientProfile?.displayName || "Recipient"),
      location: { lat: 12.9716, lng: 77.5946, address: "Current Location" },
      servingsNeeded: parseInt(servings) || 1,
      urgency,
      dietaryNotes,
      specialInstructions,
      status: "open",
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 86400000)
    };

    setTimeout(() => {
      submitFoodRequest(request);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setScreen("recipientHome");
      }, 2000);
    }, 1500);
  };

  return (
    <div className="flex h-full flex-col bg-[#F7F5F0]">
      {/* Header */}
      <div className="sticky top-0 z-30 flex items-center justify-between bg-white px-4 py-4 shadow-sm">
        <button
          onClick={() => setScreen("recipientHome")}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F7F5F0]"
        >
          <ArrowLeft size={20} className="text-[#0A0A0A]" />
        </button>
        <h1 className="text-lg font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
          Request Food
        </h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <motion.div variants={slideInRight} initial="initial" animate="animate" className="flex flex-col gap-6">
          
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E8E8E4]">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-full bg-[#F5D0FE] flex items-center justify-center">
                <HandHeart size={24} className="text-[#86198F]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Food Requirement</h2>
                <p className="text-sm text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>Providers nearby will be notified</p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Servings */}
              <div>
                <label className="text-[13px] font-semibold text-[#8A8A8A] block mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>
                  How many servings needed?
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={servings}
                    onChange={(e) => setServings(e.target.value)}
                    placeholder={receiverType === "ngo" ? "e.g., 50" : "e.g., 4"}
                    className="w-full bg-[#F7F5F0] rounded-xl px-4 py-3 text-[17px] font-bold text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#86198F]"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A8A8A] font-semibold">servings</span>
                </div>
              </div>

              {/* Urgency */}
              <div>
                <label className="text-[13px] font-semibold text-[#8A8A8A] block mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>
                  How urgently do you need it?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    onClick={() => setUrgency("flexible")}
                    className={`py-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                      urgency === "flexible" ? "border-[#86198F] bg-[#FDF4FF] text-[#86198F]" : "border-[#E8E8E4] bg-white text-[#8A8A8A]"
                    }`}
                  >
                    <Clock size={18} />
                    <span className="text-[11px] font-bold">Flexible</span>
                  </button>
                  <button 
                    onClick={() => setUrgency("today")}
                    className={`py-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                      urgency === "today" ? "border-[#D97706] bg-[#FFF7ED] text-[#D97706]" : "border-[#E8E8E4] bg-white text-[#8A8A8A]"
                    }`}
                  >
                    <AlertCircle size={18} />
                    <span className="text-[11px] font-bold">Today</span>
                  </button>
                  <button 
                    onClick={() => setUrgency("urgent")}
                    className={`py-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                      urgency === "urgent" ? "border-[#DC2626] bg-[#FEF2F2] text-[#DC2626]" : "border-[#E8E8E4] bg-white text-[#8A8A8A]"
                    }`}
                  >
                    <AlertCircle size={18} />
                    <span className="text-[11px] font-bold">Urgent</span>
                  </button>
                </div>
              </div>

              {/* Dietary Notes */}
              <div>
                <label className="text-[13px] font-semibold text-[#8A8A8A] block mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Dietary Restrictions (Optional)
                </label>
                <input
                  type="text"
                  value={dietaryNotes}
                  onChange={(e) => setDietaryNotes(e.target.value)}
                  placeholder="e.g., Pure Veg only, No nuts"
                  className="w-full bg-[#F7F5F0] rounded-xl px-4 py-3 text-[15px] text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#86198F]"
                />
              </div>

              {/* Special Instructions */}
              <div>
                <label className="text-[13px] font-semibold text-[#8A8A8A] block mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Special Instructions (Optional)
                </label>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Any pickup or delivery notes..."
                  rows={3}
                  className="w-full bg-[#F7F5F0] rounded-xl px-4 py-3 text-[15px] text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#86198F] resize-none"
                />
              </div>

            </div>
          </div>

          <button
            disabled={!servings || loading || success}
            onClick={handleSubmit}
            className="mt-4 h-[56px] w-full rounded-full text-[17px] font-bold text-white transition-all disabled:opacity-50 relative overflow-hidden"
            style={{ 
              background: receiverType === "ngo" ? "#1E3A8A" : "#86198F",
              fontFamily: "var(--font-outfit)",
              boxShadow: receiverType === "ngo" ? "0 8px 24px rgba(30,58,138,0.25)" : "0 8px 24px rgba(134,25,143,0.25)"
            }}
          >
            {loading ? (
              <span className="animate-pulse">Submitting Request...</span>
            ) : success ? (
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 size={20} />
                <span>Request Posted!</span>
              </div>
            ) : (
              <span>Post Request</span>
            )}
            
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 40, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute left-1/2 top-1/2 z-0 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ background: receiverType === "ngo" ? "#1E3A8A" : "#86198F" }}
                />
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      </div>
      
      {/* Success Full Overlay */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center text-white"
            style={{ background: receiverType === "ngo" ? "#1E3A8A" : "#86198F" }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.2 }}
              className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20 backdrop-blur-md mb-6"
            >
              <CheckCircle2 size={48} className="text-white" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-bold text-center px-6"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Request Posted!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-2 text-white/80 text-center px-8"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Nearby donors have been notified. You will receive an alert when someone accepts your request.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
