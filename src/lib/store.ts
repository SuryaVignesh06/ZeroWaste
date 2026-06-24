"use client";

import { create } from "zustand";
import type { 
  Role, Screen, Product, CartItem, Donation,
  ImpactData, NGOProfile, Volunteer, VolunteerRequest, Pickup, 
  VolunteerStats, PickupRecord, RecipientProfile, DistributionPoint, FoodRequest
} from "./types";
import {
  MOCK_PRODUCTS,
  MOCK_DONATIONS,
  MOCK_BADGES,
  MOCK_IMPACT_EVENTS,
  MOCK_SHOP_LISTINGS,
  MOCK_SHOP_ORDERS,
} from "./mock-data";

interface AppState {
  // Navigation
  screen: Screen;
  prevScreen: Screen | null;
  role: Role | null;
  setRole: (r: Role) => void;
  setScreen: (s: Screen) => void;

  // Onboarding done flag
  onboarded: boolean;
  completeOnboarding: () => void;

  // Auth & Registration
  phoneNumber: string;
  setPhoneNumber: (p: string) => void;
  isOtpSent: boolean;
  isOtpVerified: boolean;
  isAuthenticated: boolean;
  isNewUser: boolean;

  // Setup State
  setupStep: number;
  setupComplete: boolean;
  setSetupStep: (step: number) => void;

  // Global Profile
  userName: string;
  userAvatar: string | null;
  userLocationText: string;
  userLat: number | null;
  userLng: number | null;

  // Role Setup Data
  userPreferences: any | null;
  ngoProfileSetup: any | null;
  volunteerProfileSetup: any | null;
  recipientProfileSetup: any | null;

  // Verification
  ngoVerificationStatus: 'pending' | 'approved' | 'rejected' | null;
  documentsUploaded: string[];

