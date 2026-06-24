export type Role = "user" | "shop" | "ngo" | "volunteer";

export type Screen =
  | "onboarding"
  | "login"
  | "otp"
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
  | "ai-assistant"
  // Master Prompt Screens
  | "splash"
  | "roleSelect"
  | "userHome"
  | "donateFood"
  | "donationTracking"
  | "rescueMap"
  | "productDetail"
  | "orderStatus"
  | "userProfile"
  | "impactDashboard"
  | "ngoMap"
  | "ngoDeliveryTracking"
  | "ngoVolunteers"
  | "ngoProfile"
  | "ngoReports"
  | "volunteerPickup"
  | "volunteerHistory"
  | "volunteerProfile"
  | "recipientHome"
  | "recipientMap"
  | "foodRequest"
  | "requestStatus"
  | "recipientProfile";

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
  imageUrl?: string;
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
  imageUrl?: string;
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
  imageUrl?: string;
  soldToday: number;
  revenueToday: number;
}

export interface ImpactData {
  mealsRescued: number;
  co2Prevented: number;
  moneySaved: number;
  impactPoints: number;
}

export interface NGOProfile {
  id: string;
  name: string;
  verified: boolean;
  location: string;
  mealsReceived: number;
  volunteersCount: number;
  successRate: number;
}

export interface Volunteer {
  id: string;
  name: string;
  status: "online" | "on-duty" | "offline";
  rating: number;
  rescues: number;
  zone: number;
}

export interface VolunteerRequest {
  id: string;
  volunteerId: string;
  status: "pending" | "accepted" | "declined";
}

export interface Pickup {
  id: string;
  donationId: string;
  status: "assigned" | "in_transit" | "completed";
}

export interface VolunteerStats {
  mealsToday: number;
  points: number;
  rescues: number;
}

export interface PickupRecord {
  id: string;
  donationId: string;
  timestamp: Date;
}

export interface RecipientProfile {
  id: string;
  name: string;
  location: string;
}

export interface DistributionPoint {
  id: string;
  name: string;
  location: string;
  distance: number;
}

export interface FoodRequest {
  id: string;
  recipientId: string;
  servings: number;
  status: "pending" | "fulfilled";
}
