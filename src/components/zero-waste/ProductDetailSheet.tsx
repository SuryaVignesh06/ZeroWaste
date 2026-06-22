"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { Countdown, formatINR, daysUntil } from "./Countdown";
import {
  X,
  MapPin,
  Star,
  Plus,
  Minus,
  Sparkles,
  ShieldCheck,
  Clock,
  ShoppingBag,
  Trash2,
  ChevronRight,
  Check,
} from "lucide-react";

export function ProductDetailSheet() {
  const product = useAppStore((s) => s.activeProduct);
  const setActiveProduct = useAppStore((s) => s.setActiveProduct);
  const addToCart = useAppStore((s) => s.addToCart);
  const setCartOpen = useAppStore((s) => s.setCartOpen);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  // Reset state when a different product opens
  const [lastProductId, setLastProductId] = useState<string | null>(null);
  if (product && product.id !== lastProductId) {
    setLastProductId(product.id);
    setQty(1);
    setAdded(false);
  }

  const discountPct = product
    ? Math.round(
        ((product.originalPrice - product.discountedPrice) /
          product.originalPrice) *
          100
      )
    : 0;

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => {
      setActiveProduct(null);
      setCartOpen(true);
    }, 800);
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProduct(null)}
            className="absolute inset-0 z-40 bg-black/40 backdrop-blur-md"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 36 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100) setActiveProduct(null);
            }}
            className="absolute inset-x-0 bottom-0 z-50 max-h-[92%] overflow-y-auto zw-scroll rounded-t-[2rem] glass-strong no-scrollbar"
          >
            {/* Drag handle */}
            <div className="sticky top-0 z-10 flex justify-center bg-white/40 backdrop-blur-xl pt-3 pb-2">
              <div className="h-1.5 w-10 rounded-full bg-zw-text-muted/40" />
            </div>

            {/* Close */}
            <button
              onClick={() => setActiveProduct(null)}
              className="absolute right-4 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full glass-strong shadow-md"
            >
              <X size={18} className="text-zw-text-primary" />
            </button>

            {/* Hero image */}
            <div
              className={`relative h-60 w-full overflow-hidden rounded-t-[2rem] bg-gradient-to-br ${product.imageColor}`}
            >
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/30 blur-2xl" />
              <div className="absolute left-4 top-4 rounded-full bg-white/95 backdrop-blur-md px-3 py-1.5 text-[12px] font-bold text-zw-primary-700 shadow-md">
                {discountPct}% OFF
              </div>
              {product.isAiMatch && (
                <div className="absolute right-16 top-4 flex items-center gap-1.5 rounded-full bg-zw-primary-700/95 backdrop-blur-md px-3 py-1.5 shadow-md">
                  <Sparkles size={12} className="text-white" />
                  <span className="text-[11px] font-bold uppercase tracking-wide text-white">
                    AI Matched
                  </span>
                </div>
              )}
              <div className="flex h-full items-center justify-center">
                <span className="font-display text-8xl font-bold text-white/80 drop-shadow-md">
                  {product.name.charAt(0)}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="px-5 pb-32 pt-5">
              {/* Shop info */}
              <div className="flex items-center justify-between text-[12px] text-zw-text-secondary">
                <div className="flex items-center gap-1">
                  <MapPin size={12} />
                  <span className="font-medium">
                    {product.shopName} · {product.shopDistanceKm}km away
                  </span>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-zw-primary-50 px-2 py-0.5">
                  <Star size={11} className="fill-zw-warning text-zw-warning" />
                  <span className="font-bold text-zw-text-primary">
                    {product.shopRating}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h2 className="mt-2 font-display text-2xl font-bold leading-tight tracking-tight text-zw-text-primary">
                {product.name}
              </h2>

              {/* Price */}
              <div className="mt-3 flex items-end gap-3">
                <span className="font-display text-3xl font-bold text-zw-text-primary">
                  {formatINR(product.discountedPrice)}
                </span>
                <span className="mb-1 text-base text-zw-text-muted line-through">
                  {formatINR(product.originalPrice)}
                </span>
                <span className="mb-1.5 rounded-full bg-zw-primary-100 px-2.5 py-1 text-[11px] font-bold text-zw-primary-800">
                  Save {formatINR(product.originalPrice - product.discountedPrice)}
                </span>
              </div>

              {/* AI freshness card */}
              <div className="mt-4 overflow-hidden rounded-3xl glass glass-inset p-4">
                <div className="flex items-center gap-2">
                  <div className="zw-ai-border h-7 w-7 rounded-lg p-[1.5px]">
                    <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-white">
                      <Sparkles size={13} className="text-zw-primary-700" />
                    </div>
                  </div>
                  <span className="text-[13px] font-bold text-zw-text-primary">
                    AI Freshness Analysis
                  </span>
                  <span className="ml-auto text-[11px] font-bold text-zw-primary-700">
                    {Math.round(product.aiConfidence * 100)}%
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white/60 p-2.5">
                    <div className="text-[10px] font-medium uppercase tracking-wide text-zw-text-muted">
                      Best before
                    </div>
                    <div className="text-[13px] font-bold text-zw-text-primary">
                      {daysUntil(product.bestBefore)} days
                    </div>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-br from-zw-primary-50 to-white p-2.5">
                    <div className="text-[10px] font-medium uppercase tracking-wide text-zw-text-muted">
                      Safe until (AI)
                    </div>
                    <div className="text-[13px] font-bold text-zw-primary-700">
                      {daysUntil(product.aiPredictedSafeUntil)} days
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-4">
                <h3 className="font-display text-sm font-bold text-zw-text-primary">
                  About this product
                </h3>
                <p className="mt-1 text-[13px] leading-relaxed text-zw-text-secondary">
                  {product.description}
                </p>
              </div>

              {/* Trust badges */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                <TrustBadge
                  icon={<ShieldCheck size={16} className="text-zw-primary-700" />}
                  label="Quality checked"
                />
                <TrustBadge
                  icon={<Clock size={16} className="text-zw-primary-700" />}
                  label="Fast pickup"
                />
                <TrustBadge
                  icon={
                    <ShoppingBag size={16} className="text-zw-primary-700" />
                  }
                  label={`${product.quantity} ${product.unit} left`}
                />
              </div>
            </div>

            {/* Sticky bottom CTA */}
            <div className="absolute inset-x-0 bottom-0 px-5 py-3">
              <div className="absolute inset-0 -z-10 bg-white/80 backdrop-blur-xl border-t border-zw-border-strong" />
              <div className="flex items-center gap-3">
                <div className="flex h-12 items-center rounded-2xl glass px-1">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-zw-text-primary active:scale-90"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-7 text-center font-display text-base font-bold">
                    {qty}
                  </span>
                  <button
                    onClick={() =>
                      setQty((q) => Math.min(product.quantity, q + 1))
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-zw-text-primary active:scale-90"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAddToCart}
                  className="flex h-12 flex-1 items-center justify-between rounded-2xl glass-primary px-4 text-white"
                >
                  <span className="text-[13px] font-semibold">
                    {added ? "Added!" : "Add to cart"}
                  </span>
                  <AnimatePresence mode="wait">
                    {added ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0 }}
                      >
                        <Check size={18} strokeWidth={3} />
                      </motion.div>
                    ) : (
                      <motion.span
                        key="price"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="font-display text-sm font-bold"
                      >
                        {formatINR(product.discountedPrice * qty)}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function TrustBadge({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl glass p-2.5 text-center">
      {icon}
      <span className="text-[10px] font-medium leading-tight text-zw-text-secondary">
        {label}
      </span>
    </div>
  );
}

// =================== CART SHEET ===================

export function CartSheet() {
  const isOpen = useAppStore((s) => s.isCartOpen);
  const setCartOpen = useAppStore((s) => s.setCartOpen);
  const cart = useAppStore((s) => s.cart);
  const updateQty = useAppStore((s) => s.updateQty);
  const removeFromCart = useAppStore((s) => s.removeFromCart);
  const cartTotal = useAppStore((s) => s.cartTotal);
  const cartSavings = useAppStore((s) => s.cartSavings);
  const cartCount = useAppStore((s) => s.cartCount);
  const setScreen = useAppStore((s) => s.setScreen);

  const deliveryFee = cart.length > 0 ? 15 : 0;
  const total = cartTotal() + deliveryFee;

  const handleCheckout = () => {
    setCartOpen(false);
    setScreen("checkout");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="absolute inset-0 z-40 bg-black/40 backdrop-blur-md"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 36 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100) setCartOpen(false);
            }}
            className="absolute inset-x-0 bottom-0 z-50 max-h-[85%] overflow-y-auto zw-scroll rounded-t-[2rem] glass-strong no-scrollbar"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between bg-white/60 backdrop-blur-xl px-5 py-3 border-b border-zw-border-strong">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-10 rounded-full bg-zw-text-muted/40 absolute left-1/2 top-1.5 -translate-x-1/2" />
                <h3 className="font-display text-lg font-bold tracking-tight text-zw-text-primary">
                  Your Cart
                </h3>
                <span className="rounded-full bg-zw-primary-100 px-2 py-0.5 text-[11px] font-bold text-zw-primary-800">
                  {cartCount()} items
                </span>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full glass"
              >
                <X size={16} className="text-zw-text-secondary" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full glass">
                  <ShoppingBag size={32} className="text-zw-text-muted" />
                </div>
                <h4 className="mt-4 font-display text-base font-bold text-zw-text-primary">
                  Your cart is empty
                </h4>
                <p className="mt-1 text-[12px] text-zw-text-secondary">
                  Add products to start saving food
                </p>
                <button
                  onClick={() => {
                    setCartOpen(false);
                    setScreen("marketplace");
                  }}
                  className="mt-4 rounded-2xl glass-primary px-5 py-2.5 text-[13px] font-semibold text-white"
                >
                  Browse marketplace
                </button>
              </div>
            ) : (
              <>
                <div className="px-5 py-4">
                  {cart.map((item, i) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: i * 0.05 }}
                      className="mb-3 flex gap-3 rounded-3xl glass glass-inset p-3"
                    >
                      <div
                        className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${item.product.imageColor}`}
                      >
                        <span className="font-display text-2xl font-bold text-white/80">
                          {item.product.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="line-clamp-1 text-[13px] font-bold text-zw-text-primary">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-zw-text-muted">
                          {item.product.shopName}
                        </p>
                        <div className="mt-1 flex items-center gap-1.5">
                          <span className="font-display text-sm font-bold text-zw-text-primary">
                            {formatINR(item.product.discountedPrice)}
                          </span>
                          <span className="text-[11px] text-zw-text-muted line-through">
                            {formatINR(item.product.originalPrice)}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg glass text-zw-danger active:scale-90"
                        >
                          <Trash2 size={14} />
                        </button>
                        <div className="flex h-8 items-center rounded-xl glass">
                          <button
                            onClick={() =>
                              updateQty(item.product.id, item.qty - 1)
                            }
                            className="flex h-8 w-7 items-center justify-center text-zw-text-primary active:scale-90"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-5 text-center text-[12px] font-bold">
                            {item.qty}
                          </span>
                          <button
                            onClick={() =>
                              updateQty(item.product.id, item.qty + 1)
                            }
                            className="flex h-8 w-7 items-center justify-center text-zw-text-primary active:scale-90"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Savings banner */}
                <div className="mx-5 mb-3 flex items-center gap-2 rounded-2xl glass-primary px-4 py-3">
                  <Sparkles size={16} className="text-white" />
                  <span className="text-[12px] font-semibold text-white">
                    You're saving {formatINR(cartSavings())} on this order
                  </span>
                </div>

                {/* Bill summary */}
                <div className="mx-5 mb-3 rounded-3xl glass glass-inset p-4">
                  <h4 className="font-display text-sm font-bold text-zw-text-primary">
                    Bill Details
                  </h4>
                  <div className="mt-3 space-y-2 text-[13px]">
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
                    <div className="my-2 border-t border-dashed border-zw-border-strong" />
                    <div className="flex justify-between">
                      <span className="font-display font-bold text-zw-text-primary">
                        To Pay
                      </span>
                      <span className="font-display text-base font-bold text-zw-text-primary">
                        {formatINR(total)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checkout CTA */}
                <div className="sticky bottom-0 px-5 py-3">
                  <div className="absolute inset-0 -z-10 bg-white/80 backdrop-blur-xl border-t border-zw-border-strong" />
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleCheckout}
                    className="flex h-12 w-full items-center justify-between rounded-2xl glass-primary px-4 text-white"
                  >
                    <div className="text-left">
                      <div className="font-display text-base font-bold">
                        {formatINR(total)}
                      </div>
                      <div className="text-[10px] text-white/80">
                        {cartCount()} items
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[13px] font-semibold">
                      Checkout
                      <ChevronRight size={16} />
                    </div>
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
