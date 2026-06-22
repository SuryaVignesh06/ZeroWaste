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
    { id: "marketplace", label: "Market", icon: ShoppingBag, screen: "marketplace" },
    { id: "donate", label: "Donate", icon: HandHeart, screen: "donate" },
    { id: "impact", label: "Impact", icon: TrendingUp, screen: "impact" },
    { id: "profile", label: "Profile", icon: User, screen: "profile" },
  ],
  shop: [
    { id: "home", label: "Dashboard", icon: Store, screen: "home" },
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

  return (
    <>
      {/* Floating AI Assistant button (above nav) */}
      <motion.button
        initial={{ scale: 0, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setAssistantOpen(true)}
        className="absolute bottom-24 right-4 z-30"
      >
        <div className="zw-aura relative flex h-12 w-12 items-center justify-center rounded-full bg-zw-primary-700 shadow-xl shadow-zw-primary-700/30 ring-2 ring-white">
          <Sparkles size={20} className="text-white" />
        </div>
      </motion.button>

      {/* Floating cart button (for user role) — shows when cart has items */}
      {role === "user" && cartCount() > 0 && (
        <motion.button
          initial={{ scale: 0, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCartOpen(true)}
          className="absolute bottom-24 left-4 z-30"
        >
          <div className="flex h-12 items-center gap-2 rounded-full bg-zw-primary-700 px-4 shadow-xl shadow-zw-primary-700/30 ring-2 ring-white">
            <ShoppingBag size={18} className="text-white" />
            <span className="font-display text-sm font-bold text-white">
              {cartCount()}
            </span>
          </div>
        </motion.button>
      )}

      {/* Bottom nav */}
      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-zw-border bg-white/95 backdrop-blur-lg">
        <div className="flex items-center justify-around px-2 pb-3 pt-2">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive =
              screen === item.screen ||
              (item.id === "home" &&
                ["home", "marketplace", "donate", "impact", "profile", "checkout", "order-tracking", "shop-dashboard", "ngo-feed", "volunteer-map"].includes(screen));

            const isCenter = item.id === "donate";

            return (
              <button
                key={item.id}
                onClick={() => setScreen(item.screen)}
                className="relative flex flex-1 flex-col items-center gap-0.5 py-1"
              >
                {isCenter ? (
                  <div
                    className={`-mt-5 flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg transition-all ${
                      isActive
                        ? "bg-zw-primary-700 shadow-zw-primary-700/30"
                        : "bg-zw-primary-600 shadow-zw-primary-600/20"
                    }`}
                  >
                    <Icon
                      size={22}
                      className="text-white"
                      strokeWidth={2.2}
                    />
                  </div>
                ) : (
                  <motion.div
                    animate={{
                      scale: isActive ? 1.15 : 1,
                      color: isActive
                        ? "var(--color-zw-primary-700)"
                        : "var(--color-zw-text-muted)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <Icon size={22} strokeWidth={isActive ? 2.4 : 1.8} />
                  </motion.div>
                )}
                <motion.span
                  animate={{
                    color: isActive
                      ? "var(--color-zw-primary-700)"
                      : "var(--color-zw-text-muted)",
                    fontWeight: isActive ? 700 : 500,
                  }}
                  className="text-[10px]"
                >
                  {item.label}
                </motion.span>

                {isActive && !isCenter && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute -top-0.5 h-1 w-8 rounded-full bg-zw-primary-700"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
