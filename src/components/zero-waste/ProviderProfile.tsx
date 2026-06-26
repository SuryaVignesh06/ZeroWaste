"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { 
  ArrowLeft, Phone, MoreHorizontal, ShieldCheck, 
  Store, History, Star, Award, Plus
} from "lucide-react";

export function ProviderProfile() {
  const { user, donationHistory, setActiveScreen, subRole } = useAppStore();
  const { scrollY } = useScroll();

  // Parallax for the photo
  const yParallax = useTransform(scrollY, [0, 500], [0, 150]);
  const scaleParallax = useTransform(scrollY, [0, 500], [1, 1.05]);

  if (!user) return null;

  const isDonor = subRole === "donor";

  return (
    <div className="relative w-full min-h-[100dvh] overflow-x-hidden text-white" style={{ background: "#C2B097" }}>
      
      {/* =========================================
          ZONE 1 — FLOATING NAVIGATION 
      ========================================= */}
      <div className="absolute top-[47px] left-0 right-0 h-[48px] px-4 flex justify-between items-center z-[100] pointer-events-none">
        {/* Left Back Button */}
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => setActiveScreen("home")}
          className="w-10 h-10 rounded-full bg-[#1A1A1A]/70 border border-white/20 backdrop-blur-md shadow-lg flex items-center justify-center pointer-events-auto text-white"
        >
          <ArrowLeft size={20} strokeWidth={2.5} />
        </motion.button>

        {/* Right Actions */}
        <div className="flex items-center gap-2 pointer-events-auto text-white">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-[#1A1A1A]/70 border border-white/20 backdrop-blur-md shadow-lg flex items-center justify-center"
          >
            <Phone size={18} strokeWidth={2.5} />
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-[#1A1A1A]/70 border border-white/20 backdrop-blur-md shadow-lg flex items-center justify-center"
          >
            <MoreHorizontal size={20} strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>

      {/* =========================================
          ZONE 2 — HERO PHOTO 
      ========================================= */}
      <div className="absolute top-0 left-0 right-0 h-[380px] overflow-hidden bg-[#C9A832]">
        <motion.img 
          src={isDonor 
            ? "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&auto=format&fit=crop&q=60" // Restaurant Chef portrait
            : "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=60" // Grocery Manager portrait
          }
          alt="Banner"
          style={{ y: yParallax, scale: scaleParallax }}
          className="w-full h-full object-cover"
        />
        {/* Soft dark gradient on top for status bar / back button readability */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent pointer-events-none z-[1]" />
        
        {/* Color Fade to the sand background at the bottom of the banner */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[150px] z-[1]"
          style={{
            background: "linear-gradient(to top, #C2B097 0%, rgba(194, 176, 151, 0.8) 50%, transparent 100%)"
          }}
        />
      </div>

      {/* =========================================
          SCROLLABLE CONTENT WRAPPER 
      ========================================= */}
      <div className="relative z-10 pt-[310px] pb-32">

        {/* =========================================
            ZONE 3 — NAME + ROLE 
        ========================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center px-6 mt-4 relative z-20"
        >
          <h1 className="font-outfit text-[32px] font-light leading-[1.2] tracking-tight text-white">
            {user.name}
          </h1>
          <p className="font-jakarta text-[14px] font-medium leading-[1.4] tracking-[0.2px] text-white/80 mt-1">
            {isDonor ? "Food Donor · Hotel Raj Palace" : "Shopkeeper · Fresh Mart Grocery"}
          </p>
        </motion.div>

        {/* =========================================
            ZONE 4 — BADGE CHIPS ROW
        ========================================= */}
        <div className="flex justify-center flex-wrap gap-2 px-6 mt-4">
          {/* FSSAI / ISO Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.3 }}
            className="h-8 rounded-full px-[14px] inline-flex items-center gap-1.5 backdrop-blur-[10px] bg-[#A259FF]/20 text-[#A259FF] border border-[#A259FF]/30"
          >
            <ShieldCheck size={11} />
            <span className="font-jakarta text-[12px] font-medium">
              {isDonor ? "FSSAI Certified" : "ISO 22000"}
            </span>
          </motion.div>

          {/* Gold / Top badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.38 }}
            className="h-8 rounded-full px-[14px] inline-flex items-center gap-1.5 backdrop-blur-[10px] bg-[#F2C94C]/20 text-[#F2C94C] border border-[#F2C94C]/30"
          >
            <Star size={11} />
            <span className="font-jakarta text-[12px] font-medium">
              {isDonor ? "Gold Donor" : "Top Shopkeeper"}
            </span>
          </motion.div>

          {/* Eco / Verified badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.46 }}
            className="h-8 rounded-full px-[14px] inline-flex items-center gap-1.5 backdrop-blur-[10px] bg-[#2D9CDB]/20 text-[#2D9CDB] border border-[#2D9CDB]/30"
          >
            <Award size={11} />
            <span className="font-jakarta text-[12px] font-medium">
              {isDonor ? "Eco Partner" : "Verified Store"}
            </span>
          </motion.div>
        </div>

        {/* =========================================
            ZONE 5 — BIO TEXT
        ========================================= */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pt-4 px-8 text-center max-w-[360px] mx-auto"
        >
          <p className="font-jakarta text-[13px] font-normal leading-[1.6] tracking-[0.1px] text-white/90">
            {isDonor
              ? "Consistently donating surplus food from Hotel Raj Palace to local NGOs. Committed to zero food waste and community nourishment through the ZeroWaste platform."
              : "Managing fresh produce surplus at Fresh Mart, listing near-expiry items for discounted sale and free donation to reduce organic waste and support local families."
            }
          </p>
        </motion.div>

        {/* =========================================
            ZONE 6 — STATS ROW
        ========================================= */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-between pt-6 px-5 gap-2"
        >
          {/* Meals Saved */}
          <div className="flex-1 flex flex-col items-center gap-2">
            <span className="font-jakarta text-[11px] font-medium text-white/70 tracking-[0.3px] text-center uppercase">
              {isDonor ? "Meals" : "Items"}
            </span>
            <div className="h-[32px] w-full max-w-[85px] rounded-full flex items-center justify-center bg-[#F2D15A] text-[#121214] shadow-sm">
              <span className="font-outfit text-[13px] font-bold tracking-[-0.3px]">{user.totalDonations}</span>
            </div>
          </div>

          {/* Donations */}
          <div className="flex-1 flex flex-col items-center gap-2">
            <span className="font-jakarta text-[11px] font-medium text-white/70 tracking-[0.3px] text-center uppercase">
              Donated
            </span>
            <div className="h-[32px] w-full max-w-[85px] rounded-full flex items-center justify-center bg-[#2C2C2E] border border-white/10 text-white shadow-sm">
              <span className="font-outfit text-[13px] font-bold tracking-[-0.3px]">{isDonor ? user.totalDonations : Math.floor(user.totalDonations * 0.4)}</span>
            </div>
          </div>

          {/* CO2 */}
          <div className="flex-1 flex flex-col items-center gap-2">
            <span className="font-jakarta text-[11px] font-medium text-white/70 tracking-[0.3px] text-center uppercase">
              CO2 (kg)
            </span>
            <div
              className="h-[32px] w-full max-w-[85px] rounded-full flex items-center justify-center text-white border border-white/25 shadow-sm"
              style={{ background: "repeating-linear-gradient(45deg, rgba(255,255,255,0.05), rgba(255,255,255,0.05) 4px, rgba(255,255,255,0.15) 4px, rgba(255,255,255,0.15) 8px)" }}
            >
              <span className="font-outfit text-[13px] font-bold tracking-[-0.3px]">{(user.totalDonations * 0.84).toFixed(0)}</span>
            </div>
          </div>

          {/* Points */}
          <div className="flex-1 flex flex-col items-center gap-2">
            <span className="font-jakarta text-[11px] font-medium text-white/70 tracking-[0.3px] text-center uppercase">
              Points
            </span>
            <div className="h-[32px] w-full max-w-[85px] rounded-full flex items-center justify-center bg-[#8E9297]/30 border border-white/10 text-white backdrop-blur-md shadow-sm">
              <span className="font-outfit text-[13px] font-bold tracking-[-0.3px]">{user.totalPoints}</span>
            </div>
          </div>
        </motion.div>

        {/* =========================================
            ZONE 7 — LIGHT CHART CARD
        ========================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6 mx-4 bg-[#1C1C1E]/80 border border-white/10 backdrop-blur-md rounded-[32px] p-5 shadow-lg relative"
        >
          {/* Header Row */}
          <div className="flex justify-between items-start mb-4">
            <h2 className="font-outfit text-[17px] font-semibold text-white tracking-[-0.2px]">
              {isDonor ? "Donation Activity" : "Sales Activity"}
            </h2>
            <div className="flex flex-col gap-1.5 items-end">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F2D15A]" />
                <span className="font-jakarta text-[11px] text-white/60 font-medium">
                  {isDonor ? "Donations" : "Listings"}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                <span className="font-jakarta text-[11px] text-white/40 font-medium">Platform avg</span>
              </div>
            </div>
          </div>

          {/* Chart Area */}
          <div className="relative h-[130px] mt-2">
            <svg viewBox="0 0 300 130" className="w-full h-full overflow-visible">
              {/* Secondary Line (Dashed - platform avg) */}
              <motion.path
                initial={{ strokeDashoffset: 1000 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                strokeDasharray="4 4"
                d="M 10,100 Q 40,80 80,90 T 150,70 T 220,80 T 290,60"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.5"
              />
              {/* Primary Line (Gold) */}
              <motion.path
                initial={{ strokeDashoffset: 1000 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                strokeDasharray="1000"
                d="M 10,120 Q 40,90 80,110 T 150,40 T 220,70 T 290,30"
                fill="none"
                stroke="#F2D15A"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data Points */}
              <circle cx="10" cy="120" r="4" fill="#F2D15A" stroke="#1C1C1E" strokeWidth="2" />
              <circle cx="80" cy="110" r="4" fill="#F2D15A" stroke="#1C1C1E" strokeWidth="2" />
              <circle cx="150" cy="40" r="4" fill="#F2D15A" stroke="#1C1C1E" strokeWidth="2" />

              {/* Active Point (Mar) */}
              <motion.circle
                animate={{ r: [6, 8, 6], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                cx="150" cy="40" r="6" fill="#F2D15A" stroke="#FFFFFF" strokeWidth="2"
              />

              <circle cx="220" cy="70" r="4" fill="#F2D15A" stroke="#1C1C1E" strokeWidth="2" />
              <circle cx="290" cy="30" r="4" fill="#F2D15A" stroke="#1C1C1E" strokeWidth="2" />
            </svg>

            {/* Tooltip for March peak */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 1.5 }}
              className="absolute bg-[#F2D15A] text-[#1C1C1E] rounded-full px-3.5 py-1.5 flex items-center gap-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
              style={{ left: "50%", top: "10px", transform: "translateX(-50%)" }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#1C1C1E]" />
              <span className="font-outfit text-[13px] font-bold text-[#1C1C1E]">
                {isDonor ? `${user.totalDonations} meals` : `${user.totalDonations} items`}
              </span>
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-[#F2D15A]" />
            </motion.div>
          </div>

          {/* X Axis - Months */}
          <div className="flex justify-between mt-3 px-1 relative">
            <span className="font-jakarta text-[11px] text-white/40 flex-1 text-center font-medium">Jan</span>
            <span className="font-jakarta text-[11px] text-white/40 flex-1 text-center font-medium">Feb</span>
            <div className="flex-1 flex justify-center relative">
              <span className="font-jakarta text-[11px] font-bold text-white relative z-10">Mar</span>
              <div className="absolute -top-[5px] w-6 h-6 rounded-full bg-white/10 flex items-center justify-center z-0" />
            </div>
            <span className="font-jakarta text-[11px] text-white/40 flex-1 text-center font-medium">Apr</span>
            <span className="font-jakarta text-[11px] text-white/40 flex-1 text-center font-medium">May</span>
          </div>
        </motion.div>

        {/* =========================================
            ZONE 8 — SCROLLABLE BOTTOM CONTENT
        ========================================= */}
        
        {/* Quick Actions */}
        <div className="flex gap-3 px-4 pt-6">
           <button className="flex-1 h-14 rounded-2xl flex flex-col items-center justify-center gap-1 bg-white/10 border border-white/20 shadow-sm text-white backdrop-blur-md active:scale-95 transition-all">
             <Plus size={20} className="text-[#F2D15A]" />
             <span className="font-jakarta text-[11px] font-bold text-white">New Log</span>
           </button>
           <button 
             onClick={() => setActiveScreen("activity-history")}
             className="flex-1 h-14 rounded-2xl flex flex-col items-center justify-center gap-1 bg-white/10 border border-white/20 shadow-sm text-white backdrop-blur-md active:scale-95 transition-all"
           >
             <History size={20} className="text-[#F2D15A]" />
             <span className="font-jakarta text-[11px] font-bold text-white">History</span>
           </button>
           <button className="flex-1 h-14 rounded-2xl flex flex-col items-center justify-center gap-1 bg-white/10 border border-white/20 shadow-sm text-white backdrop-blur-md active:scale-95 transition-all">
             <Award size={20} className="text-[#F2D15A]" />
             <span className="font-jakarta text-[11px] font-bold text-white">Badges</span>
           </button>
        </div>

        {/* Recent Activity List */}
        <div className="mt-6 mx-4 bg-[#1C1C1E]/80 border border-white/10 backdrop-blur-md rounded-[32px] p-5 shadow-lg">
          <h3 className="font-outfit text-white/50 text-[13px] font-bold mb-4 px-2 tracking-wide uppercase">Recent Activity</h3>
          <div className="flex flex-col gap-3">
            {donationHistory.slice(0, 3).map((item, i) => (
              <div key={item.id} className="bg-white/5 border border-white/10 rounded-[20px] p-3 flex justify-between items-center transition-transform active:scale-98">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white">
                    <History size={18} />
                  </div>
                  <div>
                    <h4 className="font-outfit text-white text-[14px] font-semibold tracking-tight">{item.foodName}</h4>
                    <p className="font-jakarta text-white/50 text-[11px] mt-0.5">
                      {item.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • {item.servings || item.quantity} servings
                    </p>
                  </div>
                </div>
                <div className="bg-[#F2D15A]/20 text-[#F2D15A] border border-[#F2D15A]/30 font-bold font-jakarta text-[11px] px-2.5 py-1 rounded-lg">
                  +{item.pointsEarned} pts
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

