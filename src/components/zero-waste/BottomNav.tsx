"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { Home, User, MapPin, HandHeart, Package, ShoppingBag, History, BarChart2, Users } from "lucide-react";

interface TabDef {
  id: string;
  icon: any;
  screen: string;
  label: string;
  isCenterCTA?: boolean;
  accentGrad?: string;
  accentShadow?: string;
}

export function BottomNav() {
  const activePanel = useAppStore((s) => s.activePanel);
  const subRole = useAppStore((s) => s.subRole);
  const activePanel2SubRole = useAppStore((s) => s.activePanel2SubRole);
  const activeScreen = useAppStore((s) => s.activeScreen);
  const setActiveScreen = useAppStore((s) => s.setActiveScreen);
  const isLoggedIn = useAppStore((s) => s.isLoggedIn);

  if (!isLoggedIn) return null;
  if (["add-inventory-item", "tax-receipt", "donation-success", "otp-entry", "roleSelect"].includes(activeScreen)) return null;

  const getTabs = (): TabDef[] => {
    if (activePanel === "donor_shopkeeper") {
      if (subRole === "donor") {
        return [
          { id: "home", icon: Home, screen: "home", label: "Home" },
          {
            id: "donate_action", icon: HandHeart, screen: "home", label: "Donate",
            isCenterCTA: true,
            accentGrad: "linear-gradient(145deg, #9BC84A 0%, #6A9E2B 100%)",
            accentShadow: "0 8px 24px rgba(107,158,43,0.55), 0 2px 8px rgba(107,158,43,0.30)",
          },
          { id: "profile", icon: User, screen: "profile", label: "Profile" },
        ];
      }
      return [
        { id: "home", icon: Home, screen: "home", label: "Home" },
        {
          id: "inventory", icon: Package, screen: "inventory", label: "Inventory",
          isCenterCTA: true,
          accentGrad: "linear-gradient(145deg, #4A90D9 0%, #2C5F8E 100%)",
          accentShadow: "0 8px 24px rgba(44,95,142,0.55), 0 2px 8px rgba(44,95,142,0.30)",
        },
        { id: "profile", icon: User, screen: "profile", label: "Profile" },
      ];
    }

    if (activePanel === "ngo_receiver") {
      if (activePanel2SubRole === "ngo") {
        return [
          { id: "home", icon: Home, screen: "ngoHome", label: "Home" },
          { id: "stats", icon: BarChart2, screen: "ngoStats", label: "Stats" },
          { id: "volunteers", icon: Users, screen: "ngoVolunteers", label: "Volunteers" },
          { id: "store", icon: ShoppingBag, screen: "ngoStore", label: "Store" },
          { id: "profile", icon: User, screen: "ngoProfile", label: "Profile" },
        ];
      }
      return [
        { id: "home", icon: Home, screen: "recipientHome", label: "Home" },
        {
          id: "store", icon: ShoppingBag, screen: "recipientStore", label: "Store",
          isCenterCTA: true,
          accentGrad: "linear-gradient(145deg, #F2D15A 0%, #C49A00 100%)",
          accentShadow: "0 8px 24px rgba(196,154,0,0.55)",
        },
        { id: "profile", icon: User, screen: "recipientProfile", label: "Profile" },
      ];
    }

    if (activePanel === "volunteer") {
      return [
        { id: "home", icon: Home, screen: "volunteerHome", label: "Home" },
        { id: "map", icon: MapPin, screen: "volunteerMap", label: "Map" },
        { id: "pickups", icon: Package, screen: "volunteerHistory", label: "Pickups" },
        { id: "profile", icon: User, screen: "volunteerProfile", label: "Profile" },
      ];
    }

    return [];
  };

  const tabs = getTabs();

  return (
    <div className="absolute inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-5 w-full max-w-[430px] mx-auto pointer-events-none">
      <div
        className="max-w-[380px] w-full rounded-[36px] pointer-events-auto overflow-visible"
        style={{
          background: "rgba(252,251,249,0.97)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.18), 0 6px 20px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,1.0)",
          border: "1px solid rgba(255,255,255,0.80)",
        }}
      >
        <div className="flex items-center justify-evenly w-full h-[72px] px-3 overflow-visible">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeScreen === tab.screen;

            if (tab.isCenterCTA) {
              return (
                <div key={tab.id} className="relative flex flex-col items-center -translate-y-5 overflow-visible">
                  <motion.button
                    onClick={() => {
                      if (tab.id === "donate_action") {
                        setActiveScreen("createListing");
                      } else {
                        setActiveScreen(tab.screen);
                      }
                    }}
                    whileTap={{ scale: 0.86 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="relative flex h-[66px] w-[66px] items-center justify-center rounded-full overflow-hidden"
                    style={{
                      background: tab.accentGrad,
                      boxShadow: isActive
                        ? `${tab.accentShadow}, 0 0 0 4px rgba(255,255,255,1), 0 0 0 6px ${tab.accentGrad?.includes("#9BC84A") ? "rgba(107,158,43,0.35)" : tab.accentGrad?.includes("#4A90D9") ? "rgba(44,95,142,0.35)" : "rgba(196,154,0,0.35)"}`
                        : tab.accentShadow,
                    }}
                    aria-label={tab.label}
                  >
                    {/* Inner top shine */}
                    <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-10 h-3 rounded-full bg-white/35 blur-[2px]" />
                    <Icon size={26} className="text-white relative z-10" strokeWidth={2.0} />
                  </motion.button>
                  {/* Label below CTA */}
                  <span
                    className="mt-1.5 text-[9px] font-bold font-jakarta tracking-wide"
                    style={{ color: isActive ? "#1A1A1A" : "#8A8A8A" }}
                  >
                    {tab.label}
                  </span>
                </div>
              );
            }

            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveScreen(tab.screen)}
                whileTap={{ scale: 0.86 }}
                className="relative flex flex-col items-center justify-center gap-1 w-[64px] h-full"
                aria-label={tab.label}
              >
                {/* Active pill background */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-pill"
                      className="absolute inset-x-0 inset-y-1.5 rounded-[20px]"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      style={{ background: "rgba(0,0,0,0.06)" }}
                    />
                  )}
                </AnimatePresence>

                <div className="relative z-10 flex items-center justify-center">
                  <Icon
                    size={22}
                    style={{ color: isActive ? "#1A1A1A" : "#9A9A9F" }}
                    strokeWidth={isActive ? 2.4 : 1.7}
                  />
                </div>

                <span
                  className="relative z-10 text-[10px] font-bold font-jakarta tracking-wide"
                  style={{ color: isActive ? "#1A1A1A" : "#9A9A9F" }}
                >
                  {tab.label}
                </span>

                {/* Active dot indicator */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 600, damping: 22 }}
                      className="absolute bottom-[5px] w-[5px] h-[5px] rounded-full"
                      style={{ background: "linear-gradient(135deg, #D4AF37, #F2D15A)" }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
