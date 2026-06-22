"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import {
  ChevronRight,
  MapPin,
  CreditCard,
  Bell,
  Shield,
  HelpCircle,
  Settings,
  LogOut,
  Award,
  Star,
  Recycle,
  Sparkles,
} from "lucide-react";

export function Profile() {
  const setScreen = useAppStore((s) => s.setScreen);
  const role = useAppStore((s) => s.role);
  const impactPoints = useAppStore((s) => s.impactPoints);
  const mealsSaved = useAppStore((s) => s.mealsSaved);
  const moneySaved = useAppStore((s) => s.moneySaved);

  const MENU_SECTIONS = [
    {
      title: "Account",
      items: [
        { icon: MapPin, label: "Saved Addresses", sub: "2 addresses" },
        { icon: CreditCard, label: "Payment Methods", sub: "UPI, 1 card" },
        { icon: Bell, label: "Notifications", sub: "Push, Email" },
      ],
    },
    {
      title: "Preferences",
      items: [
        { icon: Recycle, label: "Switch Role", sub: role, action: "switch" },
        { icon: Shield, label: "Privacy & Security", sub: "Verified account" },
        { icon: Settings, label: "App Settings", sub: "Theme, Language" },
      ],
    },
    {
      title: "Support",
      items: [
        { icon: HelpCircle, label: "Help Center", sub: "FAQs, Contact" },
        { icon: Star, label: "Rate Zero-Waste", sub: "on Play Store" },
      ],
    },
  ];

  return (
    <div className="relative flex h-full flex-col">
      <div className="absolute inset-0 -z-10 bg-zw-aurora" />
      <div className="blob bg-zw-pink-300/30 zw-float" style={{ width: 250, height: 250, top: "10%", right: "-15%" }} />
      <div className="blob bg-zw-primary-300/30 zw-float-slow" style={{ width: 200, height: 200, bottom: "20%", left: "-10%" }} />

      <div className="sticky top-0 z-30 px-5 py-4">
        <div className="absolute inset-0 -z-10 bg-white/60 backdrop-blur-xl border-b border-zw-border-strong" />
        <h1 className="font-display text-[22px] font-bold tracking-tight text-zw-text-primary">
          Profile
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto zw-scroll pb-32">
        {/* User card */}
        <div className="px-5 pt-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="overflow-hidden rounded-3xl glass-primary p-5 text-white shadow-xl"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.2, 0.15] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white"
            />
            <div className="relative z-10 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/25 backdrop-blur-md ring-2 ring-white/40">
                <span className="font-display text-2xl font-bold">R</span>
              </div>
              <div className="flex-1">
                <h2 className="font-display text-lg font-bold tracking-tight">
                  Ramesh Kumar
                </h2>
                <p className="text-[12px] text-white/85">+91 98765 43210</p>
                <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-white/25 px-2 py-0.5 text-[10px] font-bold uppercase">
                  <Award size={10} />
                  Gold Member
                </div>
              </div>
            </div>
            <div className="relative z-10 mt-4 grid grid-cols-3 gap-2 border-t border-white/20 pt-4 text-center">
              <div>
                <div className="font-display text-lg font-bold">
                  {impactPoints.toLocaleString("en-IN")}
                </div>
                <div className="text-[10px] text-white/80">Points</div>
              </div>
              <div>
                <div className="font-display text-lg font-bold">
                  {mealsSaved}
                </div>
                <div className="text-[10px] text-white/80">Meals saved</div>
              </div>
              <div>
                <div className="font-display text-lg font-bold">
                  \u20B9{moneySaved}
                </div>
                <div className="text-[10px] text-white/80">Saved</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Menu sections */}
        <div className="mt-5 space-y-5 px-5">
          {MENU_SECTIONS.map((section, si) => (
            <motion.div
              key={si}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 + si * 0.1 }}
            >
              <h3 className="mb-2 font-display text-[12px] font-bold uppercase tracking-wide text-zw-text-secondary">
                {section.title}
              </h3>
              <div className="overflow-hidden rounded-3xl glass glass-inset">
                {section.items.map((item, ii) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={ii}
                      onClick={() => {
                        if (item.action === "switch") {
                          setScreen("role-select");
                        }
                      }}
                      className={`flex w-full items-center gap-3 p-3.5 text-left transition-colors hover:bg-white/40 ${
                        ii > 0 ? "border-t border-zw-divider" : ""
                      }`}
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-zw-primary-50 to-white text-zw-primary-700 border border-zw-primary-200/30">
                        <Icon size={16} />
                      </div>
                      <div className="flex-1">
                        <div className="text-[13px] font-semibold text-zw-text-primary">
                          {item.label}
                        </div>
                        <div className="text-[11px] text-zw-text-muted">
                          {item.sub}
                        </div>
                      </div>
                      <ChevronRight
                        size={16}
                        className="text-zw-text-muted"
                      />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}

          {/* Logout */}
          <button
            onClick={() => {
              setScreen("onboarding");
            }}
            className="flex w-full items-center justify-center gap-2 rounded-2xl glass py-3 text-[13px] font-semibold text-zw-danger transition-colors active:scale-98"
          >
            <LogOut size={16} />
            Log Out
          </button>

          <p className="text-center text-[11px] text-zw-text-muted">
            Zero-Waste v1.0.0 · Made with care
          </p>
        </div>
      </div>
    </div>
  );
}