  // Setup Actions
  saveUserProfile: (data: any) => void;
  saveNgoProfile: (data: any) => void;
  saveVolunteerProfile: (data: any) => void;
  saveRecipientProfile: (data: any) => void;
  completeSetup: () => void;
  clearAuth: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (p: Product, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  cartCount: () => number;
  cartTotal: () => number;
  cartSavings: () => number;

  // Active product (for detail sheet)
  activeProduct: Product | null;
  setActiveProduct: (p: Product | null) => void;
  isCartOpen: boolean;
  setCartOpen: (v: boolean) => void;

  // Active donation (for detail sheet)
  activeDonation: Donation | null;
  setActiveDonation: (d: Donation | null) => void;

  // Products
  products: Product[];
  donations: Donation[];

  // Accept donation (move to accepted state)
  acceptDonation: (id: string) => void;

  // Impact
  impactPoints: number;
  mealsSaved: number;
  co2Saved: number;
  moneySaved: number;
  badges: typeof MOCK_BADGES;
  events: typeof MOCK_IMPACT_EVENTS;

  // Shop
  shopListings: typeof MOCK_SHOP_LISTINGS;
  shopOrders: typeof MOCK_SHOP_ORDERS;
  updateOrderStatus: (id: string, status: string) => void;
  addShopListing: (l: {
    name: string;
    category: string;
    qty: number;
    originalPrice: number;
    discountPct: number;
    daysToExpiry: number;
  }) => void;

  // Donate flow state
  donateStep: number;
  setDonateStep: (n: number) => void;
  donateForm: DonationForm;
  setDonateForm: (patch: Partial<DonationForm>) => void;
  resetDonateForm: () => void;
  nextDonateStep: () => void;
  prevDonateStep: () => void;
  submitDonation: () => void;

  donationHistory: DonationRecord[];
  activeDonationId: string | null;
  setActiveDonationId: (id: string | null) => void;

  // Delivery tracking
  activeTrackingId: string | null;
  setActiveTrackingId: (id: string | null) => void;

  // AI assistant
  isAssistantOpen: boolean;
  setAssistantOpen: (v: boolean) => void;

  // --- Master Prompt Additional States ---
  activeTab: string;
  setActiveTab: (t: string) => void;

  userLocation: { lat: number; lng: number } | null;
  setUserLocation: (loc: { lat: number; lng: number } | null) => void;

  impactData: ImpactData;
  setImpactData: (data: Partial<ImpactData>) => void;

  ngoProfile: NGOProfile | null;
  pendingDonations: Donation[];
  acceptedDonations: Donation[];
  ngoVolunteers: Volunteer[];
  volunteerRequests: VolunteerRequest[];

  isVolunteerOnline: boolean;
  setVolunteerOnline: (v: boolean) => void;
  volunteerZoneRadius: number;
  setVolunteerZoneRadius: (r: number) => void;
  activePickup: Pickup | null;
  setActivePickup: (p: Pickup | null) => void;
  volunteerStats: VolunteerStats;
  volunteerHistory: PickupRecord[];

  recipientProfile: RecipientProfile | null;
  nearbyDistributionPoints: DistributionPoint[];
  activeRequest: FoodRequest | null;
  requestHistory: FoodRequest[];
}

export interface DonationForm {
  photos: string[];
  foodName: string;
  category: string;
  servings: number;
  condition: "freshly_cooked" | "good_condition" | "needs_quick_pickup" | null;
  availableFrom: Date | null;
  availableUntil: Date | null;
  pickupAddress: string;
  pickupLat: number | null;
  pickupLng: number | null;
  specialInstructions: string;
  donorType: string;
  notifyAllNGOs: boolean;
  selectedNGOs: string[];
}

export interface DonationRecord {
  id: string;
  foodName: string;
  category: string;
  servings: number;
  status: "listed" | "accepted" | "picked_up" | "delivered";
  listedAt: Date;
  acceptedBy: string | null;
  deliveredTo: string | null;
  impactPoints: number;
}

const initialDonateForm: DonationForm = {
  photos: [],
  foodName: "",
  category: "Cooked Meal",
  servings: 10,
  condition: null,
  availableFrom: null,
  availableUntil: null,
  pickupAddress: "",
  pickupLat: null,
  pickupLng: null,
  specialInstructions: "",
  donorType: "Individual",
  notifyAllNGOs: true,
  selectedNGOs: [],
};

export const useAppStore = create<AppState>((set, get) => ({
  screen: "splash",
  prevScreen: null,
  role: null,
  setRole: (r) => set({ role: r, screen: "login" }),
  setScreen: (s) => set((state) => ({ screen: s, prevScreen: state.screen })),

  onboarded: false,
  completeOnboarding: () => set({ onboarded: true, screen: "role-select" }),

  phoneNumber: "",
  setPhoneNumber: (p) => set({ phoneNumber: p }),
  isOtpSent: false,
  isOtpVerified: false,
  isAuthenticated: false,
  isNewUser: true,

  setupStep: 1,
  setupComplete: false,
  setSetupStep: (step) => set({ setupStep: step }),

  userName: "",
  userAvatar: null,
  userLocationText: "",
  userLat: null,
  userLng: null,

  userPreferences: null,
  ngoProfileSetup: null,
  volunteerProfileSetup: null,
  recipientProfileSetup: null,

  ngoVerificationStatus: null,
  documentsUploaded: [],

  saveUserProfile: (data) => set((state) => ({ ...state, ...data, userPreferences: { ...state.userPreferences, ...data } })),
  saveNgoProfile: (data) => set((state) => ({ ngoProfileSetup: { ...state.ngoProfileSetup, ...data } })),
  saveVolunteerProfile: (data) => set((state) => ({ volunteerProfileSetup: { ...state.volunteerProfileSetup, ...data } })),
  saveRecipientProfile: (data) => set((state) => ({ recipientProfileSetup: { ...state.recipientProfileSetup, ...data } })),
  completeSetup: () => set({ setupComplete: true, isAuthenticated: true }),
  clearAuth: () => set({
    phoneNumber: "", isOtpVerified: false, isAuthenticated: false,
    role: null, setupComplete: false, screen: "login"
  }),

  cart: [],
  addToCart: (p, qty = 1) =>
    set((state) => {
      const existing = state.cart.find((i) => i.product.id === p.id);
      if (existing) {
        return {
          cart: state.cart.map((i) =>
            i.product.id === p.id ? { ...i, qty: i.qty + qty } : i
          ),
        };
      }
      return { cart: [...state.cart, { product: p, qty }] };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((i) => i.product.id !== productId),
    })),
  updateQty: (productId, qty) =>
    set((state) => ({
      cart: state.cart
        .map((i) => (i.product.id === productId ? { ...i, qty } : i))
        .filter((i) => i.qty > 0),
    })),
  clearCart: () => set({ cart: [] }),
  cartCount: () => get().cart.reduce((s, i) => s + i.qty, 0),
  cartTotal: () =>
    get().cart.reduce((s, i) => s + i.qty * i.product.discountedPrice, 0),
  cartSavings: () =>
    get().cart.reduce(
      (s, i) => s + i.qty * (i.product.originalPrice - i.product.discountedPrice),
      0
    ),

  activeProduct: null,
  setActiveProduct: (p) => set({ activeProduct: p }),
  isCartOpen: false,
  setCartOpen: (v) => set({ isCartOpen: v }),

  activeDonation: null,
  setActiveDonation: (d) => set({ activeDonation: d }),

  products: MOCK_PRODUCTS,
  donations: MOCK_DONATIONS,

  acceptDonation: (id) =>
    set((state) => ({
      donations: state.donations.map((d) =>
        d.id === id ? { ...d, status: "accepted" } : d
      ),
    })),

  impactPoints: 1248,
  mealsSaved: 84,
  co2Saved: 33.6,
  moneySaved: 540,
  badges: MOCK_BADGES,
  events: MOCK_IMPACT_EVENTS,

  shopListings: MOCK_SHOP_LISTINGS,
  shopOrders: MOCK_SHOP_ORDERS,
  updateOrderStatus: (id, status) =>
    set((state) => ({
      shopOrders: state.shopOrders.map((o) =>
        o.id === id ? { ...o, status: status as any } : o
      ),
    })),
  addShopListing: (l) =>
    set((state) => {
      const discountedPrice = Math.round(
        l.originalPrice * (1 - l.discountPct / 100)
      );
      const newListing: any = {
        id: `l${Date.now()}`,
        name: l.name,
        category: l.category,
        qtyLeft: l.qty,
        originalPrice: l.originalPrice,
        discountedPrice,
        discountPct: l.discountPct,
        daysToExpiry: l.daysToExpiry,
        imageColor: "from-emerald-50 to-teal-100",
        soldToday: 0,
        revenueToday: 0,
      };
      return { shopListings: [newListing, ...state.shopListings] };
    }),

  donateStep: 1,
  setDonateStep: (n) => set({ donateStep: n }),
  donateForm: initialDonateForm,
  setDonateForm: (patch) =>
    set((state) => ({ donateForm: { ...state.donateForm, ...patch } })),
  resetDonateForm: () => set({ donateForm: initialDonateForm, donateStep: 1 }),
  nextDonateStep: () => set((state) => ({ donateStep: state.donateStep + 1 })),
  prevDonateStep: () => set((state) => ({ donateStep: Math.max(1, state.donateStep - 1) })),
  submitDonation: () => set((state) => {
    const newDonation: DonationRecord = {
      id: `d${Date.now()}`,
      foodName: state.donateForm.foodName,
      category: state.donateForm.category,
      servings: state.donateForm.servings,
      status: "listed",
      listedAt: new Date(),
      acceptedBy: null,
      deliveredTo: null,
      impactPoints: state.donateForm.servings * 3,
    };
    return {
      donationHistory: [newDonation, ...state.donationHistory],
      donateForm: initialDonateForm,
      donateStep: 1,
      activeDonationId: newDonation.id,
      screen: "donation-tracking",
    };
  }),

  donationHistory: [],
  activeDonationId: null,
  setActiveDonationId: (id) => set({ activeDonationId: id }),

  activeTrackingId: null,
  setActiveTrackingId: (id) => set({ activeTrackingId: id }),

  isAssistantOpen: false,
  setAssistantOpen: (v) => set({ isAssistantOpen: v }),

  // --- Master Prompt Initial States ---
  activeTab: "home",
  setActiveTab: (t) => set({ activeTab: t }),
  
  userLocation: { lat: 12.9352, lng: 77.6245 }, // Koramangala
  setUserLocation: (loc) => set({ userLocation: loc }),

  impactData: {
    mealsRescued: 248,
    co2Prevented: 18.4,
    moneySaved: 1240,
    impactPoints: 320
  },
  setImpactData: (data) => set((state) => ({ impactData: { ...state.impactData, ...data } })),

  ngoProfile: {
    id: "ngo1",
    name: "NSS Chapter",
    verified: true,
    location: "Bangalore",
    mealsReceived: 2450,
    volunteersCount: 48,
    successRate: 98
  },
  pendingDonations: [],
  acceptedDonations: [],
  ngoVolunteers: [
    { id: "v1", name: "Vijay Kumar", status: "online", rating: 4.9, rescues: 32, zone: 18 },
    { id: "v2", name: "Ramesh T", status: "on-duty", rating: 4.8, rescues: 14, zone: 10 },
    { id: "v3", name: "Sarah M", status: "offline", rating: 5.0, rescues: 8, zone: 5 }
  ],
  volunteerRequests: [],

  isVolunteerOnline: true,
  setVolunteerOnline: (v) => set({ isVolunteerOnline: v }),
  volunteerZoneRadius: 5,
  setVolunteerZoneRadius: (r) => set({ volunteerZoneRadius: r }),
  activePickup: null,
  setActivePickup: (p) => set({ activePickup: p }),
  volunteerStats: { mealsToday: 12, points: 340, rescues: 5 },
  volunteerHistory: [],

  recipientProfile: null,
  nearbyDistributionPoints: [],
  activeRequest: null,
  requestHistory: []
}));
