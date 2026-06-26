"use client";

import { useState, useRef, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { Store, MapPin, Navigation } from "lucide-react";

export function ShopkeeperSetup() {
  const setScreen = useAppStore((s) => s.setScreen);
  const saveShopProfile = useAppStore((s) => s.saveShopProfile);
  const completeSetup = useAppStore((s) => s.completeSetup);

  const [shopName, setShopName] = useState("");
  const [location, setLocation] = useState("");
  
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleGo = () => {
    if (shopName && location) {
      saveShopProfile({
        shopName,
        address: location,
        businessType: "Grocery", // Default fallback
      });
      completeSetup();
      setScreen("shopDashboard");
    }
  };

  const isFormValid = shopName.trim().length > 0 && location.trim().length > 0;

  return (
    <div className="flex flex-col h-full bg-[#F7F5F0] px-8 py-8 justify-center items-center relative">
      <div className="w-full flex flex-col mt-auto mb-auto max-w-sm">
        
        <h1 className="mt-6 text-[28px] font-bold text-[#0A0A0A] text-center" style={{ fontFamily: "var(--font-outfit)" }}>
          List your surplus
        </h1>
        <p className="mt-2 text-[15px] text-[#4A4A4A] text-center" style={{ fontFamily: "var(--font-jakarta)" }}>
          Recover costs while reducing waste.
        </p>

        <div className="mt-8 flex flex-col gap-4">
          {/* SHOP NAME INPUT */}
          <div className="relative">
            <Store size={18} color="#8A8A8A" className="absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              ref={inputRef}
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              placeholder="Shop name"
              className="w-full h-[56px] rounded-[16px] border-[1.5px] border-[#E8E8E4] bg-white pl-12 pr-4 text-[16px] font-medium text-[#0A0A0A] focus:border-[#7C3AED] focus:outline-none"
              style={{ fontFamily: "var(--font-outfit)" }}
            />
          </div>

          {/* LOCATION INPUT */}
          <div>
            <div className="relative">
              <MapPin size={18} color="#8A8A8A" className="absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="w-full h-[56px] rounded-[16px] border-[1.5px] border-[#E8E8E4] bg-white pl-12 pr-4 text-[16px] font-medium text-[#0A0A0A] focus:border-[#7C3AED] focus:outline-none"
                style={{ fontFamily: "var(--font-outfit)" }}
              />
            </div>
            <button 
              onClick={() => setLocation("Current Location")}
              className="mt-2 flex items-center gap-1.5 rounded-full border border-[#DDD6FE] bg-[#F5F3FF] px-3 py-1.5"
            >
              <Navigation size={14} color="#7C3AED" />
              <span className="text-[13px] font-semibold text-[#7C3AED]" style={{ fontFamily: "var(--font-jakarta)" }}>Use current location</span>
            </button>
          </div>
        </div>

        {/* OPEN SHOP BUTTON */}
        <button
          onClick={handleGo}
          disabled={!isFormValid}
          className={`mt-8 flex h-[56px] w-full items-center justify-center rounded-full text-[17px] font-semibold text-white transition-all ${
            isFormValid
              ? "bg-[#7C3AED] shadow-[0_4px_20px_rgba(124,58,237,0.4)]"
              : "bg-[#E8E8E4] text-[#8A8A8A]"
          }`}
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Open Shop
        </button>
      </div>
    </div>
  );
}
