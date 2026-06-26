"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { ChevronRight, MapPin, CreditCard, Bell, Shield, HelpCircle, Settings, LogOut, Award, Star, Recycle, ShoppingBag, Heart, Package, Leaf, CheckCircle, Clock } from "lucide-react";
import { staggerContainer, cardVariants } from "@/lib/animations";

export function Profile() {
  const setScreen = useAppStore((s) => s.setScreen);
  const role = useAppStore((s) => s.role);
  const impactPoints = useAppStore((s) => s.impactPoints);
  const mealsSaved = useAppStore((s) => s.mealsSaved);
  const moneySaved = useAppStore((s) => s.moneySaved);
  const donationHistory = useAppStore((s) => s.donationHistory);
  const setActiveDonationId = useAppStore((s) => s.setActiveDonationId);

  const MENU_SECTIONS = [
    { title: "Account", items: [{ icon: MapPin, label: "Saved Addresses", sub: "2 addresses" }, { icon: CreditCard, label: "Payment Methods", sub: "UPI, 1 card" }, { icon: Bell, label: "Notifications", sub: "Push, Email" }] },
    { title: "Preferences", items: [
      { icon: Recycle, label: "Donor Type", sub: "Individual", action: "none" },
      { icon: Recycle, label: "Switch Role", sub: role, action: "switch" }, 
      { icon: Shield, label: "Privacy & Security", sub: "Verified account" }, 
      { icon: Settings, label: "App Settings", sub: "Theme, Language" }
    ]},
    { title: "Support", items: [{ icon: HelpCircle, label: "Help Center", sub: "FAQs, Contact" }, { icon: Star, label: "Rate Zero-Waste", sub: "on Play Store" }] },
  ];

  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }} className="bg-[#f5f1ed]">
      <div className="bg-white px-5 py-4" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <h1 className="text-[24px] font-bold tracking-tight text-[#1a1a1a]">Profile</h1>
      </div>

      <main style={{ flex: 1, minHeight: 0, overflowY: "auto", paddingBottom: "120px" }}>
        <div className="px-5 pt-4 space-y-5">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden p-6 text-white" style={{ borderRadius: "24px", background: "linear-gradient(135deg, #047857, #064e3b)", boxShadow: "0 8px 24px rgba(4, 120, 87, 0.3)" }}>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20"><span className="text-2xl font-bold">R</span></div>
              <div className="flex-1"><h2 className="text-lg font-bold tracking-tight">Ramesh Kumar</h2><p className="text-[12px] text-white/85">+91 98765 43210</p><div className="mt-1 inline-flex items-center gap-1 rounded-full bg-white/25 px-2 py-0.5 text-[10px] font-bold uppercase"><Award size={10} />Gold Member</div></div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/20 pt-5 text-center">
              <div><div className="text-lg font-bold">{impactPoints.toLocaleString("en-IN")}</div><div className="text-[10px] text-white/80">Points</div></div>
              <div><div className="text-lg font-bold">{mealsSaved}</div><div className="text-[10px] text-white/80">Meals saved</div></div>
              <div><div className="text-lg font-bold">\u20B9{moneySaved}</div><div className="text-[10px] text-white/80">Saved</div></div>
            </div>
          </motion.div>

          {/* Donation History Section */}
          {role === "user" && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <div className="flex items-center justify-between mb-3 px-1">
                <h2 className="text-[20px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>My Donations</h2>
                {donationHistory.length > 0 && (
                  <button className="text-[13px] font-medium text-[#1A6B3C]" style={{ fontFamily: "var(--font-jakarta)" }}>See all</button>
                )}
              </div>
              
              {donationHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#C8E8D0]">
                    <Leaf size={48} className="text-[#1A6B3C]" />
                  </div>
                  <h3 className="mt-4 text-[18px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>No donations yet</h3>
                  <p className="text-[14px] text-[#4A4A4A] mt-1 text-center" style={{ fontFamily: "var(--font-jakarta)" }}>Your first donation is just a tap away.</p>
                  <button 
                    onClick={() => setScreen("donate")}
                    className="mt-5 flex h-12 items-center justify-center rounded-full bg-[#1A6B3C] px-8 text-[15px] font-semibold text-white transition-transform active:scale-95 shadow-[0px_8px_24px_rgba(26,107,60,0.25)]"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    Donate Food
                  </button>
                </div>
              ) : (
                <motion.div variants={staggerContainer} initial="initial" animate="animate" className="flex flex-col gap-3">
                  {donationHistory.slice(0, 3).map((d) => (
                    <motion.div 
                      key={d.id} 
                      variants={cardVariants}
                      className="flex items-center gap-3 rounded-[16px] bg-white p-4 shadow-[0px_2px_16px_rgba(0,0,0,0.06)] active:scale-98 transition-transform"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-gradient-to-br from-[#1A6B3C] to-[#22C55E]">
                        <Leaf size={22} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[14px] font-semibold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>{d.foodName}</div>
                        <div className="text-[12px] font-normal text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                          {new Date(d.listedAt).toLocaleDateString()}
                        </div>
                        <div className="mt-1">
                          {d.status === "delivered" ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#F0F7F2] px-2 py-0.5 text-[10px] font-semibold text-[#1A6B3C]" style={{ fontFamily: "var(--font-jakarta)" }}>
                              <CheckCircle size={12} /> Delivered
                            </span>
                          ) : d.status === "picked_up" || d.status === "accepted" ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF8EC] px-2 py-0.5 text-[10px] font-semibold text-[#D97706]" style={{ fontFamily: "var(--font-jakarta)" }}>
                              <Clock size={12} /> In Progress
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#F0F4FF] px-2 py-0.5 text-[10px] font-semibold text-[#1E3A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                              <Bell size={12} /> Available
                            </span>
                          )}
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-[#8A8A8A]" />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
          {/* NGO Section */}
          {role === "ngo" && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="space-y-4">
              {/* Document Upload */}
              <div className="rounded-[16px] bg-white p-4 shadow-sm border border-[#E8E8E4]">
                <h3 className="text-[16px] font-bold text-[#0A0A0A] mb-2" style={{ fontFamily: "var(--font-outfit)" }}>Verification Documents</h3>
                <div className="flex items-center justify-between rounded-[12px] bg-[#F5F5F7] p-3 border border-dashed border-[#AEAEB2]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-white text-[#1A6B3C]">
                      <Shield size={20} />
                    </div>
                    <div>
                      <div className="text-[14px] font-semibold text-[#0A0A0A]" style={{ fontFamily: "var(--font-jakarta)" }}>NGO Certificate 80G</div>
                      <div className="text-[11px] text-[#8A8A8A]">Tap to upload</div>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-[#8A8A8A]" />
                </div>
              </div>

              {/* Volunteer List */}
              <div className="rounded-[16px] bg-white p-4 shadow-sm border border-[#E8E8E4]">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[16px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Active Volunteers</h3>
                  <button className="text-[13px] font-medium text-[#1A6B3C]" style={{ fontFamily: "var(--font-jakarta)" }}>Invite</button>
                </div>
                <div className="flex flex-col gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-[#F5F5F7] last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-[#E8E8E4] overflow-hidden">
                          <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="avatar" />
                        </div>
                        <span className="text-[14px] font-medium text-[#0A0A0A]" style={{ fontFamily: "var(--font-jakarta)" }}>Volunteer {i}</span>
                      </div>
                      <span className="text-[11px] font-semibold text-[#1A6B3C] bg-[#F0F7F2] px-2 py-1 rounded-full">Available</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {MENU_SECTIONS.map((section, si) => (
            <motion.div key={si} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + si * 0.08 }}>
              <h3 className="mb-2 ml-2 text-[12px] font-bold uppercase tracking-wide text-[#4a4a4a]">{section.title}</h3>
              <div className="overflow-hidden bg-white" style={{ borderRadius: "18px", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)" }}>
                {section.items.map((item, ii) => { const Icon = item.icon; return (
                  <button key={ii} onClick={() => { if (item.action === "switch") setScreen("role-select"); }} className={`flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-[#faf7f3] ${ii > 0 ? "border-t border-[#f3efe9]" : ""}`}>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ecfdf5] text-[#047857]"><Icon size={16} /></div>
                    <div className="flex-1"><div className="text-[13px] font-semibold text-[#1a1a1a]">{item.label}</div><div className="text-[11px] text-[#8e8e93]">{item.sub}</div></div>
                    <ChevronRight size={16} className="text-[#8e8e93]" />
                  </button>
                ); })}
              </div>
            </motion.div>
          ))}

          <button onClick={() => setScreen("onboarding")} className="flex w-full items-center justify-center gap-2 bg-white py-3.5 text-[13px] font-semibold text-[#dc2626] active:scale-98" style={{ borderRadius: "14px", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)" }}>
            <LogOut size={16} />Log Out
          </button>
          <p className="text-center text-[11px] text-[#8e8e93]">Zero-Waste v1.0.0 · Made with care</p>
        </div>
      </main>
    </div>
  );
}
