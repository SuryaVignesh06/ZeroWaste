"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { formatINR } from "./Countdown";
import {
  ChevronLeft,
  MapPin,
  Clock,
  CreditCard,
  Wallet,
  Banknote,
  Check,
  PartyPopper,
  Bike,
  Store,
  Package,
  Navigation,
  Phone,
  MessageCircle,
  Star,
} from "lucide-react";

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

  const handlePlace = () => {
    setConfirmed(true);
    setTimeout(() => {
      clearCart();
      setConfirmed(false);
      setScreen("order-tracking");
    }, 1800);
  };

  return (
    <div className="flex h-full flex-col bg-zw-bg-base">
      {/* Header */}
      <div className="sticky top-0 z-30 flex items-center gap-3 border-b border-zw-border/60 bg-white px-5 py-4">
        <button
          onClick={() => setScreen("home")}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-zw-border bg-white active:scale-95"
        >
          <ChevronLeft size={18} />
        </button>
        <h1 className="font-display text-lg font-bold text-zw-text-primary">
          Checkout
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-32 pt-4">
        {/* Address */}
        <section>
          <h2 className="mb-2 font-display text-[13px] font-bold uppercase tracking-wide text-zw-text-secondary">
            Delivery Address
          </h2>
          <div className="rounded-2xl border border-zw-border bg-white p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zw-primary-50 text-zw-primary-700">
                <MapPin size={16} />
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-bold text-zw-text-primary">
                  Home
                </div>
                <div className="text-[12px] text-zw-text-secondary">
                  Flat 4B, Skyline Apartments, 8th Street, Anna Nagar West,
                  Chennai 600040
                </div>
              </div>
              <button className="text-[12px] font-semibold text-zw-primary-700">
                Change
              </button>
            </div>
          </div>
        </section>

        {/* Slot */}
        <section className="mt-5">
          <h2 className="mb-2 font-display text-[13px] font-bold uppercase tracking-wide text-zw-text-secondary">
            Delivery Slot
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "now", label: "Express", sub: "30-45 min" },
              { id: "1h", label: "1 hour", sub: "in 60-75 min" },
              { id: "2h", label: "2 hours", sub: "in 120-150 min" },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setSlot(s.id as any)}
                className={`flex flex-col items-center rounded-xl border p-3 transition-all ${
                  slot === s.id
                    ? "border-zw-primary-600 bg-zw-primary-50"
                    : "border-zw-border bg-white"
                }`}
              >
                <Clock
                  size={16}
                  className={
                    slot === s.id ? "text-zw-primary-700" : "text-zw-text-muted"
                  }
                />
                <span
                  className={`mt-1 text-[12px] font-bold ${
                    slot === s.id ? "text-zw-primary-900" : "text-zw-text-primary"
                  }`}
                >
                  {s.label}
                </span>
                <span className="text-[10px] text-zw-text-muted">{s.sub}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Items summary */}
        <section className="mt-5">
          <h2 className="mb-2 font-display text-[13px] font-bold uppercase tracking-wide text-zw-text-secondary">
            Order Summary
          </h2>
          <div className="rounded-2xl border border-zw-border bg-white p-4">
            {cart.map((item, i) => (
              <div
                key={item.product.id}
                className={`flex items-center justify-between py-2 ${
                  i > 0 ? "border-t border-zw-border" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${item.product.imageColor}`}
                  >
                    <span className="font-display text-sm font-bold text-white/70">
                      {item.product.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="text-[12px] font-semibold text-zw-text-primary line-clamp-1">
                      {item.product.name}
                    </div>
                    <div className="text-[10px] text-zw-text-muted">
                      {item.qty} × {formatINR(item.product.discountedPrice)}
                    </div>
                  </div>
                </div>
                <span className="font-display text-[13px] font-bold">
                  {formatINR(item.qty * item.product.discountedPrice)}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Payment */}
        <section className="mt-5">
          <h2 className="mb-2 font-display text-[13px] font-bold uppercase tracking-wide text-zw-text-secondary">
            Payment Method
          </h2>
          <div className="space-y-2">
            <PaymentOption
              id="upi"
              icon={<Wallet size={18} />}
              label="UPI"
              sub="GPay, PhonePe, Paytm"
              active={payment === "upi"}
              onClick={() => setPayment("upi")}
            />
            <PaymentOption
              id="card"
              icon={<CreditCard size={18} />}
              label="Card"
              sub="Visa, Mastercard, RuPay"
              active={payment === "card"}
              onClick={() => setPayment("card")}
            />
            <PaymentOption
              id="cod"
              icon={<Banknote size={18} />}
              label="Cash on Delivery"
              sub="Pay when you receive"
              active={payment === "cod"}
              onClick={() => setPayment("cod")}
            />
          </div>
        </section>

        {/* Bill */}
        <section className="mt-5">
          <h2 className="mb-2 font-display text-[13px] font-bold uppercase tracking-wide text-zw-text-secondary">
            Bill Details
          </h2>
          <div className="rounded-2xl border border-zw-border bg-white p-4">
            <div className="space-y-2 text-[13px]">
              <div className="flex justify-between text-zw-text-secondary">
                <span>Item total</span>
                <span className="font-medium text-zw-text-primary">
                  {formatINR(cartTotal())}
                </span>
              </div>
              <div className="flex justify-between text-zw-text-secondary">
                <span>Delivery fee</span>
                <span className="font-medium text-zw-text-primary">
                  {formatINR(deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between text-zw-success">
                <span>You saved</span>
                <span className="font-medium">-{formatINR(cartSavings())}</span>
              </div>
              <div className="my-2 border-t border-dashed border-zw-border" />
              <div className="flex justify-between">
                <span className="font-display text-sm font-bold">To Pay</span>
                <span className="font-display text-base font-bold">
                  {formatINR(total)}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Place order */}
      <div className="border-t border-zw-border bg-white px-5 py-3">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handlePlace}
          className="flex h-12 w-full items-center justify-between rounded-xl bg-zw-primary-700 px-4 text-white shadow-lg shadow-zw-primary-700/25"
        >
          <div className="text-left">
            <div className="font-display text-base font-bold">
              {formatINR(total)}
            </div>
            <div className="text-[10px] text-white/70">Tap to place order</div>
          </div>
          <div className="flex items-center gap-1 text-[13px] font-semibold">
            Place Order
            <Check size={16} strokeWidth={3} />
          </div>
        </motion.button>
      </div>

      <AnimatePresence>
        {confirmed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-lg"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-zw-primary-500 to-zw-primary-800 shadow-2xl shadow-zw-primary-700/30"
            >
              <PartyPopper size={44} className="text-white" />
            </motion.div>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-5 font-display text-xl font-bold text-zw-text-primary"
            >
              Order Placed!
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-1 text-[12px] text-zw-text-secondary"
            >
              Preparing your order...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PaymentOption({
  icon,
  label,
  sub,
  active,
  onClick,
}: {
  id: string;
  icon: React.ReactNode;
  label: string;
  sub: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl border p-3.5 transition-all ${
        active
          ? "border-zw-primary-600 bg-zw-primary-50"
          : "border-zw-border bg-white"
      }`}
    >
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
          active ? "bg-zw-primary-700 text-white" : "bg-zw-bg-muted text-zw-text-secondary"
        }`}
      >
        {icon}
      </div>
      <div className="flex-1 text-left">
        <div className="text-[13px] font-bold text-zw-text-primary">{label}</div>
        <div className="text-[11px] text-zw-text-muted">{sub}</div>
      </div>
      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
          active ? "border-zw-primary-700 bg-zw-primary-700" : "border-zw-border"
        }`}
      >
        {active && <Check size={12} strokeWidth={3} className="text-white" />}
      </div>
    </button>
  );
}

// =========== ORDER TRACKING ===========

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

  // Simulate progress
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentStep((s) => (s < 4 ? s + 1 : s));
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-full flex-col bg-zw-bg-base">
      {/* Header */}
      <div className="sticky top-0 z-30 flex items-center gap-3 border-b border-zw-border/60 bg-white px-5 py-4">
        <button
          onClick={() => setScreen("home")}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-zw-border bg-white active:scale-95"
        >
          <ChevronLeft size={18} />
        </button>
        <div>
          <h1 className="font-display text-base font-bold text-zw-text-primary">
            Order Tracking
          </h1>
          <p className="text-[11px] text-zw-text-secondary">
            Order #ZW{Math.floor(Math.random() * 9000) + 1000}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        {/* Map */}
        <div className="relative h-64 overflow-hidden bg-zw-bg-muted">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(0deg, var(--color-zw-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-zw-border) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Route polyline */}
          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
            <motion.path
              d="M 50 200 Q 150 100 280 80 T 360 50"
              stroke="var(--color-zw-primary-600)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="6 6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </svg>

          {/* Pickup pin */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute bottom-12 left-8"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zw-primary-700 ring-4 ring-white">
              <Store size={16} className="text-white" />
            </div>
          </motion.div>

          {/* Volunteer marker */}
          <motion.div
            animate={{
              left: ["8%", "20%", "35%", "55%", "75%"],
              top: ["75%", "55%", "40%", "30%", "20%"],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute"
          >
            <div className="zw-urgency-pulse-amber relative flex h-10 w-10 items-center justify-center rounded-full bg-zw-accent-600 ring-4 ring-white">
              <Bike size={18} className="text-white" />
            </div>
          </motion.div>

          {/* Drop pin */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
            className="absolute right-8 top-8"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zw-primary-900 ring-4 ring-white">
              <MapPin size={16} className="text-white" />
            </div>
          </motion.div>

          {/* ETA */}
          <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-white/95 px-4 py-2 backdrop-blur-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] font-medium uppercase tracking-wide text-zw-text-muted">
                  Arriving in
                </div>
                <div className="font-display text-base font-bold text-zw-text-primary">
                  12 mins
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-zw-primary-50 text-zw-primary-700">
                  <Phone size={16} />
                </button>
                <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-zw-primary-50 text-zw-primary-700">
                  <MessageCircle size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Volunteer card */}
        <div className="px-5 pt-4">
          <div className="flex items-center gap-3 rounded-2xl border border-zw-border bg-white p-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-zw-primary-500 to-zw-primary-800 font-display text-base font-bold text-white">
              A
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-bold text-zw-text-primary">
                Arjun K.
              </div>
              <div className="flex items-center gap-1 text-[11px] text-zw-text-secondary">
                <Star size={10} className="fill-zw-warning text-zw-warning" />
                <span className="font-semibold">4.9</span>
                <span>· 218 deliveries</span>
              </div>
            </div>
            <div className="rounded-lg bg-zw-primary-50 px-2 py-1">
              <span className="text-[10px] font-bold text-zw-primary-700">
                TN45 AB 1234
              </span>
            </div>
          </div>
        </div>

        {/* Status timeline */}
        <div className="mt-5 px-5">
          <h3 className="font-display text-[13px] font-bold uppercase tracking-wide text-zw-text-secondary">
            Order Status
          </h3>
          <div className="mt-3 space-y-1">
            {TRACKING_STEPS.map((s, i) => {
              const Icon = s.icon;
              const done = i <= currentStep;
              const active = i === currentStep;
              return (
                <div key={s.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={false}
                      animate={{
                        backgroundColor: done
                          ? "var(--color-zw-primary-700)"
                          : "var(--color-zw-bg-muted)",
                        scale: active ? 1.1 : 1,
                      }}
                      className="flex h-9 w-9 items-center justify-center rounded-full"
                    >
                      <Icon
                        size={16}
                        className={done ? "text-white" : "text-zw-text-muted"}
                      />
                    </motion.div>
                    {i < TRACKING_STEPS.length - 1 && (
                      <div className="relative my-1 h-8 w-0.5 overflow-hidden bg-zw-border">
                        <motion.div
                          initial={false}
                          animate={{ height: i < currentStep ? "100%" : "0%" }}
                          transition={{ duration: 0.4 }}
                          className="absolute inset-x-0 top-0 bg-zw-primary-700"
                        />
                      </div>
                    )}
                  </div>
                  <div className="pb-2 pt-1">
                    <div
                      className={`text-[13px] font-semibold ${
                        done ? "text-zw-text-primary" : "text-zw-text-muted"
                      }`}
                    >
                      {s.label}
                    </div>
                    <div className="text-[11px] text-zw-text-muted">{s.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
