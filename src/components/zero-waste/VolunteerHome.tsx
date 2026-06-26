"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { fadeUp, staggerContainer, cardVariants } from "@/lib/animations";
import { 
  Bike, Navigation, Clock, MapPin, CheckCircle2, ChevronRight, 
  Package, Utensils, IndianRupee, Flame, TrendingUp, Trophy, Target, Globe
} from "lucide-react";

export function VolunteerHome() {
  const { setActiveScreen, volunteerProfile, activeMission } = useAppStore();
  const [isOnline, setIsOnline] = useState(true);

  if (!volunteerProfile) return null;

  return (
    <div className="flex flex-1 flex-col bg-[#F7F5F0] overflow-y-auto pb-24">
      {/* HEADER */}
      <div className="px-5 pt-12 pb-4 flex justify-between items-start">
        <div>
          <h1 className="text-xl font-bold text-[#0A0A0A] flex items-center gap-2" style={{ fontFamily: "var(--font-outfit)" }}>
            👋 Good morning, {volunteerProfile.displayName.split(" ")[0]}!
          </h1>
          <p className="text-[#4A4A4A] flex items-center gap-1 mt-1 text-sm font-medium" style={{ fontFamily: "var(--font-jakarta)" }}>
            <MapPin size={14} className="text-[#1B5E8A]" /> T Nagar, Chennai
          </p>
        </div>
        <button 
          onClick={() => setIsOnline(!isOnline)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all shadow-sm border border-gray-200/50 ${
            isOnline ? "bg-[#4CAF7D] text-white" : "bg-[#EEF0F3] text-[#8A8A8A]"
          }`}
        >
          <div className="relative flex h-2.5 w-2.5">
            {isOnline && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>}
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isOnline ? "bg-white" : "bg-[#8A8A8A]"}`}></span>
          </div>
          <span className="text-xs font-bold tracking-wide">{isOnline ? "ON" : "OFF"}</span>
        </button>
      </div>

      <motion.div 
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="px-5 flex flex-col gap-5 mt-2"
      >
        {/* ACTIVE MISSION BANNER */}
        {activeMission && isOnline && (
          <motion.div 
            variants={fadeUp}
            className="bg-[#0F2942] rounded-[20px] p-5 shadow-lg relative overflow-hidden"
            style={{ borderLeft: "4px solid #C94F3A" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#C94F3A] animate-pulse" />
              <h3 className="text-white text-xs font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-jakarta)" }}>Active Mission</h3>
            </div>
            
            <div className="space-y-1 mb-4">
              <p className="text-white font-bold" style={{ fontFamily: "var(--font-outfit)" }}>
                Picking up: <span className="text-[#E8A020]">Vegetable Biryani ({activeMission.servings})</span>
              </p>
              <p className="text-[#9CA3AF] text-sm">From: {activeMission.providerName}</p>
              <p className="text-[#9CA3AF] text-sm">Delivering to: {activeMission.ngoName}</p>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#9CA3AF]">Progress</span>
                <span className="text-[#E8A020] font-bold">60% complete</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#E8A020] rounded-full" style={{ width: '60%' }} />
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setActiveScreen("volunteerMap")}
                className="flex-1 bg-[#1B5E8A] text-white py-2.5 rounded-full font-bold text-sm shadow-sm flex justify-center items-center gap-2"
              >
                <MapPin size={16} /> Navigate
              </button>
              <button 
                onClick={() => setActiveScreen("pickupDetail")}
                className="flex-1 border border-white/20 text-white py-2.5 rounded-full font-bold text-sm"
              >
                Details
              </button>
            </div>
          </motion.div>
        )}

        {/* TODAY'S STATS ROW */}
        {isOnline ? (
          <>
            <motion.div variants={fadeUp} className="flex gap-2">
              <div className="flex-1 bg-white border border-[#E5E5E5] rounded-2xl p-3 text-center flex flex-col items-center justify-center shadow-sm">
                <Clock size={20} className="text-[#1B5E8A] mb-1" />
                <p className="text-[#0A0A0A] font-bold text-xl" style={{ fontFamily: "var(--font-outfit)" }}>3.5h</p>
                <p className="text-[#8A8A8A] text-[10px] font-medium uppercase tracking-wider">Today</p>
              </div>
              <div className="flex-1 bg-white border border-[#E5E5E5] rounded-2xl p-3 text-center flex flex-col items-center justify-center shadow-sm">
                <Package size={20} className="text-[#1B5E8A] mb-1" />
                <p className="text-[#0A0A0A] font-bold text-xl" style={{ fontFamily: "var(--font-outfit)" }}>4</p>
                <p className="text-[#8A8A8A] text-[10px] font-medium uppercase tracking-wider">Pickups</p>
              </div>
              <div className="flex-1 bg-white border border-[#E5E5E5] rounded-2xl p-3 text-center flex flex-col items-center justify-center shadow-sm">
                <Utensils size={20} className="text-[#1B5E8A] mb-1" />
                <p className="text-[#0A0A0A] font-bold text-xl" style={{ fontFamily: "var(--font-outfit)" }}>280</p>
                <p className="text-[#8A8A8A] text-[10px] font-medium uppercase tracking-wider">Meals</p>
              </div>
              <div className="flex-1 bg-white border border-[#E5E5E5] rounded-2xl p-3 text-center flex flex-col items-center justify-center shadow-sm">
                <IndianRupee size={20} className="text-[#1B5E8A] mb-1" />
                <p className="text-[#0A0A0A] font-bold text-xl" style={{ fontFamily: "var(--font-outfit)" }}>140</p>
                <p className="text-[#8A8A8A] text-[10px] font-medium uppercase tracking-wider">Earned</p>
              </div>
            </motion.div>

            {/* STREAK CARD */}
            <motion.div 
              variants={fadeUp} 
              className="rounded-[20px] p-5 text-white relative overflow-hidden shadow-md"
              style={{ background: "linear-gradient(135deg, #1B5E8A, #2E7DB5)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Flame size={20} className="text-[#E8C547]" />
                <h3 className="font-bold text-lg" style={{ fontFamily: "var(--font-outfit)" }}>7-Day Streak!</h3>
              </div>
              <p className="text-white/80 text-sm mb-4">You've been active 7 days in a row!</p>
              
              <div className="flex justify-between items-center mb-4 px-1">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    <div className={`w-3 h-3 rounded-full ${i < 6 ? 'bg-white' : i === 6 ? 'bg-[#E8C547]' : 'border-2 border-white/30'}`} />
                    <span className={`text-[10px] font-bold ${i === 6 ? 'text-[#E8C547]' : 'text-white/60'}`}>{day}</span>
                  </div>
                ))}
              </div>
              
              <p className="text-sm font-medium italic text-white/90 bg-white/10 p-3 rounded-xl border border-white/10">
                "Keep going! 3 more days for bonus 50 service points!"
              </p>
            </motion.div>

            {/* IMPACT SUMMARY CARD */}
            <motion.div variants={fadeUp} className="bg-[#0F2942] rounded-[20px] p-5 text-white shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold flex items-center gap-2 text-white"><TrendingUp size={18} className="text-[#4CAF7D]"/> This Month</h3>
                <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded-md text-white/90">Sep ▼</span>
              </div>
              
              <div className="flex justify-between bg-white/5 rounded-xl p-3 mb-4">
                <div className="text-center">
                  <p className="text-white/60 text-xs mb-0.5">🕐 Hours</p>
                  <p className="font-bold text-white">{volunteerProfile.totalHours}</p>
                </div>
                <div className="w-[1px] bg-white/10" />
                <div className="text-center">
                  <p className="text-white/60 text-xs mb-0.5">📦 Pickups</p>
                  <p className="font-bold text-white">{volunteerProfile.totalDeliveries}</p>
                </div>
                <div className="w-[1px] bg-white/10" />
                <div className="text-center">
                  <p className="text-white/60 text-xs mb-0.5">🍽️ Meals</p>
                  <p className="font-bold text-white">1,240</p>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4 h-32 flex items-end justify-between relative mb-4 border border-white/5">
                <div className="absolute top-2 left-2 text-[10px] text-white/60">Your service hours this month</div>
                {volunteerProfile.weeklyHours.map((h, i) => (
                  <div key={i} className="w-6 bg-gradient-to-t from-[#E8A020]/20 to-[#E8A020] rounded-t-sm" style={{ height: `${(h / 30) * 100}%` }} />
                ))}
              </div>

              <p className="text-[#E8A020] text-sm font-bold text-center">Top 5% volunteer in Chennai! 🏆</p>
            </motion.div>

            {/* NEARBY OPPORTUNITIES */}
            <motion.div variants={fadeUp}>
              <div className="mb-3 pl-1">
                <h3 className="font-bold text-[#0A0A0A] flex items-center gap-1.5"><MapPin size={18} className="text-[#C94F3A]"/> Near You Right Now</h3>
                <p className="text-[#8A8A8A] text-xs">Available pickups in your area</p>
              </div>
              
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-white rounded-[16px] shadow-sm border border-gray-100 overflow-hidden shrink-0 w-[140px]">
                    <div className="h-[100px] bg-gray-200 relative">
                      <img src={`https://images.unsplash.com/photo-1544378730-8b5afcbce706?w=400&q=80`} className="w-full h-full object-cover" alt="food" />
                      <div className="absolute bottom-1 right-1 bg-black/60 backdrop-blur-sm text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                        {item === 1 ? '1.2km' : `${1+item}.5km`}
                      </div>
                    </div>
                    <div className="p-2.5">
                      <h4 className="font-bold text-sm text-[#0A0A0A] leading-tight mb-1 truncate">Biryani (80)</h4>
                      <p className="text-[#8A8A8A] text-xs flex items-center gap-1 mb-2"><Clock size={10} /> 1h 20m left</p>
                      <button 
                        onClick={() => setActiveScreen("volunteerMap")}
                        className="w-full py-1.5 bg-[#E8A020] text-white text-xs font-bold rounded-full shadow-sm"
                      >
                        Accept →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* LEADERBOARD PREVIEW */}
            <motion.div variants={fadeUp} className="bg-[#0F2942] rounded-[20px] p-5 text-white shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold flex items-center gap-2 text-white"><Trophy size={18} className="text-[#E8A020]"/> Leaderboard</h3>
                <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded-md text-white/90">Your City ▼</span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🥇</span>
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold">RS</div>
                    <span className="font-medium text-sm">Rahul S</span>
                  </div>
                  <span className="font-bold">142h</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🥈</span>
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-xs font-bold">MK</div>
                    <span className="font-medium text-sm">Meena K</span>
                  </div>
                  <span className="font-bold">138h</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg" style={{ backgroundColor: "rgba(232,160,32,0.15)", borderLeft: "3px solid #E8A020" }}>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🥉</span>
                    <div className="w-8 h-8 rounded-full bg-[#E8A020] flex items-center justify-center text-xs font-bold">YOU</div>
                    <span className="font-medium text-sm">You</span>
                  </div>
                  <span className="font-bold text-[#E8A020]">28h</span>
                </div>
              </div>
              
              <p className="text-sm text-center text-white/80 mb-2">You're #3 in Chennai! 🎉</p>
              <button className="w-full py-2 text-[#E8A020] text-xs font-bold border border-[#E8A020]/30 rounded-full">
                View Full Leaderboard →
              </button>
            </motion.div>

            {/* UPCOMING GOAL */}
            <motion.div variants={fadeUp} className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold flex items-center gap-2 text-[#0A0A0A] mb-2"><Target size={18} className="text-[#1B5E8A]"/> Next Milestone</h3>
              <p className="text-[#4A4A4A] font-bold mb-3">50 Hour Certificate</p>
              
              <div className="mb-3">
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden mb-1.5">
                  <div className="h-full bg-[#1B5E8A] rounded-full" style={{ width: '56%' }} />
                </div>
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-[#4CAF7D]">28h done</span>
                  <span className="text-[#8A8A8A]">22h remaining</span>
                </div>
              </div>
              
              <p className="text-xs text-[#8A8A8A] leading-relaxed mb-3">
                22 more hours to unlock your official 50-Hour Service Certificate from ZeroWaste!
              </p>
              <button className="text-[#1B5E8A] text-xs font-bold flex items-center gap-1">
                See All Milestones →
              </button>
            </motion.div>

            {/* COMMUNITY FEED */}
            <motion.div variants={fadeUp} className="bg-[#0F2942] rounded-[20px] p-5 text-white shadow-md">
              <h3 className="font-bold flex items-center gap-2 mb-4 text-white"><Globe size={18} className="text-[#4CAF7D]"/> Happening Now</h3>
              
              <div className="space-y-3">
                <div className="bg-white/5 rounded-xl p-3">
                  <p className="text-sm leading-snug mb-1 text-white">
                    <span className="font-bold text-[#4CAF7D]">Rahul</span> just completed a pickup from Saravana Bhavan!
                  </p>
                  <p className="text-xs text-[#9CA3AF]">+180 meals rescued · 5min ago</p>
                </div>
                
                <div className="bg-white/5 rounded-xl p-3">
                  <p className="text-sm leading-snug mb-1 text-white">
                    <span className="font-bold text-[#E8A020]">Meena</span> hit 100 hour milestone! Congrats! 🎉
                  </p>
                  <p className="text-xs text-[#9CA3AF]">· 12min ago</p>
                </div>
              </div>
            </motion.div>

          </>
        ) : (
          <motion.div variants={fadeUp} className="flex flex-col items-center justify-center py-16 text-center px-6">
            <div className="h-24 w-24 bg-white border border-gray-100 rounded-[32px] shadow-sm flex items-center justify-center mb-6 relative">
              <div className="absolute inset-0 bg-red-500/5 rounded-[32px] animate-pulse" />
              <Clock size={36} className="text-[#8A8A8A]" />
            </div>
            <h2 className="text-2xl font-black text-[#0A0A0A] tracking-tight" style={{ fontFamily: "var(--font-outfit)" }}>You're Offline</h2>
            <p className="text-[#8A8A8A] text-sm mt-3 max-w-[250px] leading-relaxed" style={{ fontFamily: "var(--font-jakarta)" }}>
              Toggle your status to <strong className="text-[#4CAF7D]">Online</strong> above to start receiving food rescue missions in your area.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
