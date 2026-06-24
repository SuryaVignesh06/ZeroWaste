"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { formatINR } from "./Countdown";
import { ChevronLeft, MapPin, Clock, CreditCard, Wallet, Banknote, Check, PartyPopper, Bike, Store, Package, Phone, MessageCircle, Star } from "lucide-react";

export function Checkout() {
  const cart = useAppStore((s) => s.cart);
  const cartTotal = useAppStore((s) => s.cartTotal);
  const cartSavings = useAppStore((s) => s.cartSavings);
  const clearCart = useAppStore((s) => s.clearCart);
  const setScreen = useAppStore((s) => s.setScreen);
  const [payment, setPayment] = useState<"upi" | "card" | "cod">("upi");
  const [slot, setSlot] = useState<"now" | "1h" | "2h">("now");
  const [confirmed, setConfirmed] = useState(false);
  const deliveryFee = 15;
  const total = cartTotal() + deliveryFee;

  const handlePlace = () => { setConfirmed(true); setTimeout(() => { clearCart(); setConfirmed(false); setScreen("order-tracking"); }, 1800); };

  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }} className="bg-[var(--color-zw-bg)]">
      <div className="bg-[var(--color-zw-bg)] px-5 py-4" style={{ zIndex: 10 }}>
        <div className="flex items-center gap-4">
          <button onClick={() => setScreen("home")} className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm active:scale-95 transition-transform"><ChevronLeft size={20} className="text-[var(--color-zw-ink)]" /></button>
          <h1 className="text-[24px] font-bold tracking-tight text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>Checkout</h1>
        </div>
      </div>

      <main style={{ flex: 1, minHeight: 0, overflowY: "auto", paddingBottom: "100px" }}>
        <div className="px-5 pt-4 space-y-5">
          <section>
            <h2 className="mb-3 text-[13px] font-bold uppercase tracking-wider text-[var(--color-zw-ink-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>Delivery Address</h2>
            <div className="bg-white p-5 shadow-sm" style={{ borderRadius: "28px" }}>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-pastel-green)] text-[var(--color-zw-ink)]"><MapPin size={20} /></div>
                <div className="flex-1"><div className="text-[16px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>Home</div><div className="text-[13px] font-medium text-[var(--color-zw-ink-secondary)] mt-1" style={{ fontFamily: "var(--font-jakarta)" }}>Flat 4B, Skyline Apartments, 8th Street, Anna Nagar West, Chennai 600040</div></div>
                <button className="rounded-full bg-[var(--color-zw-bg)] px-4 py-2 text-[13px] font-bold text-[var(--color-zw-ink)] shadow-sm active:scale-95 transition-transform">Change</button>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-[13px] font-bold uppercase tracking-wider text-[var(--color-zw-ink-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>Delivery Slot</h2>
            <div className="grid grid-cols-3 gap-3">
              {[{ id: "now", label: "Express", sub: "30-45 min" }, { id: "1h", label: "1 hour", sub: "60-75 min" }, { id: "2h", label: "2 hours", sub: "120-150 min" }].map((s) => (
                <button key={s.id} onClick={() => setSlot(s.id as any)} className="flex flex-col items-center p-4 transition-all shadow-sm active:scale-95" style={{ borderRadius: "24px", background: slot === s.id ? "var(--color-zw-ink)" : "#ffffff", border: slot === s.id ? "2px solid var(--color-zw-ink)" : "2px solid transparent" }}>
                  <Clock size={20} className={slot === s.id ? "text-white" : "text-[var(--color-zw-ink-secondary)]"} />
                  <span className={`mt-2 text-[14px] font-bold ${slot === s.id ? "text-white" : "text-[var(--color-zw-ink)]"}`} style={{ fontFamily: "var(--font-outfit)" }}>{s.label}</span>
                  <span className={`mt-1 text-[11px] font-medium ${slot === s.id ? "text-white/80" : "text-[var(--color-zw-ink-tertiary)]"}`} style={{ fontFamily: "var(--font-jakarta)" }}>{s.sub}</span>
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-[13px] font-bold uppercase tracking-wider text-[var(--color-zw-ink-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>Order Summary</h2>
            <div className="bg-white p-5 shadow-sm" style={{ borderRadius: "32px" }}>
              {cart.map((item, i) => (
                <div key={item.product.id} className={`flex items-center justify-between py-3 ${i > 0 ? "border-t border-[var(--color-zw-bg)]" : ""}`}>
                  <div className="flex items-center gap-3">
                    <div className={`relative flex h-14 w-14 overflow-hidden items-center justify-center bg-[var(--color-pastel-clay)]`} style={{ borderRadius: "16px" }}>
                      {item.product.imageUrl ? (
                        <img src={item.product.imageUrl} alt={item.product.name} className="absolute inset-0 h-full w-full object-cover" />
                      ) : (
                        <span className="text-[20px] font-bold text-[var(--color-zw-ink)]">{item.product.name.charAt(0)}</span>
                      )}
                    </div>
                    <div><div className="text-[15px] font-bold text-[var(--color-zw-ink)] line-clamp-1" style={{ fontFamily: "var(--font-outfit)" }}>{item.product.name}</div><div className="text-[13px] font-medium text-[var(--color-zw-ink-secondary)] mt-0.5" style={{ fontFamily: "var(--font-jakarta)" }}>{item.qty} × {formatINR(item.product.discountedPrice)}</div></div>
                  </div>
                  <span className="text-[16px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>{formatINR(item.qty * item.product.discountedPrice)}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-[13px] font-bold uppercase tracking-wider text-[var(--color-zw-ink-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>Payment Method</h2>
            <div className="space-y-3">
              {[{ id: "upi", icon: Wallet, label: "UPI", sub: "GPay, PhonePe, Paytm" }, { id: "card", icon: CreditCard, label: "Card", sub: "Visa, Mastercard, RuPay" }, { id: "cod", icon: Banknote, label: "Cash on Delivery", sub: "Pay when you receive" }].map((p) => {
                const Icon = p.icon; const active = payment === p.id;
                return (
                  <button key={p.id} onClick={() => setPayment(p.id as any)} className="flex w-full items-center gap-4 p-5 transition-all shadow-sm active:scale-95" style={{ borderRadius: "24px", background: active ? "var(--color-zw-ink)" : "#ffffff", border: active ? "2px solid var(--color-zw-ink)" : "2px solid transparent" }}>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: active ? "rgba(255,255,255,0.2)" : "var(--color-zw-bg)", color: active ? "#ffffff" : "var(--color-zw-ink)" }}><Icon size={22} /></div>
                    <div className="flex-1 text-left"><div className={`text-[16px] font-bold ${active ? "text-white" : "text-[var(--color-zw-ink)]"}`} style={{ fontFamily: "var(--font-outfit)" }}>{p.label}</div><div className={`text-[13px] font-medium mt-0.5 ${active ? "text-white/80" : "text-[var(--color-zw-ink-secondary)]"}`} style={{ fontFamily: "var(--font-jakarta)" }}>{p.sub}</div></div>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border-[2px]" style={{ borderColor: active ? "rgba(255,255,255,0.5)" : "var(--color-zw-ink-tertiary)", background: active ? "white" : "transparent" }}>{active && <Check size={14} strokeWidth={3} className="text-[var(--color-zw-ink)]" />}</div>
                  </button>
                );
              })}
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-[13px] font-bold uppercase tracking-wider text-[var(--color-zw-ink-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>Bill Details</h2>
            <div className="bg-white p-6 shadow-sm" style={{ borderRadius: "32px" }}>
              <div className="space-y-3 text-[14px] font-medium" style={{ fontFamily: "var(--font-jakarta)" }}>
                <div className="flex justify-between text-[var(--color-zw-ink-secondary)]"><span>Item total</span><span className="font-bold text-[var(--color-zw-ink)]">{formatINR(cartTotal())}</span></div>
                <div className="flex justify-between text-[var(--color-zw-ink-secondary)]"><span>Delivery fee</span><span className="font-bold text-[var(--color-zw-ink)]">{formatINR(deliveryFee)}</span></div>
                <div className="flex justify-between text-[var(--color-zw-ink-secondary)]"><span className="text-[var(--color-pastel-green)] text-shadow-sm font-bold drop-shadow-sm">You saved</span><span className="font-bold text-[var(--color-pastel-green)] drop-shadow-sm text-shadow-sm">-{formatINR(cartSavings())}</span></div>
                <div className="my-3 border-t border-dashed border-[var(--color-zw-ink-tertiary)] opacity-30" />
                <div className="flex justify-between"><span className="font-bold text-[var(--color-zw-ink)]">To Pay</span><span className="text-[18px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>{formatINR(total)}</span></div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <div className="bg-white/80 px-5 py-4 backdrop-blur-xl" style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}>
        <motion.button whileTap={{ scale: 0.96 }} onClick={handlePlace} className="flex h-14 w-full items-center justify-between text-white shadow-md bg-[var(--color-zw-ink)]" style={{ borderRadius: "99px" }}>
          <div className="text-left pl-6"><div className="text-[18px] font-bold" style={{ fontFamily: "var(--font-outfit)" }}>{formatINR(total)}</div><div className="text-[11px] font-medium text-white/80" style={{ fontFamily: "var(--font-jakarta)" }}>Tap to place order</div></div>
          <div className="flex items-center gap-2 pr-5 text-[15px] font-bold" style={{ fontFamily: "var(--font-jakarta)" }}>Place Order<Check size={20} strokeWidth={3} /></div>
        </motion.button>
      </div>

      <AnimatePresence>
        {confirmed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[var(--color-zw-bg)]">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 14 }} className="flex h-28 w-28 items-center justify-center rounded-full bg-[var(--color-zw-ink)] shadow-lg"><PartyPopper size={48} className="text-white" /></motion.div>
            <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="mt-6 text-[28px] font-bold text-[var(--color-zw-ink)] tracking-tight" style={{ fontFamily: "var(--font-outfit)" }}>Order Placed!</motion.h2>
            <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="mt-2 text-[15px] font-medium text-[var(--color-zw-ink-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>Preparing your order...</motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const TRACKING_STEPS = [
  { id: "placed", label: "Order Placed", icon: Check, sub: "Just now" },
  { id: "accepted", label: "Shop Accepted", icon: Store, sub: "2 min ago" },
  { id: "packing", label: "Packing", icon: Package, sub: "In progress" },
  { id: "out_for_delivery", label: "Out for Delivery", icon: Bike, sub: "Pending" },
  { id: "delivered", label: "Delivered", icon: Star, sub: "Pending" },
];

export function OrderTracking() {
  const setScreen = useAppStore((s) => s.setScreen);
  const [currentStep, setCurrentStep] = useState(2);
  useEffect(() => { const id = setInterval(() => { setCurrentStep((s) => (s < 4 ? s + 1 : s)); }, 6000); return () => clearInterval(id); }, []);

  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }} className="bg-[var(--color-zw-bg)]">
      <div className="bg-[var(--color-zw-bg)] px-5 py-4" style={{ zIndex: 10 }}>
        <div className="flex items-center gap-4">
          <button onClick={() => setScreen("home")} className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm active:scale-95 transition-transform"><ChevronLeft size={20} className="text-[var(--color-zw-ink)]" /></button>
          <div><h1 className="text-[20px] font-bold tracking-tight text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>Order Tracking</h1><p className="text-[12px] font-bold text-[var(--color-zw-ink-secondary)] mt-0.5" style={{ fontFamily: "var(--font-jakarta)" }}>Order #ZW{Math.floor(Math.random() * 9000) + 1000}</p></div>
        </div>
      </div>

      <main style={{ flex: 1, minHeight: 0, overflowY: "auto", paddingBottom: "120px" }}>
        <div className="px-5 pt-4 space-y-5">
          <div className="relative h-64 overflow-hidden bg-white shadow-sm" style={{ borderRadius: "32px" }}>
            <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(0deg, var(--color-pastel-clay) 1px, transparent 1px), linear-gradient(90deg, var(--color-pastel-clay) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
            <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none"><motion.path d="M 50 200 Q 150 100 280 80 T 360 50" stroke="var(--color-zw-ink)" strokeWidth="3" fill="none" strokeDasharray="6 6" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }} /></svg>
            <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="absolute bottom-12 left-8"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-pastel-green)] ring-4 ring-white shadow-md"><Store size={20} className="text-[var(--color-zw-ink)]" /></div></motion.div>
            <motion.div animate={{ left: ["8%", "20%", "35%", "55%", "75%"], top: ["75%", "55%", "40%", "30%", "20%"] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute"><div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-zw-ink)] ring-4 ring-white shadow-md"><Bike size={24} className="text-white" /></div></motion.div>
            <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }} className="absolute right-8 top-8"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-pastel-yellow)] ring-4 ring-white shadow-md"><MapPin size={20} className="text-[var(--color-zw-ink)]" /></div></motion.div>
          </div>

          <div className="flex items-center justify-between bg-white p-5 shadow-sm" style={{ borderRadius: "28px" }}>
            <div><div className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-zw-ink-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>Arriving in</div><div className="text-[20px] font-bold text-[var(--color-zw-ink)] mt-1" style={{ fontFamily: "var(--font-outfit)" }}>12 mins</div></div>
            <div className="flex items-center gap-3">
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-zw-bg)] text-[var(--color-zw-ink)] active:scale-90 transition-transform shadow-sm"><Phone size={20} /></button>
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-zw-bg)] text-[var(--color-zw-ink)] active:scale-90 transition-transform shadow-sm"><MessageCircle size={20} /></button>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white p-5 shadow-sm" style={{ borderRadius: "28px" }}>
            <div className="flex h-14 w-14 items-center justify-center rounded-full text-[20px] font-bold text-[var(--color-zw-ink)] bg-[var(--color-pastel-blue)] shadow-sm" style={{ fontFamily: "var(--font-outfit)" }}>A</div>
            <div className="flex-1"><div className="text-[16px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>Arjun K.</div><div className="flex items-center gap-1.5 text-[13px] font-medium text-[var(--color-zw-ink-secondary)] mt-1" style={{ fontFamily: "var(--font-jakarta)" }}><Star size={14} className="fill-[var(--color-zw-ink)] text-[var(--color-zw-ink)]" /><span className="font-bold text-[var(--color-zw-ink)]">4.9</span><span>· 218 deliveries</span></div></div>
            <div className="rounded-full bg-[var(--color-pastel-yellow)] px-3 py-1.5 shadow-sm"><span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-jakarta)" }}>TN45 AB 1234</span></div>
          </div>

          <div className="bg-white p-6 shadow-sm" style={{ borderRadius: "32px" }}>
            <h3 className="text-[14px] font-bold uppercase tracking-wider text-[var(--color-zw-ink-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>Order Status</h3>
            <div className="mt-5 space-y-2">
              {TRACKING_STEPS.map((s, i) => { const Icon = s.icon; const done = i <= currentStep; const active = i === currentStep; return (
                <div key={s.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <motion.div initial={false} animate={{ backgroundColor: done ? "var(--color-zw-ink)" : "var(--color-zw-bg)", scale: active ? 1.1 : 1 }} className="flex h-10 w-10 items-center justify-center rounded-full"><Icon size={20} className={done ? "text-white" : "text-[var(--color-zw-ink-tertiary)]"} /></motion.div>
                    {i < TRACKING_STEPS.length - 1 && (<div className="relative my-2 h-10 w-[3px] overflow-hidden rounded-full bg-[var(--color-zw-bg)]"><motion.div initial={false} animate={{ height: i < currentStep ? "100%" : "0%" }} transition={{ duration: 0.4 }} className="absolute inset-x-0 top-0 bg-[var(--color-zw-ink)]" /></div>)}
                  </div>
                  <div className="pb-3 pt-2"><div className={`text-[15px] font-bold ${done ? "text-[var(--color-zw-ink)]" : "text-[var(--color-zw-ink-secondary)]"}`} style={{ fontFamily: "var(--font-outfit)" }}>{s.label}</div><div className={`text-[13px] font-medium mt-0.5 ${done ? "text-[var(--color-zw-ink-secondary)]" : "text-[var(--color-zw-ink-tertiary)]"}`} style={{ fontFamily: "var(--font-jakarta)" }}>{s.sub}</div></div>
                </div>
              ); })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
