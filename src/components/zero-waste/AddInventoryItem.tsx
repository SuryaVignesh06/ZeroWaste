"use client";

import { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { ScanLine, Loader2 } from "lucide-react";
import type { InventoryCategory, ItemUnit } from "@/lib/types";

import { ScreenWrapper } from "../ui/ScreenWrapper";
import { PageHeader } from "../ui/PageHeader";
import { InputField } from "../ui/Inputs/InputField";
import { CustomDropdown } from "../ui/Inputs/CustomDropdown";
import { ChipSelector } from "../ui/Inputs/ChipSelector";
import { PrimaryButton } from "../ui/Buttons/PrimaryButton";

export function AddInventoryItem() {
  const { 
    addInventoryItem, 
    updateInventoryItem, 
    selectedInventoryItemId, 
    setSelectedInventoryItem, 
    inventory, 
    setActiveScreen 
  } = useAppStore();

  const [loading, setLoading] = useState(false);

  // Form State
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState<InventoryCategory>("packaged");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState<ItemUnit>("packets");
  const [originalPrice, setOriginalPrice] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [storageType, setStorageType] = useState<"refrigerated" | "room_temp" | "frozen">("room_temp");

  // Load selected item for editing
  useEffect(() => {
    setTimeout(() => {
      if (selectedInventoryItemId) {
        const item = inventory.find(i => i.id === selectedInventoryItemId);
        if (item) {
          setItemName(item.itemName);
          setCategory(item.category);
          setQuantity(item.quantity.toString());
          setUnit(item.unit);
          setOriginalPrice(item.originalPrice.toString());
          // Format expiryDate as YYYY-MM-DD for input element
          const dateObj = new Date(item.expiryDate);
          if (!isNaN(dateObj.getTime())) {
            const formattedDate = dateObj.toISOString().split('T')[0];
            setExpiryDate(formattedDate);
          } else {
            setExpiryDate("");
          }
          setStorageType(item.storageType);
        }
      } else {
        // Reset form if opening to add
        setItemName("");
        setCategory("packaged");
        setQuantity("");
        setUnit("pcs");
        setOriginalPrice("");
        setExpiryDate("");
        setStorageType("room_temp");
      }
    }, 0);
  }, [selectedInventoryItemId, inventory]);

  const handleSave = () => {
    setLoading(true);

    setTimeout(() => {
      const parsedQuantity = parseInt(quantity) || 1;
      const parsedPrice = parseFloat(originalPrice) || 0;
      const parsedExpiry = new Date(expiryDate);
      
      const now = new Date();
      const daysToExpiry = Math.ceil(
        (parsedExpiry.getTime() - now.getTime()) / 
        (1000 * 60 * 60 * 24)
      );
      
      const condition = 
        daysToExpiry <= 0 ? "expired" :
        daysToExpiry <= 1 ? "expiring_today" :
        daysToExpiry <= 5 ? "near_expiry" : "fresh";

      if (selectedInventoryItemId) {
        updateInventoryItem(selectedInventoryItemId, {
          itemName,
          category,
          quantity: parsedQuantity,
          unit,
          originalPrice: parsedPrice,
          sellingPrice: parsedPrice,
          expiryDate: parsedExpiry,
          daysToExpiry,
          condition,
          storageType,
        });
        setSelectedInventoryItem(null); // Clear editing state
      } else {
        addInventoryItem({
          shopId: "shop1", // mock
          itemName,
          photos: ["https://images.unsplash.com/photo-1546069901-ba9599a7e63c"], // mock photo
          category,
          quantity: parsedQuantity,
          unit,
          originalPrice: parsedPrice,
          sellingPrice: parsedPrice, // initially same
          expiryDate: parsedExpiry,
          storageType,
          autoAction: "notify_only",
          status: "in_stock"
        });
      }
      setLoading(false);
      setActiveScreen("inventory");
    }, 1000);
  };

  return (
    <ScreenWrapper scrollable={false}>
      <PageHeader 
        title={selectedInventoryItemId ? "Edit Item" : "Add Item"} 
        onBack={() => {
          setSelectedInventoryItem(null); // Clear editing state
          setActiveScreen("inventory");
        }} 
        className="pt-12"
      />

      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-32 relative z-10">
        
        {/* Scan Barcode */}
        <button className="w-full bg-bg-card-light rounded-3xl p-4 shadow-card border border-border-light flex items-center justify-center gap-3 mb-6 active:scale-[0.98] transition-transform">
          <div className="w-10 h-10 rounded-full bg-color-info-bg flex items-center justify-center">
            <ScanLine size={20} className="text-color-info" />
          </div>
          <span className="text-body-lg font-bold">
            Scan Barcode
          </span>
        </button>

        <div className="space-y-6">
          {/* Item Name */}
          <div className="bg-bg-card-light rounded-3xl p-5 shadow-card border border-border-light">
            <InputField 
              label="Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="e.g. Amul Milk 1L"
            />
          </div>

          {/* Category */}
          <div className="bg-bg-card-light rounded-3xl p-5 shadow-card border border-border-light relative z-20">
             <CustomDropdown 
                label="Category"
                value={category}
                onChange={(val) => setCategory(val as InventoryCategory)}
                options={[
                  { value: "vegetables", label: "Vegetables" },
                  { value: "fruits", label: "Fruits" },
                  { value: "dairy", label: "Dairy" },
                  { value: "bakery", label: "Bakery" },
                  { value: "packaged", label: "Packaged Goods" },
                  { value: "beverages", label: "Beverages" },
                  { value: "grains", label: "Grains" },
                ]}
              />
          </div>

          {/* Quantity & Unit */}
          <div className="bg-bg-card-light rounded-3xl p-5 shadow-card border border-border-light flex gap-4 relative z-10">
            <div className="flex-1">
              <InputField 
                label="Quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 10"
              />
            </div>
            <div className="w-24">
              <CustomDropdown 
                label="Unit"
                value={unit}
                onChange={(val) => setUnit(val as ItemUnit)}
                options={[
                  { value: "packets", label: "pkts" },
                  { value: "kg", label: "kg" },
                  { value: "pieces", label: "pcs" },
                  { value: "liters", label: "L" },
                  { value: "dozen", label: "doz" },
                ]}
              />
            </div>
          </div>

          {/* Price & Expiry */}
          <div className="bg-bg-card-light rounded-3xl p-5 shadow-card border border-border-light grid grid-cols-2 gap-4">
            <div>
              <InputField 
                label="Orig. Price (₹)"
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div>
               <InputField 
                label="Expiry Date"
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder=""
              />
            </div>
          </div>

          {/* Storage */}
          <div className="bg-bg-card-light rounded-3xl p-5 shadow-card border border-border-light">
             <label className="block text-caption text-text-muted uppercase tracking-wider mb-3 font-bold">
              Storage Requirement
             </label>
            <ChipSelector
              options={[
                { id: "room_temp", label: "Room Temp" },
                { id: "refrigerated", label: "Refrigerated" },
                { id: "frozen", label: "Frozen" }
              ]}
              selectedId={storageType}
              onChange={(id) => setStorageType(id as any)}
            />
          </div>

        </div>
      </div>

      {/* Bottom Sticky Action */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-bg-base via-bg-base/90 to-transparent z-20 pb-8 pt-12 pointer-events-none">
        <div className="pointer-events-auto">
          <PrimaryButton
            onClick={handleSave}
            disabled={!itemName || !quantity || !originalPrice || !expiryDate || loading}
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : (selectedInventoryItemId ? "Save Changes" : "Add Item")}
          </PrimaryButton>
        </div>
      </div>

    </ScreenWrapper>
  );
}

