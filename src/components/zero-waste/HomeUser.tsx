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
  ShoppingBasket,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export function HomeUser() {
  const products = useAppStore((s) => s.products);
  const donations = useAppStore((s) => s.donations);
  const setScreen = useAppStore((s) => s.setScreen);
  const setActiveDonation = useAppStore((s) => s.setActiveDonation);

  const rescueDonations = donations.filter((d) => d.status === "listed").slice(0, 5);
  const aiMatched = products.filter((p) => p.isAiMatch).slice(0, 4);
  const topDeals = products.slice(0, 6);

  return (
    <div className="flex h-full flex-col bg-zw-bg-base">
      <TopBar />

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Greeting */}
        <div className="px-5 pt-4">
          <motion.h1
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="font-display text-[22px] font-bold leading-tight text-zw-text-primary"
          >
            Good evening, Ramesh
          </motion.h1>
          <p className="text-[13px] text-zw-text-secondary">
            {rescueDonations.length} rescues need you today
          </p>
        </div>

        {/* Hero Carousel */}
        <div className="mt-4">
          <HeroCarousel />
        </div>

        {/* Live Rescue Alerts */}
        <section className="mt-6 px-5">
          <SectionHeader
            title="Rescue Now"
            action="See all"
            icon={<Flame size={18} className="text-zw-accent-600" />}
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
            title="AI matched for you"
            action="View all"
            icon={<Sparkles size={18} className="text-zw-primary-600" />}
            onAction={() => setScreen("marketplace")}
          />
          <div className="grid grid-cols-2 gap-3">
            {aiMatched.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>

        {/* Donate CTA */}
        <section className="mt-6 px-5">
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            onClick={() => setScreen("donate")}
            whileTap={{ scale: 0.98 }}
            className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-zw-primary-700 via-zw-primary-800 to-teal-900 p-5 text-left"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10"
            />
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-white/8"
            />
            <div className="relative z-10 flex items-center gap-4">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md ring-1 ring-white/30">
                <HandHeart size={28} className="text-white" strokeWidth={2} />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-base font-bold text-white">
                  Have surplus food?
                </h3>
                <p className="text-[12px] text-white/80">
                  Donate it to NGOs in minutes
                </p>
              </div>
              <div className="rounded-full bg-white px-4 py-2 text-[12px] font-bold text-zw-primary-800">
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
            icon={<TrendingUp size={18} className="text-zw-primary-600" />}
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
              { label: "Dairy", color: "from-blue-100 to-cyan-200" },
              { label: "Bakery", color: "from-amber-100 to-orange-200" },
              { label: "Vegetables", color: "from-emerald-100 to-green-200" },
              { label: "Fruits", color: "from-rose-100 to-red-200" },
              { label: "Snacks", color: "from-yellow-100 to-amber-200" },
              { label: "Staples", color: "from-orange-100 to-yellow-200" },
            ].map((c, i) => (
              <motion.button
                key={i}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setScreen("marketplace")}
                className={`flex h-14 w-20 flex-shrink-0 flex-col items-center justify-center gap-1 rounded-2xl bg-gradient-to-br ${c.color}`}
              >
                <ShoppingBasket size={18} className="text-zw-text-primary" />
                <span className="text-[10px] font-semibold text-zw-text-primary">
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
