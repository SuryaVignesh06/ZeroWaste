import { create } from "zustand"
import { AppStore, PullRequest, Donation, 
         SellItem, InventoryItem, 
         DonationHistory, User, VolunteerProfileData } from "./types"

// ─── MOCK DATA ────────────────────────────────────

const mockDonorUser: User = {
  id: "donor1",
  name: "Hotel Raj Palace",
  phone: "9876543210",
  subRole: "donor",
  donorType: "hotel",
  address: "14, Gandhi Road, T Nagar",
  area: "T Nagar",
  city: "Chennai",
  lat: 13.0418,
  lng: 80.2341,
  avatar: "https://api.dicebear.com/7.x/initials/svg?seed=HRP",
  joinedDate: new Date("2024-01-15"),
  totalPoints: 1240,
  totalDonations: 156,
  totalMealsServed: 3200,
  totalCO2Saved: 480,
  badgeTier: "gold",
  isVerified: true
}

const mockShopUser: User = {
  id: "shop1",
  name: "Fresh Mart Grocery",
  phone: "9876500000",
  subRole: "shopkeeper",
  shopType: "grocery",
  address: "22, 6th Avenue, Anna Nagar",
  area: "Anna Nagar",
  city: "Chennai",
  lat: 13.0878,
  lng: 80.2105,
  avatar: "https://api.dicebear.com/7.x/initials/svg?seed=FMG",
  joinedDate: new Date("2024-03-10"),
  totalPoints: 890,
  totalDonations: 89,
  totalMealsServed: 1200,
  totalCO2Saved: 210,
  badgeTier: "silver",
  isVerified: true
}

const mockPullRequests: PullRequest[] = [
  {
    id: "pr1",
    ngoName: "Feeding India",
    ngoId: "ngo1",
    ngoRating: 4.8,
    ngoVerified: true,
    ngoAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=FI",
    foodType: "cooked",
    servingsNeeded: 50,
    urgency: "emergency",
    message: "Emergency! Flood relief camp needs food for displaced families near Adyar riverbank. Any cooked food welcome.",
    distance: 2.3,
    requestedAt: new Date(),
    expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000),
    status: "open"
  },
  {
    id: "pr2",
    ngoName: "Robin Hood Army",
    ngoId: "ngo2",
    ngoRating: 4.5,
    ngoVerified: true,
    ngoAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=RHA",
    foodType: "any",
    servingsNeeded: 100,
    urgency: "urgent",
    message: "Weekly Sunday distribution drive this week. We need food for 100 people at Besant Nagar beach. Urgently needed.",
    distance: 4.1,
    requestedAt: new Date(),
    expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
    status: "open"
  },
  {
    id: "pr3",
    ngoName: "No Food Waste Foundation",
    ngoId: "ngo3",
    ngoRating: 4.2,
    ngoVerified: true,
    ngoAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=NFWF",
    foodType: "packaged",
    servingsNeeded: 30,
    urgency: "moderate",
    message: "Collecting packaged food items for monthly ration kit distribution to 30 families in Dharavi colony.",
    distance: 5.8,
    requestedAt: new Date(),
    expiresAt: new Date(Date.now() + 5 * 60 * 60 * 1000),
    status: "open"
  },
  {
    id: "pr4",
    ngoName: "Akshaya Patra",
    ngoId: "ngo4",
    ngoRating: 4.9,
    ngoVerified: true,
    ngoAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=AP",
    foodType: "cooked",
    servingsNeeded: 200,
    urgency: "moderate",
    message: "School mid-day meal supplement program. Need cooked rice and curry for 200 children this Friday.",
    distance: 3.2,
    requestedAt: new Date(),
    expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000),
    status: "open"
  },
  {
    id: "pr5",
    ngoName: "Annakshetra Trust",
    ngoId: "ngo5",
    ngoRating: 4.0,
    ngoVerified: false,
    ngoAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=AT",
    foodType: "raw",
    servingsNeeded: 25,
    urgency: "normal",
    message: "Need raw vegetables and rice for our community kitchen. We cook and distribute daily to 25 daily wage workers.",
    distance: 6.5,
    requestedAt: new Date(),
    expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000),
    status: "open"
  }
]

