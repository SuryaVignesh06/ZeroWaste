"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { staggerChildren, fadeInUp, springGentle, springBouncy, tapBounce, popIn } from "@/lib/animations";
import { 
  HeartHandshake, Store, AlertTriangle, Clock, MapPin, 
  Utensils, Star, Package, CheckCircle2, Pencil, Plus,
  TrendingUp, ChevronRight, Zap, Check
} from "lucide-react";

import { ScreenWrapper } from "../ui/ScreenWrapper";
import { LightCard } from "../ui/Cards/LightCard";
import { HiringStyleCard } from "../ui/Cards/HiringStyleCard";
import { StatCardPair } from "../ui/Cards/StatCardPair";
import { SectionHeader } from "../ui/SectionHeader";
import { Avatar } from "../ui/Display/Avatar";

export function ProviderHome() {
  const { 
    subRole, user, pullRequests, inventory, 
    donations, sellItems,
    acceptRequest, donateFromInventory, sellFromInventory,
    setActiveScreen, setSelectedInventoryItem, setShowAddMenu
  } = useAppStore();

  const handleAcceptRequest = (id: string) => acceptRequest(id);

  const handleDonateInventory = (id: string, quantity: number) => {
    donateFromInventory(id, quantity, 2);
    setActiveScreen("donation-success");
  };

  if (!user) return null;

  const openPRs = pullRequests.filter(pr => pr.status === "open" || pr.status === "accepted");
  const urgentItems = inventory.filter(i => i.daysToExpiry <= 5 && i.status === "in_stock");

  return (
    <ScreenWrapper>
      <div className="flex flex-col gap-5 pt-4 relative z-10">
        
        {/* ── Header ── */}
        <motion.div 
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...springGentle, delay: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <p className="text-body-lg text-text-secondary">Good morning 👋</p>
            <h1 className="text-display mt-0.5">{user.name}</h1>
          </div>

          {/* Animated role badge */}
          <motion.div
            {...tapBounce}
            onClick={() => setActiveScreen("profile")}
            className="w-14 h-14 rounded-[20px] bg-white/90 shadow-[0_8px_28px_rgba(0,0,0,0.10)] flex items-center justify-center border border-white/60 cursor-pointer"
            style={{ backdropFilter: "blur(20px)" }}
          >
            {subRole === "donor" 
              ? <Utensils size={24} className="text-[#7CA13B]" />
              : <Store size={24} className="text-[#3F6E9C]" />
            }
          </motion.div>
        </motion.div>

        {/* ── Stats Row ── */}
        <motion.div 
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...springBouncy, delay: 0.08 }}
        >
          {subRole === "donor" ? (
            <StatCardPair 
              stat1={{ label: "Impact Points", value: user.totalPoints, icon: <Star />, iconColor: "text-[#1A1A1A]" }}
              stat2={{ label: "Meals Donated", value: user.totalDonations, icon: <HeartHandshake />, iconColor: "text-accent-green" }}
            />
          ) : (
            <StatCardPair 
              stat1={{ 
                label: "Expiring Today", 
                value: inventory.filter(i => i.daysToExpiry <= 1 && i.status === "in_stock").length, 
                icon: <AlertTriangle />, 
                iconColor: "text-color-urgent",
                className: "!bg-[#FF6B6B]/15 !border-red-500/30"
              }}
              stat2={{ 
                label: "Near Expiry", 
                value: inventory.filter(i => i.daysToExpiry > 1 && i.daysToExpiry <= 5 && i.status === "in_stock").length, 
                icon: <Clock />, 
                iconColor: "text-color-warning",
                className: "!bg-[#EBA144]/15 !border-yellow-500/30"
              }}
            />
          )}
        </motion.div>

        {/* ── Quick Add Banner (Donor) ── */}
        {subRole === "donor" && (
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springBouncy, delay: 0.14 }}
            {...tapBounce}
            onClick={() => setActiveScreen("createListing")}
            className="w-full rounded-[24px] p-4 flex items-center gap-4 text-left"
            style={{
              background: "linear-gradient(135deg, rgba(155,200,74,0.18) 0%, rgba(124,161,59,0.10) 100%)",
              border: "1.5px solid rgba(155,200,74,0.30)",
              boxShadow: "0 4px 20px rgba(155,200,74,0.12)",
            }}
          >
            <div className="w-12 h-12 rounded-2xl bg-[#9BC84A]/20 border border-[#9BC84A]/30 flex items-center justify-center shrink-0">
              <Plus size={22} className="text-[#7CA13B]" />
            </div>
            <div className="flex-1">
              <p className="font-outfit font-bold text-[15px] text-[#1A1A1A]">Donate or Sell Surplus</p>
              <p className="font-jakarta text-[12px] text-text-secondary mt-0.5">List your food in 30 seconds</p>
            </div>
            <ChevronRight size={18} className="text-text-muted shrink-0" />
          </motion.button>
        )}

        {/* ── Shopkeeper Quick Add Banner ── */}
        {subRole === "shopkeeper" && (
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springBouncy, delay: 0.14 }}
            {...tapBounce}
            onClick={() => setActiveScreen("add-inventory-item")}
            className="w-full rounded-[24px] p-4 flex items-center gap-4 text-left"
            style={{
              background: "linear-gradient(135deg, rgba(91,141,184,0.18) 0%, rgba(63,110,156,0.10) 100%)",
              border: "1.5px solid rgba(91,141,184,0.30)",
              boxShadow: "0 4px 20px rgba(91,141,184,0.12)",
            }}
          >
            <div className="w-12 h-12 rounded-2xl bg-[#5B8DB8]/20 border border-[#5B8DB8]/30 flex items-center justify-center shrink-0">
              <Plus size={22} className="text-[#3F6E9C]" />
            </div>
            <div className="flex-1">
              <p className="font-outfit font-bold text-[15px] text-[#1A1A1A]">Add to Inventory</p>
              <p className="font-jakarta text-[12px] text-text-secondary mt-0.5">Track and manage your stock</p>
            </div>
            <ChevronRight size={18} className="text-text-muted shrink-0" />
          </motion.button>
        )}

        {/* ══ DONOR SECTION ══ */}
        {subRole === "donor" && (
          <motion.div
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="flex flex-col gap-5"
          >
            <SectionHeader title="Pull Requests" action="View all" />

            {openPRs.length === 0 && (
              <motion.div variants={fadeInUp} className="bg-white/80 rounded-[28px] p-8 text-center shadow-[0_8px_32px_rgba(0,0,0,0.07)] border border-white/50">
                <div className="w-16 h-16 bg-[#9BC84A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-[#9BC84A]" />
                </div>
                <h3 className="font-outfit font-bold text-[17px]">All clear!</h3>
                <p className="text-body mt-2 text-text-secondary">No open pull requests right now.</p>
              </motion.div>
            )}

            {openPRs.map((pr) => {
              const isAccepted = pr.status === "accepted";
              const totalTime = 4 * 60 * 60 * 1000;
              const remainingTime = pr.expiresAt.getTime() - Date.now();
              const progressValue = isAccepted ? 100 : Math.max(0, Math.min(100, (remainingTime / totalTime) * 100));

              return (
                <motion.div key={pr.id} variants={fadeInUp}>
                  <HiringStyleCard 
                    avatarSrc={pr.ngoAvatar}
                    fallbackInitial={pr.ngoName[0]}
                    title={pr.ngoName}
                    subtitle={isAccepted ? "Waiting for Pickup" : "Needs Food Now"}
                    progressLabel={isAccepted ? "✅ Accepted" : `${Math.round(remainingTime / (1000 * 60 * 60))}h remaining`}
                    progressValue={progressValue}
                    progressColor={isAccepted ? "#9BC84A" : "#F2D15A"}
                    onTopRightAction={() => setActiveScreen("activity-history")}
                    isListed={isAccepted}
                    onAction1={() => setActiveScreen("activity-history")}
                    onAction2={() => handleAcceptRequest(pr.id)}
                    action1Icon={
                      <span className="font-outfit font-bold text-[11px] text-text-secondary">Details</span>
                    }
                    action2Icon={
                      <div
                        className="w-full h-full flex items-center justify-center rounded-full"
                        style={{
                          background: "linear-gradient(135deg, #9BC84A, #7CA13B)",
                          color: "#fff",
                        }}
                      >
                        <Check size={18} strokeWidth={3} />
                      </div>
                    }
                  />
                </motion.div>
              );
            })}

            {/* ── Active Listings (Donations & Sells) ── */}
            <div className="mt-4">
              <SectionHeader title="Your Active Listings" />
            </div>

            {donations.length === 0 && sellItems.length === 0 ? (
              <motion.div variants={fadeInUp} className="bg-white/80 rounded-[28px] p-8 text-center shadow-[0_8px_32px_rgba(0,0,0,0.07)] border border-white/50">
                <div className="w-16 h-16 bg-[#F2D15A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package size={32} className="text-[#D4AF37]" />
                </div>
                <h3 className="font-outfit font-bold text-[17px]">No listings yet</h3>
                <p className="text-body mt-2 text-text-secondary">Your surplus food listings will appear here.</p>
              </motion.div>
            ) : (
              [...donations, ...sellItems].map((item: any) => {
                const isSell = item.sellingPrice !== undefined;
                const title = isSell ? item.itemName : item.foodName;
                const qty = isSell ? `${item.quantity} ${item.unit}` : `${item.servings} servings`;
                const progressValue = 100; // Mock progress
                
                return (
                  <motion.div key={item.id} variants={fadeInUp}>
                    <HiringStyleCard
                      avatarSrc={item.photo}
                      fallbackInitial={title[0]}
                      title={title}
                      subtitle={`${qty} available`}
                      progressLabel={isSell ? `Listed for ₹${item.sellingPrice}` : "Listed for Donation"}
                      progressValue={progressValue}
                      progressColor={isSell ? "#F2D15A" : "#9BC84A"}
                      onTopRightAction={() => {}}
                      onAction1={() => {}}
                      onAction2={() => {}}
                      action1Icon={<Pencil size={18} className="text-text-secondary" />}
                      action2Icon={
                        <div
                          className="w-full h-full flex items-center justify-center rounded-full"
                          style={{
                            background: isSell
                              ? "linear-gradient(135deg, #F2D15A, #D4AF37)"
                              : "linear-gradient(135deg, #9BC84A, #7CA13B)",
                            color: isSell ? "#1A1A1A" : "#fff",
                          }}
                        >
                          <HeartHandshake size={18} />
                        </div>
                      }
                    />
                  </motion.div>
                );
              })
            )}
          </motion.div>
        )}

        {/* ══ SHOPKEEPER SECTION ══ */}
        {subRole === "shopkeeper" && (
          <motion.div
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="flex flex-col gap-5"
          >
            <SectionHeader title="Action Needed" />

            {urgentItems.length === 0 ? (
              <motion.div variants={fadeInUp} className="bg-white/80 rounded-[28px] p-8 text-center shadow-[0_8px_32px_rgba(0,0,0,0.07)] border border-white/50">
                <div className="w-16 h-16 bg-[#9BC84A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-[#9BC84A]" />
                </div>
                <h3 className="font-outfit font-bold text-[17px]">All caught up!</h3>
                <p className="text-body mt-2 text-text-secondary">No items expiring soon.</p>
              </motion.div>
            ) : (
              urgentItems.map((item) => {
                const isUrgent = item.daysToExpiry <= 1;
                const progressValue = isUrgent ? 12 : (item.daysToExpiry / 5) * 100;
                return (
                  <motion.div key={item.id} variants={fadeInUp}>
                    <HiringStyleCard
                      avatarSrc={item.photos[0]}
                      fallbackInitial={item.itemName[0]}
                      title={item.itemName}
                      subtitle={`${item.quantity} ${item.unit} available`}
                      progressLabel={isUrgent ? "Expiring Today" : `Expires in ${item.daysToExpiry} days`}
                      progressValue={progressValue}
                      progressColor={isUrgent ? "#FF6B6B" : "#EBA144"}
                      onTopRightAction={() => {
                        setSelectedInventoryItem(item.id);
                        setActiveScreen("edit-inventory-item");
                      }}
                      onAction1={() => {
                        setSelectedInventoryItem(item.id);
                        setActiveScreen("edit-inventory-item");
                      }}
                      onAction2={() => handleDonateInventory(item.id, item.quantity)}
                      action1Icon={<Pencil size={18} className="text-text-secondary" />}
                      action2Icon={
                        <div
                          className="w-full h-full flex items-center justify-center rounded-full"
                          style={{
                            background: isUrgent
                              ? "linear-gradient(135deg, #FF6B6B, #E05555)"
                              : "linear-gradient(135deg, #F2D15A, #D4AF37)",
                            color: isUrgent ? "#fff" : "#1A1A1A",
                          }}
                        >
                          <HeartHandshake size={18} />
                        </div>
                      }
                    />
                  </motion.div>
                );
              })
            )}

            {/* Urgent Needs Nearby */}
            <div className="mt-2">
              <SectionHeader title="Urgent Needs Nearby" />
            </div>
            <div className="flex flex-col gap-4">
              {pullRequests
                .filter(pr => pr.status === "open" && ["emergency","urgent","moderate"].includes(pr.urgency ?? ""))
                .slice(0, 3)
                .map((pr) => (
                  <motion.div key={pr.id} variants={fadeInUp}>
                    <LightCard className="p-4 flex flex-col gap-3 border-l-4 border-l-color-urgent relative overflow-hidden">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white/80 overflow-hidden border border-white/60 flex items-center justify-center font-bold text-accent-gold-dark">
                            {pr.ngoAvatar ? <img src={pr.ngoAvatar} alt={pr.ngoName} className="w-full h-full object-cover" /> : pr.ngoName[0]}
                          </div>
                          <div>
                            <h3 className="text-h3 leading-tight">{pr.ngoName}</h3>
                            <p className="text-caption text-text-muted mt-0.5 flex items-center gap-1">
                              <MapPin size={10} /> {pr.distance} km away
                            </p>
                          </div>
                        </div>
                        {/* Inline Accept Button at top right */}
                        <motion.button
                          {...tapBounce}
                          onClick={() => handleAcceptRequest(pr.id)}
                          className="w-10 h-10 rounded-full text-white shadow-sm flex items-center justify-center pointer-events-auto"
                          style={{
                            background: "linear-gradient(135deg, #9BC84A, #6A9E2B)",
                            boxShadow: "0 4px 12px rgba(107,158,43,0.30)",
                          }}
                        >
                          <CheckCircle2 size={18} />
                        </motion.button>
                      </div>
                      
                      <p className="text-body text-text-secondary leading-relaxed line-clamp-2 pr-12">
                        {pr.message}
                      </p>
                      
                      <div className="flex justify-between items-center mt-1">
                        <span className="bg-color-urgent/10 text-color-urgent text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          {pr.urgency}
                        </span>
                        <span className="text-caption font-bold text-text-primary bg-black/5 px-3 py-1.5 rounded-lg text-center">
                          {pr.servingsNeeded} servings needed
                        </span>
                      </div>
                    </LightCard>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}

        {/* Bottom padding */}
        <div className="h-8" />
      </div>
    </ScreenWrapper>
  );
}
