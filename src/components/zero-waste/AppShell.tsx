"use client";

import { useAppStore } from "@/lib/store";
import { AnimatePresence, motion } from "framer-motion";
import { getPageTransition, liquidPageVariants } from "@/lib/animations";

import { SplashScreen } from "./SplashScreen";
import { Onboarding } from "./Onboarding";
import { Login } from "./Login";
import { Otp } from "./Otp";
import { RoleSelect } from "./RoleSelect";
import { DonorSetup } from "./DonorSetup";
import { VolunteerHistory } from "./VolunteerHistory";
import { VolunteerProfile } from "./VolunteerProfile";

// Panel 1 (Donor + Shopkeeper) V2 Components
import { ProviderHome } from "./ProviderHome";
import { CreateListing } from "./CreateListing";
import { ProviderProfile } from "./ProviderProfile";
import { ReceiverHome } from "./ReceiverHome";
import { Inventory } from "./Inventory";
import { AddInventoryItem } from "./AddInventoryItem";
import { TaxReceipt } from "./TaxReceipt";
import { DonationSuccess } from "./DonationSuccess";
import { ActivityHistory } from "./ActivityHistory";

// Panel 2 Components (NGO & Recipient)
import { NGOHome } from "./NGOHome";
import { NGOStats } from "./NGOStats";
import { NGOVolunteers } from "./NGOVolunteers";
import { NGOStore } from "./NGOStore";
import { NGOProfile } from "./NGOProfile";
import { RecipientHome } from "./RecipientHome";
import { RecipientStore } from "./RecipientStore";
import { RecipientProfile } from "./RecipientProfile";

import { ReceiverMap } from "./ReceiverMap";
import { ProductDetail } from "./ProductDetail";
import { ReserveProduct } from "./ReserveProduct";
import { ReservationQR } from "./ReservationQR";
import { DistributionProof } from "./DistributionProof";
import { VolunteerHome } from "./VolunteerHome";
import { VolunteerMap } from "./VolunteerMap";
import { PickupDetail } from "./PickupDetail";

import { BottomNav } from "./BottomNav";
import { AiAssistant } from "./AiAssistant";
import { GlassSurface } from "../ui/GlassSurface";
import { Utensils, Store, X } from "lucide-react";

const Dummy = ({ title }: { title: string }) => (
  <div className="flex flex-1 flex-col items-center justify-center p-6 text-center h-full">
    <h1 className="text-h1">{title}</h1>
    <p className="mt-4 text-body">This screen is currently being built in V3.</p>
  </div>
);

const ReceiverProfile = () => <Dummy title="Receiver Profile" />;
const DummyScreen = ({ name }: { name: string }) => <Dummy title={name} />;

