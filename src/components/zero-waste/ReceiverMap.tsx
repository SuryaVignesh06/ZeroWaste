"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { fadeUp } from "@/lib/animations";
import { ArrowLeft, HandHeart, Tag, MapPin, Navigation, Map as MapIcon, X } from "lucide-react";
import Map, { Marker, Popup } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Listing } from "@/lib/types";

export function ReceiverMap() {
  const { receiverType, setScreen } = useAppStore();
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [viewState, setViewState] = useState({
    longitude: 77.5946,
    latitude: 12.9716,
    zoom: 13
  });

  const MAPTILER_KEY = "jdxx9Tt17yH2kb6a4tzq";

  // Mock data for map
  const mockListings: Listing[] = [
    {
      id: "don_1", providerId: "p_1", providerName: "Taj Hotel", providerType: "restaurant",
      providerLocation: { lat: 12.9716, lng: 77.5946, address: "MG Road, 2km away" },
      mode: "donate", name: "Buffet Surplus", category: "Cooked Meal",
      photos: ["https://images.unsplash.com/photo-1555939594-58d7cb561ad1"],
      servings: 45, condition: "freshly_cooked",
      expiryDate: new Date(Date.now() + 4 * 60 * 60 * 1000), daysLeft: 0,
      urgencyLevel: "urgent", availableFrom: new Date(), availableUntil: new Date(),
      specialInstructions: "", status: "active", views: 0, createdAt: new Date()
    },
    {
      id: "sale_1", providerId: "p_3", providerName: "FreshMart", providerType: "shop",
      providerLocation: { lat: 12.965, lng: 77.600, address: "1km away" },
      mode: "sell", name: "Organic Tomatoes", category: "Vegetables",
      photos: ["https://images.unsplash.com/photo-1592924357228-91a4daadcfea"],
      mrp: 80, discountPercent: 50, discountPrice: 40, stock: 5,
      expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), daysLeft: 2,
      urgencyLevel: "high", availableFrom: new Date(), availableUntil: new Date(),
      specialInstructions: "", status: "active", views: 0, createdAt: new Date()
    },
    {
      id: "don_2", providerId: "p_2", providerName: "Rahul", providerType: "individual",
      providerLocation: { lat: 12.978, lng: 77.585, address: "Indiranagar, 5km away" },
      mode: "donate", name: "Home Cooked Meal", category: "Cooked Meal",
      photos: ["https://images.unsplash.com/photo-1546069901-ba9599a7e63c"],
      servings: 3, condition: "good_condition",
      expiryDate: new Date(Date.now() + 12 * 60 * 60 * 1000), daysLeft: 0,
      urgencyLevel: "high", availableFrom: new Date(), availableUntil: new Date(),
      specialInstructions: "", status: "active", views: 0, createdAt: new Date()
    }
  ];

  const displayedListings = useMemo(() => {
    return receiverType === "ngo" 
      ? mockListings.filter(l => l.mode === "donate" && (l.servings || 0) >= 10)
      : mockListings.filter(l => l.mode === "sell" || (l.mode === "donate" && (l.servings || 0) < 10));
  }, [receiverType]);

  const handleMarkerClick = (e: any, listing: Listing) => {
    e.originalEvent.stopPropagation();
    setSelectedListing(listing);
    setViewState({
      longitude: listing.providerLocation.lng,
      latitude: listing.providerLocation.lat - 0.002, // Offset for bottom sheet
      zoom: 14.5
    });
  };

  return (
    <div className="flex h-full flex-col relative bg-[#F7F5F0]">
      {/* Search Header overlay */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 pt-12 bg-gradient-to-b from-white/90 to-transparent">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setScreen("recipientHome")}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm border border-[#E8E8E4] shrink-0"
          >
            <ArrowLeft size={20} className="text-[#0A0A0A]" />
          </button>
          <div className="flex-1 bg-white h-12 rounded-full shadow-sm border border-[#E8E8E4] flex items-center px-4 overflow-hidden">
            <div className="flex items-center justify-center h-full text-[#1A6B3C] font-semibold text-sm gap-2">
              <MapIcon size={16} /> Explore Map
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 w-full h-full relative">
        <Map
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          mapStyle={`https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_KEY}`}
          interactive={true}
        >
          {/* User Location Marker */}
          <Marker longitude={77.5946} latitude={12.9716} anchor="center">
            <div className="h-6 w-6 bg-blue-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <div className="h-2 w-2 bg-white rounded-full animate-pulse" />
            </div>
          </Marker>

          {/* Listing Markers */}
          {displayedListings.map(listing => (
            <Marker 
              key={listing.id}
              longitude={listing.providerLocation.lng} 
              latitude={listing.providerLocation.lat} 
              anchor="bottom"
              onClick={(e) => handleMarkerClick(e, listing)}
            >
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className={`relative flex items-center justify-center h-10 w-10 rounded-full shadow-lg border-2 border-white cursor-pointer ${
                  listing.mode === "donate" ? "bg-[#1A6B3C]" : "bg-[#D97706]"
                } ${selectedListing?.id === listing.id ? 'ring-4 ring-black/10' : ''}`}
              >
                {listing.mode === "donate" ? <HandHeart size={18} color="white" /> : <Tag size={18} color="white" />}
              </motion.div>
            </Marker>
          ))}
        </Map>
      </div>

      {/* Recenter Button */}
      <button 
        onClick={() => setViewState({ longitude: 77.5946, latitude: 12.9716, zoom: 14 })}
        className="absolute bottom-6 right-4 z-20 h-12 w-12 bg-white rounded-full shadow-md flex items-center justify-center border border-[#E8E8E4]"
      >
        <Navigation size={20} className="text-[#0A0A0A]" />
      </button>

      {/* Listing Bottom Sheet overlay */}
      <AnimatePresence>
        {selectedListing && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute bottom-0 left-0 right-0 z-30 bg-white rounded-t-[32px] p-6 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] border-t border-[#E8E8E4]"
          >
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-[#E8E8E4] rounded-full" />
            
            <button 
              onClick={() => setSelectedListing(null)}
              className="absolute top-4 right-4 p-2"
            >
              <X size={20} className="text-[#8A8A8A]" />
            </button>

            <div className="flex gap-4 mt-2">
              <div className="w-[100px] h-[100px] rounded-[20px] overflow-hidden shrink-0 relative shadow-sm border border-[#E8E8E4]">
                <img src={selectedListing.photos[0]} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-md text-[10px] font-bold shadow-sm" style={{ color: selectedListing.mode === "donate" ? "#1A6B3C" : "#D97706" }}>
                  {selectedListing.mode === "donate" ? "FREE" : `${selectedListing.discountPercent}% OFF`}
                </div>
              </div>
              <div className="flex flex-col justify-between py-1">
                <div>
                  <h3 className="font-bold text-[#0A0A0A] text-lg leading-tight line-clamp-2" style={{ fontFamily: "var(--font-outfit)" }}>{selectedListing.name}</h3>
                  <p className="text-[#8A8A8A] text-[13px] mt-1">{selectedListing.providerName}</p>
                </div>
                <div className="flex items-center gap-1 text-[#4A4A4A] text-sm">
                  <MapPin size={14} /> 
                  <span className="font-medium text-[13px]">{selectedListing.providerLocation.address}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-5">
              {selectedListing.mode === "sell" ? (
                <div className="flex items-end gap-2 flex-1">
                  <span className="text-[#0A0A0A] font-bold text-2xl" style={{ fontFamily: "var(--font-outfit)" }}>₹{selectedListing.discountPrice}</span>
                  <span className="text-[#8A8A8A] text-sm line-through pb-1">₹{selectedListing.mrp}</span>
                </div>
              ) : (
                <div className="bg-[#F0F7F2] text-[#1A6B3C] px-3 py-1.5 rounded-lg font-bold text-sm">
                  {selectedListing.servings} Servings
                </div>
              )}
              
              <button 
                onClick={() => setScreen("productDetail")}
                className="flex-1 py-3.5 rounded-full text-white font-bold text-[15px] shadow-sm transition-all"
                style={{ 
                  background: selectedListing.mode === "donate" ? "#1A6B3C" : "#D97706",
                  fontFamily: "var(--font-outfit)"
                }}
              >
                {selectedListing.mode === "donate" ? "Reserve Food" : "Claim Deal"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
