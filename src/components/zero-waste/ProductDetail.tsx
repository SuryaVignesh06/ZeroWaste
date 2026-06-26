"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { slideInRight } from "@/lib/animations";
import { 
  ArrowLeft, MapPin, Clock, Tag, HandHeart, Info, Navigation
} from "lucide-react";
import type { Listing } from "@/lib/types";

export function ProductDetail() {
  const { setScreen } = useAppStore();
  
  // Hardcoded mock data for now, in a real app we'd pass the listing via state or URL
  const mockListing: Listing = {
    id: "sale_1", providerId: "p_3", providerName: "FreshMart", providerType: "shop",
    providerLocation: { lat: 12.965, lng: 77.600, address: "123 Main St, 1km away" },
    mode: "sell", name: "Organic Tomatoes", category: "Vegetables",
    photos: ["https://images.unsplash.com/photo-1592924357228-91a4daadcfea"],
    mrp: 80, discountPercent: 50, discountPrice: 40, stock: 5,
    expiryDate: new Date(Date.now() + 24 * 60 * 60 * 1000), daysLeft: 1,
    urgencyLevel: "high", availableFrom: new Date(), availableUntil: new Date(Date.now() + 10 * 60 * 60 * 1000),
    specialInstructions: "Show QR code at the billing counter.", status: "active", views: 12, createdAt: new Date()
  };

  return (
    <div className="flex h-full flex-col bg-[#F7F5F0]">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-12 bg-gradient-to-b from-black/50 to-transparent">
        <button
          onClick={() => setScreen("recipientHome")}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md"
        >
          <ArrowLeft size={20} className="text-white" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Image Header */}
        <div className="relative h-[300px] w-full">
          <img src={mockListing.photos[0]} className="w-full h-full object-cover" />
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm" style={{ color: mockListing.mode === "donate" ? "#1A6B3C" : "#D97706" }}>
            {mockListing.mode === "donate" ? "FREE" : `${mockListing.discountPercent}% OFF`}
          </div>
        </div>

        <motion.div variants={slideInRight} initial="initial" animate="animate" className="px-6 py-6 flex flex-col gap-6">
          {/* Title & Price */}
          <div>
            <h1 className="text-2xl font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>{mockListing.name}</h1>
            <p className="text-[#8A8A8A] mt-1 font-medium">{mockListing.providerName}</p>
            
            <div className="flex items-end gap-3 mt-4">
              {mockListing.mode === "sell" ? (
                <>
                  <span className="text-[#0A0A0A] font-bold text-3xl" style={{ fontFamily: "var(--font-outfit)" }}>₹{mockListing.discountPrice}</span>
                  <span className="text-[#8A8A8A] text-lg line-through pb-0.5">₹{mockListing.mrp}</span>
                </>
              ) : (
                <span className="bg-[#F0F7F2] text-[#1A6B3C] px-4 py-2 rounded-xl font-bold text-lg">
                  {mockListing.servings} Servings Available
                </span>
              )}
            </div>
          </div>

          {/* Details Box */}
          <div className="bg-white rounded-[24px] p-5 shadow-sm border border-[#E8E8E4] space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="text-[#8A8A8A] mt-0.5 shrink-0" size={20} />
              <div className="flex-1">
                <p className="text-[15px] font-semibold text-[#0A0A0A]">Pickup Location</p>
                <p className="text-[#4A4A4A] text-sm mt-0.5">{mockListing.providerLocation.address}</p>
              </div>
              <button className="h-10 w-10 rounded-full bg-[#F7F5F0] flex items-center justify-center shrink-0">
                <Navigation size={18} className="text-[#0A0A0A]" />
              </button>
            </div>
            
            <div className="h-px w-full bg-[#E8E8E4]" />

            <div className="flex items-start gap-3">
              <Clock className="text-[#8A8A8A] mt-0.5 shrink-0" size={20} />
              <div>
                <p className="text-[15px] font-semibold text-[#0A0A0A]">Available Until</p>
                <p className="text-[#4A4A4A] text-sm mt-0.5">Today at 8:00 PM</p>
              </div>
            </div>

            <div className="h-px w-full bg-[#E8E8E4]" />

            <div className="flex items-start gap-3">
              <Info className="text-[#8A8A8A] mt-0.5 shrink-0" size={20} />
              <div>
                <p className="text-[15px] font-semibold text-[#0A0A0A]">Instructions</p>
                <p className="text-[#4A4A4A] text-sm mt-0.5">{mockListing.specialInstructions}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-[#E8E8E4]">
        <button
          onClick={() => setScreen("reserveProduct")}
          className="h-[56px] w-full rounded-full text-[17px] font-bold text-white transition-all relative overflow-hidden"
          style={{ 
            background: mockListing.mode === "donate" ? "#1A6B3C" : "#D97706",
            fontFamily: "var(--font-outfit)",
            boxShadow: mockListing.mode === "donate" ? "0 8px 24px rgba(26,107,60,0.25)" : "0 8px 24px rgba(217,119,6,0.25)"
          }}
        >
          {mockListing.mode === "donate" ? "Reserve Food" : "Claim Deal"}
        </button>
      </div>
    </div>
  );
}
