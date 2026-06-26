"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { ArrowLeft, Download, FileText, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export function TaxReceipt() {
  const { user, donationHistory, setActiveScreen } = useAppStore();
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!user) return null;

  const totalTaxValue = donationHistory.reduce((acc, curr) => acc + (curr.taxValue || 0), 0);
  const receiptNumber = `80G-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-[var(--color-pastel-cream)] relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-12 pb-4 relative z-20">
        <button 
          onClick={() => setActiveScreen("profile")}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-100"
        >
          <ArrowLeft size={20} className="text-[var(--color-dark-text)]" />
        </button>
        <h1 className="font-outfit text-[20px] font-bold text-[var(--color-dark-text)]">
          Tax Receipt
        </h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 px-6 pt-8 pb-32 relative z-10 flex flex-col">
        
        {/* Receipt Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-3xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.06)] relative overflow-hidden flex-1 max-h-[500px]"
        >
          {/* Decorative receipt zig-zag top/bottom could be added with CSS, keeping it clean for now */}
          <div className="absolute -right-16 -top-16 w-32 h-32 bg-blue-50 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col items-center text-center mb-8 relative z-10">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3">
              <FileText size={24} className="text-blue-600" />
            </div>
            <h2 className="font-outfit text-[20px] font-bold text-[var(--color-dark-text)]">
              80G Donation Certificate
            </h2>
            <p className="font-jakarta text-[12px] text-[var(--color-muted-text)] mt-1">
              Receipt No: {receiptNumber}
            </p>
          </div>

          <div className="space-y-4 relative z-10">
            <div className="flex justify-between items-end border-b border-gray-100 pb-3">
              <span className="font-jakarta text-[13px] text-[var(--color-muted-text)]">Donor Name</span>
              <span className="font-outfit text-[15px] font-bold text-[var(--color-dark-text)] text-right">{user.name}</span>
            </div>
            
            <div className="flex justify-between items-end border-b border-gray-100 pb-3">
              <span className="font-jakarta text-[13px] text-[var(--color-muted-text)]">Financial Year</span>
              <span className="font-outfit text-[15px] font-bold text-[var(--color-dark-text)] text-right">2023-24</span>
            </div>

            <div className="flex justify-between items-end border-b border-gray-100 pb-3">
              <span className="font-jakarta text-[13px] text-[var(--color-muted-text)]">Total Donations</span>
              <span className="font-outfit text-[15px] font-bold text-[var(--color-dark-text)] text-right">{user.totalDonations} items</span>
            </div>

            <div className="flex justify-between items-end pt-2">
              <span className="font-jakarta text-[14px] font-bold text-[var(--color-dark-text)]">Eligible Amount</span>
              <span className="font-outfit text-[24px] font-bold text-blue-600">₹{totalTaxValue.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-auto pt-8 flex justify-center opacity-40">
             <div className="flex gap-1 h-8 items-center">
               {/* Dummy Barcode */}
               {[...Array(20)].map((_, i) => (
                 <div key={i} className={`bg-[var(--color-dark-text)] h-full ${i % 3 === 0 ? 'w-1' : i % 2 === 0 ? 'w-2' : 'w-0.5'}`} />
               ))}
             </div>
          </div>
        </motion.div>

        {/* Download Button */}
        <div className="mt-8">
          <button
            onClick={handleDownload}
            disabled={downloading || downloaded}
            className={`w-full h-[60px] rounded-full font-outfit text-[18px] font-bold flex items-center justify-center gap-2 transition-all ${
              downloaded 
                ? "bg-[var(--color-success)] text-white" 
                : "bg-blue-600 text-white shadow-[0_8px_24px_rgba(37,99,235,0.25)] hover:bg-blue-700"
            }`}
          >
            {downloading ? (
              <span className="animate-pulse">Generating PDF...</span>
            ) : downloaded ? (
              <>
                <CheckCircle2 size={20} />
                Downloaded Successfully
              </>
            ) : (
              <>
                <Download size={20} />
                Download PDF
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
