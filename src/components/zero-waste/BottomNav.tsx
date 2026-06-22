"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import type { Role } from "@/lib/types";
import {
  Home,
  ShoppingBag,
  HandHeart,
  TrendingUp,
  User,
  Store,
  Bike,
  MapPin,
  Sparkles,
  HeartHandshake,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: any;
  screen: any;
}

const NAV_BY_ROLE: Record<Role, NavItem[]> = {
  user: [
    { id: "home", label: "Home", icon: Home, screen: "home" },
    { id: "marketplace", label: "Shop", icon: ShoppingBag, screen: "marketplace" },
    { id: "donate", label: "Donate", icon: HandHeart, screen: "donate" },
    { id: "impact", label: "Impact", icon: TrendingUp, screen: "impact" },
    { id: "profile", label: "Profile", icon: User, screen: "profile" },
  ],
  shop: [
    { id: "home", label: "Shop", icon: Store, screen: "home" },
    { id: "impact", label: "Impact", icon: TrendingUp, screen: "impact" },
    { id: "profile", label: "Profile", icon: User, screen: "profile" },
  ],
  ngo: [
    { id: "home", label: "Feed", icon: HeartHandshake, screen: "home" },
    { id: "map", label: "Map", icon: MapPin, screen: "ngo-feed" },
    { id: "impact", label: "Impact", icon: TrendingUp, screen: "impact" },
    { id: "profile", label: "Profile", icon: User, screen: "profile" },
  ],
  volunteer: [
    { id: "home", label: "Hub", icon: Bike, screen: "home" },
    { id: "impact", label: "Impact", icon: TrendingUp, screen: "impact" },
    { id: "profile", label: "Profile", icon: User, screen: "profile" },
  ],
};

export function BottomNav() {
  const role = useAppStore((s) => s.role);
  const screen = useAppStore((s) => s.screen);
  const setScreen = useAppStore((s) => s.setScreen);
  const setAssistantOpen = useAppStore((s) => s.setAssistantOpen);
  const cartCount = useAppStore((s) => s.cartCount);
  const setCartOpen = useAppStore((s) => s.setCartOpen);

  if (!role) return null;
  const items = NAV_BY_ROLE[role];

  // Map all valid screens for "active home tab" detection per role
  const homeScreensByRole: Record<Role, string[]> = {
    user: ["home", "marketplace", "donate", "impact", "profile", "checkout", "order-tracking"],
    shop: ["home", "shop-dashboard", "impact", "profile"],
    ngo: ["home", "ngo-feed", "impact", "profile"],
    volunteer: ["home", "volunteer-map", "impact", "profile"],
  };

  return (
    <>
      {/* Floating AI Assistant button */}
      <motion.button
        initial={{ scale: 0, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setAssistantOpen(true)}
        className="absolute bottom-28 right-4 z-40"
        aria-label="AI Assistant"
      >
        <div className="zw-aura relative flex h-13 w-13 items-center justify-center rounded-full p-0.5 shadow-xl">
          <div className="zw-ai-border h-full w-full rounded-full p-[2px]">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-white/95 backdrop-blur-md">
              <Sparkles size={20} className="text-zw-primary-700" />
            </div>
          </div>
        </div>
      </motion.button>

      {/* Floating cart button (user only) */}
      <AnimatePresence>
        {role === "user" && cartCount() > 0 && (
          <motion.button
            initial={{ scale: 0, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: 50 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCartOpen(true)}
            className="absolute bottom-28 left-4 z-40"
            aria-label="Cart"
          >
            <div className="glass-strong flex h-12 items-center gap-2 rounded-full px-4 shadow-xl">
              <ShoppingBag size={16} className="text-zw-primary-700" />
              <span className="font-display text-sm font-bold text-zw-text-primary">
                {cartCount()}
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* iOS-style floating glass bottom nav */}
      <div className="absolute inset-x-0 bottom-0 z-30 px-4 pb-4 pt-2">
        <div className="glass-strong glass-inset mx-auto flex max-w-md items-center justify-around rounded-[26px] px-2 py-2">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive =
              screen === item.screen ||
              (item.id === "home" &&
                homeScreensByRole[role].includes(screen));

            const isCenter = item.id === "donate";

            return (
              <motion.button
                key={item.id}
                onClick={() => setScreen(item.screen)}
                whileTap={{ scale: 0.92 }}
                className="relative flex flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl py-1.5"
              >
                {isCenter ? (
                  <div
                    className={`-mt-6 flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg transition-all ${
                      isActive
                        ? "bg-gradient-to-br from-zw-primary-500 to-zw-primary-700 shadow-zw-primary-700/40"
                        : "bg-gradient-to-br from-zw-primary-500 to-zw-primary-700 shadow-zw-primary-700/30"
                    }`}
                  >
                    <Icon size={22} className="text-white" strokeWidth={2.4} />
                  </div>
                ) : (
                  <motion.div
                    animate={{
                      scale: isActive ? 1.1 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="flex items-center justify-center"
                  >
                    <Icon
                      size={22}
                      strokeWidth={isActive ? 2.6 : 1.8}
                      className={
                        isActive
                          ? "text-zw-primary-700"
                          : "text-zw-text-muted"
                      }
                      fill={isActive ? "currentColor" : "none"}
                      fillOpacity={isActive ? 0.15 : 0}
                    />
                  </motion.div>
                )}
                <motion.span
                  animate={{
                    color: isActive
                      ? "var(--color-zw-primary-700)"
                      : "var(--color-zw-text-muted)",
                    fontWeight: isActive ? 700 : 500,
                    opacity: isActive ? 1 : 0.85,
                  }}
                  className="text-[10px] tracking-tight"
                >
                  {item.label}
                </motion.span>

                {/* Active indicator dot */}
                {isActive && !isCenter && (
                  <motion.div
                    layoutId="nav-active-dot"
                    className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-zw-primary-700"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </>
  );
}
