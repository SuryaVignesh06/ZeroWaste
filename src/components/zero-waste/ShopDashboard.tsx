"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { formatINR } from "./Countdown";
import {
  Plus,
  Package,
  ShoppingBag,
  TrendingUp,
  Leaf,
  Store,
  Star,
  Clock,
  MapPin,
  Check,
  X,
  AlertCircle,
  Sparkles,
  Trash2,
  Edit,
  ChevronRight,
} from "lucide-react";

const STATUS_FLOW = ["new", "accepted", "packing", "ready", "completed"];
const STATUS_LABELS: Record<string, string> = {
  new: "New",
  accepted: "Accepted",
  packing: "Packing",
  ready: "Ready",
  completed: "Completed",
};

export function ShopDashboard() {
  const [tab, setTab] = useState<"overview" | "orders" | "inventory">(
    "overview"
  );
  const shopListings = useAppStore((s) => s.shopListings);
  const shopOrders = useAppStore((s) => s.shopOrders);
  const updateOrderStatus = useAppStore((s) => s.updateOrderStatus);

  const newOrders = shopOrders.filter((o) => o.status === "new");
  const activeOrders = shopOrders.filter((o) => o.status !== "completed");
  const todayRevenue = shopListings.reduce((s, l) => s + l.revenueToday, 0);
  const todaySold = shopListings.reduce((s, l) => s + l.soldToday, 0);
  const wastePrevented = todaySold * 0.4;

  return (
    <div className="relative flex h-full flex-col">
      <div className="absolute inset-0 -z-10 bg-zw-aurora" />
      <div className="blob bg-zw-accent-300/30 zw-float" style={{ width: 240, height: 240, top: "10%", right: "-15%" }} />

      {/* Header */}
      <div className="sticky top-0 z-30 px-5 pb-3 pt-4">
        <div className="absolute inset-0 -z-10 bg-white/60 backdrop-blur-xl border-b border-zw-border-strong" />
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-zw-accent-500 to-zw-accent-700 shadow-md">
            <Store size={18} className="text-white" />
          </div>
          <div>
            <h1 className="font-display text-base font-bold tracking-tight text-zw-text-primary">
              FreshMart Anna Nagar
            </h1>
            <div className="flex items-center gap-2 text-[11px] text-zw-text-secondary">
              <span className="flex items-center gap-1">
                <Star size={10} className="fill-zw-warning text-zw-warning" />
                4.6
              </span>
              <span>·</span>
              <span className="rounded-full bg-zw-primary-100 px-2 py-0.5 font-semibold text-zw-primary-700">
                Verified
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-3 flex gap-1 rounded-2xl glass p-1">
          {[
            { id: "overview", label: "Overview" },
            {
              id: "orders",
              label: `Orders ${newOrders.length > 0 ? `(${newOrders.length})` : ""}`,
            },
            { id: "inventory", label: "Inventory" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className={`relative flex-1 rounded-xl px-3 py-1.5 text-[12px] font-semibold transition-all ${
                tab === t.id
                  ? "bg-gradient-to-br from-zw-primary-500 to-zw-primary-700 text-white shadow-sm"
                  : "text-zw-text-muted"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto zw-scroll px-5 pb-32 pt-4">
        <AnimatePresence mode="wait">
          {tab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3">
                <StatCard
                  icon={<ShoppingBag size={16} />}
                  label="Today's Orders"
                  value={String(shopOrders.length)}
                  trend="+3"
                  gradient="from-emerald-50 to-white"
                  color="text-zw-primary-700"
                  iconBg="bg-gradient-to-br from-zw-primary-500 to-zw-primary-700"
                />
                <StatCard
                  icon={<TrendingUp size={16} />}
                  label="Revenue Today"
                  value={formatINR(todayRevenue)}
                  trend="+12%"
                  gradient="from-amber-50 to-white"
                  color="text-zw-accent-700"
                  iconBg="bg-gradient-to-br from-zw-accent-500 to-zw-accent-700"
                />
                <StatCard
                  icon={<Package size={16} />}
                  label="Active Listings"
                  value={String(shopListings.length)}
                  trend="2 expiring"
                  gradient="from-teal-50 to-white"
                  color="text-zw-success"
                  iconBg="bg-gradient-to-br from-teal-500 to-emerald-700"
                />
                <StatCard
                  icon={<Leaf size={16} />}
                  label="Waste Prevented"
                  value={`${wastePrevented.toFixed(1)}kg`}
                  trend="this week"
                  gradient="from-pink-50 to-white"
                  color="text-zw-pink-500"
                  iconBg="bg-gradient-to-br from-zw-pink-400 to-zw-accent-500"
                />
              </div>

              {/* AI insight card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-4 overflow-hidden rounded-3xl glass glass-inset p-4"
              >
                <div className="flex items-center gap-2">
                  <div className="zw-ai-border h-8 w-8 rounded-xl p-[1.5px]">
                    <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white">
                      <Sparkles size={14} className="text-zw-primary-700" />
                    </div>
                  </div>
                  <span className="text-[13px] font-bold text-zw-text-primary">
                    AI Demand Forecast
                  </span>
                </div>
                <p className="mt-2 text-[12px] leading-relaxed text-zw-text-secondary">
                  Based on your sales pattern, <b>3 milk packs</b> and{" "}
                  <b>2 vegetable packs</b> are likely to remain unsold tomorrow.
                  Pre-list them at discount now.
                </p>
                <button className="mt-3 rounded-xl glass-primary px-3 py-1.5 text-[11px] font-semibold text-white">
                  Pre-list with AI suggestion
                </button>
              </motion.div>

              {/* Quick action */}
              <button className="mt-4 flex w-full items-center justify-between rounded-3xl glass glass-inset p-4 text-left active:scale-98">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-zw-primary-500 to-zw-primary-700 text-white shadow-md">
                    <Plus size={18} />
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-zw-text-primary">
                      List new near-expiry product
                    </div>
                    <div className="text-[11px] text-zw-text-muted">
                      Scan barcode or add manually
                    </div>
                  </div>
                </div>
                <ChevronRight size={16} className="text-zw-text-muted" />
              </button>

              {/* Expiring soon */}
              <h3 className="mt-5 mb-2 font-display text-[12px] font-bold uppercase tracking-wide text-zw-text-secondary">
                Expiring Soon
              </h3>
              <div className="space-y-2">
                {shopListings
                  .filter((l) => l.daysToExpiry <= 2)
                  .map((l) => (
                    <div
                      key={l.id}
                      className="flex items-center gap-3 rounded-2xl bg-gradient-to-br from-zw-accent-50 to-white border border-zw-accent-200/50 p-3"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-zw-accent-500 to-zw-accent-700 text-white shadow-sm">
                        <AlertCircle size={16} />
                      </div>
                      <div className="flex-1">
                        <div className="text-[12px] font-bold text-zw-text-primary">
                          {l.name}
                        </div>
                        <div className="text-[11px] text-zw-accent-700">
                          Expires in {l.daysToExpiry} day · {l.qtyLeft} left
                        </div>
                      </div>
                      <button className="rounded-xl bg-gradient-to-br from-zw-accent-500 to-zw-accent-700 px-3 py-1.5 text-[11px] font-bold text-white shadow-sm">
                        Boost
                      </button>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}

          {tab === "orders" && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-3"
            >
              {activeOrders.map((order, i) => (
                <motion.div
                  key={order.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06 }}
                  className="overflow-hidden rounded-3xl glass glass-inset"
                >
                  <div className="flex items-center justify-between border-b border-zw-divider p-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display text-[13px] font-bold text-zw-text-primary">
                          {order.customerName}
                        </span>
                        <StatusPill status={order.status} />
                      </div>
                      <div className="mt-0.5 flex items-center gap-2 text-[10px] text-zw-text-muted">
                        <span>#{order.id.toUpperCase()}</span>
                        <span>·</span>
                        <span className="flex items-center gap-0.5">
                          <MapPin size={9} /> {order.distance}km
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-0.5">
                          <Clock size={9} /> just now
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-base font-bold text-zw-text-primary">
                        {formatINR(order.total)}
                      </div>
                    </div>
                  </div>

                  <div className="p-3">
                    {order.items.map((item, ii) => (
                      <div
                        key={ii}
                        className="flex justify-between py-1 text-[12px]"
                      >
                        <span className="text-zw-text-secondary">
                          <b>{item.qty}x</b> {item.name}
                        </span>
                        <span className="font-medium text-zw-text-primary">
                          {formatINR(item.price * item.qty)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {order.status === "new" && (
                    <div className="flex gap-2 border-t border-zw-divider p-3">
                      <button
                        onClick={() =>
                          updateOrderStatus(order.id, "accepted")
                        }
                        className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl glass text-[12px] font-semibold text-zw-text-secondary"
                      >
                        <X size={14} /> Decline
                      </button>
                      <button
                        onClick={() =>
                          updateOrderStatus(order.id, "accepted")
                        }
                        className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl glass-primary text-[12px] font-semibold text-white"
                      >
                        <Check size={14} strokeWidth={3} /> Accept
                      </button>
                    </div>
                  )}

                  {order.status !== "new" && order.status !== "completed" && (
                    <div className="border-t border-zw-divider p-3">
                      <button
                        onClick={() => {
                          const nextIdx = STATUS_FLOW.indexOf(order.status) + 1;
                          if (nextIdx < STATUS_FLOW.length) {
                            updateOrderStatus(
                              order.id,
                              STATUS_FLOW[nextIdx]
                            );
                          }
                        }}
                        className="flex h-10 w-full items-center justify-center gap-1.5 rounded-xl glass-primary text-[12px] font-semibold text-white"
                      >
                        Mark as{" "}
                        {
                          STATUS_LABELS[
                            STATUS_FLOW[
                              Math.min(
                                STATUS_FLOW.indexOf(order.status) + 1,
                                STATUS_FLOW.length - 1
                              )
                            ]
                          ]
                        }
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}

              {activeOrders.length === 0 && (
                <div className="mt-20 flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full glass">
                    <Check size={28} className="text-zw-primary-600" />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-zw-text-primary">
                    No active orders
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {tab === "inventory" && (
            <motion.div
              key="inventory"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-3"
            >
              {shopListings.map((l, i) => {
                const isCritical = l.daysToExpiry <= 1;
                const isWarning = l.daysToExpiry <= 2 && !isCritical;
                return (
                  <motion.div
                    key={l.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 rounded-3xl glass glass-inset p-3"
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${l.imageColor}`}
                    >
                      <span className="font-display text-base font-bold text-white/80">
                        {l.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="text-[13px] font-bold text-zw-text-primary">
                        {l.name}
                      </div>
                      <div className="text-[11px] text-zw-text-muted">
                        {l.qtyLeft} left · {l.soldToday} sold today
                      </div>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className="font-display text-[12px] font-bold text-zw-text-primary">
                          {formatINR(l.discountedPrice)}
                        </span>
                        <span className="text-[10px] text-zw-text-muted line-through">
                          {formatINR(l.originalPrice)}
                        </span>
                        <span
                          className={`rounded-md px-1.5 py-0.5 text-[9px] font-bold ${
                            isCritical
                              ? "bg-zw-danger/15 text-zw-danger"
                              : isWarning
                                ? "bg-zw-warning/15 text-zw-warning"
                                : "bg-zw-primary-100 text-zw-primary-800"
                          }`}
                        >
                          {l.daysToExpiry}d left
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <button className="flex h-7 w-7 items-center justify-center rounded-lg glass text-zw-text-secondary active:scale-90">
                        <Edit size={12} />
                      </button>
                      <button className="flex h-7 w-7 items-center justify-center rounded-lg glass text-zw-text-muted active:scale-90">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  trend,
  gradient,
  color,
  iconBg,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
  gradient: string;
  color: string;
  iconBg: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-white/60 bg-gradient-to-br ${gradient} p-3.5 shadow-sm backdrop-blur-md`}
    >
      <div className="flex items-center justify-between">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-xl ${iconBg} text-white shadow-sm`}
        >
          {icon}
        </div>
        <span className={`text-[10px] font-medium ${color}`}>{trend}</span>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-2 font-display text-xl font-bold text-zw-text-primary"
      >
        {value}
      </motion.div>
      <div className="text-[10px] text-zw-text-muted">{label}</div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const colors: Record<string, string> = {
    new: "bg-zw-accent-100 text-zw-accent-700",
    accepted: "bg-zw-primary-100 text-zw-primary-800",
    packing: "bg-amber-100 text-amber-700",
    ready: "bg-emerald-100 text-emerald-700",
    completed: "bg-zw-bg-muted text-zw-text-muted",
  };
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${
        colors[status] || colors.new
      }`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
