"use client";

import { create } from "zustand";
import type { Role, Screen, Product, CartItem, Donation } from "./types";
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
  donateForm: {
    title: string;
    category: string;
    quantity: number;
    servings: number;
    pickupAddress: string;
    expiryHours: number;
    aiRecognized: boolean;
  };
  setDonateForm: (patch: Partial<AppState["donateForm"]>) => void;
  resetDonateForm: () => void;

  // AI assistant
  isAssistantOpen: boolean;
  setAssistantOpen: (v: boolean) => void;
}

const initialDonateForm = {
  title: "",
  category: "cooked",
  quantity: 10,
  servings: 10,
  pickupAddress: "",
  expiryHours: 4,
  aiRecognized: false,
};

export const useAppStore = create<AppState>((set, get) => ({
  screen: "onboarding",
  prevScreen: null,
  role: null,
  setRole: (r) => set({ role: r, screen: "home" }),
  setScreen: (s) => set((state) => ({ screen: s, prevScreen: state.screen })),

  onboarded: false,
  completeOnboarding: () => set({ onboarded: true, screen: "role-select" }),

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

  isAssistantOpen: false,
  setAssistantOpen: (v) => set({ isAssistantOpen: v }),
}));
