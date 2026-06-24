"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { formatINR } from "./Countdown";
import { Plus, Package, ShoppingBag, TrendingUp, Leaf, Store, Star, Clock, MapPin, Check, X, AlertCircle, Sparkles, Trash2, Edit, ChevronRight } from "lucide-react";

const STATUS_FLOW = ["new", "accepted", "packing", "ready", "completed"];
const STATUS_LABELS: Record<string, string> = { new: "New", accepted: "Accepted", packing: "Packing", ready: "Ready", completed: "Completed" };

export function ShopDashboard() {
  const [tab, setTab] = useState<"overview" | "orders" | "inventory">("overview");
  const shopListings = useAppStore((s) => s.shopListings);
  const shopOrders = useAppStore((s) => s.shopOrders);
  const updateOrderStatus = useAppStore((s) => s.updateOrderStatus);
  const newOrders = shopOrders.filter((o) => o.status === "new");
  const activeOrders = shopOrders.filter((o) => o.status !== "completed");
  const todayRevenue = shopListings.reduce((s, l) => s + l.revenueToday, 0);
  const todaySold = shopListings.reduce((s, l) => s + l.soldToday, 0);
  const wastePrevented = todaySold * 0.4;

  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }} className="bg-[var(--color-zw-bg)]">
      <div className="bg-white px-5 pb-6 pt-5 rounded-b-[40px] shadow-sm relative z-10">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-[24px] bg-[var(--color-pastel-yellow)] shadow-sm"><Store size={22} className="text-[var(--color-zw-ink)]" /></div>
          <div><h1 className="text-[20px] font-bold tracking-tight text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>FreshMart Anna Nagar</h1><div className="flex items-center gap-2 mt-0.5 text-[12px] font-medium text-[var(--color-zw-ink-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}><span className="flex items-center gap-1"><Star size={11} className="fill-[var(--color-zw-ink)] text-[var(--color-zw-ink)]" />4.6</span><span>·</span><span className="rounded-full bg-[var(--color-pastel-green)] px-2.5 py-0.5 font-bold text-[var(--color-zw-ink)]">Verified</span></div></div>
        </div>
        <div className="mt-6 flex gap-2 rounded-full bg-[var(--color-zw-bg)] p-1.5 shadow-inner">
          {[{ id: "overview", label: "Overview" }, { id: "orders", label: `Orders ${newOrders.length > 0 ? `(${newOrders.length})` : ""}` }, { id: "inventory", label: "Inventory" }].map((t) => (
            <button key={t.id} onClick={() => setTab(t.id as any)} className="flex-1 rounded-full px-3 py-2 text-[13px] font-bold transition-all" style={{ background: tab === t.id ? "var(--color-zw-ink)" : "transparent", color: tab === t.id ? "#ffffff" : "var(--color-zw-ink-secondary)", fontFamily: "var(--font-jakarta)" }}>{t.label}</button>
          ))}
        </div>
      </div>

      <main style={{ flex: 1, minHeight: 0, overflowY: "auto", paddingBottom: "120px" }}>
        <div className="px-5 pt-4">
          <AnimatePresence mode="wait">
            {tab === "overview" && (
              <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                <div className="grid grid-cols-2 gap-3">
                  <StatCard icon={<ShoppingBag size={18} />} label="Today's Orders" value={String(shopOrders.length)} trend="+3" bg="var(--color-pastel-green)" iconBg="rgba(255,255,255,0.5)" color="var(--color-zw-ink)" />
                  <StatCard icon={<TrendingUp size={18} />} label="Revenue Today" value={formatINR(todayRevenue)} trend="+12%" bg="var(--color-pastel-yellow)" iconBg="rgba(255,255,255,0.5)" color="var(--color-zw-ink)" />
                  <StatCard icon={<Package size={18} />} label="Active Listings" value={String(shopListings.length)} trend="2 expiring" bg="var(--color-pastel-blue)" iconBg="rgba(255,255,255,0.5)" color="var(--color-zw-ink)" />
                  <StatCard icon={<Leaf size={18} />} label="Waste Prevented" value={`${wastePrevented.toFixed(1)}kg`} trend="this week" bg="var(--color-pastel-clay)" iconBg="rgba(255,255,255,0.5)" color="var(--color-zw-ink)" />
                </div>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-4 overflow-hidden bg-white p-5 shadow-sm" style={{ borderRadius: "32px" }}>
                  <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-pastel-green)]"><Sparkles size={18} className="text-[var(--color-zw-ink)]" /></div><span className="text-[15px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>AI Demand Forecast</span></div>
                  <p className="mt-3 text-[13px] font-medium leading-relaxed text-[var(--color-zw-ink-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>Based on your sales pattern, <b className="text-[var(--color-zw-ink)]">3 milk packs</b> and <b className="text-[var(--color-zw-ink)]">2 vegetable packs</b> are likely to remain unsold tomorrow. Pre-list them at discount now.</p>
                  <button className="mt-4 flex w-full justify-center text-[13px] font-bold text-white transition-transform active:scale-95" style={{ borderRadius: "999px", background: "var(--color-zw-ink)", padding: "14px 20px", fontFamily: "var(--font-jakarta)" }}>Pre-list with AI suggestion</button>
                </motion.div>
                <button className="mt-4 flex w-full items-center justify-between bg-white p-5 text-left transition-transform active:scale-95 shadow-sm" style={{ borderRadius: "32px" }}>
                  <div className="flex items-center gap-4"><div className="flex h-12 w-12 items-center justify-center rounded-full text-[var(--color-zw-ink)] bg-[var(--color-pastel-yellow)]"><Plus size={20} strokeWidth={3} /></div><div><div className="text-[15px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>List new product</div><div className="text-[12px] font-medium text-[var(--color-zw-ink-secondary)] mt-0.5" style={{ fontFamily: "var(--font-jakarta)" }}>Scan barcode or add manually</div></div></div>
                  <ChevronRight size={20} className="text-[var(--color-zw-ink-secondary)]" />
                </button>
                <h2 className="mt-6 mb-4 px-1 text-[13px] font-bold uppercase tracking-wider text-[var(--color-zw-ink-secondary)]" style={{ fontFamily: "var(--font-outfit)" }}>Expiring Soon</h2>
                <div className="space-y-3">
                  {shopListings.filter((l) => l.daysToExpiry <= 2).map((l) => (
                    <div key={l.id} className="flex items-center gap-3 p-3" style={{ borderRadius: "24px", background: "var(--color-zw-urgent-red)" }}>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/40"><AlertCircle size={20} className="text-[var(--color-zw-ink)]" /></div>
                      <div className="flex-1"><div className="text-[14px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>{l.name}</div><div className="text-[12px] font-semibold text-[var(--color-zw-ink)] mt-0.5" style={{ fontFamily: "var(--font-jakarta)" }}>Expires in {l.daysToExpiry} day · {l.qtyLeft} left</div></div>
                      <button className="text-[12px] font-bold text-white shadow-sm" style={{ borderRadius: "999px", background: "var(--color-zw-ink)", padding: "10px 16px", fontFamily: "var(--font-jakarta)" }}>Boost</button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            {tab === "orders" && (
              <motion.div key="orders" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="space-y-4">
                {activeOrders.map((order, i) => (
                  <motion.div key={order.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="overflow-hidden bg-white shadow-sm" style={{ borderRadius: "32px" }}>
                    <div className="flex items-center justify-between border-b border-[var(--color-zw-divider)] p-5">
                      <div><div className="flex items-center gap-2"><span className="text-[16px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>{order.customerName}</span><StatusPill status={order.status} /></div><div className="mt-1 flex items-center gap-2 text-[11px] font-medium text-[var(--color-zw-ink-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}><span>#{order.id.toUpperCase()}</span><span>·</span><span className="flex items-center gap-1"><MapPin size={11} /> {order.distance}km</span><span>·</span><span className="flex items-center gap-1"><Clock size={11} /> just now</span></div></div>
                      <div className="text-[18px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>{formatINR(order.total)}</div>
                    </div>
                    <div className="p-5">{order.items.map((item, ii) => (<div key={ii} className="flex justify-between py-1 text-[14px]" style={{ fontFamily: "var(--font-jakarta)" }}><span className="text-[var(--color-zw-ink-secondary)]"><b className="text-[var(--color-zw-ink)]">{item.qty}x</b> {item.name}</span><span className="font-bold text-[var(--color-zw-ink)]">{formatINR(item.price * item.qty)}</span></div>))}</div>
                    {order.status === "new" && (<div className="flex gap-3 border-t border-[var(--color-zw-divider)] p-5"><button onClick={() => updateOrderStatus(order.id, "accepted")} className="flex h-12 flex-1 items-center justify-center gap-2 bg-[var(--color-zw-bg)] text-[14px] font-bold text-[var(--color-zw-ink)]" style={{ borderRadius: "999px" }}><X size={16} /> Decline</button><button onClick={() => updateOrderStatus(order.id, "accepted")} className="flex h-12 flex-1 items-center justify-center gap-2 text-[14px] font-bold text-white" style={{ borderRadius: "999px", background: "var(--color-zw-ink)" }}><Check size={16} strokeWidth={3} /> Accept</button></div>)}
                    {order.status !== "new" && order.status !== "completed" && (<div className="border-t border-[var(--color-zw-divider)] p-5"><button onClick={() => { const nextIdx = STATUS_FLOW.indexOf(order.status) + 1; if (nextIdx < STATUS_FLOW.length) updateOrderStatus(order.id, STATUS_FLOW[nextIdx]); }} className="flex h-12 w-full items-center justify-center gap-2 text-[14px] font-bold text-white" style={{ borderRadius: "999px", background: "var(--color-zw-ink)", fontFamily: "var(--font-outfit)" }}>Mark as {STATUS_LABELS[STATUS_FLOW[Math.min(STATUS_FLOW.indexOf(order.status) + 1, STATUS_FLOW.length - 1)]]}<ChevronRight size={16} /></button></div>)}
                  </motion.div>
                ))}
                {activeOrders.length === 0 && (<div className="mt-20 flex flex-col items-center text-center"><div className="flex h-24 w-24 items-center justify-center rounded-full bg-[var(--color-pastel-green)]"><Check size={40} className="text-[var(--color-zw-ink)]" /></div><p className="mt-5 text-[20px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>No active orders</p></div>)}
              </motion.div>
            )}
            {tab === "inventory" && (
              <motion.div key="inventory" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="space-y-4">
                {shopListings.map((l, i) => { const isCritical = l.daysToExpiry <= 1; const isWarning = l.daysToExpiry <= 2 && !isCritical; return (
                  <motion.div key={l.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center gap-4 bg-white p-4 shadow-sm" style={{ borderRadius: "32px" }}>
                    <div className={`relative flex h-14 w-14 overflow-hidden items-center justify-center bg-[var(--color-pastel-clay)]`} style={{ borderRadius: "20px" }}>
                      {l.imageUrl ? (
                        <img src={l.imageUrl} alt={l.name} className="absolute inset-0 h-full w-full object-cover" />
                      ) : (
                        <span className="text-[20px] font-bold text-[var(--color-zw-ink)]">{l.name.charAt(0)}</span>
                      )}
                    </div>
                    <div className="flex-1"><div className="text-[15px] font-bold text-[var(--color-zw-ink)]" style={{ fontFamily: "var(--font-outfit)" }}>{l.name}</div><div className="text-[12px] font-medium text-[var(--color-zw-ink-secondary)] mt-0.5" style={{ fontFamily: "var(--font-jakarta)" }}>{l.qtyLeft} left · {l.soldToday} sold today</div><div className="mt-1.5 flex items-center gap-2"><span className="text-[14px] font-bold text-[var(--color-zw-ink)]">{formatINR(l.discountedPrice)}</span><span className="text-[11px] text-[var(--color-zw-ink-tertiary)] line-through">{formatINR(l.originalPrice)}</span><span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: isCritical ? "var(--color-zw-urgent-red)" : isWarning ? "var(--color-pastel-yellow)" : "var(--color-pastel-green)", color: "var(--color-zw-ink)" }}>{l.daysToExpiry}d left</span></div></div>
                    <div className="flex flex-col gap-2"><button className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-zw-bg)] text-[var(--color-zw-ink-secondary)] active:scale-90 transition-transform"><Edit size={14} /></button><button className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-zw-bg)] text-[var(--color-zw-urgent-red)] active:scale-90 transition-transform"><Trash2 size={14} /></button></div>
                  </motion.div>
                ); })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, trend, bg, iconBg, color }: { icon: React.ReactNode; label: string; value: string; trend: string; bg: string; iconBg: string; color: string }) {
  return (<div className="p-5" style={{ borderRadius: "32px", background: bg }}><div className="flex items-center justify-between"><div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: iconBg, color: color }}>{icon}</div><span className="text-[11px] font-bold" style={{ color: color, fontFamily: "var(--font-jakarta)" }}>{trend}</span></div><motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-[24px] font-bold" style={{ color: color, fontFamily: "var(--font-outfit)" }}>{value}</motion.div><div className="text-[12px] font-medium opacity-80 mt-1" style={{ color: color, fontFamily: "var(--font-jakarta)" }}>{label}</div></div>);
}

function StatusPill({ status }: { status: string }) {
  const styles: Record<string, { bg: string; color: string }> = { new: { bg: "var(--color-pastel-yellow)", color: "var(--color-zw-ink)" }, accepted: { bg: "var(--color-pastel-green)", color: "var(--color-zw-ink)" }, packing: { bg: "var(--color-pastel-yellow)", color: "var(--color-zw-ink)" }, ready: { bg: "var(--color-pastel-blue)", color: "var(--color-zw-ink)" }, completed: { bg: "var(--color-pastel-clay)", color: "var(--color-zw-ink)" } };
  const s = styles[status] || styles.new;
  return <span className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ background: s.bg, color: s.color, fontFamily: "var(--font-jakarta)" }}>{STATUS_LABELS[status]}</span>;
}
