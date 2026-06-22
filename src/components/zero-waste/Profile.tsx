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
    <div className="flex h-full flex-col bg-zw-bg-base">
      <div className="sticky top-0 z-30 border-b border-zw-border/60 bg-zw-bg-base/90 px-5 py-4 backdrop-blur-lg">
        <h1 className="font-display text-lg font-bold text-zw-text-primary">
          Profile
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* User card */}
        <div className="px-5 pt-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="overflow-hidden rounded-3xl bg-gradient-to-br from-zw-primary-700 to-zw-primary-900 p-5 text-white"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md ring-2 ring-white/40">
                <span className="font-display text-2xl font-bold">R</span>
              </div>
              <div className="flex-1">
                <h2 className="font-display text-lg font-bold">Ramesh Kumar</h2>
                <p className="text-[12px] text-white/80">+91 98765 43210</p>
                <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase">
                  <Award size={10} />
                  Gold Member
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/20 pt-4 text-center">
              <div>
                <div className="font-display text-lg font-bold">1,248</div>
                <div className="text-[10px] text-white/70">Points</div>
              </div>
              <div>
                <div className="font-display text-lg font-bold">84</div>
                <div className="text-[10px] text-white/70">Meals saved</div>
              </div>
              <div>
                <div className="font-display text-lg font-bold">₹540</div>
                <div className="text-[10px] text-white/70">Saved</div>
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
              <div className="overflow-hidden rounded-2xl border border-zw-border bg-white">
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
                      className={`flex w-full items-center gap-3 p-3.5 text-left transition-colors hover:bg-zw-bg-muted/50 ${
                        ii > 0 ? "border-t border-zw-border" : ""
                      }`}
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zw-primary-50 text-zw-primary-700">
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
                      <ChevronRight size={16} className="text-zw-text-muted" />
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
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-zw-danger/30 bg-white py-3 text-[13px] font-semibold text-zw-danger transition-colors hover:bg-zw-danger/5"
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
