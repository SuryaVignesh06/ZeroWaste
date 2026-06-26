"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { CheckCircle2, ArrowLeft, Leaf, Utensils, Building2, Bike, Store } from "lucide-react";
import type { PanelRole, SubRole } from "@/lib/types";

import { ScreenWrapper } from "../ui/ScreenWrapper";
import { PrimaryButton } from "../ui/Buttons/PrimaryButton";
import { IconButton } from "../ui/Buttons/IconButton";
import { LightCard } from "../ui/Cards/LightCard";
import { springGentle, staggerChildren, fadeInUp } from "@/lib/animations";
import { GlassSurface } from "../ui/GlassSurface";

export function RoleSelect() {
  const setActivePanel = useAppStore((s) => s.setActivePanel);
  const setSubRole = useAppStore((s) => s.setSubRole);
  const setActiveScreen = useAppStore((s) => s.setActiveScreen);

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedPanel, setSelectedPanel] = useState<PanelRole | null>(null);
  const [selectedSubRole, setSelectedSubRole] = useState<string | null>(null);

  const setActivePanel2SubRole = useAppStore((s) => s.setActivePanel2SubRole);

  const handlePanelClick = (panel: PanelRole) => {
    setSelectedPanel(panel);
    if (panel === "donor_shopkeeper" || panel === "ngo_receiver") {
      setTimeout(() => setStep(2), 200);
    } else {
      setActivePanel(panel);
      setTimeout(() => setActiveScreen("otp"), 200);
    }
  };

  const handleSubRoleContinue = () => {
    if (selectedPanel && selectedSubRole) {
      setActivePanel(selectedPanel);
      if (selectedPanel === "donor_shopkeeper") {
        setSubRole(selectedSubRole as SubRole);
        setActiveScreen("otp");
      } else if (selectedPanel === "ngo_receiver") {
        setActivePanel2SubRole(selectedSubRole as "ngo" | "recipient");
        if (selectedSubRole === "ngo") {
          setActiveScreen("login"); // Use login screen for NGO ID/Password
        } else {
          setActiveScreen("otp"); // Use OTP for Recipient
        }
      }
    }
  };

  return (
    <ScreenWrapper>
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col h-full px-6 pt-12 pb-6 overflow-y-auto"
          >
            {/* Header */}
            <motion.div variants={fadeInUp} className="mb-10 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[24px] bg-bg-card-light shadow-card text-accent-green-dark">
                <Leaf size={32} />
              </div>
              <h1 className="text-display mb-2">ZeroWaste</h1>
              <p className="text-body-lg text-text-secondary">Save food. Feed lives.</p>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-h3 mb-4 ml-1">I am a...</motion.p>

            <motion.div variants={staggerChildren} className="flex flex-col gap-4 pb-12">
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePanelClick("donor_shopkeeper")}
                className="w-full cursor-pointer overflow-hidden rounded-[24px]"
              >
                <GlassSurface
                  borderRadius={24}
                  backgroundOpacity={0.45}
                  borderWidth={0.06}
                  blur={28}
                  displace={2}
                  className="w-full"
                  style={{ boxShadow: "0 16px_48px_rgba(0,0,0,0.14),0_4px_16px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.55)" }}
                >
                  <div className="relative flex items-center justify-between z-10 w-full p-5 text-left">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-[0_4px_16px_rgba(242,209,90,0.30)]" style={{ background: "linear-gradient(135deg, rgba(242,209,90,0.30), rgba(212,175,55,0.15))", border: "1.5px solid rgba(242,209,90,0.35)" }}>
                        <Utensils size={24} strokeWidth={1.8} className="text-[#D4AF37]" />
                      </div>
                      <div>
                        <h2 className="font-outfit text-[18px] font-semibold text-text-primary tracking-tight">Donor & Shopkeeper</h2>
                        <p className="font-jakarta text-[13px] text-text-secondary mt-0.5">Hotels, Shops & Individuals</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center text-text-secondary shadow-sm border border-white/50">
                      <span className="text-lg font-bold">→</span>
                    </div>
                  </div>
                </GlassSurface>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePanelClick("ngo_receiver")}
                className="w-full cursor-pointer overflow-hidden rounded-[24px]"
              >
                <GlassSurface
                  borderRadius={24}
                  backgroundOpacity={0.45}
                  borderWidth={0.06}
                  blur={28}
                  displace={2}
                  className="w-full"
                  style={{ boxShadow: "0 16px_48px_rgba(0,0,0,0.14),0_4px_16px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.55)" }}
                >
                  <div className="relative flex items-center justify-between z-10 w-full p-5 text-left">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-[0_4px_16px_rgba(91,141,184,0.30)]" style={{ background: "linear-gradient(135deg, rgba(91,141,184,0.28), rgba(63,110,156,0.14))", border: "1.5px solid rgba(91,141,184,0.35)" }}>
                        <Building2 size={24} strokeWidth={1.8} className="text-[#3F6E9C]" />
                      </div>
                      <div>
                        <h2 className="font-outfit text-[18px] font-semibold text-text-primary tracking-tight">NGO & Receiver</h2>
                        <p className="font-jakarta text-[13px] text-text-secondary mt-0.5">Organizations & People in need</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center text-text-secondary shadow-sm border border-white/50">
                      <span className="text-lg font-bold">→</span>
                    </div>
                  </div>
                </GlassSurface>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePanelClick("volunteer")}
                className="w-full cursor-pointer overflow-hidden rounded-[24px]"
              >
                <GlassSurface
                  borderRadius={24}
                  backgroundOpacity={0.45}
                  borderWidth={0.06}
                  blur={28}
                  displace={2}
                  className="w-full"
                  style={{ boxShadow: "0 16px_48px_rgba(0,0,0,0.14),0_4px_16px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.55)" }}
                >
                  <div className="relative flex items-center justify-between z-10 w-full p-5 text-left">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-[0_4px_16px_rgba(155,200,74,0.30)]" style={{ background: "linear-gradient(135deg, rgba(155,200,74,0.28), rgba(124,161,59,0.14))", border: "1.5px solid rgba(155,200,74,0.35)" }}>
                        <Bike size={24} strokeWidth={1.8} className="text-[#7CA13B]" />
                      </div>
                      <div>
                        <h2 className="font-outfit text-[18px] font-semibold text-text-primary tracking-tight">Volunteer</h2>
                        <p className="font-jakarta text-[13px] text-text-secondary mt-0.5">NSS Students & Riders</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center text-text-secondary shadow-sm border border-white/50">
                      <span className="text-lg font-bold">→</span>
                    </div>
                  </div>
                </GlassSurface>
              </motion.div>
            </motion.div>
            
            <motion.button 
              variants={fadeInUp}
              className="mt-auto mx-auto text-caption text-text-muted underline underline-offset-2 opacity-50 pointer-events-auto"
              onClick={() => setActiveScreen("home")}
            >
              Development: Skip to App
            </motion.button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col h-full px-6 pt-12 pb-6 overflow-y-auto"
          >
            {/* Header Top Bar */}
            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-8">
              <IconButton icon={<ArrowLeft size={20} />} onClick={() => setStep(1)} />
              <h1 className="text-h1 font-semibold text-text-primary tracking-tight">What best describes you?</h1>
            </motion.div>

            <motion.div variants={staggerChildren} className="flex flex-col gap-4 pb-8">
              {selectedPanel === "donor_shopkeeper" ? (
                <>
                  {/* Donor Option */}
                  <motion.button
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedSubRole("donor")}
                className="w-full text-left cursor-pointer overflow-hidden rounded-[24px]"
              >
                <GlassSurface
                  borderRadius={24}
                  backgroundOpacity={selectedSubRole === "donor" ? 0.6 : 0.3}
                  borderWidth={0.05}
                  blur={20}
                  displace={selectedSubRole === "donor" ? 2 : 1}
                  className={`w-full transition-all duration-300 ${
                    selectedSubRole === "donor"
                      ? "border-accent-gold shadow-[0_12px_36px_rgba(242,209,90,0.22),0_4px_12px_rgba(242,209,90,0.12)] bg-white/40"
                      : "border-white/40 shadow-[0_12px_36px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.06)] bg-white/20"
                  }`}
                  style={{
                    border: selectedSubRole === "donor" ? "1.5px solid var(--color-accent-gold)" : "1px solid rgba(255,255,255,0.4)"
                  }}
                >
                  <div className="relative flex items-center justify-between z-10 w-full p-5">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-full shadow-sm border flex items-center justify-center backdrop-blur-md transition-colors ${
                        selectedSubRole === "donor"
                          ? "bg-accent-gold/20 border-accent-gold text-accent-gold-dark"
                          : "bg-white/60 border-white/50 text-text-primary"
                      }`}>
                        <Utensils size={24} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h2 className="font-outfit text-[18px] font-semibold text-text-primary tracking-tight">I'm a Donor</h2>
                        <p className="font-jakarta text-[13px] text-text-secondary mt-0.5">Hotels, Marriage Halls, Hostels & Individuals</p>
                      </div>
                    </div>
                    
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      selectedSubRole === "donor"
                        ? "bg-accent-gold text-[#121214] shadow-md"
                        : "bg-white/50 text-text-muted"
                    }`}>
                      {selectedSubRole === "donor" ? (
                        <CheckCircle2 size={16} strokeWidth={2.5} />
                      ) : (
                        <span className="w-2.5 h-2.5 rounded-full border border-text-muted/40" />
                      )}
                    </div>
                  </div>
                </GlassSurface>
              </motion.button>

              {/* Shopkeeper Option */}
              <motion.button
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedSubRole("shopkeeper")}
                className="w-full text-left cursor-pointer overflow-hidden rounded-[24px]"
              >
                <GlassSurface
                  borderRadius={24}
                  backgroundOpacity={selectedSubRole === "shopkeeper" ? 0.6 : 0.3}
                  borderWidth={0.05}
                  blur={20}
                  displace={selectedSubRole === "shopkeeper" ? 2 : 1}
                  className={`w-full transition-all duration-300 ${
                    selectedSubRole === "shopkeeper"
                      ? "border-accent-gold shadow-[0_12px_36px_rgba(242,209,90,0.22),0_4px_12px_rgba(242,209,90,0.12)] bg-white/40"
                      : "border-white/40 shadow-[0_12px_36px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.06)] bg-white/20"
                  }`}
                  style={{
                    border: selectedSubRole === "shopkeeper" ? "1.5px solid var(--color-accent-gold)" : "1px solid rgba(255,255,255,0.4)"
                  }}
                >
                  <div className="relative flex items-center justify-between z-10 w-full p-5">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-full shadow-sm border flex items-center justify-center backdrop-blur-md transition-colors ${
                        selectedSubRole === "shopkeeper"
                          ? "bg-accent-gold/20 border-accent-gold text-accent-gold-dark"
                          : "bg-white/60 border-white/50 text-text-primary"
                      }`}>
                        <Store size={24} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h2 className="font-outfit text-[18px] font-semibold text-text-primary tracking-tight">I'm a Shopkeeper</h2>
                        <p className="font-jakarta text-[13px] text-text-secondary mt-0.5">Grocery, Bakery, Restaurant & Supermarket</p>
                      </div>
                    </div>
                    
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      selectedSubRole === "shopkeeper"
                        ? "bg-accent-gold text-[#121214] shadow-md"
                        : "bg-white/50 text-text-muted"
                    }`}>
                      {selectedSubRole === "shopkeeper" ? (
                        <CheckCircle2 size={16} strokeWidth={2.5} />
                      ) : (
                        <span className="w-2.5 h-2.5 rounded-full border border-text-muted/40" />
                      )}
                    </div>
                  </div>
                </GlassSurface>
              </motion.button>
              </>
              ) : (
                <>
                  {/* NGO Option */}
                  <motion.button
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedSubRole("ngo")}
                    className="w-full text-left cursor-pointer overflow-hidden rounded-[24px]"
                  >
                    <GlassSurface
                      borderRadius={24}
                      backgroundOpacity={selectedSubRole === "ngo" ? 0.6 : 0.3}
                      borderWidth={0.05}
                      blur={20}
                      displace={selectedSubRole === "ngo" ? 2 : 1}
                      className={`w-full transition-all duration-300 ${
                        selectedSubRole === "ngo"
                          ? "border-accent-blue shadow-[0_12px_36px_rgba(91,141,184,0.22),0_4px_12px_rgba(91,141,184,0.12)] bg-white/40"
                          : "border-white/40 shadow-[0_12px_36px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.06)] bg-white/20"
                      }`}
                      style={{
                        border: selectedSubRole === "ngo" ? "1.5px solid #1B5E8A" : "1px solid rgba(255,255,255,0.4)"
                      }}
                    >
                      <div className="relative flex items-center justify-between z-10 w-full p-5">
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 rounded-full shadow-sm border flex items-center justify-center backdrop-blur-md transition-colors ${
                            selectedSubRole === "ngo"
                              ? "bg-blue-100/50 border-[#1B5E8A] text-[#1B5E8A]"
                              : "bg-white/60 border-white/50 text-text-primary"
                          }`}>
                            <Building2 size={24} strokeWidth={1.5} />
                          </div>
                          <div>
                            <h2 className="font-outfit text-[18px] font-semibold text-text-primary tracking-tight">I'm an NGO</h2>
                            <p className="font-jakarta text-[13px] text-text-secondary mt-0.5">Government registered organizations</p>
                          </div>
                        </div>
                        
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          selectedSubRole === "ngo"
                            ? "bg-[#1B5E8A] text-[#ffffff] shadow-md"
                            : "bg-white/50 text-text-muted"
                        }`}>
                          {selectedSubRole === "ngo" ? (
                            <CheckCircle2 size={16} strokeWidth={2.5} />
                          ) : (
                            <span className="w-2.5 h-2.5 rounded-full border border-text-muted/40" />
                          )}
                        </div>
                      </div>
                    </GlassSurface>
                  </motion.button>

                  {/* Recipient Option */}
                  <motion.button
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedSubRole("recipient")}
                    className="w-full text-left cursor-pointer overflow-hidden rounded-[24px]"
                  >
                    <GlassSurface
                      borderRadius={24}
                      backgroundOpacity={selectedSubRole === "recipient" ? 0.6 : 0.3}
                      borderWidth={0.05}
                      blur={20}
                      displace={selectedSubRole === "recipient" ? 2 : 1}
                      className={`w-full transition-all duration-300 ${
                        selectedSubRole === "recipient"
                          ? "border-accent-green shadow-[0_12px_36px_rgba(58,125,82,0.22),0_4px_12px_rgba(58,125,82,0.12)] bg-white/40"
                          : "border-white/40 shadow-[0_12px_36px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.06)] bg-white/20"
                      }`}
                      style={{
                        border: selectedSubRole === "recipient" ? "1.5px solid #3A7D52" : "1px solid rgba(255,255,255,0.4)"
                      }}
                    >
                      <div className="relative flex items-center justify-between z-10 w-full p-5">
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 rounded-full shadow-sm border flex items-center justify-center backdrop-blur-md transition-colors ${
                            selectedSubRole === "recipient"
                              ? "bg-green-100/50 border-[#3A7D52] text-[#3A7D52]"
                              : "bg-white/60 border-white/50 text-text-primary"
                          }`}>
                            <Utensils size={24} strokeWidth={1.5} />
                          </div>
                          <div>
                            <h2 className="font-outfit text-[18px] font-semibold text-text-primary tracking-tight">I'm a Recipient</h2>
                            <p className="font-jakarta text-[13px] text-text-secondary mt-0.5">People seeking food support</p>
                          </div>
                        </div>
                        
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          selectedSubRole === "recipient"
                            ? "bg-[#3A7D52] text-[#ffffff] shadow-md"
                            : "bg-white/50 text-text-muted"
                        }`}>
                          {selectedSubRole === "recipient" ? (
                            <CheckCircle2 size={16} strokeWidth={2.5} />
                          ) : (
                            <span className="w-2.5 h-2.5 rounded-full border border-text-muted/40" />
                          )}
                        </div>
                      </div>
                    </GlassSurface>
                  </motion.button>
                </>
              )}
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-auto pt-8">
              <PrimaryButton 
                onClick={handleSubRoleContinue} 
                disabled={!selectedSubRole}
              >
                Continue →
              </PrimaryButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenWrapper>
  );
}
