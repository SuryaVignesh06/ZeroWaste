"use client";

import { useState, useEffect, useRef } from "react";
import { useAppStore } from "@/lib/store";
import { User, MapPin, Navigation, Leaf } from "lucide-react";

export function UserSetup() {
  const setScreen = useAppStore((s) => s.setScreen);
  const saveUserProfile = useAppStore((s) => s.saveUserProfile);
  const completeSetup = useAppStore((s) => s.completeSetup);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus on mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleGo = () => {
    if (name) {
      saveUserProfile({
        userName: name,
        userLocationText: location || "Bangalore",
      });
      completeSetup();
      setScreen("userHome");
    }
  };

  const isFormValid = name.trim().length > 0;

  return (
    <div className="flex flex-col h-full bg-[#F7F5F0] px-8 py-8 justify-center items-center relative">
      <div className="w-full flex flex-col mt-auto mb-auto max-w-sm">
        
        <div className="flex justify-center w-full">
          <Leaf size={48} color="#1A6B3C" />
        </div>

        <h1 className="mt-6 text-[28px] font-bold text-[#0A0A0A] text-center" style={{ fontFamily: "var(--font-outfit)" }}>
          What should we call you?
        </h1>
        <p className="mt-2 text-[15px] text-[#4A4A4A] text-center" style={{ fontFamily: "var(--font-jakarta)" }}>
          Just two things and you are in.
        </p>

        {/* NAME INPUT */}
        <div className="mt-8 relative">
          <User size={18} color="#8A8A8A" className="absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full h-[56px] rounded-[16px] border-[1.5px] border-[#E8E8E4] bg-white pl-12 pr-4 text-[16px] font-medium text-[#0A0A0A] focus:border-[#1A6B3C] focus:outline-none"
            style={{ fontFamily: "var(--font-outfit)" }}
          />
        </div>

        {/* LOCATION INPUT */}
        <div className="mt-4">
          <div className="relative">
            <MapPin size={18} color="#8A8A8A" className="absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Your area"
              className="w-full h-[56px] rounded-[16px] border-[1.5px] border-[#E8E8E4] bg-white pl-12 pr-4 text-[16px] font-medium text-[#0A0A0A] focus:border-[#1A6B3C] focus:outline-none"
              style={{ fontFamily: "var(--font-outfit)" }}
            />
          </div>
          <button 
            onClick={() => setLocation("Current Location")}
            className="mt-2 flex items-center gap-1.5 rounded-full border border-[#C8E8D0] bg-[#F0F7F2] px-3 py-1.5"
          >
            <Navigation size={14} color="#1A6B3C" />
            <span className="text-[13px] font-semibold text-[#1A6B3C]" style={{ fontFamily: "var(--font-jakarta)" }}>Use current location</span>
          </button>
        </div>

        {/* LETS GO BUTTON */}
        <button
          onClick={handleGo}
          disabled={!isFormValid}
          className={`mt-8 flex h-[56px] w-full items-center justify-center rounded-full text-[17px] font-semibold text-white transition-all ${
            isFormValid
              ? "bg-[#1A6B3C] shadow-[0_4px_20px_rgba(26,107,60,0.4)]"
              : "bg-[#E8E8E4] text-[#8A8A8A]"
          }`}
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Let's Go
        </button>
      </div>
    </div>
  );
}
