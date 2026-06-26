"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { Loader2, ArrowLeft, HeartHandshake, ShoppingBag, Sparkles, Tag } from "lucide-react";
import type { FoodCategory, FoodCondition, SellCondition, ItemUnit } from "@/lib/types";

import { ScreenWrapper } from "../ui/ScreenWrapper";
import { PhotoUpload } from "../ui/Forms/PhotoUpload";
import { InputField } from "../ui/Inputs/InputField";
import { ChipSelector } from "../ui/Inputs/ChipSelector";
import { CustomDropdown } from "../ui/Inputs/CustomDropdown";
import { PrimaryButton } from "../ui/Buttons/PrimaryButton";
import { motion, AnimatePresence } from "framer-motion";

export function CreateListing() {
  const { addDonation, addSellItem, setActiveScreen } = useAppStore();
  
  const [mode, setMode] = useState<"donate" | "sell">("donate");
  const [loading, setLoading] = useState(false);

  // Shared state
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState<ItemUnit>("kg");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  
  // Donate specific
  const [foodCategory, setFoodCategory] = useState<FoodCategory>("cooked");
  const [foodCondition, setFoodCondition] = useState<FoodCondition>("good");

  // Sell specific
  const [sellCondition, setSellCondition] = useState<SellCondition>("near_expiry");
  const [originalPrice, setOriginalPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");

  const handlePublish = () => {
    setLoading(true);

    setTimeout(() => {
      if (mode === "donate") {
        addDonation({
          donorId: "me",
          foodName: itemName,
          photo: photoUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
          category: foodCategory,
          servings: parseInt(quantity) || 1,
          condition: foodCondition,
          pickupDeadline: new Date(Date.now() + 4 * 60 * 60 * 1000),
          address: "Current Location",
          lat: 13.0418,
          lng: 80.2341,
          status: "listed"
        });
      } else {
        addSellItem({
          donorId: "me",
          itemName,
          photo: photoUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
          condition: sellCondition,
          quantity: parseInt(quantity) || 1,
          unit,
          category: foodCategory,
          originalPrice: parseFloat(originalPrice) || 0,
          sellingPrice: parseFloat(sellingPrice) || 0,
          description: "Available for pickup immediately",
          status: "available"
        });
      }
      setLoading(false);
      setActiveScreen("donation-success");
    }, 1000);
  };

  const isDonate = mode === "donate";

  return (
    <ScreenWrapper
      className={isDonate ? "bg-[#EDF7ED]" : "bg-[#FFF8E7]"}
      scrollable={false}
    >
      {/* Floating Header */}
      <div className="absolute top-[47px] left-0 right-0 h-[48px] px-4 flex justify-between items-center z-[100] pointer-events-none">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setActiveScreen("home")}
          className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.12)] flex items-center justify-center pointer-events-auto border border-white/60"
        >
          <ArrowLeft size={20} strokeWidth={2} className="text-[#1A1A1A]" />
        </motion.button>
        <div className="font-outfit text-[17px] font-semibold text-[#1A1A1A]">
          Create Listing
        </div>
        <div className="w-10 h-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-28 pb-36 relative z-10">

        {/* Hero Banner — changes per mode */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
            className={`rounded-[28px] p-5 mb-6 flex items-center gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border ${
              isDonate
                ? "bg-gradient-to-br from-[#9BC84A]/25 via-[#9BC84A]/10 to-transparent border-[#9BC84A]/30"
                : "bg-gradient-to-br from-[#F2D15A]/30 via-[#F2D15A]/10 to-transparent border-[#F2D15A]/40"
            }`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md ${
              isDonate
                ? "bg-[#9BC84A]/20 border border-[#9BC84A]/30"
                : "bg-[#F2D15A]/30 border border-[#F2D15A]/50"
            }`}>
              {isDonate
                ? <HeartHandshake size={28} className="text-[#7CA13B]" strokeWidth={1.8} />
                : <ShoppingBag size={28} className="text-[#D4AF37]" strokeWidth={1.8} />
              }
            </div>
            <div>
              <h2 className="font-outfit text-[18px] font-bold tracking-tight text-[#1A1A1A]">
                {isDonate ? "Donate Surplus Food" : "Sell at Discount"}
              </h2>
              <p className="font-jakarta text-[12px] text-text-secondary mt-0.5">
                {isDonate
                  ? "Help NGOs & local recipients with free food"
                  : "List near-expiry items at reduced prices"}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Toggle Donate / Sell */}
        <div className="bg-white/85 backdrop-blur-[24px] p-1.5 rounded-full flex relative mb-7 shadow-[0_4px_24px_rgba(0,0,0,0.10)] border border-white/70 mx-auto max-w-[280px]">
          <div
            className="absolute inset-y-1.5 w-[calc(50%-6px)] rounded-full shadow-md transition-all duration-300 ease-out"
            style={{
              left: isDonate ? "6px" : "calc(50%)",
              background: isDonate
                ? "linear-gradient(135deg, #9BC84A, #7CA13B)"
                : "linear-gradient(135deg, #F2D15A, #D4AF37)"
            }}
          />
          <button
            onClick={() => setMode("donate")}
            className={`relative flex-1 flex items-center justify-center gap-1.5 py-3 text-[13px] font-bold z-20 transition-colors ${isDonate ? "text-white" : "text-text-muted"}`}
          >
            <HeartHandshake size={14} />
            Donate
          </button>
          <button
            onClick={() => setMode("sell")}
            className={`relative flex-1 flex items-center justify-center gap-1.5 py-3 text-[13px] font-bold z-20 transition-colors ${!isDonate ? "text-white" : "text-text-muted"}`}
          >
            <Tag size={14} />
            Sell
          </button>
        </div>

        {/* Form Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28 }}
            className={`rounded-[36px] backdrop-blur-[24px] shadow-[0_12px_48px_rgba(0,0,0,0.10),0_4px_16px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] border p-6 flex flex-col gap-6 ${
              isDonate
                ? "bg-white/90 border-[#9BC84A]/20"
                : "bg-white/90 border-[#F2D15A]/30"
            }`}
          >
            {/* Section marker */}
            <div className={`flex items-center gap-2 -mb-2 pb-4 border-b ${isDonate ? "border-[#9BC84A]/15" : "border-[#F2D15A]/20"}`}>
              <div className={`w-2 h-2 rounded-full ${isDonate ? "bg-[#9BC84A]" : "bg-[#F2D15A]"}`} />
              <span className={`font-outfit text-[13px] font-bold uppercase tracking-widest ${isDonate ? "text-[#7CA13B]" : "text-[#D4AF37]"}`}>
                {isDonate ? "Donation Details" : "Listing Details"}
              </span>
            </div>

            {/* Photo Upload Area */}
            <div className="-mt-2">
              <label className="block font-jakarta text-[12px] font-semibold text-text-secondary uppercase tracking-wider mb-3 ml-1">
                Item Photo
              </label>
              <PhotoUpload onImageChange={setPhotoUrl} />
            </div>

            <div className="h-px bg-black/5 w-full" />

            {/* Form Fields */}
            <div className="space-y-6">
              <div>
                <label className="block font-jakarta text-[12px] font-semibold text-text-secondary uppercase tracking-wider mb-2 ml-1">
                  Item Name
                </label>
                <InputField
                  label=""
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder={isDonate ? "e.g. Vegetable Biryani" : "e.g. Amul Milk 1L"}
                  className="bg-[#F8F9FA] border-transparent"
                />
              </div>

              <div>
                <label className="block font-jakarta text-[12px] font-semibold text-text-secondary uppercase tracking-wider mb-3 ml-1">
                  Category
                </label>
                <ChipSelector
                  options={[
                    { id: "cooked", label: "Cooked" },
                    { id: "raw", label: "Raw" },
                    { id: "packaged", label: "Packaged" },
                    { id: "bakery", label: "Bakery" }
                  ]}
                  selectedId={foodCategory}
                  onChange={(id) => setFoodCategory(id as FoodCategory)}
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block font-jakarta text-[12px] font-semibold text-text-secondary uppercase tracking-wider mb-2 ml-1">
                    Quantity
                  </label>
                  <InputField
                    label=""
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder={isDonate ? "e.g. 50 servings" : "e.g. 5"}
                    className="bg-[#F8F9FA] border-transparent"
                  />
                </div>
                {!isDonate && (
                  <div className="w-28">
                    <label className="block font-jakarta text-[12px] font-semibold text-text-secondary uppercase tracking-wider mb-2 ml-1">
                      Unit
                    </label>
                    <CustomDropdown
                      label=""
                      value={unit}
                      onChange={(val) => setUnit(val as ItemUnit)}
                      options={[
                        { value: "kg", label: "kg" },
                        { value: "pieces", label: "pcs" },
                        { value: "packets", label: "pkts" },
                        { value: "liters", label: "L" }
                      ]}
                    />
                  </div>
                )}
              </div>

              {isDonate && (
                <div>
                  <label className="block font-jakarta text-[12px] font-semibold text-text-secondary uppercase tracking-wider mb-3 ml-1">
                    Condition
                  </label>
                  <ChipSelector
                    options={[
                      { id: "freshly_cooked", label: "Freshly Cooked" },
                      { id: "good", label: "Good" },
                      { id: "needs_quick_pickup", label: "Needs Quick Pickup" }
                    ]}
                    selectedId={foodCondition}
                    onChange={(id) => setFoodCondition(id as FoodCondition)}
                  />
                </div>
              )}

              {!isDonate && (
                <div className="space-y-6">
                  {/* Price comparison highlight */}
                  <div className="rounded-2xl bg-[#FFF8E7] border border-[#F2D15A]/30 p-4 flex items-center gap-3">
                    <Sparkles size={18} className="text-[#D4AF37] shrink-0" />
                    <p className="font-jakarta text-[12px] text-text-secondary">
                      Set a <span className="font-bold text-[#D4AF37]">discounted sell price</span> — buyers see the savings!
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block font-jakarta text-[12px] font-semibold text-text-secondary uppercase tracking-wider mb-2 ml-1">
                        Orig. Price (₹)
                      </label>
                      <InputField
                        label=""
                        type="number"
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(e.target.value)}
                        placeholder="e.g. 100"
                        className="bg-[#F8F9FA] border-transparent line-through"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block font-jakarta text-[12px] font-semibold text-[#D4AF37] uppercase tracking-wider mb-2 ml-1">
                        Sell Price (₹) ↓
                      </label>
                      <InputField
                        label=""
                        type="number"
                        value={sellingPrice}
                        onChange={(e) => setSellingPrice(e.target.value)}
                        placeholder="e.g. 40"
                        className="bg-[#FFF8E7] border-[#F2D15A]/40 font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-jakarta text-[12px] font-semibold text-text-secondary uppercase tracking-wider mb-3 ml-1">
                      Condition
                    </label>
                    <ChipSelector
                      options={[
                        { id: "near_expiry", label: "Near Expiry" },
                        { id: "excess", label: "Excess Stock" },
                        { id: "damaged_packaging", label: "Damaged Pkg" },
                        { id: "old_stock", label: "Old Stock" }
                      ]}
                      selectedId={sellCondition}
                      onChange={(id) => setSellCondition(id as SellCondition)}
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Sticky Action */}
      <div className={`absolute bottom-0 left-0 right-0 p-6 z-20 pb-10 pt-16 pointer-events-none bg-gradient-to-t ${
        isDonate ? "from-[#EDF7ED] via-[#EDF7ED]/80" : "from-[#FFF8E7] via-[#FFF8E7]/80"
      } to-transparent`}>
        <div className="pointer-events-auto">
          <PrimaryButton
            onClick={handlePublish}
            disabled={!itemName || !quantity || loading}
            className={`shadow-xl ${
              isDonate
                ? "bg-gradient-to-r from-[#9BC84A] to-[#7CA13B] text-white shadow-[#9BC84A]/25"
                : "bg-gradient-to-r from-[#F2D15A] to-[#D4AF37] text-[#1A1A1A] shadow-[#F2D15A]/25"
            }`}
          >
            {loading
              ? <Loader2 className="animate-spin" size={24} />
              : isDonate ? "🌿 Publish Donation" : "🏷️ List for Sale"
            }
          </PrimaryButton>
        </div>
      </div>
    </ScreenWrapper>
  );
}
