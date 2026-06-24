"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { User, Building2, Bike, HeartHandshake, CheckCircle2 } from "lucide-react";

const ROLES = [
  {
    id: "user" as const,
    title: "Donor",
    desc: "Donate food and buy groceries.",
    bg: "#C8E8D0",
    iconBg: "#1A6B3C",
    accent: "#1A6B3C",
    icon: User,
  },
  {
    id: "ngo" as const,
    title: "NGO / Recipient",
    desc: "Receive donations, track distributions, manage volunteers.",
    bg: "#C8D8F0",
    iconBg: "#1E3A8A",
    accent: "#1E3A8A",
    icon: Building2,
  },
  {
    id: "volunteer" as const,
    title: "Volunteer",
    desc: "Pick up food and deliver it to NGOs.",
    bg: "#F5E6C8",
    iconBg: "#D97706",
    accent: "#D97706",
    icon: Bike,
  },
];

export function RoleSelect() {
  const setRole = useAppStore((s) => s.setRole);
  const setScreen = useAppStore((s) => s.setScreen);
  const [selectedRole, setSelectedRole] = useState<"user" | "ngo" | "volunteer" | null>(null);

  const handleContinue = () => {
    if (!selectedRole) return;
    setRole(selectedRole);
    // Navigate to the specific setup flow based on role
    if (selectedRole === "ngo") {
      setScreen("ngo-recipient-choice" as any);
    } else if (selectedRole === "volunteer") {
      setScreen("volunteer-auth-choice" as any);
    } else {
      setScreen(`${selectedRole}-setup` as any);
    }
  };

  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }} className="bg-[#F7F5F0]">
      <main style={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
        <div className="px-6 pt-16 pb-6">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[30px] font-bold text-[#0A0A0A]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            How will you use Zero-Waste?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-[15px] text-[#4A4A4A]"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Select your role to personalize your experience.
          </motion.p>
        </div>

        {/* Role cards list */}
        <div className="flex flex-col gap-4 px-6 pb-24">
          {ROLES.map((role, i) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            return (
              <motion.button
                key={role.id}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.08 + 0.2, duration: 0.4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedRole(role.id)}
                className="relative flex items-center gap-5 overflow-hidden p-5 text-left transition-all duration-200"
                style={{
                  borderRadius: "24px",
                  background: isSelected ? role.bg : "#FFFFFF",
                  border: `2px solid ${isSelected ? role.accent : "transparent"}`,
                  boxShadow: isSelected 
                    ? `0px 8px 24px ${role.accent}30` 
                    : "0px 2px 16px rgba(0,0,0,0.04)",
                }}
              >
                {/* Icon Circle */}
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-colors"
                  style={{ background: isSelected ? role.iconBg : "#F0F0F0" }}
                >
                  <Icon size={24} color={isSelected ? "white" : "#8A8A8A"} />
                </div>

                {/* Text Content */}
                <div className="flex flex-col justify-center flex-1 pr-4">
                  <h3
                    className="text-[18px] font-bold text-[#0A0A0A]"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {role.title}
                  </h3>
                  <p
                    className="mt-1 text-[13px] leading-[1.4] text-[#4A4A4A]"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    {role.desc}
                  </p>
                </div>

                {/* Selection indicator */}
                <div className="absolute right-5 top-1/2 -translate-y-1/2">
                  <motion.div
                    animate={{ scale: isSelected ? 1 : 0, opacity: isSelected ? 1 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <CheckCircle2 size={24} color={role.accent} />
                  </motion.div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </main>

      {/* Fixed Bottom Action Button */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200, delay: 0.5 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white px-6 pb-10 pt-4"
        style={{
          boxShadow: "0px -8px 32px rgba(0,0,0,0.06)",
          borderRadius: "32px 32px 0 0",
        }}
      >
        <button
          onClick={handleContinue}
          disabled={!selectedRole}
          className="flex h-14 w-full items-center justify-center rounded-full text-[17px] font-bold transition-all disabled:opacity-50"
          style={{
            background: selectedRole ? "#1A6B3C" : "#E8E8E4",
            color: selectedRole ? "white" : "#8A8A8A",
            fontFamily: "var(--font-outfit)",
            boxShadow: selectedRole ? "0px 8px 24px rgba(26,107,60,0.25)" : "none",
          }}
        >
          Continue
        </button>
      </motion.div>
    </div>
  );
}