const mockDonations: Donation[] = [
  {
    id: "don1",
    donorId: "donor1",
    foodName: "Vegetable Biryani",
    photo: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400",
    category: "cooked",
    servings: 50,
    condition: "freshly_cooked",
    pickupDeadline: new Date(Date.now() + 2 * 60 * 60 * 1000),
    address: "14, Gandhi Road, T Nagar, Chennai",
    lat: 13.0418,
    lng: 80.2341,
    status: "reserved",
    reservedBy: "Feeding India",
    reservedAt: new Date(Date.now() - 30 * 60 * 1000),
    listedAt: new Date(Date.now() - 45 * 60 * 1000),
    pointsEarned: 15,
    estimatedValue: 2500
  }
]

const mockDonationHistory: DonationHistory[] = [
  {
    id: "dh1",
    type: "donation",
    foodName: "Vegetable Biryani",
    servings: 50,
    date: new Date(),
    receivedBy: "Feeding India",
    pointsEarned: 15,
    status: "completed",
    taxValue: 2500
  },
  {
    id: "dh2",
    type: "donation",
    foodName: "Idli & Sambar",
    servings: 30,
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    receivedBy: "Robin Hood Army",
    pointsEarned: 10,
    status: "completed",
    taxValue: 1200
  },
  {
    id: "dh3",
    type: "donation",
    foodName: "Dosa Batter",
    servings: 20,
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    receivedBy: "Not picked up",
    pointsEarned: 0,
    status: "expired",
    taxValue: 0
  },
  {
    id: "dh4",
    type: "donation",
    foodName: "Chapati & Dal",
    servings: 80,
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    receivedBy: "Akshaya Patra",
    pointsEarned: 25,
    status: "completed",
    taxValue: 4000
  },
  {
    id: "dh5",
    type: "sell",
    foodName: "Rice 5kg Bag",
    quantity: 3,
    unit: "packets",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    soldTo: "Recipient via app",
    pointsEarned: 5,
    status: "completed",
    taxValue: 0,
    earnedAmount: 240
  }
]

const mockInventory: InventoryItem[] = [
  {
    id: "inv1",
    shopId: "shop1",
    itemName: "Amul Taza Milk",
    photos: ["https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400"],
    category: "dairy",
    subCategory: "Pasteurized Milk",
    quantity: 20,
    unit: "packets",
    originalPrice: 25,
    sellingPrice: 25,
    discountPercent: 0,
    manufacturedDate: new Date("2025-01-01"),
    expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    daysToExpiry: 2,
    condition: "near_expiry",
    storageType: "refrigerated",
    notes: "UHT processed, keep refrigerated",
    autoAction: "sell_discounted",
    autoDiscountPercent: 50,
    autoListDaysBefore: 2,
    status: "in_stock",
    addedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date()
  },
  {
    id: "inv2",
    shopId: "shop1",
    itemName: "Britannia Brown Bread",
    photos: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400"],
    category: "bakery",
    subCategory: "Bread",
    quantity: 15,
    unit: "packets",
    originalPrice: 40,
    sellingPrice: 40,
    discountPercent: 0,
    expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    daysToExpiry: 1,
    condition: "expiring_today",
    storageType: "room_temp",
    autoAction: "donate",
    autoListDaysBefore: 1,
    status: "in_stock",
    addedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date()
  },
  {
    id: "inv3",
    shopId: "shop1",
    itemName: "Fresh Tomatoes",
    photos: ["https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400"],
    category: "vegetables",
    quantity: 8,
    unit: "kg",
    originalPrice: 30,
    sellingPrice: 30,
    discountPercent: 0,
    expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    daysToExpiry: 5,
    condition: "fresh",
    storageType: "room_temp",
    autoAction: "notify_only",
    status: "in_stock",
    addedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date()
  },
  {
    id: "inv4",
    shopId: "shop1",
    itemName: "Maggi Noodles Pack of 12",
    photos: ["https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400"],
    category: "packaged",
    quantity: 10,
    unit: "packets",
    originalPrice: 168,
    sellingPrice: 168,
    discountPercent: 0,
    manufacturedDate: new Date("2024-06-01"),
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    daysToExpiry: 30,
    condition: "fresh",
    storageType: "room_temp",
    autoAction: "notify_only",
    status: "in_stock",
    addedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date()
  },
  {
    id: "inv5",
    shopId: "shop1",
    itemName: "Aavin Curd 400g",
    photos: ["https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400"],
    category: "dairy",
    quantity: 25,
    unit: "pieces",
    originalPrice: 35,
    sellingPrice: 35,
    discountPercent: 0,
    expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    daysToExpiry: 3,
    condition: "near_expiry",
    storageType: "refrigerated",
    autoAction: "sell_discounted",
    autoDiscountPercent: 40,
    autoListDaysBefore: 2,
    status: "in_stock",
    addedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date()
  },
  {
    id: "inv6",
    shopId: "shop1",
    itemName: "Robusta Banana",
    photos: ["https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400"],
    category: "fruits",
    quantity: 5,
    unit: "dozen",
    originalPrice: 40,
    sellingPrice: 40,
    discountPercent: 0,
    expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    daysToExpiry: 1,
    condition: "expiring_today",
    storageType: "room_temp",
    autoAction: "donate",
    autoListDaysBefore: 1,
    status: "in_stock",
    addedAt: new Date(),
    updatedAt: new Date()
  }
]

