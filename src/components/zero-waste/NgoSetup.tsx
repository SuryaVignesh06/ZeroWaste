"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { ChevronLeft, Building2, MapPin, UploadCloud, CheckCircle2, Clock, Check, Loader2 } from "lucide-react";

export function NgoSetup() {
  const setScreen = useAppStore((s) => s.setScreen);
  const saveNgoProfile = useAppStore((s) => s.saveNgoProfile);
  const completeSetup = useAppStore((s) => s.completeSetup);

  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false); // Used for the pending screen

  // Step 1: Org Details
  const [name, setName] = useState("");
  const [type, setType] = useState("Trust");
  const [regNumber, setRegNumber] = useState("");
  const [year, setYear] = useState("");
  const [website, setWebsite] = useState("");

  // Step 2: Contact & Location
  const [contactPerson, setContactPerson] = useState("");
  const [designation, setDesignation] = useState("");
  const [address, setAddress] = useState("");
  const [radius, setRadius] = useState(10);
  const [capacity, setCapacity] = useState(100);
  const [foodTypes, setFoodTypes] = useState<string[]>([]);

  // Step 3: Documents
  const [uploadingDoc, setUploadingDoc] = useState<string | null>(null);
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, boolean>>({});

  const handleDocUpload = (docKey: string) => {
    setUploadingDoc(docKey);
    setTimeout(() => {
      setUploadedDocs(prev => ({ ...prev, [docKey]: true }));
      setUploadingDoc(null);
    }, 1500);
  };

  const isStep1Valid = name && type && regNumber && year;
  const isStep2Valid = contactPerson && designation && address && foodTypes.length > 0;
  const isStep3Valid = uploadedDocs["regCert"] && uploadedDocs["panCard"];

  const handleNext = () => {
    if (step === 1 && isStep1Valid) setStep(2);
    else if (step === 2 && isStep2Valid) setStep(3);
    else if (step === 3 && isStep3Valid) {
      // Submit NGO Setup
      saveNgoProfile({
        name, type, regNumber, year, website,
        contactPerson, designation, address, radius, capacity, foodTypes,
        status: "pending"
      });
      setSuccess(true);
    }
  };

  const finishSetup = () => {
    completeSetup();
    setScreen("login"); // Return to login until approved
  };

  return (
    <div className="relative flex h-full flex-col bg-[#F7F5F0]">
      {/* Top Header */}
      {!success && (
        <div className="flex items-center justify-between px-4 pt-12 pb-4">
          <button
            onClick={() => (step === 1 ? setScreen("role-select") : setStep(step - 1))}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm"
          >
            <ChevronLeft size={20} className="text-[#0A0A0A]" />
          </button>
          <div className="flex gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-1.5 w-6 rounded-full ${step >= i ? "bg-[#1E3A8A]" : "bg-[#E8E8E4]"}`} />
            ))}
          </div>
          <div className="w-11" /> {/* Spacer */}
        </div>
      )}

      {/* Content */}
      {!success && (
        <main className="flex-1 overflow-y-auto px-6 pb-24">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col pt-4"
              >
                <h1 className="text-[28px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
                  Organization Details
                </h1>
                <p className="mt-1 text-[15px] text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Let's get your NGO registered on Zero-Waste.
                </p>

                <div className="mt-8 flex flex-col gap-5">
                  <InputField label="NGO Name" value={name} onChange={setName} placeholder="e.g. Robin Hood Army" />
                  
                  <div>
                    <label className="mb-2 block text-[13px] font-bold text-[#4A4A4A] uppercase tracking-wider" style={{ fontFamily: "var(--font-jakarta)" }}>
                      Registration Type
                    </label>
                    <div className="flex gap-2">
                      {["Trust", "Society", "Section 8"].map(t => (
                        <button
                          key={t}
                          onClick={() => setType(t)}
                          className={`flex-1 rounded-[16px] py-3 text-[14px] font-semibold border transition-all ${
                            type === t ? "border-[#1E3A8A] bg-[#F0F4FA] text-[#1E3A8A]" : "border-[#E8E8E4] bg-white text-[#4A4A4A]"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <InputField label="Registration Number" value={regNumber} onChange={setRegNumber} placeholder="Govt. Registration ID" />
                  
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <InputField label="Est. Year" value={year} onChange={setYear} placeholder="YYYY" maxLength={4} />
                    </div>
                    <div className="flex-[2]">
                      <InputField label="Website (Optional)" value={website} onChange={setWebsite} placeholder="www.example.org" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : step === 2 ? (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col pt-4"
              >
                <h1 className="text-[28px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
                  Contact & Logistics
                </h1>
                
                <div className="mt-8 flex flex-col gap-5">
                  <div className="flex gap-4">
                    <div className="flex-[2]">
                      <InputField label="Contact Person" value={contactPerson} onChange={setContactPerson} placeholder="Full Name" />
                    </div>
                    <div className="flex-1">
                      <InputField label="Designation" value={designation} onChange={setDesignation} placeholder="Role" />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-[13px] font-bold text-[#4A4A4A] uppercase tracking-wider" style={{ fontFamily: "var(--font-jakarta)" }}>
                      Organization Address
                    </label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Full operating address"
                      rows={3}
                      className="w-full rounded-[16px] border border-[#E8E8E4] bg-white px-4 py-3 text-[16px] font-medium text-[#0A0A0A] focus:border-[#1E3A8A] focus:outline-none resize-none"
                    />
                  </div>

                  {/* Slider */}
                  <div>
                    <div className="mb-2 flex justify-between">
                      <label className="text-[13px] font-bold text-[#4A4A4A] uppercase tracking-wider" style={{ fontFamily: "var(--font-jakarta)" }}>
                        Service Radius
                      </label>
                      <span className="font-bold text-[#1E3A8A]">{radius} km</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={radius}
                      onChange={(e) => setRadius(parseInt(e.target.value))}
                      className="w-full accent-[#1E3A8A]"
                    />
                    <div className="flex justify-between mt-1 text-[11px] text-[#8A8A8A]">
                      <span>1 km</span>
                      <span>50 km</span>
                    </div>
                  </div>

                  {/* Capacity */}
                  <div>
                    <label className="mb-2 block text-[13px] font-bold text-[#4A4A4A] uppercase tracking-wider" style={{ fontFamily: "var(--font-jakarta)" }}>
                      Daily Capacity (Meals)
                    </label>
                    <div className="flex gap-2">
                      {[50, 100, 200, 500].map(c => (
                        <button
                          key={c}
                          onClick={() => setCapacity(c)}
                          className={`flex-1 rounded-full py-2.5 text-[14px] font-semibold border transition-all ${
                            capacity === c ? "border-[#1E3A8A] bg-[#1E3A8A] text-white" : "border-[#E8E8E4] bg-white text-[#4A4A4A]"
                          }`}
                        >
                          {c}{c===500 && "+"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Food Types */}
                  <div>
                    <label className="mb-3 block text-[13px] font-bold text-[#4A4A4A] uppercase tracking-wider" style={{ fontFamily: "var(--font-jakarta)" }}>
                      Accepted Food Types
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["Cooked Meals", "Raw Grains", "Packaged Goods", "Fresh Produce", "Baked Goods"].map((ft) => (
                        <button
                          key={ft}
                          onClick={() => {
                            setFoodTypes((prev) =>
                              prev.includes(ft) ? prev.filter((d) => d !== ft) : [...prev, ft]
                            );
                          }}
                          className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
                            foodTypes.includes(ft)
                              ? "bg-[#F0F4FA] text-[#1E3A8A] border border-[#1E3A8A]"
                              : "bg-white text-[#4A4A4A] border border-[#E8E8E4]"
                          }`}
                        >
                          {ft}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            ) : (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col pt-4"
              >
                <h1 className="text-[28px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
                  Verification Docs
                </h1>
                <p className="mt-1 text-[15px] text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Upload documents to verify your organization.
                </p>

                <div className="mt-8 flex flex-col gap-4">
                  <DocumentUpload 
                    id="regCert" 
                    title="Registration Certificate" 
                    required 
                    uploaded={uploadedDocs["regCert"]} 
                    uploading={uploadingDoc === "regCert"} 
                    onUpload={() => handleDocUpload("regCert")} 
                  />
                  <DocumentUpload 
                    id="panCard" 
                    title="NGO PAN Card" 
                    required 
                    uploaded={uploadedDocs["panCard"]} 
                    uploading={uploadingDoc === "panCard"} 
                    onUpload={() => handleDocUpload("panCard")} 
                  />
                  <DocumentUpload 
                    id="80g" 
                    title="12A / 80G Certificate" 
                    required={false} 
                    uploaded={uploadedDocs["80g"]} 
                    uploading={uploadingDoc === "80g"} 
                    onUpload={() => handleDocUpload("80g")} 
                  />
                </div>

                <div className="mt-8 rounded-[16px] bg-[#FFF8E6] p-4 flex gap-3 border border-[#FDE68A]">
                  <Clock size={20} className="text-[#D97706] shrink-0 mt-0.5" />
                  <p className="text-[13px] leading-relaxed text-[#92400E]" style={{ fontFamily: "var(--font-jakarta)" }}>
                    Verification typically takes 24-48 hours. Once approved, you can start receiving food donations.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      )}

      {/* Bottom Button */}
      {!success && (
        <div className="fixed bottom-0 left-0 right-0 bg-white p-6 shadow-[0_-8px_20px_rgba(0,0,0,0.04)]">
          <button
            onClick={handleNext}
            disabled={
              (step === 1 && !isStep1Valid) || 
              (step === 2 && !isStep2Valid) || 
              (step === 3 && !isStep3Valid)
            }
            className="flex h-14 w-full items-center justify-center rounded-full bg-[#1E3A8A] text-[17px] font-bold text-white transition-opacity disabled:opacity-50 shadow-[0_8px_20px_rgba(30,58,138,0.25)]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            {step === 3 ? "Submit for Verification" : "Continue"}
          </button>
        </div>
      )}

      {/* Pending Success Screen */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F8FAFC] px-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, delay: 0.3 }}
              className="flex h-28 w-28 items-center justify-center rounded-[32px] bg-white shadow-xl border border-[#E2E8F0]"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Clock size={48} className="text-[#1E3A8A]" />
              </motion.div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center text-[30px] font-extrabold text-[#0A0A0A]"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Application Under Review
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-3 text-center text-[16px] text-[#4A4A4A] leading-relaxed"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              We are verifying your NGO details. This process takes 24-48 hours. We'll notify you via SMS once approved.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              onClick={finishSetup}
              className="absolute bottom-10 left-6 right-6 flex h-14 items-center justify-center rounded-full bg-[#1E3A8A] text-[17px] font-bold text-white shadow-[0_8px_20px_rgba(30,58,138,0.25)]"
            >
              Return Home
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, maxLength }: any) {
  return (
    <div>
      <label className="mb-2 block text-[13px] font-bold text-[#4A4A4A] uppercase tracking-wider" style={{ fontFamily: "var(--font-jakarta)" }}>
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full rounded-[16px] border border-[#E8E8E4] bg-white px-4 py-4 text-[16px] font-medium text-[#0A0A0A] focus:border-[#1E3A8A] focus:outline-none"
      />
    </div>
  );
}

function DocumentUpload({ id, title, required, uploaded, uploading, onUpload }: any) {
  return (
    <div 
      className={`relative flex items-center justify-between rounded-[20px] p-5 border transition-all ${
        uploaded ? "border-[#1E3A8A] bg-[#F0F4FA]" : "border-[#E8E8E4] bg-white"
      }`}
    >
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-[15px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>{title}</span>
          {required && <span className="rounded bg-[#FEE2E2] px-1.5 py-0.5 text-[9px] font-bold text-[#EF4444] uppercase">Required</span>}
        </div>
        <span className="text-[12px] text-[#8A8A8A] mt-0.5" style={{ fontFamily: "var(--font-jakarta)" }}>PDF, JPG, PNG up to 5MB</span>
      </div>
      
      <button 
        onClick={onUpload}
        disabled={uploaded || uploading}
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${
          uploaded ? "bg-[#1E3A8A]" : "bg-[#F7F5F0]"
        }`}
      >
        {uploading ? (
          <Loader2 size={18} className="animate-spin text-[#1E3A8A]" />
        ) : uploaded ? (
          <Check size={18} className="text-white" />
        ) : (
          <UploadCloud size={18} className="text-[#4A4A4A]" />
        )}
      </button>

      {/* Progress Bar overlay */}
      {uploading && (
        <motion.div 
          className="absolute bottom-0 left-0 h-1 bg-[#1E3A8A] rounded-b-[20px]"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "linear" }}
        />
      )}
    </div>
  );
}
