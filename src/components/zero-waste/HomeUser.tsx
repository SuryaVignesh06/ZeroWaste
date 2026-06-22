"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import {
  ProductCard,
  RescueAlertCard,
  SectionHeader,
  HeroCarousel,
  TopBar,
} from "./ProductCard";
import {
  Flame,
  HandHeart,
  Sparkles,
  TrendingUp,
  Leaf,
  Utensils,
  Trophy,
  ShoppingBag,
  MapPin,
} from "lucide-react";

export function HomeUser() {
  const products = useAppStore((s) => s.products);
  const donations = useAppStore((s) => s.donations);
  const setScreen = useAppStore((s) => s.setScreen);
  const impactPoints = useAppStore((s) => s.impactPoints);
  const mealsSaved = useAppStore((s) => s.mealsSaved);

  const rescueDonations = donations
    .filter((d) => d.status === "listed")
    .slice(0, 5);
  const aiMatched = products.filter((p) => p.isAiMatch).slice(0, 4);
  const topDeals = products.slice(0, 6);

  return (
    <div className="relative flex h-full flex-col">
      {/* Aurora background */}
      <div className="absolute inset-0 -z-10 bg-zw-aurora" />
      {/* Decorative blobs */}
      <div className="blob bg-zw-primary-300/40 zw-float-slow" style={{ width: 280, height: 280, top: "-10%", right: "-20%" }} />
      <div className="blob bg-zw-pink-200/40 zw-float" style={{ width: 220, height: 220, top: "30%", left: "-15%" }} />

      <TopBar />

      <div className="flex-1 overflow-y-auto zw-scroll pb-32">
        {/* Greeting + impact mini-card */}
        <div className="px-5 pt-4">
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-end justify-between"
          >
            <div>
              <p className="text-[12px] font-medium text-zw-text-secondary">
                Good evening
              </p>
              <h1 className="font-display text-[26px] font-bold leading-tight tracking-tight text-zw-text-primary">
                Ramesh
              </h1>
            </div>
            <div className="flex items-center gap-1.5 rounded-full glass px-3 py-1.5">
              <Trophy size={12} className="text-zw-accent-600" />
              <span className="font-display text-[12px] font-bold text-zw-text-primary">
                {impactPoints.toLocaleString("en-IN")}
              </span>
              <span className="text-[10px] text-zw-text-muted">pts</span>
            </div>
          </motion.div>

          {/* Impact stat strip */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-4 grid grid-cols-3 gap-2"
          >
            <MiniStat
              icon={<Utensils size={13} />}
              label="Meals saved"
              value={String(mealsSaved)}
              tint="from-emerald-50 to-white"
              color="text-zw-primary-700"
            />
            <MiniStat
              icon={<Leaf size={13} />}
              label="CO2 saved"
              value="33.6kg"
              tint="from-teal-50 to-white"
              color="text-teal-700"
            />
            <MiniStat
              icon={<ShoppingBag size={13} />}
              label="Saved"
              value="\u20B9540"
              tint="from-amber-50 to-white"
              color="text-zw-accent-700"
            />
          </motion.div>
        </div>

        {/* Hero Carousel */}
        <div className="mt-5">
          <HeroCarousel />
        </div>

        {/* Live Rescue Alerts */}
        <section className="mt-6 px-5">
          <SectionHeader
            title="Rescue Now"
            action="See all"
            icon={
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zw-accent-100">
                <Flame size={14} className="text-zw-accent-600" />
              </div>
            }
            onAction={() => setScreen("ngo-feed")}
          />
          <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-1 no-scrollbar">
            {rescueDonations.map((d, i) => (
              <RescueAlertCard key={d.id} donation={d} index={i} />
            ))}
          </div>
        </section>

        {/* AI Matched For You */}
        <section className="mt-6 px-5">
          <SectionHeader
            title="AI Matched for you"
            action="View all"
            icon={
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zw-primary-100">
                <Sparkles size={14} className="text-zw-primary-700" />
              </div>
            }
            onAction={() => setScreen("marketplace")}
          />
          <div className="grid grid-cols-2 gap-3">
            {aiMatched.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>

        {/* Donate CTA — large glass card */}
        <section className="mt-6 px-5">
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            onClick={() => setScreen("donate")}
            whileTap={{ scale: 0.98 }}
            className="relative w-full overflow-hidden rounded-3xl glass-primary p-5 text-left shadow-xl"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/15"
            />
            <motion.div
              animate={{ scale: [1, 1.18, 1] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.7,
              }}
              className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-white/10"
            />
            <div className="relative z-10 flex items-center gap-4">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white/25 backdrop-blur-md ring-1 ring-white/40">
                <HandHeart size={26} className="text-white" strokeWidth={2.2} />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-[16px] font-bold tracking-tight text-white">
                  Have surplus food?
                </h3>
                <p className="text-[12px] text-white/85">
                  Donate to NGOs in minutes
                </p>
              </div>
              <div className="rounded-full bg-white px-4 py-2 text-[12px] font-bold text-zw-primary-800 shadow-sm">
                Donate
              </div>
            </div>
          </motion.button>
        </section>

        {/* Top Deals */}
        <section className="mt-6 px-5">
          <SectionHeader
            title="Deals near you"
            action="See all"
            icon={
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zw-primary-100">
                <TrendingUp size={14} className="text-zw-primary-700" />
              </div>
            }
            onAction={() => setScreen("marketplace")}
          />
          <div className="grid grid-cols-2 gap-3">
            {topDeals.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="mt-6 px-5">
          <SectionHeader title="Categories" />
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 no-scrollbar">
            {[
              { label: "Dairy", color: "from-blue-100 to-cyan-200", icon: "🥛" },
              { label: "Bakery", color: "from-amber-100 to-orange-200", icon: "🍞" },
              { label: "Veggies", color: "from-emerald-100 to-green-200", icon: "🥬" },
              { label: "Fruits", color: "from-rose-100 to-red-200", icon: "🍎" },
              { label: "Snacks", color: "from-yellow-100 to-amber-200", icon: "🍿" },
              { label: "Staples", color: "from-orange-100 to-yellow-200", icon: "🌾" },
            ].map((c, i) => (
              <motion.button
                key={i}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setScreen("marketplace")}
                className={`flex h-16 w-20 flex-shrink-0 flex-col items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-br ${c.color} shadow-sm`}
              >
                <span className="text-xl">{c.icon}</span>
                <span className="text-[10px] font-bold text-zw-text-primary">
                  {c.label}
                </span>
              </motion.button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function MiniStat({
  icon,
  label,
  value,
  tint,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tint: string;
  color: string;
}) {
  return (
    <div
      className={`flex flex-col items-start rounded-2xl border border-white/60 bg-gradient-to-br ${tint} p-2.5 shadow-sm backdrop-blur-md`}
    >
      <div className={`flex h-6 w-6 items-center justify-center rounded-lg bg-white/80 ${color}`}>
        {icon}
      </div>
      <div className="mt-1.5 font-display text-[14px] font-bold text-zw-text-primary">
        {value}
      </div>
      <div className="text-[9px] text-zw-text-muted">{label}</div>
    </div>
  );
}
