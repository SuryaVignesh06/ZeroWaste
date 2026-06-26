"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { 
  ArrowLeft, Navigation, MapPin, Package, AlertTriangle, 
  Clock, Leaf, SlidersHorizontal, Phone, CheckCircle2, Bike, Camera 
} from "lucide-react";
import Map, { Marker, Source, Layer, Popup } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { CelebrationScreen } from "./CelebrationScreen";

export function VolunteerMap() {
  const { setActiveScreen, availableMissions, pullRequests, activeMission, acceptMission, completeMission } = useAppStore();
  const [selectedMission, setSelectedMission] = useState<any | null>(null);
  const [showFullDetails, setShowFullDetails] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [pickupPhotoTaken, setPickupPhotoTaken] = useState(false);
  const [deliveryPhotoTaken, setDeliveryPhotoTaken] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewState, setViewState] = useState({
    longitude: 80.2341,
    latitude: 13.0418,
    zoom: 13.5
  });

  const MAPTILER_KEY = "jdxx9Tt17yH2kb6a4tzq";

  if (showCelebration) {
    return (
      <CelebrationScreen
        mode="volunteer"
        title="Delivery Complete! 🚴"
        subtitle={`${activeMission?.servings || 45} meals delivered! Kids at ${activeMission?.ngoName || "Helping Hands NGO"} are smiling because of you! 😊`}
        points={100}
        ctaLabel="Back to Dashboard"
        onDone={() => {
          setShowCelebration(false);
          setIsNavigating(false);
          setPickupPhotoTaken(false);
          setDeliveryPhotoTaken(false);
          setActiveScreen("volunteerHome");
        }}
      />
    );
  }

  const handleMarkerClick = (e: any, mission: any) => {
    e.originalEvent.stopPropagation();
    setSelectedMission(mission);
    setShowFullDetails(false);
    setViewState({
      longitude: mission.providerLocation.lng,
      latitude: mission.providerLocation.lat - 0.005, // offset for tooltip
      zoom: 14.5
    });
  };

  const getUrgencyConfig = (urgency: string) => {
    switch (urgency) {
      case "emergency":
        return { color: "#C94F3A", icon: <Package size={16} color="white" />, size: 48, shadow: "rgba(201,79,58,0.5)", animation: "animate-pulse" };
      case "urgent":
        return { color: "#E8A020", icon: <Package size={16} color="white" />, size: 44, shadow: "rgba(232,160,32,0.5)", animation: "animate-bounce" };
      case "moderate":
        return { color: "#1B5E8A", icon: <Package size={16} color="white" />, size: 40, shadow: "rgba(27,94,138,0.5)", animation: "" };
      case "normal":
      default:
        return { color: "#3A7D52", icon: <Package size={16} color="white" />, size: 40, shadow: "rgba(58,125,82,0.5)", animation: "" };
    }
  };

  return (
    <div className="flex h-full flex-col relative bg-[#EDE8DF]">
      {/* FULL SCREEN MAP */}
      <div className="absolute inset-0 z-0 pb-[72px]">
        <Map
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          mapStyle={`https://api.maptiler.com/maps/basic-v2/style.json?key=${MAPTILER_KEY}`}
          interactive={true}
        >
          {/* USER LOCATION RADAR */}
          <Marker longitude={80.2341} latitude={13.0418} anchor="center">
            <div className="relative flex items-center justify-center h-20 w-20 pointer-events-none">
              <span className="absolute inline-flex h-12 w-12 rounded-full bg-[#1B5E8A]/40 animate-ping"></span>
              <span className="absolute inline-flex h-6 w-6 rounded-full bg-[#1B5E8A]/50 animate-pulse"></span>
              <div className="h-8 w-8 bg-white rounded-full border-2 border-[#1B5E8A] shadow-lg relative z-10 flex items-center justify-center">
                <Bike size={16} className="text-[#1B5E8A]" />
              </div>
            </div>
          </Marker>

          {/* COVERAGE RADIUS (Mocking 5km radius) */}
          <Source id="radius" type="geojson" data={{
            type: "Feature",
            properties: {},
            geometry: {
              type: "Polygon",
              coordinates: [[
                ...Array.from({ length: 64 }, (_, i) => {
                  const angle = (i / 64) * Math.PI * 2;
                  // rough 5km radius in degrees
                  return [80.2341 + Math.cos(angle) * 0.045, 13.0418 + Math.sin(angle) * 0.045];
                }),
                [80.2341 + 0.045, 13.0418]
              ]]
            }
          }}>
            <Layer
              id="radius-fill"
              type="fill"
              paint={{ "fill-color": "#1B5E8A", "fill-opacity": 0.08 }}
            />
            <Layer
              id="radius-line"
              type="line"
              paint={{ "line-color": "#1B5E8A", "line-opacity": 0.3, "line-width": 1.5, "line-dasharray": [6, 4] }}
            />
          </Source>

          {/* ROUTE LINE (if navigating) */}
          {isNavigating && activeMission && (
            <Source id="route" type="geojson" data={{
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: [
                  [80.2341, 13.0418], // user
                  [activeMission.providerLocation.lng, activeMission.providerLocation.lat], // donor
                  [activeMission.ngoLocation.lng, activeMission.ngoLocation.lat] // ngo
                ]
              }
            }}>
              <Layer
                id="route-line"
                type="line"
                layout={{ "line-join": "round", "line-cap": "round" }}
                paint={{ "line-color": "#1B5E8A", "line-width": 4, "line-dasharray": [2, 2] }}
              />
            </Source>
          )}

          {/* NGO REQUEST MARKERS */}
          {!isNavigating && pullRequests.map((pr, idx) => {
            const config = getUrgencyConfig(pr.urgency);
            // generate deterministic fake lat/lng based on distance
            const angle = (idx * 73) * (Math.PI / 180);
            const prLat = 13.0418 + (pr.distance / 111) * Math.cos(angle);
            const prLng = 80.2341 + (pr.distance / 111) * Math.sin(angle);
            
            return (
              <Marker 
                key={pr.id}
                longitude={prLng} 
                latitude={prLat} 
                anchor="bottom"
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  setSelectedMission({
                    ...pr,
                    providerName: pr.ngoName,
                    providerLocation: { lat: prLat, lng: prLng, address: "NGO Location" },
                    servings: pr.servingsNeeded,
                    isNgoRequest: true
                  });
                  setShowFullDetails(false);
                  setViewState({ longitude: prLng, latitude: prLat - 0.005, zoom: 14.5 });
                }}
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`relative flex items-center justify-center rounded-full shadow-lg ${config.animation}`}
                  style={{ backgroundColor: config.color, width: config.size, height: config.size, boxShadow: `0 4px 12px ${config.shadow}` }}
                >
                  <Package size={16} color="white" />
                  
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
                    <span className="text-[10px] font-bold text-[#1B5E8A]" style={{ fontFamily: "var(--font-outfit)" }}>{pr.servingsNeeded}</span>
                  </div>
                </motion.div>
              </Marker>
            );
          })}

          {/* MISSION MARKERS */}
          {!isNavigating && availableMissions.map(mission => {
            const config = getUrgencyConfig(mission.urgency);
            return (
              <Marker 
                key={mission.id}
                longitude={mission.providerLocation.lng} 
                latitude={mission.providerLocation.lat} 
                anchor="bottom"
                onClick={(e) => handleMarkerClick(e, mission)}
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`relative flex items-center justify-center rounded-full shadow-lg ${config.animation}`}
                  style={{ backgroundColor: config.color, width: config.size, height: config.size, boxShadow: `0 4px 12px ${config.shadow}` }}
                >
                  {config.icon}
                  
                  {/* Quantity Badge */}
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
                    <span className="text-[10px] font-bold text-[#1B5E8A]" style={{ fontFamily: "var(--font-outfit)" }}>{mission.servings}</span>
                  </div>
                </motion.div>
              </Marker>
            );
          })}
          
          {/* POPUP TOOLTIP */}
          {selectedMission && !showFullDetails && !isNavigating && (
            <Popup
              longitude={selectedMission.providerLocation.lng}
              latitude={selectedMission.providerLocation.lat}
              anchor="bottom"
              closeButton={false}
              closeOnClick={false}
              offset={40}
              className="z-20 custom-popup-override"
            >
              <style>{`
                .custom-popup-override .maplibregl-popup-content {
                  padding: 0 !important;
                  background: transparent !important;
                  box-shadow: none !important;
                }
                .custom-popup-override .maplibregl-popup-tip {
                  display: none !important;
                }
              `}</style>
              <div className="bg-white rounded-[20px] shadow-2xl p-4 w-[260px] border border-gray-100">
                <div className="flex gap-3 mb-3">
                  <img src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=100" className="w-12 h-12 rounded-xl object-cover" alt="food" />
                  <div>
                    <h4 className="font-bold text-[#0A0A0A] text-sm leading-tight">Vegetable Biryani</h4>
                    <p className="text-[#8A8A8A] text-xs mt-0.5">{selectedMission.providerName}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-xs font-medium text-[#4A4A4A] mb-3">
                  <span className="flex items-center gap-1"><Navigation size={12}/> 1.2 km</span>
                  <span className="flex items-center gap-1 text-[#C94F3A]"><Clock size={12}/> 1h 20m left</span>
                </div>
                
                <div className="flex justify-between items-center text-xs font-bold mb-4 bg-gray-50 p-2 rounded-lg">
                  <span className="text-[#1B5E8A]">👥 {selectedMission.servings} servings</span>
                  <span className="text-[#E8A020]">🏆 +15 pts</span>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setShowFullDetails(true); }}
                    className="flex-1 border border-gray-200 text-[#4A4A4A] py-2 rounded-full font-bold text-xs"
                  >
                    Full Details
                  </button>
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      acceptMission(selectedMission.id);
                      setIsNavigating(true);
                      setViewState({
                        longitude: selectedMission.providerLocation.lng,
                        latitude: selectedMission.providerLocation.lat,
                        zoom: 13.5
                      });
                      setSelectedMission(null);
                    }}
                    className="flex-1 bg-[#1B5E8A] text-white py-2 rounded-full font-bold text-xs flex items-center justify-center gap-1 shadow-md shadow-[#1B5E8A]/30"
                  >
                    <CheckCircle2 size={14}/> Accept
                  </button>
                </div>
              </div>
            </Popup>
          )}

          {/* ACTIVE MISSION DESTINATIONS */}
          {isNavigating && activeMission && (
            <>
              <Marker longitude={activeMission.providerLocation.lng} latitude={activeMission.providerLocation.lat} anchor="bottom">
                <div className="relative flex items-center justify-center h-10 w-10 rounded-full shadow-lg border-2 border-white bg-[#1B5E8A] z-10">
                  <Package size={18} color="white" />
                </div>
              </Marker>
              <Marker longitude={activeMission.ngoLocation.lng} latitude={activeMission.ngoLocation.lat} anchor="bottom">
                <div className="relative flex items-center justify-center h-10 w-10 rounded-full shadow-lg border-2 border-white bg-[#3A7D52] z-10">
                  <MapPin size={18} color="white" />
                </div>
              </Marker>
            </>
          )}
        </Map>
      </div>

      {/* FLOATING HEADER */}
      <div className="absolute top-[47px] left-4 right-4 h-[52px] bg-[rgba(247,245,240,0.94)] backdrop-blur-xl rounded-full border border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.1)] flex items-center px-4 gap-3 z-30">
        <button 
          onClick={() => setActiveScreen("volunteerHome")}
          className="shrink-0 flex items-center justify-center bg-gray-100 w-8 h-8 rounded-full"
        >
          <ArrowLeft size={16} className="text-[#4A4A4A]"/>
        </button>
        <div className="bg-[#4CAF7D] text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse" /> Online
        </div>
        <input 
          type="text" 
          placeholder="Search area..." 
          className="flex-1 bg-transparent border-none text-sm outline-none text-[#0A0A0A] placeholder:text-[#8A8A8A]"
          style={{ fontFamily: "var(--font-jakarta)" }}
        />
        <button className="w-8 h-8 rounded-full bg-[#1B5E8A] flex items-center justify-center shrink-0 shadow-sm">
          <SlidersHorizontal size={14} className="text-white" />
        </button>
      </div>

      {/* FLOATING STATS ROW */}
      <div className="absolute top-[115px] left-4 right-4 flex gap-2 z-30 overflow-x-auto no-scrollbar">
        <div className="bg-[rgba(247,245,240,0.94)] backdrop-blur-xl border border-white/70 rounded-full px-3.5 py-2 flex items-center gap-1.5 shadow-sm whitespace-nowrap">
          <Package size={14} className="text-[#0A0A0A]" /> <span className="text-[#0A0A0A] text-xs font-bold">6 nearby</span>
        </div>
        <div className="bg-[rgba(247,245,240,0.94)] backdrop-blur-xl border border-white/70 rounded-full px-3.5 py-2 flex items-center gap-1.5 shadow-sm whitespace-nowrap">
          <AlertTriangle size={14} className="text-[#C94F3A]" /> <span className="text-[#0A0A0A] text-xs font-bold">2 urgent</span>
        </div>
        <div className="bg-[rgba(247,245,240,0.94)] backdrop-blur-xl border border-white/70 rounded-full px-3.5 py-2 flex items-center gap-1.5 shadow-sm whitespace-nowrap">
          <SlidersHorizontal size={14} className="text-[#0A0A0A]" /> <span className="text-[#0A0A0A] text-xs font-bold">5km radius</span>
        </div>
      </div>

      {/* RECENTER BUTTON */}
      <button 
        onClick={() => setViewState({ longitude: 80.2341, latitude: 13.0418, zoom: 13.5 })}
        className="absolute bottom-[96px] right-4 z-20 h-12 w-12 bg-white rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.15)] flex items-center justify-center border border-gray-100"
      >
        <Navigation size={20} className="text-[#1B5E8A]" />
      </button>

      {/* FLOATING NAVIGATION CARD (Active Mission) */}
      <AnimatePresence>
        {isNavigating && activeMission && (
          <>
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                if (info.offset.y > 40) setIsExpanded(false);
                else if (info.offset.y < -40) setIsExpanded(true);
              }}
              initial={{ y: "100%" }}
              animate={{ y: isExpanded ? 0 : 140 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute bottom-0 left-0 right-0 z-50 bg-[#FDFCF9] rounded-t-[32px] px-6 pt-5 pb-[100px] shadow-[0_-8px_30px_rgba(0,0,0,0.15)] border-t border-white/80"
            >
              {/* Drag Handle Area */}
              <div 
                className="w-full flex justify-center pb-5 cursor-grab active:cursor-grabbing"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
              </div>

              <div className="flex justify-between items-center mb-5">
                <div>
                  <p className="text-[#1B5E8A] text-[11px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1"><Package size={12}/> Active Mission</p>
                  <h3 className="text-[#0A0A0A] font-bold text-xl leading-tight">Delivery Tasks</h3>
                </div>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#4A4A4A] bg-white shadow-sm">
                    <Navigation size={16} className="text-[#1B5E8A]" />
                  </button>
                  <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#4A4A4A] bg-white shadow-sm">
                    <Phone size={16} className="text-[#4CAF7D]" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-6 relative mt-2">
                {/* Connecting line */}
                <div className="absolute left-6 top-8 bottom-12 w-0.5 bg-gray-200" />

                {/* Pickup Step */}
                <div className="relative flex gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm border-2 relative z-10 bg-white ${pickupPhotoTaken ? 'border-green-500 text-green-600' : 'border-orange-400 text-orange-500'}`}>
                    {pickupPhotoTaken ? <CheckCircle2 size={24} /> : <Package size={20} />}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-[#8A8A8A] font-bold uppercase tracking-wider">1. Pickup from</p>
                    <p className="font-bold text-[#0A0A0A] text-base mb-2">{activeMission.providerName}</p>
                    
                    {!pickupPhotoTaken ? (
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setPickupPhotoTaken(true);
                          setViewState({
                            longitude: activeMission.ngoLocation.lng,
                            latitude: activeMission.ngoLocation.lat - 0.005,
                            zoom: 14
                          });
                        }}
                        className="w-full bg-orange-50 hover:bg-orange-100 rounded-xl border border-dashed border-orange-300 py-3.5 flex items-center justify-center gap-2 text-orange-700 font-bold text-sm transition-colors"
                      >
                        <Camera size={18} /> Take Pickup Photo
                      </motion.button>
                    ) : (
                      <div className="w-full bg-green-50 rounded-xl border border-green-200 py-3 px-4 flex items-center gap-2 text-green-700 text-sm font-bold">
                        <CheckCircle2 size={18} /> Photo Verified
                      </div>
                    )}
                  </div>
                </div>

                {/* Delivery Step */}
                <div className="relative flex gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm border-2 relative z-10 bg-white ${deliveryPhotoTaken ? 'border-green-500 text-green-600' : (pickupPhotoTaken ? 'border-[#1B5E8A] text-[#1B5E8A]' : 'border-gray-200 text-gray-400')}`}>
                    <MapPin size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-[#8A8A8A] font-bold uppercase tracking-wider">2. Deliver to</p>
                    <p className="font-bold text-[#0A0A0A] text-base mb-2">{activeMission.ngoName}</p>
                    
                    {!pickupPhotoTaken ? (
                      <button disabled className="w-full bg-gray-50 rounded-xl border border-dashed border-gray-200 py-3.5 flex items-center justify-center gap-2 text-gray-400 font-bold text-sm">
                        <Camera size={18} /> Take Delivery Photo
                      </button>
                    ) : !deliveryPhotoTaken ? (
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setDeliveryPhotoTaken(true);
                          setTimeout(() => {
                            completeMission();
                            setShowCelebration(true);
                          }, 600);
                        }}
                        className="w-full bg-[#1B5E8A] hover:bg-[#154a6e] rounded-xl border border-transparent py-3.5 flex items-center justify-center gap-2 text-white font-bold text-sm shadow-md transition-colors"
                      >
                        <Camera size={18} /> Take Delivery Photo
                      </motion.button>
                    ) : (
                      <div className="w-full bg-green-50 rounded-xl border border-green-200 py-3 px-4 flex items-center gap-2 text-green-700 text-sm font-bold">
                        <CheckCircle2 size={18} /> Photo Verified
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* FULL DETAILS BOTTOM SHEET */}
      <AnimatePresence>
        {showFullDetails && selectedMission && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFullDetails(false)}
              className="absolute inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute bottom-0 left-0 right-0 z-50 bg-[#FDFCF9] rounded-t-[32px] overflow-hidden flex flex-col max-h-[90%]"
            >
              <div className="w-full flex justify-center pt-3 pb-2 bg-white absolute top-0 z-10 rounded-t-[32px]">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
              </div>
              
              <div className="overflow-y-auto pb-8 pt-8">
                <img src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800" className="w-full h-[200px] object-cover" alt="food" />
                
                <div className="p-6">
                  <h2 className="text-[22px] font-bold text-[#0A0A0A] mb-2" style={{ fontFamily: "var(--font-outfit)" }}>Vegetable Biryani</h2>
                  <div className="flex gap-2 mb-6">
                    <span className="bg-[#4CAF7D]/10 text-[#4CAF7D] px-2.5 py-1 rounded-md text-xs font-bold">Freshly Cooked</span>
                    <span className="bg-[#1B5E8A]/10 text-[#1B5E8A] px-2.5 py-1 rounded-md text-xs font-bold">👥 80 servings</span>
                  </div>

                  <h3 className="text-sm font-bold text-[#8A8A8A] uppercase tracking-wider mb-3">Pickup Details</h3>
                  <div className="bg-white rounded-[20px] p-4 border border-gray-100 shadow-sm mb-6">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                        <MapPin size={16} className="text-[#1B5E8A]" />
                      </div>
                      <div>
                        <p className="font-bold text-[#0A0A0A]">{selectedMission.providerName}</p>
                        <p className="text-xs text-[#8A8A8A] mt-0.5">{selectedMission.providerLocation.address} (1.2 km from you)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                        <Clock size={16} className="text-[#C94F3A]" />
                      </div>
                      <div>
                        <p className="font-bold text-[#0A0A0A]">Pickup by: 4:30 PM</p>
                        <p className="text-xs text-[#C94F3A] font-bold mt-0.5">1h 20m left</p>
                      </div>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-xl border border-orange-100">
                      <p className="text-xs text-orange-800 font-medium italic flex items-start gap-2">
                        <span>📝</span> "Please bring containers for biryani. Heavy quantity."
                      </p>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-[#8A8A8A] uppercase tracking-wider mb-3">Deliver To</h3>
                  <div className="bg-white rounded-[20px] p-4 border border-gray-100 shadow-sm mb-6">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                        <MapPin size={16} className="text-[#3A7D52]" />
                      </div>
                      <div>
                        <p className="font-bold text-[#0A0A0A]">{selectedMission.ngoName}</p>
                        <p className="text-xs text-[#8A8A8A] mt-0.5">{selectedMission.ngoLocation.address}</p>
                      </div>
                    </div>
                    <p className="text-xs text-[#4A4A4A] flex items-center gap-1.5 ml-11"><Phone size={12}/> Contact: Rajesh (+91 98765...)</p>
                  </div>

                  <h3 className="text-sm font-bold text-[#8A8A8A] uppercase tracking-wider mb-3">Your Rewards</h3>
                  <div className="flex gap-2 mb-8">
                    <div className="flex-1 bg-white border border-gray-100 rounded-[16px] p-3 text-center shadow-sm">
                      <p className="text-lg mb-1">🏆</p>
                      <p className="font-bold text-[#1B5E8A] text-sm">+15 pts</p>
                    </div>
                    <div className="flex-1 bg-white border border-gray-100 rounded-[16px] p-3 text-center shadow-sm">
                      <p className="text-lg mb-1">💰</p>
                      <p className="font-bold text-[#4CAF7D] text-sm">₹60 earned</p>
                    </div>
                    <div className="flex-1 bg-white border border-gray-100 rounded-[16px] p-3 text-center shadow-sm">
                      <p className="text-lg mb-1">🕐</p>
                      <p className="font-bold text-[#0A0A0A] text-sm">~2 hrs</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      acceptMission(selectedMission.id);
                      setIsNavigating(true);
                      setShowFullDetails(false);
                      setSelectedMission(null);
                    }}
                    className="w-full bg-[#1B5E8A] text-white py-4 rounded-full font-bold text-lg shadow-[0_8px_20px_rgba(27,94,138,0.3)] mb-3"
                  >
                    ✅ Accept Pickup
                  </button>
                  <button 
                    onClick={() => setShowFullDetails(false)}
                    className="w-full py-3 text-[#8A8A8A] font-bold text-sm"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
