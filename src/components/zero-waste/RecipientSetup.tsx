"use client";

import { useState, useRef, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { User, MapPin, Navigation } from "lucide-react";

export function RecipientSetup() {
  const setScreen = useAppStore((s) => s.setScreen);
  const saveRecipientProfile = useAppStore((s) => s.saveRecipientProfile);
  const completeSetup = useAppStore((s) => s.completeSetup);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [dietary, setDietary] = useState<string[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleGo = () => {
    if (name && location) {
      saveRecipientProfile({
        name,
        address: location,
        familySize: 1, // Defaulting as not asked anymore
        dietary,
      });
      completeSetup();
      setScreen("recipientFeed");
    }
  };

  const isFormValid = name.trim().length > 0 && location.trim().length > 0;

  return (
    <div className="flex flex-col h-full bg-[#F7F5F0] px-8 py-8 justify-center items-center relative">
      <div className="w-full flex flex-col mt-auto mb-auto max-w-sm">
        
        <h1 className="mt-6 text-[28px] font-bold text-[#0A0A0A] text-center" style={{ fontFamily: "var(--font-outfit)" }}>
          Find food near you
        </h1>
        <p className="mt-2 text-[15px] text-[#4A4A4A] text-center" style={{ fontFamily: "var(--font-jakarta)" }}>
          Connect with local donors.
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
              className="w-full h-[56px] rounded-[16px] border-[1.5px] border-[#E8E8E4] bg-white pl-12 pr-4 text-[16px] font-medium text-[#0A0A0A] focus:border-[#E11D48] focus:outline-none"
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
                className="w-full h-[56px] rounded-[16px] border-[1.5px] border-[#E8E8E4] bg-white pl-12 pr-4 text-[16px] font-medium text-[#0A0A0A] focus:border-[#E11D48] focus:outline-none"
                style={{ fontFamily: "var(--font-outfit)" }}
              />
            </div>
            <button 
              onClick={() => setLocation("Current Location")}
              className="mt-2 flex items-center gap-1.5 rounded-full border border-[#FECDD3] bg-[#FFF1F2] px-3 py-1.5"
            >
              <Navigation size={14} color="#E11D48" />
              <span className="text-[13px] font-semibold text-[#E11D48]" style={{ fontFamily: "var(--font-jakarta)" }}>Use current location</span>
            </button>
          </div>

          {/* DIETARY NEEDS */}
          <div className="mt-2">
            <p className="mb-2 text-[13px] font-bold text-[#4A4A4A] uppercase tracking-wider" style={{ fontFamily: "var(--font-jakarta)" }}>
              Dietary Needs (Optional)
            </p>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {(["Veg", "Halal", "Jain", "No Preference"] as const).map(type => (
                <button
                  key={type}
                  onClick={() => {
                    if (type === "No Preference") {
                      setDietary([]);
                    } else {
                      setDietary(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
                    }
                  }}
                  className={`shrink-0 rounded-full px-4 py-2 text-[14px] font-semibold transition-colors border ${
                    (type === "No Preference" && dietary.length === 0) || dietary.includes(type)
                      ? "border-[#E11D48] bg-[#FFF1F2] text-[#E11D48]"
                      : "border-[#E8E8E4] bg-white text-[#4A4A4A]"
                  }`}
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* BROWSE BUTTON */}
        <button
          onClick={handleGo}
          disabled={!isFormValid}
          className={`mt-8 flex h-[56px] w-full items-center justify-center rounded-full text-[17px] font-semibold text-white transition-all ${
            isFormValid
              ? "bg-[#E11D48] shadow-[0_4px_20px_rgba(225,29,72,0.4)]"
              : "bg-[#E8E8E4] text-[#8A8A8A]"
          }`}
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Start Browsing
        </button>
      </div>
    </div>
  );
}
