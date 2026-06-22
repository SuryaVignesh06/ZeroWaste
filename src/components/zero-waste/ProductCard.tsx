"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { Countdown, formatINR } from "./Countdown";
import {
  Sparkles,
  MapPin,
  Bell,
  Plus,
  TrendingUp,
  Leaf,
  Flame,
} from "lucide-react";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  index?: number;
  onClick?: () => void;
}

export function ProductCard({ product, index = 0, onClick }: ProductCardProps) {
  const addToCart = useAppStore((s) => s.addToCart);
  const setActiveProduct = useAppStore((s) => s.setActiveProduct);

  const discountPct = Math.round(
    ((product.originalPrice - product.discountedPrice) / product.originalPrice) *
      100
  );

  const handleClick = () => {
    setActiveProduct(product);
    onClick?.();
  };

  return (
    <motion.button
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      className="group relative flex flex-col overflow-hidden rounded-3xl glass glass-inset text-left transition-all hover:shadow-lg hover:shadow-black/5"
    >
      {/* Image */}
      <div
        className={`relative aspect-square w-full overflow-hidden rounded-t-3xl bg-gradient-to-br ${product.imageColor}`}
      >
        {/* Decorative blob in image */}
        <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/30 blur-xl" />

        {/* Discount badge */}
        <div className="absolute left-2.5 top-2.5 rounded-full bg-white/95 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-zw-primary-700 shadow-sm">
          {discountPct}% OFF
        </div>

        {/* AI match badge */}
        {product.isAiMatch && (
          <div className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-full bg-zw-primary-700/95 backdrop-blur-md px-2 py-1 shadow-sm">
            <Sparkles size={9} className="text-white" />
            <span className="text-[9px] font-bold uppercase tracking-wide text-white">
              AI
            </span>
          </div>
        )}

        {/* Product initial */}
        <div className="flex h-full items-center justify-center">
          <span className="font-display text-5xl font-bold text-white/80 drop-shadow-sm">
            {product.name.charAt(0)}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-3">
        <div className="flex items-center gap-1 text-[10px] text-zw-text-muted">
          <MapPin size={9} />
          <span className="truncate">
            {product.shopName} · {product.shopDistanceKm}km
          </span>
        </div>
        <h3 className="mt-1 line-clamp-2 text-[13px] font-semibold leading-snug text-zw-text-primary">
          {product.name}
        </h3>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="font-display text-base font-bold text-zw-text-primary">
            {formatINR(product.discountedPrice)}
          </span>
          <span className="text-[11px] text-zw-text-muted line-through">
            {formatINR(product.originalPrice)}
          </span>
        </div>

        {/* Add button */}
        <motion.div
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          whileTap={{ scale: 0.85 }}
          className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full glass-primary text-white shadow-lg active:scale-90"
        >
          <Plus size={18} strokeWidth={2.8} />
        </motion.div>
      </div>
    </motion.button>
  );
}

interface RescueAlertCardProps {
  donation: any;
  index?: number;
  onClick?: () => void;
}

