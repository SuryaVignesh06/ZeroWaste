"use client";

import { useState, useRef, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { User, MapPin, Navigation } from "lucide-react";
import { motion } from "framer-motion";

export function VolunteerSetup() {
  const setScreen = useAppStore((s) => s.setScreen);
  const saveVolunteerProfile = useAppStore((s) => s.saveVolunteerProfile);
  const completeSetup = useAppStore((s) => s.completeSetup);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [vehicleType, setVehicleType] = useState<"Walking" | "Bicycle" | "Motorbike" | "Car">("Motorbike");
  const [consent, setConsent] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleGo = () => {
    if (name && location && consent) {
      saveVolunteerProfile({
        name,
        address: location,
        vehicle: vehicleType,
        availability: [], // Not asked anymore
      });
      completeSetup();
      setScreen("volunteerFeed");
    }
  };

  const isFormValid = name.trim().length > 0 && location.trim().length > 0 && consent;

  return (
    <div className="flex flex-col h-full bg-[#F7F5F0] px-8 py-8 justify-center items-center relative">
      <div className="w-full flex flex-col mt-auto mb-auto max-w-sm">
        
        <h1 className="mt-6 text-[28px] font-bold text-[#0A0A0A] text-center" style={{ fontFamily: "var(--font-outfit)" }}>
          Ready to make a difference?
        </h1>
        <p className="mt-2 text-[15px] text-[#4A4A4A] text-center" style={{ fontFamily: "var(--font-jakarta)" }}>
          Join the rescue crew.
        </p>

        <div className="mt-8 flex flex-col gap-4">
          {/* NAME INPUT */}
          <div className="relative">
            <User size={18} color="#8A8A8A" className="absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              ref={inputRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full h-[56px] rounded-[16px] border-[1.5px] border-[#E8E8E4] bg-white pl-12 pr-4 text-[16px] font-medium text-[#0A0A0A] focus:border-[#D97706] focus:outline-none"
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
                className="w-full h-[56px] rounded-[16px] border-[1.5px] border-[#E8E8E4] bg-white pl-12 pr-4 text-[16px] font-medium text-[#0A0A0A] focus:border-[#D97706] focus:outline-none"
                style={{ fontFamily: "var(--font-outfit)" }}
              />
            </div>
            <button 
              onClick={() => setLocation("Current Location")}
              className="mt-2 flex items-center gap-1.5 rounded-full border border-[#FDE68A] bg-[#FFFBEB] px-3 py-1.5"
            >
              <Navigation size={14} color="#D97706" />
              <span className="text-[13px] font-semibold text-[#D97706]" style={{ fontFamily: "var(--font-jakarta)" }}>Use current location</span>
            </button>
          </div>

          {/* VEHICLE TYPE */}
          <div className="mt-2">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {(["Walking", "Bicycle", "Motorbike", "Car"] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setVehicleType(type)}
                  className={`shrink-0 rounded-full px-4 py-2 text-[14px] font-semibold transition-colors border ${
                    vehicleType === type
                      ? "border-[#D97706] bg-[#FFFBEB] text-[#D97706]"
                      : "border-[#E8E8E4] bg-white text-[#4A4A4A]"
                  }`}
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          
          {/* CONSENT TOGGLE */}
          <div className="mt-2">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setConsent(!consent)}
                className={`relative flex h-7 w-12 items-center rounded-full p-1 transition-colors ${
                  consent ? "bg-[#D97706]" : "bg-[#E8E8E4]"
                }`}
              >
                <motion.div
                  className="h-5 w-5 rounded-full bg-white shadow-sm"
                  layout
                  animate={{ x: consent ? 20 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
              <span className="text-[14px] font-medium text-[#0A0A0A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                I am contributing as community service
              </span>
            </div>
            <p className="mt-1 ml-[60px] text-[12px] text-[#8A8A8A] underline cursor-pointer" style={{ fontFamily: "var(--font-jakarta)" }}>
              Read guidelines
            </p>
          </div>
        </div>

        {/* JOIN BUTTON */}
        <button
          onClick={handleGo}
          disabled={!isFormValid}
          className={`mt-8 flex h-[56px] w-full items-center justify-center rounded-full text-[17px] font-semibold text-white transition-all ${
            isFormValid
              ? "bg-[#D97706] shadow-[0_4px_20px_rgba(217,119,6,0.4)]"
              : "bg-[#E8E8E4] text-[#8A8A8A]"
          }`}
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Join as Volunteer
        </button>
      </div>
    </div>
  );
}
