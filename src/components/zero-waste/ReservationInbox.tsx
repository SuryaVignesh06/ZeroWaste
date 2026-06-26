"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { fadeUp, staggerContainer, cardVariants } from "@/lib/animations";
import { 
  ArrowLeft, QrCode, CheckCircle2, XCircle, User, 
  MapPin, Clock, HandHeart, Bike, AlertCircle, Camera, X, Building2
} from "lucide-react";
import type { Reservation, FoodRequest } from "@/lib/types";

export function ReservationInbox() {
  const { providerMode, setScreen, impactPoints, addImpactPoints } = useAppStore();
  const [activeTab, setActiveTab] = useState<"pending" | "completed">("pending");
  const [showScanner, setShowScanner] = useState(false);
  const [scanResult, setScanResult] = useState<"success" | "invalid" | null>(null);

  // Mock Data
  const mockDonationRequests: FoodRequest[] = [
    {
      id: "req_1",
      receiverId: "ngo_1",
      receiverType: "ngo",
      receiverName: "Helping Hands NGO",
      location: { lat: 12.9716, lng: 77.5946, address: "2 km away" },
      servingsNeeded: 50,
      urgency: "today",
      dietaryNotes: "Vegetarian only",
      specialInstructions: "",
      status: "open",
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 86400000)
    },
    {
      id: "req_2",
      receiverId: "rec_1",
      receiverType: "recipient",
      receiverName: "Priya (Individual)",
      location: { lat: 12.9716, lng: 77.5946, address: "500m away" },
      servingsNeeded: 4,
      urgency: "urgent",
      dietaryNotes: "",
      specialInstructions: "Need it by 8 PM",
      status: "open",
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 86400000)
    }
  ];

  const mockReservations: Reservation[] = [
    {
      id: "res_1",
      userId: "rec_1",
      userType: "recipient",
      listingId: "list_1",
      productName: "Whole Wheat Bread",
      providerName: "Anand Bakery",
      providerAddress: "123 Main St",
      discountPrice: 20,
      mrp: 40,
      reservedAt: new Date(),
      expiresAt: new Date(Date.now() + 30 * 60000), // expires in 30 mins
      status: "active",
      qrCode: "ZW-123"
    },
    {
      id: "res_2",
      userId: "rec_2",
      userType: "recipient",
      listingId: "list_2",
      productName: "Vegetable Puff",
      providerName: "Anand Bakery",
      providerAddress: "123 Main St",
      discountPrice: 15,
      mrp: 30,
      reservedAt: new Date(Date.now() - 40 * 60000), 
      expiresAt: new Date(Date.now() - 10 * 60000), 
      status: "expired",
      qrCode: "ZW-124"
    }
  ];

  const handleSimulateScan = () => {
    // Simulate successful scan
    setTimeout(() => {
      setScanResult("success");
      setTimeout(() => {
        setShowScanner(false);
        setScanResult(null);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="flex flex-1 flex-col bg-[#F7F5F0]">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-4 shadow-sm relative z-20">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
            {providerMode === "donate" ? "Donation Requests" : "Reservations"}
          </h1>
          {providerMode === "sell" && (
            <button 
              onClick={() => setShowScanner(true)}
              className="h-10 w-10 rounded-full bg-[#FFF7ED] flex items-center justify-center text-[#D97706]"
            >
              <QrCode size={20} />
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex rounded-full bg-[#F0F0F0] p-1">
          <button
            onClick={() => setActiveTab("pending")}
            className={`flex-1 rounded-full py-2 text-sm font-semibold transition-all ${
              activeTab === "pending" ? "bg-white text-[#0A0A0A] shadow-sm" : "text-[#8A8A8A]"
            }`}
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            {providerMode === "donate" ? "Pending" : "Active"}
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`flex-1 rounded-full py-2 text-sm font-semibold transition-all ${
              activeTab === "completed" ? "bg-white text-[#0A0A0A] shadow-sm" : "text-[#8A8A8A]"
            }`}
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6">
        {providerMode === "donate" ? (
          // DONATION REQUESTS
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="flex flex-col gap-4">
            {activeTab === "pending" ? mockDonationRequests.map((req) => (
              <motion.div key={req.id} variants={cardVariants} className="bg-white rounded-[20px] p-5 shadow-sm border border-[#E8E8E4]">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-[#F0F7F2] flex items-center justify-center">
                      {req.receiverType === "ngo" ? <Building2 size={14} className="text-[#1A6B3C]" /> : <User size={14} className="text-[#1A6B3C]" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0A0A0A] text-[15px]" style={{ fontFamily: "var(--font-outfit)" }}>{req.receiverName}</h3>
                      <p className="text-[#8A8A8A] text-xs font-medium">{req.location.address}</p>
                    </div>
                  </div>
                  {req.urgency === "urgent" && (
                    <span className="bg-[#FEF2F2] text-[#DC2626] text-[10px] font-bold px-2 py-1 rounded-md">URGENT</span>
                  )}
                </div>

                <div className="bg-[#F7F5F0] rounded-xl p-3 mb-4">
                  <p className="text-[#0A0A0A] font-semibold text-sm">Needs {req.servingsNeeded} servings</p>
                  {(req.dietaryNotes || req.specialInstructions) && (
                    <p className="text-[#4A4A4A] text-[13px] mt-1 italic">
                      "{req.dietaryNotes} {req.specialInstructions}"
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 py-2.5 rounded-full border border-[#E8E8E4] text-[#4A4A4A] font-semibold text-sm">
                    Decline
                  </button>
                  <button className="flex-1 py-2.5 rounded-full bg-[#1A6B3C] text-white font-bold text-sm shadow-[0_4px_12px_rgba(26,107,60,0.2)]">
                    Accept Request
                  </button>
                </div>
              </motion.div>
            )) : (
              <div className="text-center py-10">
                <CheckCircle2 size={40} className="text-[#C0C0C0] mx-auto mb-3" />
                <p className="text-[#8A8A8A] font-medium">No completed requests yet.</p>
              </div>
            )}
          </motion.div>
        ) : (
          // SHOP RESERVATIONS
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="flex flex-col gap-4">
            {activeTab === "pending" ? mockReservations.filter(r => r.status === "active").map((res) => (
              <motion.div key={res.id} variants={cardVariants} className="bg-white rounded-[20px] p-5 shadow-sm border border-[#E8E8E4]">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-[#0A0A0A] text-lg leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>{res.productName}</h3>
                    <p className="text-[#8A8A8A] text-sm mt-0.5">Reserved by {res.userId === "rec_1" ? "Priya" : "Customer"}</p>
                  </div>
                  <div className="bg-[#FFF7ED] text-[#D97706] px-3 py-1.5 rounded-lg text-center">
                    <p className="text-[10px] font-bold uppercase">Pay at Store</p>
                    <p className="font-bold text-lg leading-none">₹{res.discountPrice}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[#D97706] bg-[#FFF7ED] p-2 rounded-lg mb-4">
                  <Clock size={16} />
                  <span className="text-sm font-semibold">Expires in 15 mins</span>
                </div>

                <button 
                  onClick={() => setShowScanner(true)}
                  className="w-full py-3 rounded-full bg-[#D97706] text-white font-bold text-[15px] shadow-[0_4px_12px_rgba(217,119,6,0.2)] flex items-center justify-center gap-2"
                >
                  <QrCode size={18} />
                  Scan Customer QR
                </button>
              </motion.div>
            )) : mockReservations.filter(r => r.status === "expired").map((res) => (
              <motion.div key={res.id} variants={cardVariants} className="bg-white rounded-[20px] p-5 shadow-sm border border-[#E8E8E4] opacity-60">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-[#0A0A0A] text-lg leading-tight line-through" style={{ fontFamily: "var(--font-outfit)" }}>{res.productName}</h3>
                    <p className="text-[#8A8A8A] text-sm mt-0.5">Reserved by Customer</p>
                  </div>
                  <span className="bg-[#F0F0F0] text-[#8A8A8A] text-[10px] font-bold px-2 py-1 rounded-md uppercase">Expired</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* QR Scanner Modal overlay */}
      <AnimatePresence>
        {showScanner && (
          <motion.div 
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-black flex flex-col"
          >
            <div className="flex items-center justify-between p-6">
              <button onClick={() => setShowScanner(false)} className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                <X size={20} color="white" />
              </button>
              <h2 className="text-white font-bold text-lg">Scan QR Code</h2>
              <div className="w-10" />
            </div>

            <div className="flex-1 relative flex items-center justify-center p-8">
              {/* Fake camera view */}
              <div className="absolute inset-0 bg-[#1A1A1A]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-dashed border-white/50 rounded-3xl" />
                <motion.div 
                  animate={{ top: ["25%", "75%", "25%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute left-1/2 -translate-x-1/2 w-64 h-1 bg-[#D97706] shadow-[0_0_15px_#D97706]"
                />
              </div>

              {scanResult === "success" && (
                <motion.div 
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute z-10 bg-white p-6 rounded-3xl flex flex-col items-center shadow-2xl text-center"
                >
                  <div className="h-16 w-16 bg-[#F0FDF4] rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 size={32} className="text-[#22C55E]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0A0A0A]">Verified!</h3>
                  <p className="text-[#4A4A4A] mt-1 text-sm">Reservation ZW-123 is valid.</p>
                  <p className="text-[#D97706] font-bold text-xl mt-3">Collect ₹20</p>
                </motion.div>
              )}
            </div>

            <div className="p-8 bg-black">
              <button 
                onClick={handleSimulateScan}
                className="w-full py-4 rounded-full bg-white text-[#0A0A0A] font-bold text-lg"
              >
                Simulate Successful Scan
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
