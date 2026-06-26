"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { Countdown, formatINR } from "./Countdown";
import {
  Sparkles,
  MapPin,
  Bell,
  Plus,
  Flame,
  Leaf,
  TrendingUp,
  ChevronRight,
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
    ((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100
  );

  const handleClick = () => {
    setActiveProduct(product);
    onClick?.();
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="group relative flex flex-col overflow-hidden bg-white text-left shadow-sm transition-transform"
      style={{ borderRadius: "32px" }}
    >
      <div className={`relative aspect-square w-full overflow-hidden bg-[var(--color-pastel-clay)]`}>
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[48px] font-bold text-[var(--color-zw-ink)]">{product.name.charAt(0)}</span>
          </div>
        )}
        <div className="absolute left-3 top-3 rounded-full bg-[var(--color-zw-urgent-red)] px-3 py-1.5 text-[11px] font-bold text-[var(--color-zw-ink)] shadow-sm" style={{ fontFamily: "var(--font-jakarta)" }}>
          {discountPct}% OFF
        </div>
        {product.isAiMatch && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-[var(--color-pastel-green)] px-2.5 py-1.5 shadow-sm">
            <Sparkles size={11} className="text-[var(--color-zw-ink)]" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-jakarta)" }}>AI</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-[var(--color-zw-ink-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>
          <MapPin size={11} />
          <span className="truncate">{product.shopName} · {product.shopDistanceKm}km</span>
        </div>
        <h3 className="mt-1 line-clamp-2 text-[14px] font-bold leading-snug text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>
          {product.name}
        </h3>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-[16px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>{formatINR(product.discountedPrice)}</span>
          <span className="text-[12px] font-medium text-[var(--color-zw-ink-tertiary)] line-through" style={{ fontFamily: "var(--font-jakarta)" }}>{formatINR(product.originalPrice)}</span>
        </div>

        <motion.div
          onClick={(e) => { e.stopPropagation(); addToCart(product); }}
          whileTap={{ scale: 0.85 }}
          className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-zw-ink)] text-white shadow-md active:scale-90"
        >
          <Plus size={20} strokeWidth={2.8} />
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

export function RescueAlertCard({ donation, index = 0, onClick }: RescueAlertCardProps) {
  const setActiveDonation = useAppStore((s) => s.setActiveDonation);

  return (
    <motion.button
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => { setActiveDonation(donation); onClick?.(); }}
      className="relative flex w-[210px] flex-shrink-0 flex-col overflow-hidden bg-white text-left shadow-sm"
      style={{ borderRadius: "32px" }}
    >
      <div className={`relative h-28 w-full overflow-hidden bg-[var(--color-pastel-clay)]`}>
        {donation.imageUrl ? (
          <img src={donation.imageUrl} alt={donation.title} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[36px] font-bold text-[var(--color-zw-ink)]">{donation.donorName.charAt(0)}</span>
          </div>
        )}
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-[var(--color-pastel-green)] px-2.5 py-1.5 shadow-sm">
          <Leaf size={11} className="text-[var(--color-zw-ink)]" />
          <span className="text-[10px] font-bold uppercase text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-jakarta)" }}>{donation.servings} srv</span>
        </div>
        <div className="absolute left-3 top-3 rounded-full bg-[var(--color-zw-urgent-red)] px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-zw-ink)] shadow-sm" style={{ fontFamily: "var(--font-jakarta)" }}>
          Rescue
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h4 className="line-clamp-1 text-[14px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>{donation.donorName}</h4>
        <p className="mt-1 line-clamp-1 text-[12px] font-medium text-[var(--color-zw-ink-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>{donation.title}</p>
        <div className="mt-3 flex items-center gap-1.5 rounded-full bg-[var(--color-pastel-yellow)] px-3 py-2">
          <Flame size={12} className="text-[var(--color-zw-ink)]" />
          <span className="text-[10px] font-bold uppercase text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-jakarta)" }}>Expires</span>
          <Countdown deadline={donation.expiryDeadline} variant="compact" />
        </div>
      </div>
    </motion.button>
  );
}

export function SectionHeader({ title, action, onAction, icon }: { title: string; action?: string; onAction?: () => void; icon?: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {icon}
        <h2 className="text-[20px] font-bold tracking-tight text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>{title}</h2>
      </div>
      {action && (
        <button onClick={onAction} className="flex items-center gap-1 text-[14px] font-bold text-[var(--color-zw-ink)] active:scale-95 transition-transform" style={{ fontFamily: "var(--font-jakarta)" }}>
          {action}
          <ChevronRight size={16} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}

export function HeroCarousel() {
  const cards = [
    { title: "Save up to 70%", subtitle: "On near-expiry groceries", bg: "var(--color-pastel-green)", color: "var(--color-zw-ink)", icon: <TrendingUp size={22} className="text-[var(--color-zw-ink)]" /> },
    { title: "Rescue food now", subtitle: "5 surplus meals near you", bg: "var(--color-pastel-yellow)", color: "var(--color-zw-ink)", icon: <Leaf size={22} className="text-[var(--color-zw-ink)]" /> },
    { title: "Earn impact points", subtitle: "Every rescue counts", bg: "var(--color-pastel-blue)", color: "var(--color-zw-ink)", icon: <Sparkles size={22} className="text-[var(--color-zw-ink)]" /> },
  ];

  return (
    <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-4">
      {cards.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className="relative flex h-[130px] w-[260px] flex-shrink-0 flex-col justify-between overflow-hidden p-5 shadow-sm"
          style={{ borderRadius: "32px", background: c.bg }}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/40">{c.icon}</div>
          <div>
            <h3 className="text-[18px] font-bold tracking-tight" style={{ color: c.color, fontFamily: "var(--font-outfit)" }}>{c.title}</h3>
            <p className="text-[13px] font-medium mt-0.5" style={{ color: c.color, fontFamily: "var(--font-jakarta)" }}>{c.subtitle}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function TopBar({ areaName = "Anna Nagar", onBellClick }: { areaName?: string; onBellClick?: () => void }) {
  return (
    <div className="flex items-center justify-between px-5 pb-4 pt-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-pastel-green)]">
          <MapPin size={18} className="text-[var(--color-zw-ink)]" />
        </div>
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-zw-ink-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>Deliver to</div>
          <button className="flex items-center gap-1.5 text-[16px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>
            {areaName}
            <motion.svg animate={{ y: [0, 2, 0] }} transition={{ duration: 1.5, repeat: Infinity }} width="12" height="12" viewBox="0 0 10 10" fill="none">
              <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </button>
        </div>
      </div>
      <button onClick={onBellClick} className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm active:scale-95 transition-transform">
        <Bell size={20} className="text-[var(--color-zw-ink)]" />
        <span className="absolute right-3.5 top-3.5 h-2.5 w-2.5 rounded-full bg-[var(--color-zw-urgent-red)] ring-2 ring-white" />
      </button>
    </div>
  );
}