export function RescueAlertCard({
  donation,
  index = 0,
  onClick,
}: RescueAlertCardProps) {
  const setActiveDonation = useAppStore((s) => s.setActiveDonation);

  return (
    <motion.button
      initial={{ x: 30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => {
        setActiveDonation(donation);
        onClick?.();
      }}
      className="relative flex w-[180px] flex-shrink-0 flex-col overflow-hidden rounded-3xl glass glass-inset text-left"
    >
      <div
        className={`relative h-24 w-full overflow-hidden rounded-t-3xl bg-gradient-to-br ${donation.imageColor}`}
      >
        <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white/30 blur-md" />
        <div className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-full bg-white/95 backdrop-blur-md px-2 py-1 shadow-sm">
          <Leaf size={9} className="text-zw-primary-600" />
          <span className="text-[9px] font-bold uppercase text-zw-primary-700">
            {donation.servings} srv
          </span>
        </div>
        <div className="absolute left-2.5 top-2.5 rounded-md bg-zw-accent-600/95 backdrop-blur-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
          Rescue
        </div>
      </div>
      <div className="flex flex-1 flex-col p-3">
        <h4 className="line-clamp-1 text-[12px] font-bold text-zw-text-primary">
          {donation.donorName}
        </h4>
        <p className="mt-0.5 line-clamp-1 text-[10px] text-zw-text-secondary">
          {donation.title}
        </p>
        <div className="mt-2 flex items-center gap-1.5 rounded-xl bg-zw-accent-50 px-2 py-1.5">
          <Flame size={10} className="text-zw-accent-600" />
          <span className="text-[9px] font-semibold uppercase text-zw-accent-700">
            Expires
          </span>
          <Countdown deadline={donation.expiryDeadline} variant="compact" />
        </div>
      </div>
    </motion.button>
  );
}

interface StatChipProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export function StatChip({ icon, label, value }: StatChipProps) {
  return (
    <div className="flex items-center gap-2 rounded-2xl glass px-3 py-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zw-primary-50 text-zw-primary-700">
        {icon}
      </div>
      <div>
        <div className="font-display text-sm font-bold text-zw-text-primary">
          {value}
        </div>
        <div className="text-[10px] text-zw-text-muted">{label}</div>
      </div>
    </div>
  );
}

export function SectionHeader({
  title,
  action,
  onAction,
  icon,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="font-display text-[18px] font-bold tracking-tight text-zw-text-primary">
          {title}
        </h2>
      </div>
      {action && (
        <button
          onClick={onAction}
          className="rounded-full bg-zw-primary-50 px-3 py-1 text-[12px] font-semibold text-zw-primary-700 transition-colors hover:bg-zw-primary-100 active:scale-95"
        >
          {action}
        </button>
      )}
    </div>
  );
}

export function HeroCarousel() {
  const cards = [
    {
      title: "Save up to 70%",
      subtitle: "On near-expiry groceries",
      gradient: "from-zw-primary-500 to-zw-primary-700",
      icon: <TrendingUp size={20} className="text-white" />,
    },
    {
      title: "Rescue food now",
      subtitle: "5 surplus meals near you",
      gradient: "from-zw-accent-500 to-zw-accent-700",
      icon: <Leaf size={20} className="text-white" />,
    },
    {
      title: "Earn impact points",
      subtitle: "Every rescue counts",
      gradient: "from-zw-pink-400 to-zw-accent-500",
      icon: <Sparkles size={20} className="text-white" />,
    },
  ];

  return (
    <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-1 no-scrollbar">
      {cards.map((c, i) => (
        <motion.div
          key={i}
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className={`relative flex h-[120px] w-[260px] flex-shrink-0 flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br ${c.gradient} p-4 shadow-lg`}
        >
          {/* Decorative blob */}
          <motion.div
            initial={{ scale: 0, opacity: 0.2 }}
            animate={{ scale: 1, opacity: 0.2 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
            className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0.15 }}
            animate={{ scale: 1, opacity: 0.15 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
            className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-white"
          />
          <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/25 backdrop-blur-md ring-1 ring-white/40">
            {c.icon}
          </div>
          <div className="relative z-10">
            <h3 className="font-display text-base font-bold tracking-tight text-white">
              {c.title}
            </h3>
            <p className="text-[11px] text-white/85">{c.subtitle}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function TopBar({
  areaName = "Anna Nagar",
  onBellClick,
}: {
  areaName?: string;
  onBellClick?: () => void;
}) {
  return (
    <div className="sticky top-0 z-30 flex items-center justify-between px-5 pb-3 pt-4 backdrop-blur-xl">
      {/* Glass background */}
      <div className="absolute inset-0 -z-10 bg-white/60 backdrop-blur-xl border-b border-zw-border-strong" />

      <div className="flex items-center gap-1.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zw-primary-50">
          <MapPin size={14} className="text-zw-primary-700" />
        </div>
        <div>
          <div className="text-[10px] font-medium uppercase tracking-wide text-zw-text-muted">
            Deliver to
          </div>
          <button className="flex items-center gap-1 text-[13px] font-bold text-zw-text-primary">
            {areaName}
            <motion.svg
              animate={{ y: [0, 2, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
            >
              <path
                d="M2 3.5L5 6.5L8 3.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </button>
        </div>
      </div>
      <button
        onClick={onBellClick}
        className="relative flex h-10 w-10 items-center justify-center rounded-full glass text-zw-text-secondary transition-all hover:bg-white/90 active:scale-95"
      >
        <Bell size={18} />
        <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-zw-accent-600 ring-2 ring-white" />
      </button>
    </div>
  );
}
