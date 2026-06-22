export type Role = "user" | "shop" | "ngo" | "volunteer";

export type Screen =
  | "onboarding"
  | "role-select"
  | "auth"
  | "home"
  | "marketplace"
  | "donate"
  | "impact"
  | "profile"
  | "product-detail"
  | "cart"
  | "checkout"
  | "order-tracking"
  | "ngo-feed"
  | "volunteer-map"
  | "shop-dashboard"
  | "shop-inventory"
  | "shop-orders"
  | "ai-assistant";

export interface Product {
  id: string;
  shopId: string;
  shopName: string;
  shopDistanceKm: number;
  shopRating: number;
  name: string;
  description: string;
  category: ProductCategory;
  imageColor: string; // gradient stops for placeholder
  imageEmoji: string; // not displayed, used as identifier only
  originalPrice: number;
  discountedPrice: number;
  quantity: number;
  unit: string;
  bestBefore: string; // ISO date
  aiPredictedSafeUntil: string; // ISO date
  aiConfidence: number; // 0-1
  batchNo: string;
  storageType: "ambient" | "refrigerated" | "frozen";
  isAiMatch?: boolean;
}

export type ProductCategory =
  | "dairy"
  | "bakery"
  | "vegetables"
  | "fruits"
  | "snacks"
  | "staples"
  | "beverages"
  | "cooked";

export interface Donation {
  id: string;
  donorName: string;
  donorType: "marriage-hall" | "restaurant" | "hostel" | "household" | "event";
  title: string;
  description: string;
  foodType: "cooked" | "raw" | "packaged";
  quantity: number;
  unit: string;
  servings: number;
  pickupAddress: string;
  pickupDistanceKm: number;
  pickupWindowStart: string; // ISO
  pickupWindowEnd: string; // ISO
  expiryDeadline: string; // ISO — countdown target
  aiFreshnessScore: number; // 0-1
  aiMatchScore?: number; // 0-100, for volunteer matching
  status: "listed" | "accepted" | "picked_up" | "delivered" | "expired";
  imageColor: string;
  ngoAssigned?: string;
  volunteerAssigned?: string;
}

export interface CartItem {
  product: Product;
  qty: number;
}

export interface ImpactBadge {
  id: string;
  name: string;
  description: string;
  icon: string; // lucide name
  unlocked: boolean;
  progress?: number; // 0-100
}

export interface ImpactEvent {
  id: string;
  type: "rescue" | "purchase" | "donate" | "volunteer";
  label: string;
  mealsSaved: number;
  co2SavedKg: number;
  moneySaved: number;
  points: number;
  timestamp: string;
}

export interface ShopOrder {
  id: string;
  customerName: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: "new" | "accepted" | "packing" | "ready" | "completed";
  placedAt: string;
  distance: number;
}

export interface ShopListing {
  id: string;
  name: string;
  category: ProductCategory;
  qtyLeft: number;
  originalPrice: number;
  discountedPrice: number;
  discountPct: number;
  daysToExpiry: number;
  imageColor: string;
  soldToday: number;
  revenueToday: number;
}
