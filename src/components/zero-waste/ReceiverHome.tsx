"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { fadeUp, staggerContainer, cardVariants } from "@/lib/animations";
import { 
  Building2, User, HandHeart, MapPin, Search, Tag, Clock, ChevronRight
} from "lucide-react";
import type { Listing } from "@/lib/types";

export function ReceiverHome() {
  const { receiverType, setScreen, ngoProfile, recipientProfile } = useAppStore();
  
  // Name derivation based on exact receiver type
  const displayName = receiverType === "ngo" 
    ? (ngoProfile?.orgName || "Helping Hands NGO") 
    : (recipientProfile?.displayName || "Priya");

  // Mock data for the view
  const mockDonations: Listing[] = [
    {
      id: "don_1", providerId: "p_1", providerName: "Taj Hotel", providerType: "restaurant",
      providerLocation: { lat: 12.971, lng: 77.594, address: "MG Road, 2km away" },
      mode: "donate", name: "Buffet Surplus", category: "Cooked Meal",
      photos: ["https://images.unsplash.com/photo-1555939594-58d7cb561ad1"],
      servings: 45, condition: "freshly_cooked",
      expiryDate: new Date(Date.now() + 4 * 60 * 60 * 1000), daysLeft: 0,
      urgencyLevel: "urgent", availableFrom: new Date(), availableUntil: new Date(),
      specialInstructions: "", status: "active", views: 0, createdAt: new Date()
    },
    {
      id: "don_2", providerId: "p_2", providerName: "Rahul", providerType: "individual",
      providerLocation: { lat: 12.972, lng: 77.595, address: "Indiranagar, 5km away" },
      mode: "donate", name: "Home Cooked Meal", category: "Cooked Meal",
      photos: ["https://images.unsplash.com/photo-1546069901-ba9599a7e63c"],
      servings: 3, condition: "good_condition",
      expiryDate: new Date(Date.now() + 12 * 60 * 60 * 1000), daysLeft: 0,
      urgencyLevel: "high", availableFrom: new Date(), availableUntil: new Date(),
      specialInstructions: "", status: "active", views: 0, createdAt: new Date()
    }
  ];

  const mockSales: Listing[] = [
    {
      id: "sale_1", providerId: "p_3", providerName: "FreshMart", providerType: "shop",
      providerLocation: { lat: 12.971, lng: 77.594, address: "1km away" },
      mode: "sell", name: "Organic Tomatoes", category: "Vegetables",
      photos: ["https://images.unsplash.com/photo-1592924357228-91a4daadcfea"],
      mrp: 80, discountPercent: 50, discountPrice: 40, stock: 5,
      expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), daysLeft: 2,
      urgencyLevel: "high", availableFrom: new Date(), availableUntil: new Date(),
      specialInstructions: "", status: "active", views: 0, createdAt: new Date()
    }
  ];

  // Filter based on receiver type logic
  const displayedDonations = receiverType === "ngo" 
    ? mockDonations.filter(d => (d.servings || 0) >= 10) // NGOs see bulk
    : mockDonations.filter(d => (d.servings || 0) < 10); // Recipients see individual meals

  return (
    <div className="flex flex-1 flex-col bg-[#F7F5F0] overflow-y-auto pb-24">
      {/* Dynamic Header */}
      <motion.div 
        className="relative px-6 pt-12 pb-8 overflow-hidden rounded-b-[32px] shadow-sm"
        style={{
          background: receiverType === "ngo" 
            ? "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)"
            : "linear-gradient(135deg, #86198F 0%, #D946EF 100%)"
        }}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      >
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm font-medium" style={{ fontFamily: "var(--font-jakarta)" }}>Hello,</p>
            <h1 className="text-2xl font-bold text-white mt-1" style={{ fontFamily: "var(--font-outfit)" }}>{displayName}</h1>
          </div>
          <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
            {receiverType === "ngo" ? <Building2 color="white" /> : <User color="white" />}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative z-10 mt-6 flex h-[48px] items-center gap-3 rounded-full bg-white/20 px-4 backdrop-blur-md border border-white/30">
          <Search size={18} className="text-white" />
          <input
            type="text"
            placeholder="Search food, shops, or categories..."
            className="flex-1 bg-transparent text-[15px] text-white placeholder-white/70 outline-none"
            style={{ fontFamily: "var(--font-jakarta)" }}
          />
        </div>

        {/* Decorative elements */}
        <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
      </motion.div>

      <motion.div 
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="px-5 mt-6 flex flex-col gap-6"
      >
        {/* REQUEST CTA */}
        <motion.button 
          variants={cardVariants}
          onClick={() => setScreen("requestFood")}
          className="w-full relative overflow-hidden rounded-[24px] p-5 text-left flex items-center justify-between"
          style={{
            background: receiverType === "ngo" ? "#1E3A8A" : "#86198F",
            boxShadow: receiverType === "ngo" ? "0 8px 24px rgba(30,58,138,0.2)" : "0 8px 24px rgba(134,25,143,0.2)"
          }}
        >
          <div className="relative z-10 text-white">
            <h3 className="font-bold text-lg" style={{ fontFamily: "var(--font-outfit)" }}>
              Request Food
            </h3>
            <p className="text-white/80 text-sm mt-1" style={{ fontFamily: "var(--font-jakarta)" }}>
              {receiverType === "ngo" ? "Post a requirement for bulk feeding" : "Need food right now? Let us know."}
            </p>
          </div>
          <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 z-10">
            <HandHeart color="white" />
          </div>
          <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-white/10 to-transparent" />
        </motion.button>

        {/* DONATIONS SECTION */}
        <motion.div variants={fadeUp}>
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-lg font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
              {receiverType === "ngo" ? "Bulk Donations" : "Active Donations"}
            </h2>
            <button 
              onClick={() => setScreen("browseListings")}
              className="text-[#1A6B3C] text-sm font-semibold" 
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              See Map
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar -mx-5 px-5">
            {displayedDonations.map(donation => (
              <div 
                key={donation.id} 
                onClick={() => setScreen("productDetail")}
                className="min-w-[240px] bg-white rounded-[24px] p-3 shadow-sm border border-[#E8E8E4] snap-start"
              >
                <div className="h-[120px] rounded-[16px] overflow-hidden relative mb-3">
                  <img src={donation.photos[0]} alt={donation.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-[#1A6B3C] flex items-center gap-1">
                    <HandHeart size={12} /> Free
                  </div>
                </div>
                <h3 className="font-bold text-[#0A0A0A] text-[15px] leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>{donation.name}</h3>
                <p className="text-[#8A8A8A] text-[13px] mt-1 line-clamp-1">{donation.providerName}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-1 text-[#4A4A4A] text-xs">
                    <MapPin size={12} /> {donation.providerLocation.address.split(",")[0]}
                  </div>
                  <span className="bg-[#F0F7F2] text-[#1A6B3C] text-[11px] font-bold px-2 py-1 rounded-md">
                    {donation.servings} Servings
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* SHOPPING / DISCOUNTS SECTION */}
        <motion.div variants={fadeUp}>
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-lg font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
              Discounted Groceries
            </h2>
            <button 
              onClick={() => setScreen("browseListings")}
              className="text-[#D97706] text-sm font-semibold" 
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              View all
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {mockSales.map(sale => (
              <div 
                key={sale.id}
                onClick={() => setScreen("productDetail")}
                className="bg-white rounded-[20px] p-3 shadow-sm border border-[#E8E8E4] flex gap-3"
              >
                <div className="w-[80px] h-[80px] rounded-2xl overflow-hidden shrink-0 relative">
                  <img src={sale.photos[0]} alt={sale.name} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-[#D97706] text-white text-[10px] font-bold text-center py-0.5">
                    {sale.discountPercent}% OFF
                  </div>
                </div>
                <div className="flex flex-col justify-between py-1 flex-1">
                  <div>
                    <h3 className="font-bold text-[#0A0A0A] text-[15px] leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>{sale.name}</h3>
                    <p className="text-[#8A8A8A] text-[12px] mt-0.5">{sale.providerName} • {sale.providerLocation.address.split(",")[0]}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#0A0A0A] font-bold text-[15px]">₹{sale.discountPrice}</span>
                    <span className="text-[#8A8A8A] text-[12px] line-through">₹{sale.mrp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
