"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { MapPin, Clock, Building2, User, ChevronRight, Package, Flame } from "lucide-react";

const MOCK_REQUESTS = [
  {
    id: "r1",
    donor: "Raj Marriage Hall",
    ngo: "Robin Hood Army",
    meals: 80,
    type: "Freshly Cooked Meals",
    distance: "2.4 km",
    points: 150,
    urgent: true,
  },
  {
    id: "r2",
    donor: "FreshMart Supermarket",
    ngo: "Hope Foundation",
    meals: 20,
    type: "Packaged Goods",
    distance: "4.1 km",
    points: 80,
    urgent: false,
  },
  {
    id: "r3",
    donor: "Anita Sharma",
    ngo: "Smile India",
    meals: 15,
    type: "Home Cooked",
    distance: "5.5 km",
    points: 60,
    urgent: false,
  }
];

export function VolunteerHome() {
  const setScreen = useAppStore((s) => s.setScreen);
  const profile = useAppStore((s) => s.volunteerProfile);

  const handleAccept = (req: any) => {
    // In a real app, we'd save the active delivery to state here
    setScreen("volunteerMap" as any);
  };

  return (
    <div className="flex h-full flex-col bg-[#F7F5F0]">
      {/* Header */}
      <div className="bg-white px-6 pb-4 pt-12 shadow-sm rounded-b-[32px] z-10 relative">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[24px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
              Hello, {profile?.name?.split(" ")[0] || "Volunteer"}
            </h1>
            <div className="mt-1 flex items-center gap-1.5 rounded-full bg-[#FFFBEB] px-3 py-1 w-fit border border-[#FEF3C7]">
              <div className="h-2 w-2 rounded-full bg-[#D97706] animate-pulse" />
              <span className="text-[12px] font-bold text-[#D97706]" style={{ fontFamily: "var(--font-jakarta)" }}>
                You are online
              </span>
            </div>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5E6C8] border-2 border-[#D97706]">
            <span className="text-[16px] font-bold text-[#D97706]" style={{ fontFamily: "var(--font-outfit)" }}>
              {profile?.name?.charAt(0) || "V"}
            </span>
          </div>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto px-6 py-6 pb-32">
        <h2 className="mb-4 text-[18px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
          Available Pickups Near You
        </h2>

        <div className="flex flex-col gap-5">
          {MOCK_REQUESTS.map((req, i) => (
            <motion.div
              key={req.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-[24px] bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.04)] border ${
                req.urgent ? "border-[#FEF2F2]" : "border-[#E8E8E4]"
              }`}
            >
              {req.urgent && (
                <div className="absolute top-0 left-0 w-full bg-[#FEF2F2] py-1.5 px-5 flex items-center gap-2 border-b border-[#FEE2E2]">
                  <Flame size={14} className="text-[#EF4444]" />
                  <span className="text-[11px] font-bold text-[#EF4444] uppercase tracking-wider">Urgent Pickup Required</span>
                </div>
              )}

              <div className={`flex justify-between items-start ${req.urgent ? "mt-8" : ""}`}>
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F7F2]">
                    <Package size={20} className="text-[#1A6B3C]" />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
                      {req.meals} Meals
                    </h3>
                    <p className="text-[13px] text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>{req.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[20px] font-bold text-[#D97706]" style={{ fontFamily: "var(--font-outfit)" }}>
                    +{req.points}
                  </span>
                  <p className="text-[11px] font-bold text-[#8A8A8A] uppercase">Points</p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-4 relative">
                {/* Connecting Line */}
                <div className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-dashed border-l-2 border-dashed border-[#E8E8E4]" />

                {/* Pickup Location */}
                <div className="flex items-start gap-3 relative z-10">
                  <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white border-2 border-[#0A0A0A]">
                    <div className="h-2 w-2 rounded-full bg-[#0A0A0A]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[#8A8A8A] uppercase tracking-wider mb-0.5" style={{ fontFamily: "var(--font-jakarta)" }}>Pickup From</p>
                    <p className="text-[15px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>{req.donor}</p>
                    <p className="text-[13px] text-[#4A4A4A] mt-0.5">Approx. {req.distance} away</p>
                  </div>
                </div>

                {/* Dropoff Location */}
                <div className="flex items-start gap-3 relative z-10">
                  <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#1E3A8A] border-2 border-[#1E3A8A]">
                    <Building2 size={12} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[#8A8A8A] uppercase tracking-wider mb-0.5" style={{ fontFamily: "var(--font-jakarta)" }}>Deliver To</p>
                    <p className="text-[15px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>{req.ngo}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleAccept(req)}
                className={`mt-6 flex h-12 w-full items-center justify-center rounded-[16px] text-[15px] font-bold text-white transition-transform active:scale-[0.98] ${
                  req.urgent ? "bg-[#EF4444]" : "bg-[#D97706]"
                }`}
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Accept Delivery
              </button>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