const mockVolunteerProfile: VolunteerProfileData = {
  id: "vol1",
  displayName: "Priya Sharma",
  totalDeliveries: 34,
  impactPoints: 520,
  distanceCovered: 124.5,
  badges: ["🏆 Silver Volunteer", "🎓 NSS Student", "✅ Verified"],
  volunteerType: "nss",
  streak: 7,
  weeklyHours: [4, 6, 3, 8, 2, 5, 28.5],
  rank: 3,
  totalHours: 28.5,
  milestoneHours: 28,
  institution: "SRM University",
  role: "NSS Volunteer"
}

const mockAvailableMissions = [
  {
    id: "m_1",
    providerName: "Taj Hotel",
    providerLocation: { lat: 13.0450, lng: 80.2380, address: "T Nagar, 2km away" },
    ngoName: "Helping Hands NGO",
    ngoLocation: { lat: 13.0380, lng: 80.2300, address: "Nungambakkam, 5km from pickup" },
    servings: 45,
    urgency: "urgent" as any,
    status: "available" as any
  },
  {
    id: "m_2",
    providerName: "Fresh Mart",
    providerLocation: { lat: 13.0480, lng: 80.2320, address: "Guindy, 4km away" },
    ngoName: "Priya (Individual)",
    ngoLocation: { lat: 13.0400, lng: 80.2400, address: "Velachery, 2km from pickup" },
    servings: 15,
    urgency: "urgent" as any,
    status: "available" as any
  }
]

// ─── NGO & RECIPIENT MOCK DATA ──────────────────────
const mockNgoUser = {
  id: "ngo1",
  ngoName: "Feeding India",
  ngoId: "FI-2023-89",
  category: "Food Distribution",
  registrationNumber: "REG-889922",
  town: "T Nagar",
  city: "Chennai",
  totalAccepted: 14,
  totalMealsDistributed: 1250,
  activeVolunteers: 8
}

const mockRecipientUser = {
  id: "rec1",
  name: "Karthik Raj",
  town: "Velachery",
  city: "Chennai",
  householdSize: 4,
  verificationStatus: "verified",
  totalReservations: 12
}

const mockNgoVolunteers = [
  { id: "v1", name: "Rahul S.", type: "NSS", rating: 4.8, avatar: "https://api.dicebear.com/7.x/initials/svg?seed=RS", status: "online" },
  { id: "v2", name: "Anita K.", type: "Independent", rating: 4.5, avatar: "https://api.dicebear.com/7.x/initials/svg?seed=AK", status: "offline" },
  { id: "v3", name: "Prakash M.", type: "Volunteer", rating: 4.9, avatar: "https://api.dicebear.com/7.x/initials/svg?seed=PM", status: "on_delivery" },
  { id: "v4", name: "Sara Lee", type: "NSS", rating: 4.2, avatar: "https://api.dicebear.com/7.x/initials/svg?seed=SL", status: "online" },
  { id: "v5", name: "John Doe", type: "Independent", rating: 4.6, avatar: "https://api.dicebear.com/7.x/initials/svg?seed=JD", status: "offline" }
]

