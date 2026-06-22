"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { Onboarding } from "./Onboarding";
import { RoleSelect } from "./RoleSelect";
import { HomeUser } from "./HomeUser";
import { Marketplace } from "./Marketplace";
import { ProductDetailSheet, CartSheet } from "./ProductDetailSheet";
import { DonateFood } from "./DonateFood";
import { Checkout, OrderTracking } from "./Checkout";
import { NgoFeed } from "./NgoFeed";
import { VolunteerMap } from "./VolunteerMap";
import { ShopDashboard } from "./ShopDashboard";
import { ImpactDashboard } from "./ImpactDashboard";
import { Profile } from "./Profile";
import { BottomNav } from "./BottomNav";
import { AiAssistant } from "./AiAssistant";

export function AppShell() {
  const { screen, role, setScreen } = useAppStore();

  // Reset to role's home when role changes
  useEffect(() => {
    if (role) {
      switch (role) {
        case "shop":
          setScreen("shop-dashboard");
          break;
        case "ngo":
          setScreen("ngo-feed");
          break;
        case "volunteer":
          setScreen("volunteer-map");
          break;
        default:
          setScreen("home");
      }
    }
  }, [role]);

  // Show onboarding first
  if (screen === "onboarding") {
    return <Onboarding />;
  }

  if (screen === "role-select") {
    return <RoleSelect />;
  }

  // Pick the main screen content
  const renderScreen = () => {
    switch (screen) {
      case "home":
        if (role === "shop") return <ShopDashboard />;
        if (role === "ngo") return <NgoFeed />;
        if (role === "volunteer") return <VolunteerMap />;
        return <HomeUser />;
      case "marketplace":
        return <Marketplace />;
      case "donate":
        return <DonateFood />;
      case "checkout":
        return <Checkout />;
      case "order-tracking":
        return <OrderTracking />;
      case "ngo-feed":
        return <NgoFeed />;
      case "volunteer-map":
        return <VolunteerMap />;
      case "shop-dashboard":
        return <ShopDashboard />;
      case "impact":
        return <ImpactDashboard />;
      case "profile":
        return <Profile />;
      default:
        return <HomeUser />;
    }
  };

  return (
    <div className="relative flex h-full flex-col">
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex-1"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>

      {/* Overlays */}
      <ProductDetailSheet />
      <CartSheet />
      <AiAssistant />
      <BottomNav />
    </div>
  );
}
