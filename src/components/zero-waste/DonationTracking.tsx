"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import {
  ArrowLeft, CheckCircle, Clock, Upload, Building2, Package, Heart, Leaf
} from "lucide-react";

export function DonationTracking() {
  const setScreen = useAppStore((s) => s.setScreen);
  const activeDonationId = useAppStore((s) => s.activeDonationId);
  const donationHistory = useAppStore((s) => s.donationHistory);
  
  // Find active donation
  const donation = donationHistory.find(d => d.id === activeDonationId);
  
  // Simulated progression for demo
  const [currentStage, setCurrentStage] = useState(1);

  useEffect(() => {
    // Automatically advance through stages for demo purposes
    if (currentStage < 4) {
      const timer = setTimeout(() => {
        setCurrentStage(prev => prev + 1);
      }, 3500); // Wait 3.5s between each stage for demo
      return () => clearTimeout(timer);
    }
  }, [currentStage]);

  if (!donation) {
    return (
      <div className="flex flex-1 items-center justify-center bg-[#F7F5F0]">
        <button onClick={() => setScreen("home")} className="text-[15px] font-medium text-[#1A6B3C] underline">Go Home</button>
      </div>
    );
  }

  const stages = [
    {
      id: 1,
      title: "Donation Listed",
      icon: Upload,
      description: "Your donation has been posted and nearby NGOs have been notified.",
    },
    {
      id: 2,
      title: "Accepted by NGO",
      icon: Building2,
      description: "Feeding India has accepted your donation and a volunteer is being coordinated.",
      ngoName: "Feeding India"
    },
    {
      id: 3,
      title: "Food Picked Up",
      icon: Package,
      description: "Your food has been collected and is on its way to those who need it.",
    },
    {
      id: 4,
      title: "Delivered",
      icon: Heart,
      description: `Your donation reached ~${donation.servings} people. Thank you for making a difference.`,
    }
  ];

  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }} className="bg-[#F7F5F0]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[rgba(247,245,240,0.95)] backdrop-blur-md px-5 pt-4 pb-2 flex items-center justify-between">
        <button
          onClick={() => setScreen("home")}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white transition-transform active:scale-95 shadow-[0px_2px_16px_rgba(0,0,0,0.06)]"
        >
          <ArrowLeft size={20} className="text-[#0A0A0A]" />
        </button>
        <div className="text-center">
          <div className="text-[20px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
            Donation Status
          </div>
          <div className="text-[12px] font-medium text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
            {donation.foodName}
          </div>
        </div>
        <div className="w-11" /> {/* Spacer for centering */}
      </div>

      <main style={{ flex: 1, minHeight: 0, overflowY: "auto", paddingBottom: "100px" }}>
        
        {/* Donation Summary Card */}
        <div className="mt-4 mx-5 flex flex-row items-center gap-3 rounded-[20px] bg-white p-4 shadow-[0px_2px_16px_rgba(0,0,0,0.06)]">
          <div className="flex h-14 w-14 items-center justify-center rounded-[16px] bg-gradient-to-br from-[#1A6B3C] to-[#22C55E]">
            <Leaf size={24} className="text-white" />
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-[16px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>{donation.foodName}</div>
            <div className="text-[13px] font-normal text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>{donation.category} • ~{donation.servings} servings</div>
            <div className="text-[12px] font-normal text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>Listed 2h ago</div>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="mt-6 mx-5 relative flex flex-col pb-8">
          {stages.map((stage, index) => {
            const isCompleted = currentStage > stage.id;
            const isActive = currentStage === stage.id;
            const isPending = currentStage < stage.id;
            const isLast = index === stages.length - 1;
            const Icon = stage.icon;

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", delay: index * 0.06 }}
                className="flex flex-row gap-4"
              >
                {/* Left Column (Node & Line) */}
                <div className="flex flex-col items-center w-10">
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full z-10" style={{
                    backgroundColor: isCompleted || isActive ? "#1A6B3C" : "#F5F5F7",
                    border: isPending ? "2px solid #E8E8E4" : "none"
                  }}>
                    {isCompleted ? (
                      <CheckCircle size={20} className="text-white" />
                    ) : isActive ? (
                      <>
                        <div className="absolute inset-0 rounded-full" style={{ animation: "pulse-ring-anim 1.5s infinite", backgroundColor: "rgba(26,107,60,0.3)" }} />
                        <Icon size={20} className="text-white relative z-20" />
                      </>
                    ) : (
                      <Icon size={20} className="text-[#AEAEB2]" />
                    )}
                  </div>
                  
                  {!isLast && (
                    <div className="relative flex-1 w-[2px] min-h-[40px] my-1" style={{ backgroundColor: "#E8E8E4" }}>
                      <motion.div
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: currentStage > stage.id ? 1 : 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="absolute inset-0 w-full bg-[#1A6B3C]"
                        style={{ transformOrigin: "top" }}
                      />
                    </div>
                  )}
                </div>

                {/* Right Column (Text) */}
                <div className="flex-1 pb-8">
                  <div className="text-[16px] font-bold" style={{ fontFamily: "var(--font-outfit)", color: isPending ? "#AEAEB2" : "#0A0A0A" }}>
                    {stage.title}
                  </div>
                  <div className="mt-1 text-[13px] font-normal leading-[1.5]" style={{ fontFamily: "var(--font-jakarta)", color: isPending ? "#8A8A8A" : "#4A4A4A" }}>
                    {stage.description}
                  </div>
                  {isCompleted && (
                    <div className="mt-1 text-[12px] font-normal text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                      Just now
                    </div>
                  )}
                  {isCompleted && stage.ngoName && (
                    <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#C8D8F0] px-3 py-1.5">
                      <Building2 size={12} className="text-[#1E3A8A]" />
                      <span className="text-[11px] font-semibold text-[#1E3A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                        {stage.ngoName}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Impact Summary Card (Shows when delivered) */}
        <AnimatePresence>
          {currentStage === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-2 mx-5 rounded-[20px] bg-[#C8E8D0] p-5 mb-8"
            >
              <div className="text-[12px] font-semibold uppercase tracking-[1px] text-[#1A6B3C]" style={{ fontFamily: "var(--font-jakarta)" }}>
                Donation Impact
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <div className="text-[28px] font-extrabold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>~{donation.servings}</div>
                  <div className="text-[11px] font-normal text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>Meals Rescued</div>
                </div>
                <div>
                  <div className="text-[28px] font-extrabold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>{(donation.servings * 0.4).toFixed(1)}kg</div>
                  <div className="text-[11px] font-normal text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>CO₂ Prevented</div>
                </div>
                <div>
                  <div className="text-[28px] font-extrabold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>{donation.impactPoints}</div>
                  <div className="text-[11px] font-normal text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>Points Earned</div>
                </div>
              </div>
              <div className="mt-3 text-[13px] font-medium text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                Delivered to: Feeding India — Bangalore
              </div>
              
              <button
                className="mt-4 w-full h-[44px] rounded-full bg-[#1A6B3C] text-[15px] font-semibold text-white transition-transform active:scale-95"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Share My Impact
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Bottom Button */}
      <div className="bg-[rgba(247,245,240,0.95)] px-5 py-4 pb-8">
        <button
          onClick={() => setScreen("home")}
          className="flex h-14 w-full items-center justify-center rounded-full bg-[#0A0A0A] text-[17px] font-semibold text-white transition-transform active:scale-95"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Back to Home
        </button>
      </div>

    </div>
  );
}
