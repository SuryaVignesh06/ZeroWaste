"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { formatINR } from "./Countdown";
import { staggerContainer, cardVariants } from "@/lib/animations";
import { Search, SlidersHorizontal, ShoppingCart, Clock } from "lucide-react";

const CATEGORIES = ["All", "Dairy", "Bakery", "Vegetables", "Snacks", "Beverages", "Packaged"];

export function Marketplace() {
  const products = useAppStore((s) => s.products);
  const setCartOpen = useAppStore((s) => s.setCartOpen);
  const cartCount = useAppStore((s) => s.cartCount);
  const setActiveProduct = useAppStore((s) => s.setActiveProduct);
  const addToCart = useAppStore((s) => s.addToCart);
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [addedItems, setAddedItems] = useState<Record<string, number>>({});
  const [showFilters, setShowFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(500);

  const filtered = useMemo(() => {
    let list = [...products];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.shopName.toLowerCase().includes(q));
    }
    if (activeCategory !== "All") {
      list = list.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());
    }
    list = list.filter((p) => p.discountedPrice <= maxPrice);
    return list;
  }, [products, activeCategory, query, maxPrice]);

  const handleAdd = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    const product = products.find((p) => p.id === productId);
    if (product) {
      addToCart(product);
      setAddedItems((prev) => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
    }
  };

  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }} className="bg-[var(--color-zw-bg)] relative">
      {/* Sticky Header */}
      <div className="px-5 pt-6 pb-2 bg-[var(--color-zw-bg)] z-20" style={{ flexShrink: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[32px] font-bold text-[var(--color-zw-ink)] tracking-tight" style={{ fontFamily: "var(--font-outfit)" }}>
              Marketplace
            </h1>
            <p className="mt-1 text-[14px] font-medium text-[var(--color-zw-ink-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>
              Near-expiry deals — up to 70% off
            </p>
          </div>
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm transition-transform active:scale-95"
          >
            <ShoppingCart size={22} className="text-[var(--color-zw-ink)]" />
            {cartCount() > 0 && (
              <span
                className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-zw-urgent-red)] px-1.5 text-[11px] font-bold text-[var(--color-zw-ink)] shadow-sm"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                {cartCount()}
              </span>
            )}
          </button>
        </div>
      </div>

      <main style={{ flex: 1, minHeight: 0, overflowY: "auto", paddingBottom: "120px" }}>
        {/* Search + filter */}
        <div className="mt-3 px-5 flex gap-3">
          <div className="flex h-14 flex-1 items-center rounded-full bg-white px-5 shadow-sm">
            <Search size={20} className="text-[var(--color-zw-ink-secondary)]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="ml-3 flex-1 bg-transparent text-[15px] font-medium text-[var(--color-zw-ink)] placeholder:text-[var(--color-zw-ink-tertiary)] focus:outline-none"
              style={{ fontFamily: "var(--font-jakarta)" }}
            />
          </div>
          <button 
            onClick={() => setShowFilters(true)}
            className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-sm transition-transform active:scale-95"
          >
            <SlidersHorizontal size={20} className="text-[var(--color-zw-ink)]" />
          </button>
        </div>

        {/* Flash deal banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mt-6 mx-5 flex h-24 items-center justify-between overflow-hidden px-6 shadow-sm"
          style={{ borderRadius: "32px", background: "var(--color-pastel-clay)" }}
        >
          <div className="relative z-10">
            <h3 className="text-[20px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>
              Flash Deals
            </h3>
            <p className="mt-1 text-[13px] font-medium text-[var(--color-zw-ink-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>
              Ending soon — save up to 70%
            </p>
          </div>
          <div className="relative z-10 text-right">
            <div className="text-[24px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>
              02:14:33
            </div>
            <p className="text-[12px] font-bold text-[var(--color-zw-ink-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>
              Hurry up!
            </p>
          </div>
          {/* Decorative circles */}
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/40" />
          <div className="absolute -bottom-12 right-12 h-20 w-20 rounded-full bg-white/40" />
        </motion.div>

        {/* Category tabs */}
        <div className="mt-6 flex gap-3 overflow-x-auto px-5 pb-2">
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="flex h-10 flex-shrink-0 items-center rounded-full px-5 text-[14px] font-bold transition-all shadow-sm active:scale-95"
                style={{
                  background: active ? "var(--color-zw-ink)" : "white",
                  color: active ? "white" : "var(--color-zw-ink)",
                  fontFamily: "var(--font-jakarta)",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Product grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-2 gap-3 px-5 pt-4"
        >
          {filtered.map((p) => {
            const discountPct = Math.round(((p.originalPrice - p.discountedPrice) / p.originalPrice) * 100);
            const days = Math.max(0, Math.ceil((new Date(p.bestBefore).getTime() - Date.now()) / 86400000));
            const qty = addedItems[p.id] || 0;
            return (
              <motion.div
                key={p.id}
                variants={cardVariants}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveProduct(p)}
                className="overflow-hidden bg-white shadow-sm"
                style={{ borderRadius: "32px" }}
              >
                {/* Image zone */}
                <div className={`relative flex h-[140px] items-center justify-center bg-[var(--color-pastel-clay)]`}>
                  {p.imageUrl ? (
                    <img src={p.imageUrl} alt={p.name} className="absolute inset-0 h-full w-full object-cover" />
                  ) : (
                    <span className="text-[48px] font-bold text-[var(--color-zw-ink)]">{p.name.charAt(0)}</span>
                  )}
                  {/* Discount badge */}
                  <div className="absolute left-2.5 top-2.5 flex items-center justify-center rounded-full bg-[var(--color-zw-urgent-red)] px-2.5 py-1 text-[10px] font-bold text-[var(--color-zw-ink)] shadow-sm" style={{ fontFamily: "var(--font-jakarta)" }}>
                    {discountPct}% OFF
                  </div>
                  {/* Expiry badge */}
                  <div className="absolute right-2.5 top-2.5 rounded-full bg-[var(--color-pastel-yellow)] px-2.5 py-1 text-[10px] font-bold text-[var(--color-zw-ink)] shadow-sm" style={{ fontFamily: "var(--font-jakarta)" }}>
                    {days}d left
                  </div>
                  {/* AI badge */}
                  {p.isAiMatch && (
                    <div className="absolute bottom-2.5 left-2.5 rounded-full px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider text-[var(--color-zw-ink)] bg-[var(--color-pastel-green)] shadow-sm" style={{ fontFamily: "var(--font-jakarta)" }}>
                      AI Pick
                    </div>
                  )}
                </div>
                {/* Content */}
                <div className="p-4">
                  <h4 className="line-clamp-2 text-[15px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>
                    {p.name}
                  </h4>
                  <p className="mt-1 text-[12px] font-medium text-[var(--color-zw-ink-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>
                    {p.shopName}
                  </p>
                  <p className="mt-1.5 text-[11px] font-bold text-[var(--color-zw-ink-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>
                    Best before: {days} days
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[12px] font-medium text-[var(--color-zw-ink-tertiary)] line-through" style={{ fontFamily: "var(--font-jakarta)" }}>
                        {formatINR(p.originalPrice)}
                      </span>
                      <span className="text-[18px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>
                        {formatINR(p.discountedPrice)}
                      </span>
                    </div>
                    {/* Add button / stepper */}
                    {qty === 0 ? (
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => handleAdd(e, p.id)}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-zw-bg)] text-[var(--color-zw-ink)] active:scale-90 transition-transform"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                        </svg>
                      </motion.button>
                    ) : (
                      <motion.div
                        initial={{ width: 40, scale: 0.9 }}
                        animate={{ width: 80, scale: 1 }}
                        className="flex h-10 items-center justify-between rounded-full bg-[var(--color-zw-ink)] px-2.5"
                      >
                        <button onClick={(e) => { e.stopPropagation(); setAddedItems((prev) => ({ ...prev, [p.id]: Math.max(0, qty - 1) })); }} className="text-white text-base font-bold active:scale-90 transition-transform">−</button>
                        <span className="text-[14px] font-bold text-white" style={{ fontFamily: "var(--font-outfit)" }}>{qty}</span>
                        <button onClick={(e) => handleAdd(e, p.id)} className="text-white text-base font-bold active:scale-90 transition-transform">+</button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </main>

      {/* Filter bottom sheet */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
              className="absolute inset-0 z-40"
              style={{ background: "rgba(0,0,0,0.4)" }}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="absolute inset-x-0 bottom-0 z-50 bg-white p-5"
              style={{ borderRadius: "28px 28px 0 0", boxShadow: "0px -8px 32px rgba(0,0,0,0.1)" }}
            >
              <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-[#E8E8E4]" />
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[20px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>
                  Filter Products
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-[16px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>
                      Max Price
                    </label>
                    <span className="text-[14px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>
                      {formatINR(maxPrice)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="10"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[var(--color-zw-ink)]"
                  />
                </div>
              </div>

              <button
                onClick={() => setShowFilters(false)}
                className="mt-8 flex h-14 w-full items-center justify-center rounded-full text-[18px] font-bold text-white transition-transform active:scale-95"
                style={{ background: "var(--color-zw-ink)", fontFamily: "var(--font-outfit)" }}
              >
                Apply Filters ({filtered.length})
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
