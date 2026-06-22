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
  const [sort, setSort] = useState<
    "relevance" | "price-low" | "distance" | "expiry"
  >("relevance");

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
          const days =
            (new Date(p.bestBefore).getTime() - Date.now()) / 86400000;
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
          (p) => (p.originalPrice - p.discountedPrice) / p.originalPrice > 0.5
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
            new Date(a.bestBefore).getTime() -
            new Date(b.bestBefore).getTime()
        );
        break;
    }
    return list;
  }, [products, activeFilter, query, sort]);

  return (
    <div className="relative flex h-full flex-col">
      {/* Aurora background */}
      <div className="absolute inset-0 -z-10 bg-zw-aurora" />
      <div className="blob bg-zw-primary-300/30 zw-float-slow" style={{ width: 250, height: 250, top: "10%", right: "-20%" }} />

      {/* Header */}
      <div className="sticky top-0 z-30 px-5 pb-3 pt-4">
        <div className="absolute inset-0 -z-10 bg-white/60 backdrop-blur-xl border-b border-zw-border-strong" />

        <div className="mb-3 flex items-center justify-between">
          <div>
            <h1 className="font-display text-[22px] font-bold tracking-tight text-zw-text-primary">
              Marketplace
            </h1>
            <p className="text-[11px] text-zw-text-secondary">
              {filtered.length} fresh deals near you
            </p>
          </div>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              className="appearance-none rounded-full glass py-2 pl-3 pr-7 text-[12px] font-semibold text-zw-text-primary"
            >
              <option value="relevance">Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="distance">Distance</option>
              <option value="expiry">Expiring soonest</option>
            </select>
            <svg
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2"
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
            >
              <path
                d="M1 1L5 5L9 1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zw-text-muted"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, shops..."
              className="h-12 w-full rounded-2xl glass pl-10 pr-12 text-[13px] text-zw-text-primary placeholder:text-zw-text-muted focus:outline-none focus:ring-2 focus:ring-zw-primary-400/40"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-zw-primary-500 to-zw-primary-700 text-white shadow-sm">
              <Mic size={14} />
            </button>
          </div>
          <button className="flex h-12 w-12 items-center justify-center rounded-2xl glass text-zw-text-secondary active:scale-95">
            <SlidersHorizontal size={18} />
          </button>
        </div>

        {/* Filter chips */}
        <div className="-mx-5 mt-3 flex gap-2 overflow-x-auto px-5 no-scrollbar">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`relative flex-shrink-0 rounded-full px-4 py-2 text-[12px] font-semibold transition-all ${
                activeFilter === f.id
                  ? "text-white shadow-md"
                  : "glass text-zw-text-secondary hover:text-zw-text-primary"
              }`}
              style={
                activeFilter === f.id
                  ? {
                      background:
                        "linear-gradient(135deg, var(--color-zw-primary-600), var(--color-zw-primary-800))",
                    }
                  : undefined
              }
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto zw-scroll px-5 pb-32 pt-4">
        {filtered.length === 0 ? (
          <div className="mt-20 flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full glass">
              <Search size={28} className="text-zw-text-muted" />
            </div>
            <p className="mt-4 font-display text-base font-bold text-zw-text-primary">
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
