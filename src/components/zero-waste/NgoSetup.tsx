"use client";

import { useState, useRef, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { Building2, User, MapPin, Navigation } from "lucide-react";

export function NgoSetup() {
  const setScreen = useAppStore((s) => s.setScreen);
  const saveNgoProfile = useAppStore((s) => s.saveNgoProfile);
  const completeSetup = useAppStore((s) => s.completeSetup);

  const [orgName, setOrgName] = useState("");
  const [contactName, setContactName] = useState("");
  const [location, setLocation] = useState("");
  
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleGo = () => {
    if (orgName && contactName && location) {
      saveNgoProfile({
        name: orgName,
        contactPerson: contactName,
        address: location,
        status: "pending"
      });
      completeSetup();
      setScreen("ngoFeed");
    }
  };

  const isFormValid = orgName.trim().length > 0 && contactName.trim().length > 0 && location.trim().length > 0;

  return (
    <div className="flex flex-col h-full bg-[#F7F5F0] px-8 py-8 justify-center items-center relative">
      <div className="w-full flex flex-col mt-auto mb-auto max-w-sm">
        
        <h1 className="mt-6 text-[28px] font-bold text-[#0A0A0A] text-center" style={{ fontFamily: "var(--font-outfit)" }}>
          Tell us about your organization
        </h1>
        <p className="mt-2 text-[15px] text-[#4A4A4A] text-center" style={{ fontFamily: "var(--font-jakarta)" }}>
          We will verify your details within 48 hours.
        </p>

        <div className="mt-8 flex flex-col gap-4">
          {/* ORG NAME INPUT */}
          <div className="relative">
            <Building2 size={18} color="#8A8A8A" className="absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              ref={inputRef}
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="Organization name"
              className="w-full h-[56px] rounded-[16px] border-[1.5px] border-[#E8E8E4] bg-white pl-12 pr-4 text-[16px] font-medium text-[#0A0A0A] focus:border-[#1E3A8A] focus:outline-none"
              style={{ fontFamily: "var(--font-outfit)" }}
            />
          </div>

          {/* CONTACT NAME INPUT */}
          <div className="relative">
            <User size={18} color="#8A8A8A" className="absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="Your name"
              className="w-full h-[56px] rounded-[16px] border-[1.5px] border-[#E8E8E4] bg-white pl-12 pr-4 text-[16px] font-medium text-[#0A0A0A] focus:border-[#1E3A8A] focus:outline-none"
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
                placeholder="Service area"
                className="w-full h-[56px] rounded-[16px] border-[1.5px] border-[#E8E8E4] bg-white pl-12 pr-4 text-[16px] font-medium text-[#0A0A0A] focus:border-[#1E3A8A] focus:outline-none"
                style={{ fontFamily: "var(--font-outfit)" }}
              />
            </div>
            <button 
              onClick={() => setLocation("Current Location")}
              className="mt-2 flex items-center gap-1.5 rounded-full border border-[#DBEAFE] bg-[#EFF6FF] px-3 py-1.5"
            >
              <Navigation size={14} color="#1E3A8A" />
              <span className="text-[13px] font-semibold text-[#1E3A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>Use current location</span>
            </button>
          </div>
        </div>

        {/* CONTINUE BUTTON */}
        <button
          onClick={handleGo}
          disabled={!isFormValid}
          className={`mt-8 flex h-[56px] w-full items-center justify-center rounded-full text-[17px] font-semibold text-white transition-all ${
            isFormValid
              ? "bg-[#1E3A8A] shadow-[0_4px_20px_rgba(30,58,138,0.4)]"
              : "bg-[#E8E8E4] text-[#8A8A8A]"
          }`}
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
