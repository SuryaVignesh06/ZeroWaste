"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { Countdown, formatINR, daysUntil } from "./Countdown";
import {
  X, MapPin, Star, Plus, Minus, Sparkles, ShieldCheck, Clock,
  ShoppingBag, Trash2, ChevronRight, Check,
} from "lucide-react";

export function ProductDetailSheet() {
  const product = useAppStore((s) => s.activeProduct);
  const setActiveProduct = useAppStore((s) => s.setActiveProduct);
  const addToCart = useAppStore((s) => s.addToCart);
  const setCartOpen = useAppStore((s) => s.setCartOpen);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const [lastProductId, setLastProductId] = useState<string | null>(null);
  if (product && product.id !== lastProductId) {
    setLastProductId(product.id);
    setQty(1);
    setAdded(false);
  }

  const discountPct = product ? Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100) : 0;

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => { setActiveProduct(null); setCartOpen(true); }, 800);
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveProduct(null)} className="absolute inset-0 z-40 glass-overlay" />
          <motion.div
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 36 }}
            drag="y" dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => { if (info.offset.y > 100) setActiveProduct(null); }}
            className="absolute inset-x-0 bottom-0 z-50 max-h-[92%] overflow-y-auto glass-sheet bg-[var(--color-zw-bg)]"
            style={{ borderRadius: "40px 40px 0 0", boxShadow: "0 -8px 32px rgba(0,0,0,0.12)" }}
          >
            <div className="sticky top-0 z-10 flex justify-center pt-4 pb-2 bg-transparent">
              <div className="h-1.5 w-12 rounded-full bg-[var(--color-zw-ink)]/20" />
            </div>
            <button onClick={() => setActiveProduct(null)} className="absolute right-5 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-transform active:scale-95">
              <X size={20} className="text-[var(--color-zw-ink)]" />
            </button>

            <div className={`relative h-64 w-full overflow-hidden bg-[var(--color-pastel-clay)]`} style={{ borderTopLeftRadius: "40px", borderTopRightRadius: "40px", marginTop: "-30px" }}>
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[64px] font-bold text-[var(--color-zw-ink)]">{product.name.charAt(0)}</span>
                </div>
              )}
              <div className="absolute left-5 top-12 rounded-full bg-[var(--color-zw-urgent-red)] px-4 py-2 text-[12px] font-bold text-[var(--color-zw-ink)] shadow-sm" style={{ fontFamily: "var(--font-jakarta)" }}>
                {discountPct}% OFF
              </div>
              {product.isAiMatch && (
                <div className="absolute right-5 top-12 flex items-center gap-1.5 rounded-full bg-[var(--color-pastel-green)] px-4 py-2 shadow-sm">
                  <Sparkles size={14} className="text-[var(--color-zw-ink)]" />
                  <span className="text-[12px] font-bold uppercase tracking-wider text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-jakarta)" }}>AI Matched</span>
                </div>
              )}
            </div>

            <div className="px-5 pb-32 pt-5">
              <div className="flex items-center justify-between text-[13px] text-[var(--color-zw-ink-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} />
                  <span className="font-medium">{product.shopName} · {product.shopDistanceKm}km away</span>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-[var(--color-pastel-yellow)] px-2.5 py-1">
                  <Star size={12} className="fill-[var(--color-zw-ink)] text-[var(--color-zw-ink)]" />
                  <span className="font-bold text-[var(--color-zw-ink)]">{product.shopRating}</span>
                </div>
              </div>

              <h2 className="mt-3 text-[28px] font-bold leading-tight tracking-tight text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>{product.name}</h2>

              <div className="mt-4 flex items-end gap-3">
                <span className="text-[36px] font-bold text-[var(--color-zw-ink)] leading-none" style={{ fontFamily: "var(--font-outfit)" }}>{formatINR(product.discountedPrice)}</span>
                <span className="mb-1 text-[18px] font-medium text-[var(--color-zw-ink-tertiary)] line-through" style={{ fontFamily: "var(--font-jakarta)" }}>{formatINR(product.originalPrice)}</span>
                <span className="mb-2 rounded-full bg-[var(--color-pastel-green)] px-3 py-1 text-[12px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-jakarta)" }}>Save {formatINR(product.originalPrice - product.discountedPrice)}</span>
              </div>

              <div className="mt-6 overflow-hidden p-5 shadow-sm" style={{ borderRadius: "32px", background: "white" }}>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-pastel-green)]">
                    <Sparkles size={20} className="text-[var(--color-zw-ink)]" />
                  </div>
                  <span className="text-[15px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>AI Freshness Analysis</span>
                  <span className="ml-auto rounded-full bg-[var(--color-zw-bg)] px-3 py-1 text-[13px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-jakarta)" }}>{Math.round(product.aiConfidence * 100)}%</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-[var(--color-zw-bg)] p-4">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-zw-ink-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>Best before</div>
                    <div className="mt-1 text-[16px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>{daysUntil(product.bestBefore)} days</div>
                  </div>
                  <div className="rounded-2xl bg-[var(--color-zw-bg)] p-4">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-zw-ink-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>Safe until (AI)</div>
                    <div className="mt-1 text-[16px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>{daysUntil(product.aiPredictedSafeUntil)} days</div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-[18px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>About this product</h3>
                <p className="mt-2 text-[14px] leading-relaxed font-medium text-[var(--color-zw-ink-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>{product.description}</p>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <TrustBadge icon={<ShieldCheck size={20} className="text-[var(--color-zw-ink)]" />} label="Quality checked" />
                <TrustBadge icon={<Clock size={20} className="text-[var(--color-zw-ink)]" />} label="Fast pickup" />
                <TrustBadge icon={<ShoppingBag size={20} className="text-[var(--color-zw-ink)]" />} label={`${product.quantity} ${product.unit} left`} />
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 bg-white/80 px-5 py-4 backdrop-blur-xl" style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}>
              <div className="flex items-center gap-3">
                <div className="flex h-14 items-center rounded-full bg-[var(--color-zw-bg)] px-2">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-zw-ink)] active:scale-95 transition-transform bg-white shadow-sm">
                    <Minus size={18} />
                  </button>
                  <span className="w-8 text-center text-[18px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>{qty}</span>
                  <button onClick={() => setQty((q) => Math.min(product.quantity, q + 1))} className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-zw-ink)] active:scale-95 transition-transform bg-white shadow-sm">
                    <Plus size={18} />
                  </button>
                </div>
                <motion.button whileTap={{ scale: 0.95 }} onClick={handleAddToCart} className="flex h-14 flex-1 items-center justify-between rounded-full text-white shadow-md bg-[var(--color-zw-ink)]">
                  <span className="text-[16px] font-bold pl-6" style={{ fontFamily: "var(--font-jakarta)" }}>{added ? "Added!" : "Add to cart"}</span>
                  <AnimatePresence mode="wait">
                    {added ? (
                      <motion.div key="check" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }} className="pr-6">
                        <Check size={20} strokeWidth={3} />
                      </motion.div>
                    ) : (
                      <motion.span key="price" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pr-6 text-[18px] font-bold" style={{ fontFamily: "var(--font-outfit)" }}>
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

function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 bg-[var(--color-zw-bg)] p-3 text-center" style={{ borderRadius: "24px" }}>
      {icon}
      <span className="text-[11px] font-bold leading-tight text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-jakarta)" }}>{label}</span>
    </div>
  );
}

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

  const handleCheckout = () => { setCartOpen(false); setScreen("checkout"); };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCartOpen(false)} className="absolute inset-0 z-40 glass-overlay" />
          <motion.div
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 36 }}
            drag="y" dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => { if (info.offset.y > 100) setCartOpen(false); }}
            className="absolute inset-x-0 bottom-0 z-50 max-h-[85%] overflow-y-auto bg-[var(--color-zw-bg)]"
            style={{ borderRadius: "40px 40px 0 0", boxShadow: "0 -8px 32px rgba(0,0,0,0.12)" }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between bg-white/80 px-6 py-4 backdrop-blur-xl" style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
              <div className="flex items-center gap-3">
                <div className="h-1.5 w-12 rounded-full bg-[var(--color-zw-ink)]/20 absolute left-1/2 top-2 -translate-x-1/2" />
                <h3 className="text-[22px] font-bold tracking-tight text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>Your Cart</h3>
                <span className="rounded-full bg-[var(--color-pastel-green)] px-3 py-1 text-[12px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-jakarta)" }}>{cartCount()} items</span>
              </div>
              <button onClick={() => setCartOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-zw-bg)] transition-transform active:scale-95">
                <X size={20} className="text-[var(--color-zw-ink)]" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-sm">
                  <ShoppingBag size={40} className="text-[var(--color-zw-ink-secondary)]" />
                </div>
                <h4 className="mt-5 text-[20px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>Your cart is empty</h4>
                <p className="mt-1 text-[14px] font-medium text-[var(--color-zw-ink-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>Add products to start saving food</p>
                <button onClick={() => { setCartOpen(false); setScreen("marketplace"); }} className="mt-6 px-6 py-3.5 text-[15px] font-bold text-white shadow-md active:scale-95 transition-transform bg-[var(--color-zw-ink)]" style={{ borderRadius: "full", fontFamily: "var(--font-jakarta)" }}>
                  Browse marketplace
                </button>
              </div>
            ) : (
              <>
                <div className="px-5 py-5">
                  {cart.map((item, i) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: i * 0.05 }}
                      className="mb-4 flex gap-4 bg-white p-4 shadow-sm"
                      style={{ borderRadius: "28px" }}
                    >
                      <div className={`relative flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden bg-[var(--color-pastel-clay)]`} style={{ borderRadius: "20px" }}>
                        {item.product.imageUrl ? (
                          <img src={item.product.imageUrl} alt={item.product.name} className="absolute inset-0 h-full w-full object-cover" />
                        ) : (
                          <span className="text-[32px] font-bold text-[var(--color-zw-ink)]">{item.product.name.charAt(0)}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="line-clamp-1 text-[15px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>{item.product.name}</h4>
                        <p className="text-[12px] font-medium text-[var(--color-zw-ink-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>{item.product.shopName}</p>
                        <div className="mt-2 flex items-center gap-1.5">
                          <span className="text-[16px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>{formatINR(item.product.discountedPrice)}</span>
                          <span className="text-[12px] font-medium text-[var(--color-zw-ink-tertiary)] line-through" style={{ fontFamily: "var(--font-jakarta)" }}>{formatINR(item.product.originalPrice)}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button onClick={() => removeFromCart(item.product.id)} className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-zw-urgent-red)] text-[var(--color-zw-ink)] active:scale-90 transition-transform">
                          <Trash2 size={16} />
                        </button>
                        <div className="flex h-10 items-center rounded-full bg-[var(--color-zw-bg)] px-1">
                          <button onClick={() => updateQty(item.product.id, item.qty - 1)} className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm text-[var(--color-zw-ink)] active:scale-90 transition-transform">
                            <Minus size={14} />
                          </button>
                          <span className="w-6 text-center text-[14px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>{item.qty}</span>
                          <button onClick={() => updateQty(item.product.id, item.qty + 1)} className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm text-[var(--color-zw-ink)] active:scale-90 transition-transform">
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mx-5 mb-4 flex items-center gap-2.5 px-5 py-4 shadow-sm bg-[var(--color-pastel-green)]" style={{ borderRadius: "24px" }}>
                  <Sparkles size={20} className="text-[var(--color-zw-ink)]" />
                  <span className="text-[14px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-jakarta)" }}>You're saving {formatINR(cartSavings())} on this order</span>
                </div>

                <div className="mx-5 mb-5 bg-white p-6 shadow-sm" style={{ borderRadius: "32px" }}>
                  <h4 className="text-[18px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>Bill Details</h4>
                  <div className="mt-4 space-y-3 text-[14px] font-medium" style={{ fontFamily: "var(--font-jakarta)" }}>
                    <div className="flex justify-between text-[var(--color-zw-ink-secondary)]">
                      <span>Item total</span>
                      <span className="font-bold text-[var(--color-zw-ink)]">{formatINR(cartTotal())}</span>
                    </div>
                    <div className="flex justify-between text-[var(--color-zw-ink-secondary)]">
                      <span>Delivery fee</span>
                      <span className="font-bold text-[var(--color-zw-ink)]">{formatINR(deliveryFee)}</span>
                    </div>
                    <div className="my-3 border-t border-dashed border-[var(--color-zw-ink-tertiary)] opacity-30" />
                    <div className="flex justify-between">
                      <span className="font-bold text-[var(--color-zw-ink)]">To Pay</span>
                      <span className="text-[18px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>{formatINR(total)}</span>
                    </div>
                  </div>
                </div>

                <div className="sticky bottom-0 bg-white/80 px-5 py-4 backdrop-blur-xl" style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                  <motion.button whileTap={{ scale: 0.96 }} onClick={handleCheckout} className="flex h-14 w-full items-center justify-between text-white shadow-md bg-[var(--color-zw-ink)]" style={{ borderRadius: "99px" }}>
                    <div className="text-left pl-6">
                      <div className="text-[18px] font-bold" style={{ fontFamily: "var(--font-outfit)" }}>{formatINR(total)}</div>
                      <div className="text-[11px] font-medium text-white/80" style={{ fontFamily: "var(--font-jakarta)" }}>{cartCount()} items</div>
                    </div>
                    <div className="flex items-center gap-2 pr-5 text-[15px] font-bold" style={{ fontFamily: "var(--font-jakarta)" }}>
                      Checkout
                      <ChevronRight size={18} />
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