export function AppShell() {
  const activeScreen = useAppStore((s) => s.activeScreen);
  const showAddMenu = useAppStore((s) => s.showAddMenu);
  const setShowAddMenu = useAppStore((s) => s.setShowAddMenu);
  const setSelectedInventoryItem = useAppStore((s) => s.setSelectedInventoryItem);
  const setActiveScreen = useAppStore((s) => s.setActiveScreen);

  const renderScreen = () => {
    switch (activeScreen) {
      case "splash": return <SplashScreen />;
      case "onboarding": return <Onboarding />;
      case "login": return <Login />;
      case "otp": 
      case "otp-entry": return <Otp />;
      case "roleSelect": return <RoleSelect />;
      case "pickupDetail": return <PickupDetail />;
      case "add-inventory-item": return <AddInventoryItem />;
      case "edit-inventory-item": return <AddInventoryItem />;
      case "donation-success": return <DonationSuccess />;
      
      // Panel 1: Donor & Shopkeeper
      case "home": return <ProviderHome />;
      case "createListing": return <CreateListing />;
      case "inventory": return <Inventory />;
      case "profile": return <ProviderProfile />;
      case "tax-receipt": return <TaxReceipt />;
      case "activity-history": return <ActivityHistory />;
      
      // Panel 2
      case "ngoHome": return <NGOHome />;
      case "ngoStats": return <NGOStats />;
      case "ngoVolunteers": return <NGOVolunteers />;
      case "ngoStore": return <NGOStore />;
      case "ngoProfile": return <NGOProfile />;
      
      case "recipientHome": return <RecipientHome />;
      case "recipientStore": return <RecipientStore />;
      case "recipientProfile": return <RecipientProfile />;

      // Legacy Panel 2 (for backwards compatibility if needed)
      case "receiverMap": return <ReceiverMap />;
      case "productDetail": return <ProductDetail />;
      case "reserveProduct": return <ReserveProduct />;
      case "reservationQR": return <ReservationQR />;
      case "distributionProof": return <DistributionProof />;

      // Panel 3
      case "volunteerHome": return <VolunteerHome />;
      case "volunteerMap": return <VolunteerMap />;
      case "volunteerHistory":
        return <VolunteerHistory />;
      case "volunteerProfile":
        return <VolunteerProfile />;
      case "volunteerSettings":
        return <DummyScreen name="Volunteer Settings" />;

      default: 
        if (activePanel === "volunteer") return <VolunteerHome />;
        if (activePanel === "ngo_receiver") return <ReceiverHome />;
        return <ProviderHome />;
    }
  };

  const fullScreens = ["splash", "onboarding", "login", "otp", "otp-entry", "roleSelect", "pickupDetail", "add-inventory-item", "edit-inventory-item", "donation-success", "createListing"];
  const isFullScreen = fullScreens.includes(activeScreen);

  return (
    <div className="flex flex-1 flex-col h-full relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeScreen}
          variants={liquidPageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex flex-1 flex-col h-full overflow-y-auto"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>

      <AiAssistant />
      {!isFullScreen && <BottomNav />}

      {/* Donate or Sell slide-up menu overlay */}
      <AnimatePresence>
        {showAddMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddMenu(false)}
              className="fixed inset-0 z-[100] cursor-pointer pointer-events-auto"
              style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(8px)" }}
            />

            {/* Action Sheet */}
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed inset-x-0 bottom-0 z-[101] max-w-[430px] mx-auto pointer-events-auto px-4 pb-6"
            >
              <div
                className="w-full rounded-[32px] overflow-hidden"
                style={{
                  background: "rgba(255,254,252,0.97)",
                  backdropFilter: "blur(28px)",
                  boxShadow: "0 -4px 0 rgba(0,0,0,0.04), 0 -16px 48px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.80)",
                  border: "1px solid rgba(255,255,255,0.85)",
                }}
              >
                <div className="pt-5 pb-8 px-6 flex flex-col items-center gap-6">
                  {/* Drag handle */}
                  <div className="w-12 h-1.5 rounded-full bg-black/10" />

                  {/* Header */}
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <h3 className="font-heading font-black text-[22px] text-[#1A1A1A] leading-tight">
                        What would you like to do?
                      </h3>
                      <p className="font-body text-[13px] text-[#9A9A9A] mt-0.5">
                        Choose an action to continue
                      </p>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.88 }}
                      onClick={() => setShowAddMenu(false)}
                      className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(0,0,0,0.07)" }}
                    >
                      <X size={17} className="text-[#1A1A1A]" />
                    </motion.button>
                  </div>

                  {/* Option Cards */}
                  <div className="flex flex-col gap-3 w-full">
                    {/* Donate Option */}
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 500, damping: 24 }}
                      onClick={() => {
                        setShowAddMenu(false);
                        setSelectedInventoryItem(null);
                        setActiveScreen("createListing");
                      }}
                      className="flex items-center gap-4 w-full p-4 rounded-[22px] text-left"
                      style={{
                        background: "rgba(155,200,74,0.08)",
                        border: "1.5px solid rgba(155,200,74,0.22)",
                        boxShadow: "0 4px 16px rgba(155,200,74,0.10)",
                      }}
                    >
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                        style={{
                          background: "linear-gradient(135deg, rgba(155,200,74,0.25), rgba(107,158,43,0.15))",
                          border: "1.5px solid rgba(155,200,74,0.35)",
                        }}
                      >
                        <Utensils size={24} className="text-[#5A8C2A]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-heading font-black text-[16px] text-[#1A1A1A]">
                          Donate Surplus Food
                        </h4>
                        <p className="font-body text-[12px] text-[#7A7A7A] mt-0.5 leading-snug">
                          List free items for NGOs and local recipients
                        </p>
                      </div>
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: "rgba(155,200,74,0.15)" }}
                      >
                        <span className="text-[#5A8C2A] font-black text-[16px]">â€º</span>
                      </div>
                    </motion.button>

                    {/* Sell / Inventory Option */}
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 500, damping: 24 }}
                      onClick={() => {
                        setShowAddMenu(false);
                        setSelectedInventoryItem(null);
                        setActiveScreen("add-inventory-item");
                      }}
                      className="flex items-center gap-4 w-full p-4 rounded-[22px] text-left"
                      style={{
                        background: "rgba(91,141,184,0.08)",
                        border: "1.5px solid rgba(91,141,184,0.22)",
                        boxShadow: "0 4px 16px rgba(91,141,184,0.10)",
                      }}
                    >
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                        style={{
                          background: "linear-gradient(135deg, rgba(91,141,184,0.25), rgba(44,95,142,0.15))",
                          border: "1.5px solid rgba(91,141,184,0.35)",
                        }}
                      >
                        <Store size={24} className="text-[#2C5F8E]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-heading font-black text-[16px] text-[#1A1A1A]">
                          Add to Inventory
                        </h4>
                        <p className="font-body text-[12px] text-[#7A7A7A] mt-0.5 leading-snug">
                          Track and sell products at discounted rates
                        </p>
                      </div>
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: "rgba(91,141,184,0.15)" }}
                      >
                        <span className="text-[#2C5F8E] font-black text-[16px]">â€º</span>
                      </div>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
