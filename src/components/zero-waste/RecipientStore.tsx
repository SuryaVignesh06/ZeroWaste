"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { staggerChildren, fadeInUp, springGentle } from "@/lib/animations";
import { Store, Search, MapPin, Tag } from "lucide-react";
import { ScreenWrapper } from "../ui/ScreenWrapper";
import { LightCard } from "../ui/Cards/LightCard";

export function RecipientStore() {
  const smallStoreItems = useAppStore((s) => s.smallStoreItems) || [];

  return (
    <ScreenWrapper>
      <div className="flex flex-col gap-6 pt-6 relative z-10 pb-24">
        
        {/* Header */}
        <motion.div 
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...springGentle, delay: 0 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Store size={28} className="text-[#86198F]" />
            <h1 className="text-h1">Food Store</h1>
          </div>
          <p className="text-body text-text-secondary mt-1">Small-quantity food at discounted prices</p>
        </motion.div>

        {/* Search */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8A8A]" size={20} />
            <input 
              type="text" 
              placeholder="Search items..." 
              className="w-full h-12 bg-white rounded-2xl pl-11 pr-4 text-[15px] border border-[#E8E8E4] shadow-[0_2px_8px_rgba(0,0,0,0.04)] focus:outline-none focus:border-[#86198F] transition-colors"
              style={{ fontFamily: "var(--font-jakarta)" }}
            />
          </div>
        </motion.div>

        {/* List */}
        <motion.div 
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="grid grid-cols-2 gap-3"
        >
          <AnimatePresence mode="popLayout">
            {smallStoreItems.length > 0 ? (
              smallStoreItems.map((item) => (
                <motion.div key={item.id} variants={fadeInUp} layoutId={`store-${item.id}`}>
                  <LightCard className="p-0 overflow-hidden flex flex-col group cursor-pointer h-full border border-[#E8E8E4]">
                    <div className="relative h-28 w-full overflow-hidden bg-[#FAFAF8]">
                      <img src={item.photo} alt={item.itemName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-2 left-2 bg-[#86198F] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm uppercase tracking-wide">
                        Discounted
                      </div>
                    </div>
                    <div className="p-3 flex flex-col flex-1">
                      <h3 className="text-[14px] font-bold text-[#0A0A0A] leading-tight mb-1 line-clamp-2" style={{ fontFamily: "var(--font-outfit)" }}>{item.itemName}</h3>
                      <p className="text-[12px] font-medium text-[#8A8A8A] flex items-center gap-1 mb-3 line-clamp-1" style={{ fontFamily: "var(--font-jakarta)" }}>
                        {item.donorName}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto pt-1">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-semibold text-[#8A8A8A] line-through uppercase">₹{item.originalPrice}</span>
                          <span className="text-[16px] font-black text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>₹{item.sellingPrice}</span>
                        </div>
                        <button className="h-8 px-4 rounded-[10px] border border-[#86198F] text-[#86198F] bg-[#86198F]/5 font-extrabold text-[12px] active:scale-95 transition-transform uppercase tracking-wider" style={{ fontFamily: "var(--font-outfit)" }}>
                          ADD
                        </button>
                      </div>
                    </div>
                  </LightCard>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-500 mt-8 col-span-2">No items available right now.</p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </ScreenWrapper>
  );
}
