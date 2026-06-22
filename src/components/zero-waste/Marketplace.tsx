"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { ProductCard } from "./ProductCard";
import { Search, SlidersHorizontal, Mic, X } from "lucide-react";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "expiring-today", label: "Expiring today" },
  { id: "under-50", label: "Under ₹50" },
  { id: "50-100", label: "₹50 - ₹100" },
  { id: "over-50-off", label: "Over 50% off" },
  { id: "within-1km", label: "Within 1km" },
  { id: "ai-match", label: "AI matched" },
];

export function Marketplace() {
  const products = useAppStore((s) => s.products);
  const [activeFilter, setActiveFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"relevance" | "price-low" | "distance" | "expiry">("relevance");

  const filtered = useMemo(() => {
    let list = [...products];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shopName.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    switch (activeFilter) {
      case "expiring-today":
        list = list.filter((p) => {
          const days = (new Date(p.bestBefore).getTime() - Date.now()) / 86400000;
          return days <= 1.5;
        });
        break;
      case "under-50":
        list = list.filter((p) => p.discountedPrice < 50);
        break;
      case "50-100":
        list = list.filter(
          (p) => p.discountedPrice >= 50 && p.discountedPrice <= 100
        );
        break;
      case "over-50-off":
        list = list.filter(
          (p) =>
            (p.originalPrice - p.discountedPrice) / p.originalPrice > 0.5
        );
        break;
      case "within-1km":
        list = list.filter((p) => p.shopDistanceKm <= 1);
        break;
      case "ai-match":
        list = list.filter((p) => p.isAiMatch);
        break;
    }
    switch (sort) {
      case "price-low":
        list.sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case "distance":
        list.sort((a, b) => a.shopDistanceKm - b.shopDistanceKm);
        break;
      case "expiry":
        list.sort(
          (a, b) =>
            new Date(a.bestBefore).getTime() - new Date(b.bestBefore).getTime()
        );
        break;
    }
    return list;
  }, [products, activeFilter, query, sort]);

  return (
    <div className="flex h-full flex-col bg-zw-bg-base">
      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-zw-border/60 bg-zw-bg-base/90 px-5 pb-3 pt-4 backdrop-blur-lg">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="font-display text-xl font-bold text-zw-text-primary">
            Marketplace
          </h1>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="rounded-lg border border-zw-border bg-white px-3 py-1.5 text-[12px] font-medium text-zw-text-secondary"
          >
            <option value="relevance">Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="distance">Distance</option>
            <option value="expiry">Expiring soonest</option>
          </select>
        </div>

        {/* Search bar */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zw-text-muted"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, shops..."
              className="h-11 w-full rounded-xl border border-zw-border bg-white pl-9 pr-10 text-[13px] text-zw-text-primary placeholder:text-zw-text-muted focus:border-zw-primary-400 focus:outline-none focus:ring-2 focus:ring-zw-primary-100"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-lg bg-zw-primary-50 text-zw-primary-700">
              <Mic size={14} />
            </button>
          </div>
          <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-zw-border bg-white text-zw-text-secondary active:scale-95">
            <SlidersHorizontal size={18} />
          </button>
        </div>

        {/* Filter chips */}
        <div className="-mx-5 mt-3 flex gap-2 overflow-x-auto px-5 no-scrollbar">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`relative flex-shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-all ${
                activeFilter === f.id
                  ? "bg-zw-primary-700 text-white"
                  : "border border-zw-border bg-white text-zw-text-secondary hover:border-zw-primary-300"
              }`}
            >
              {f.label}
              {activeFilter === f.id && (
                <motion.div
                  layoutId="filter-active"
                  className="absolute inset-0 -z-10 rounded-full bg-zw-primary-700"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-5 pb-24 pt-4">
        <p className="mb-3 text-[12px] text-zw-text-secondary">
          {filtered.length} products near you
        </p>
        {filtered.length === 0 ? (
          <div className="mt-20 flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zw-bg-muted">
              <Search size={28} className="text-zw-text-muted" />
            </div>
            <p className="mt-3 text-sm font-semibold text-zw-text-primary">
              No products found
            </p>
            <p className="text-[12px] text-zw-text-muted">
              Try a different filter or search term
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