const mockBulkStoreItems = [
  { id: "bs1", itemName: "Rice Bags (5kg)", donorName: "A1 Supermarket", location: "T Nagar", photo: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400", originalPrice: 350, sellingPrice: 5 },
  { id: "bs2", itemName: "Lentils (10kg)", donorName: "City Wholesale", location: "Anna Nagar", photo: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=400", originalPrice: 1200, sellingPrice: 10 },
  { id: "bs3", itemName: "Wheat Flour (5kg)", donorName: "Fresh Mart", location: "Adyar", photo: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400", originalPrice: 280, sellingPrice: 5 },
  { id: "bs4", itemName: "Cooking Oil (2L)", donorName: "A1 Supermarket", location: "T Nagar", photo: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400", originalPrice: 400, sellingPrice: 8 },
]

const mockSmallStoreItems = [
  { id: "ss1", itemName: "Bread Packet", donorName: "Daily Bakery", originalPrice: 40, sellingPrice: 2, photo: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400" },
  { id: "ss2", itemName: "Mixed Vegetables", donorName: "Fresh Mart", originalPrice: 150, sellingPrice: 5, photo: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400" },
  { id: "ss3", itemName: "Milk Cartons (2)", donorName: "City Diary", originalPrice: 60, sellingPrice: 2, photo: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400" },
  { id: "ss4", itemName: "Fruits Bundle", donorName: "Fresh Mart", originalPrice: 200, sellingPrice: 10, photo: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400" }
]

const mockMyRequests = [
  { id: "req1", foodType: "Cooked Meals", createdAt: new Date(Date.now() - 86400000), status: "pending", servingsNeeded: 4 },
  { id: "req2", foodType: "Groceries", createdAt: new Date(Date.now() - 3*86400000), status: "fulfilled", servingsNeeded: 4 }
]

// ─── STORE ────────────────────────────────────────

export const useAppStore = create<AppStore>((set, get) => ({
  // Initial State
  activePanel: "donor_shopkeeper",
  subRole: "donor",
  isLoggedIn: false,
  user: null,
  volunteerProfile: mockVolunteerProfile,
  activeScreen: "roleSelect",
  previousScreen: "",

  activePanel2SubRole: "ngo",
  ngoUser: mockNgoUser,
  recipientUser: mockRecipientUser,
  ngoVolunteers: mockNgoVolunteers,
  bulkStoreItems: mockBulkStoreItems,
  smallStoreItems: mockSmallStoreItems,
  myRequests: mockMyRequests,

  pullRequests: mockPullRequests,
  donations: mockDonations,
  sellItems: [],
  donationHistory: mockDonationHistory,
  inventory: mockInventory,

  availableMissions: mockAvailableMissions,
  activeMission: null,
  completedMissions: [
    {
      id: "cm_1",
      providerName: "Adyar Ananda Bhavan",
      providerLocation: { lat: 12.9716, lng: 77.5946, address: "T Nagar" },
      ngoName: "Robin Hood Army",
      ngoLocation: { lat: 12.9816, lng: 77.6046, address: "Nungambakkam" },
      servings: 120,
      urgency: "urgent",
      status: "completed",
      pointsAwarded: 25,
      completedAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: "cm_2",
      providerName: "Fresh Mart",
      providerLocation: { lat: 12.9616, lng: 77.5846, address: "Guindy" },
      ngoName: "Feeding India",
      ngoLocation: { lat: 12.9516, lng: 77.5946, address: "Velachery" },
      servings: 45,
      urgency: "high",
      status: "completed",
      pointsAwarded: 15,
      completedAt: new Date(Date.now() - 26 * 60 * 60 * 1000)
    }
  ],

  toasts: [],
  isLoading: false,
  selectedRequestId: null,
  selectedInventoryItemId: null,
  taxReceiptPeriod: "month",
  showAddMenu: false,

  // ─── AUTH ACTIONS ──────────────────────────────

  setActivePanel: (panel) => set({ activePanel: panel }),
  
  setSubRole: (role) => set({ subRole: role }),
  
  setActivePanel2SubRole: (role) => set({ activePanel2SubRole: role }),
  
  login: (phone) => {
    const { subRole, activePanel, activePanel2SubRole } = get()
    const user = subRole === "donor" 
      ? mockDonorUser 
      : mockShopUser
      
    let activeScreen: any = "home";
    if (activePanel === "volunteer") activeScreen = "volunteerHome";
    if (activePanel === "ngo_receiver") {
      activeScreen = activePanel2SubRole === "ngo" ? "ngoHome" : "recipientHome";
    }
    
    set({ 
      isLoggedIn: true, 
      user,
      activeScreen
    })
  },
  
  logout: () => set({ 
    isLoggedIn: false, 
    user: null,
    activeScreen: "roleSelect"
  }),
  
  setActiveScreen: (screen) => set((state) => ({ 
    activeScreen: screen,
    previousScreen: state.activeScreen
  })),

  setShowAddMenu: (show) => set({ showAddMenu: show }),

  // ─── VOLUNTEER ACTIONS ───────────────────────

  acceptMission: (missionId) => {
    const { availableMissions, pullRequests } = get()
    let mission = availableMissions.find(m => m.id === missionId)
    
    if (!mission) {
      const pr = pullRequests.find(m => m.id === missionId)
      if (pr) {
        // Convert PR into a VolunteerMission shape so map doesn't crash reading location
        mission = {
          id: pr.id,
          providerName: "Nearby Donor",
          providerLocation: { lat: 13.0450, lng: 80.2380, address: "Nearby Pickup" },
          ngoName: pr.ngoName,
          ngoLocation: { lat: 13.0418 + (pr.distance/111), lng: 80.2341 + (pr.distance/111), address: "NGO Location" },
          servings: pr.servingsNeeded,
          urgency: pr.urgency,
          status: "active"
        }
      }
    }

    if (mission) {
      set({ 
        activeMission: { ...mission, status: "active" }
      })
    }
  },

  completeMission: () => {
    const { activeMission } = get()
    if (activeMission) {
      set((state) => ({
        completedMissions: [{ ...activeMission, status: "completed", completedAt: new Date(), pointsAwarded: 15 }, ...state.completedMissions],
        activeMission: null,
        volunteerProfile: state.volunteerProfile ? {
          ...state.volunteerProfile,
          totalDeliveries: state.volunteerProfile.totalDeliveries + 1,
          impactPoints: state.volunteerProfile.impactPoints + 15
        } : null
      }))
    }
  },

  // ─── REQUEST ACTIONS ───────────────────────────

  reserveFood: (id) => {
    const { addToast } = get();
    set((state) => ({
      pullRequests: state.pullRequests.map((req) =>
        req.id === id ? { ...req, status: "reserved" } : req
      )
    }));
    addToast({ title: "Food Reserved", message: "You have reserved this food donation.", type: "success" });
  },

  acceptRequest: (requestId) => {
    const { user, addToast } = get()
    set((state) => ({
      pullRequests: state.pullRequests.map((req) =>
        req.id === requestId
          ? { 
              ...req, 
              status: "accepted",
              acceptedBy: user?.name,
              acceptedAt: new Date()
            }
          : req
      )
    }))
    addToast({ 
      type: "success", 
      message: "Request accepted! NGO will arrange pickup." 
    })
  },

  // ─── DONATION ACTIONS ──────────────────────────

  addDonation: (donation) => {
    const servings = donation.servings
    const points = Math.min(50, Math.max(5, Math.floor(servings / 10) * 10))
    const estimatedValue = servings * 50
    
    const newDonation: Donation = {
      ...donation,
      id: `don${Date.now()}`,
      listedAt: new Date(),
      pointsEarned: points,
      estimatedValue
    }
    
    const historyEntry: DonationHistory = {
      id: `dh${Date.now()}`,
      type: "donation",
      foodName: donation.foodName,
      servings: donation.servings,
      date: new Date(),
      pointsEarned: points,
      status: "completed",
      taxValue: estimatedValue
    }

    set((state) => ({
      donations: [newDonation, ...state.donations],
      donationHistory: [historyEntry, ...state.donationHistory],
      user: state.user 
        ? { 
            ...state.user, 
            totalPoints: state.user.totalPoints + points,
            totalDonations: state.user.totalDonations + 1,
            totalMealsServed: state.user.totalMealsServed + servings
          } 
        : null
    }))
  },

  // ─── SELL ITEM ACTIONS ─────────────────────────

  addSellItem: (item) => {
    const discountPercent = Math.round(
      ((item.originalPrice - item.sellingPrice) / 
       item.originalPrice) * 100
    )
    const points = 5
    
    const newItem: SellItem = {
      ...item,
      id: `sell${Date.now()}`,
      listedAt: new Date(),
      discountPercent,
      pointsEarned: points
    }
    
    const historyEntry: DonationHistory = {
      id: `dh${Date.now()}`,
      type: "sell",
      foodName: item.itemName,
      quantity: item.quantity,
      unit: item.unit,
      date: new Date(),
      soldTo: "Available for pickup",
      pointsEarned: points,
      status: "completed",
      taxValue: 0,
      earnedAmount: item.sellingPrice * item.quantity
    }

    set((state) => ({
      sellItems: [newItem, ...state.sellItems],
      donationHistory: [historyEntry, ...state.donationHistory],
      user: state.user 
        ? { 
            ...state.user, 
            totalPoints: state.user.totalPoints + points 
          } 
        : null
    }))
  },

  // ─── INVENTORY ACTIONS ─────────────────────────

  addInventoryItem: (item) => {
    const now = new Date()
    const expiryDate = new Date(item.expiryDate)
    const daysToExpiry = Math.ceil(
      (expiryDate.getTime() - now.getTime()) / 
      (1000 * 60 * 60 * 24)
    )
    
    const condition = 
      daysToExpiry <= 0 ? "expired" :
      daysToExpiry <= 1 ? "expiring_today" :
      daysToExpiry <= 5 ? "near_expiry" : "fresh"

    const newItem: InventoryItem = {
      ...item,
      id: `inv${Date.now()}`,
      daysToExpiry,
      condition,
      discountPercent: 0,
      addedAt: now,
      updatedAt: now
    }

    set((state) => ({
      inventory: [newItem, ...state.inventory]
    }))
    
    get().addToast({ 
      type: "success", 
      message: `${item.itemName} added to inventory!` 
    })
  },

  updateInventoryItem: (id, updates) => {
    set((state) => ({
      inventory: state.inventory.map((item) =>
        item.id === id 
          ? { ...item, ...updates, updatedAt: new Date() } 
          : item
      )
    }))
  },

  removeInventoryItem: (id) => {
    set((state) => ({
      inventory: state.inventory.map((item) =>
        item.id === id 
          ? { ...item, status: "removed" } 
          : item
      )
    }))
    get().addToast({ 
      type: "info", 
      message: "Item removed from inventory." 
    })
  },

  donateFromInventory: (itemId, quantity, pickupHours) => {
    const { inventory, addDonation, updateInventoryItem } = get()
    const item = inventory.find((i) => i.id === itemId)
    if (!item) return

    addDonation({
      donorId: item.shopId,
      foodName: item.itemName,
      photo: item.photos[0] || "",
      category: "raw", // Or derive from item.category
      servings: quantity,
      condition: "good",
      pickupDeadline: new Date(
        Date.now() + pickupHours * 60 * 60 * 1000
      ),
      address: "",
      lat: 0,
      lng: 0,
      status: "listed"
    })

    updateInventoryItem(itemId, { 
      status: "listed_for_donation",
      quantity: item.quantity - quantity
    })
    
    get().addToast({ 
      type: "success", 
      message: `${item.itemName} listed for donation!` 
    })
  },

  sellFromInventory: (itemId, quantity, sellingPrice) => {
    const { inventory, addSellItem, updateInventoryItem } = get()
    const item = inventory.find((i) => i.id === itemId)
    if (!item) return

    addSellItem({
      donorId: item.shopId,
      itemName: item.itemName,
      photo: item.photos[0] || "",
      condition: "near_expiry",
      quantity,
      unit: item.unit,
      category: item.category,
      originalPrice: item.originalPrice,
      sellingPrice,
      expiresAt: item.expiryDate,
      description: `${item.itemName} available for pickup`,
      status: "available"
    })

    updateInventoryItem(itemId, { 
      status: "listed_for_sale",
      quantity: item.quantity - quantity,
      sellingPrice,
      discountPercent: Math.round(
        ((item.originalPrice - sellingPrice) / 
         item.originalPrice) * 100
      )
    })
    
    get().addToast({ 
      type: "success", 
      message: `${item.itemName} listed for sale!` 
    })
  },

  // Duplicate actions removed.

  // ─── UI ACTIONS ────────────────────────────────

  addToast: (toast) => {
    const id = `toast${Date.now()}`
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }]
    }))
    setTimeout(() => {
      get().removeToast(id)
    }, toast.duration || 4000)
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id)
    }))
  },

  setSelectedRequest: (id) => set({ selectedRequestId: id }),
  
  setSelectedInventoryItem: (id) => 
    set({ selectedInventoryItemId: id }),
  
  setTaxReceiptPeriod: (period) => 
    set({ taxReceiptPeriod: period }),

  calculatePoints: () => get().user?.totalPoints || 0
}))
