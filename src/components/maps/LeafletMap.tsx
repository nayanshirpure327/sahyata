"use client";

import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { SahaytaListing } from "@/lib/constants/seedData";
import { CITIES_AND_LOCALITIES, City, Locality } from "@/lib/constants/citiesAndLocalities";
import { calculateRoute, RouteResult } from "@/lib/services/routingService";
import NavigationPanel from "./NavigationPanel";
import { Compass, Layers, LocateFixed, Navigation, ShieldCheck } from "lucide-react";

interface LeafletMapProps {
  listings: SahaytaListing[];
  selectedCity: City;
  selectedLocality: Locality | null;
  onSelectListing?: (listing: SahaytaListing) => void;
  activeNavListing?: SahaytaListing | null;
  className?: string;
}

const CATEGORY_STYLES: Record<string, { bg: string; border: string; glow: string; icon: string }> = {
  stay: { bg: "#2563EB", border: "#60A5FA", glow: "rgba(37, 99, 235, 0.6)", icon: "🏠" },
  food: { bg: "#D97706", border: "#FBBF24", glow: "rgba(217, 119, 6, 0.6)", icon: "🍲" },
  jobs: { bg: "#059669", border: "#34D399", glow: "rgba(5, 150, 105, 0.6)", icon: "💼" },
  marketplace: { bg: "#7C3AED", border: "#A78BFA", glow: "rgba(124, 58, 237, 0.6)", icon: "🛋️" },
  services: { bg: "#0891B2", border: "#22D3EE", glow: "rgba(8, 145, 178, 0.6)", icon: "🧹" },
  resources: { bg: "#E11D48", border: "#FB7185", glow: "rgba(225, 29, 72, 0.6)", icon: "📚" },
  events: { bg: "#CA8A04", border: "#FACC15", glow: "rgba(202, 138, 4, 0.6)", icon: "🎉" },
  health: { bg: "#DC2626", border: "#F87171", glow: "rgba(220, 38, 38, 0.6)", icon: "🏥" },
};

export default function LeafletMap({
  listings,
  selectedCity,
  selectedLocality,
  onSelectListing,
  activeNavListing = null,
  className = "h-[560px] w-full",
}: LeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const routeLayerRef = useRef<L.LayerGroup | null>(null);
  const pulseCircleRef = useRef<L.Circle | null>(null);

  const [mapStyle, setMapStyle] = useState<"dark" | "streets">("dark");
  const [radarPulseActive, setRadarPulseActive] = useState<boolean>(true);

  // Navigation states
  const [navTarget, setNavTarget] = useState<{
    listing: SahaytaListing;
    coords: [number, number];
  } | null>(null);
  const [navMode, setNavMode] = useState<"drive" | "motorcycle" | "walk" | "transit">("drive");
  const [routeResult, setRouteResult] = useState<RouteResult | null>(null);
  const [isRouting, setIsRouting] = useState<boolean>(false);
  const [userGpsCoords, setUserGpsCoords] = useState<[number, number] | null>(null);

  const apiKey =
    process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY ||
    process.env.NEXT_PUBLIC_MAP_API_KEY ||
    "321ba8bd31564a648a1d57f97f5b7f80";

  // Helper to calculate listing coords with anti-collision jitter
  const getListingCoords = (listing: SahaytaListing, index: number = 0): [number, number] => {
    let baseLat = selectedCity.localities[0]?.lat || 18.5204;
    let baseLng = selectedCity.localities[0]?.lng || 73.8567;

    const cityObj = CITIES_AND_LOCALITIES.find((c) => c.id === listing.cityId);
    if (cityObj) {
      const locObj = cityObj.localities.find((l) => l.id === listing.localityId);
      if (locObj) {
        baseLat = locObj.lat;
        baseLng = locObj.lng;
      } else if (cityObj.localities.length > 0) {
        baseLat = cityObj.localities[0].lat;
        baseLng = cityObj.localities[0].lng;
      }
    }

    // Deterministic spread around locality center
    let hash = 0;
    for (let i = 0; i < listing.id.length; i++) {
      hash = (hash << 5) - hash + listing.id.charCodeAt(i);
      hash |= 0;
    }
    const angle = ((Math.abs(hash) + index * 53) % 360) * (Math.PI / 180);
    const radius = 0.003 + ((Math.abs(hash * 7) % 100) / 100) * 0.007;

    const lat = baseLat + radius * Math.cos(angle);
    const lng = baseLng + radius * Math.sin(angle);

    return [lat, lng];
  };

  // 1. Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const initialLat = selectedLocality?.lat || selectedCity.localities[0]?.lat || 18.5204;
    const initialLng = selectedLocality?.lng || selectedCity.localities[0]?.lng || 73.8567;

    const map = L.map(mapContainerRef.current, {
      center: [initialLat, initialLng],
      zoom: selectedLocality ? 14 : 12,
      zoomControl: false,
    });

    L.control.zoom({ position: "topright" }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    routeLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    // Detect user's current GPS in background
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserGpsCoords([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => console.log("Geolocation passive:", err.message)
      );
    }

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // 2. Update Tile Layer
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    const tileUrl =
      mapStyle === "dark"
        ? `https://maps.geoapify.com/v1/tile/dark-matter-dark-grey/{z}/{x}/{y}.png?apiKey=${apiKey}`
        : `https://maps.geoapify.com/v1/tile/osm-bright-smooth/{z}/{x}/{y}.png?apiKey=${apiKey}`;

    const fallbackUrl =
      mapStyle === "dark"
        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

    const tileLayer = L.tileLayer(tileUrl, {
      attribution: '&copy; <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
      subdomains: "abcd",
    });

    tileLayer.on("tileerror", () => {
      L.tileLayer(fallbackUrl, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);
    });

    tileLayer.addTo(map);
  }, [mapStyle, apiKey]);

  // 3. Update Center & Zoom when City or Locality changes
  useEffect(() => {
    if (!mapInstanceRef.current || navTarget) return; // If navigation is active, let route control camera
    const targetLat = selectedLocality?.lat || selectedCity.localities[0]?.lat || 18.5204;
    const targetLng = selectedLocality?.lng || selectedCity.localities[0]?.lng || 73.8567;
    const targetZoom = selectedLocality ? 14 : 12;

    mapInstanceRef.current.flyTo([targetLat, targetLng], targetZoom, {
      duration: 1.2,
      easeLinearity: 0.25,
    });

    if (pulseCircleRef.current) {
      pulseCircleRef.current.remove();
    }

    if (radarPulseActive) {
      pulseCircleRef.current = L.circle([targetLat, targetLng], {
        radius: 1200,
        color: "#38BDF8",
        fillColor: "#0EA5E9",
        fillOpacity: 0.12,
        weight: 1.5,
        dashArray: "4, 6",
      }).addTo(mapInstanceRef.current);
    }
  }, [selectedCity, selectedLocality, radarPulseActive, navTarget]);

  // 4. Render Markers for Listings
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;
    const markersLayer = markersLayerRef.current;
    markersLayer.clearLayers();

    listings.forEach((listing, idx) => {
      const [lat, lng] = getListingCoords(listing, idx);
      const catStyle = CATEGORY_STYLES[listing.category] || CATEGORY_STYLES.stay;

      const priceFormatted =
        listing.price === 0
          ? "FREE"
          : `₹${listing.price >= 1000 ? `${(listing.price / 1000).toFixed(listing.price % 1000 === 0 ? 0 : 1)}k` : listing.price}`;

      const customIcon = L.divIcon({
        className: "custom-map-pin-container",
        iconSize: [110, 40],
        iconAnchor: [55, 36],
        popupAnchor: [0, -36],
        html: `
          <div class="relative group cursor-pointer flex items-center justify-center">
            <div class="radar-pulse-ring" style="border-color: ${catStyle.border}; background: ${catStyle.glow}"></div>
            <div style="
              background: #0F172A;
              border: 1.5px solid ${catStyle.border};
              box-shadow: 0 4px 15px -2px ${catStyle.glow}, 0 0 10px 1px rgba(0,0,0,0.5);
            " class="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-white text-[11px] font-black transition-transform duration-200 hover:scale-110 active:scale-95 whitespace-nowrap">
              <span class="text-xs">${catStyle.icon}</span>
              <span class="text-white">${priceFormatted}</span>
            </div>
            <div style="
              width: 0;
              height: 0;
              border-left: 5px solid transparent;
              border-right: 5px solid transparent;
              border-top: 6px solid ${catStyle.border};
              position: absolute;
              bottom: -6px;
              left: calc(50% - 5px);
            "></div>
          </div>
        `,
      });

      const marker = L.marker([lat, lng], { icon: customIcon });

      const popupHtml = document.createElement("div");
      popupHtml.className = "p-4 space-y-3 max-w-[290px]";
      popupHtml.innerHTML = `
        <div class="relative rounded-xl overflow-hidden h-28 w-full bg-slate-900">
          <img 
            src="${listing.images[0] || "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af"}" 
            alt="${listing.title}" 
            class="w-full h-full object-cover" 
          />
          <div class="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-black uppercase text-white" style="background: ${catStyle.bg}">
            ${listing.subCategory}
          </div>
          ${
            listing.verified
              ? `<div class="absolute top-2 right-2 px-1.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500 text-white flex items-center gap-1">
                  ✓ Verified
                 </div>`
              : ""
          }
        </div>
        <div>
          <div class="flex items-center justify-between text-xs text-sky-400 font-bold mb-1">
            <span>📍 ${listing.localityName}</span>
            <span class="text-amber-400 font-black flex items-center gap-0.5">★ ${listing.rating}</span>
          </div>
          <h4 class="text-sm font-black text-white line-clamp-2 leading-tight">${listing.title}</h4>
          <div class="mt-2 flex items-baseline justify-between">
            <span class="text-lg font-black text-sky-300">₹${listing.price.toLocaleString()}</span>
            <span class="text-[11px] text-slate-400 font-medium">${listing.priceUnit}</span>
          </div>
        </div>
        <div class="pt-2 border-t border-white/10 flex items-center gap-2">
          <button id="nav-btn-${listing.id}" class="flex-1 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-black rounded-xl transition flex items-center justify-center gap-1 shadow-md shadow-[#2563EB]/40">
            🧭 Navigate
          </button>
          <button id="view-details-btn-${listing.id}" class="px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition">
            Details
          </button>
          <a href="tel:${listing.contactPhone}" class="p-2 bg-[#F59E0B] text-black font-black rounded-xl flex items-center justify-center transition" title="Call">
            📞
          </a>
        </div>
      `;

      // Attach Listeners
      const navBtn = popupHtml.querySelector(`#nav-btn-${listing.id}`);
      if (navBtn) {
        navBtn.addEventListener("click", () => {
          marker.closePopup();
          startNavigation(listing, [lat, lng]);
        });
      }

      const detailsBtn = popupHtml.querySelector(`#view-details-btn-${listing.id}`);
      if (detailsBtn) {
        detailsBtn.addEventListener("click", () => {
          if (onSelectListing) onSelectListing(listing);
        });
      }

      marker.bindPopup(popupHtml, {
        closeButton: true,
        maxWidth: 310,
        className: "custom-leaflet-popup",
      });

      marker.addTo(markersLayer);
    });
  }, [listings, selectedCity, selectedLocality, onSelectListing]);

  // 5. Handle Navigation Trigger
  const startNavigation = (listing: SahaytaListing, coords?: [number, number]) => {
    const targetCoords = coords || getListingCoords(listing);
    setNavTarget({ listing, coords: targetCoords });
  };

  useEffect(() => {
    if (activeNavListing) {
      startNavigation(activeNavListing);
    }
  }, [activeNavListing]);

  // 6. Calculate Route and Render Glowing Line
  useEffect(() => {
    if (!navTarget || !mapInstanceRef.current || !routeLayerRef.current) return;
    const map = mapInstanceRef.current;
    const routeLayer = routeLayerRef.current;
    routeLayer.clearLayers();

    // Determine Origin (User GPS coords or Locality / City center)
    const originLat = userGpsCoords ? userGpsCoords[0] : (selectedLocality?.lat || selectedCity.localities[0]?.lat || 18.5204);
    const originLng = userGpsCoords ? userGpsCoords[1] : (selectedLocality?.lng || selectedCity.localities[0]?.lng || 73.8567);
    const origin: [number, number] = [originLat, originLng];

    setIsRouting(true);
    calculateRoute(origin, navTarget.coords, navMode)
      .then((result) => {
        setRouteResult(result);
        setIsRouting(false);

        // Draw Glow Neon Polyline
        const glowLine = L.polyline(result.coordinates, {
          color: "#38BDF8",
          weight: 7,
          opacity: 0.6,
          lineCap: "round",
          lineJoin: "round",
        });

        const coreLine = L.polyline(result.coordinates, {
          color: "#2563EB",
          weight: 4,
          opacity: 1,
          dashArray: "8, 12",
          lineCap: "round",
          lineJoin: "round",
        });

        // Add Origin Marker (User / Start)
        const originIcon = L.divIcon({
          className: "origin-map-pin",
          iconSize: [32, 32],
          iconAnchor: [16, 16],
          html: `
            <div class="w-8 h-8 rounded-full bg-emerald-500 border-2 border-white text-white font-black text-xs flex items-center justify-center shadow-xl shadow-emerald-500/50 animate-bounce">
              📍
            </div>
          `,
        });
        const originMarker = L.marker(origin, { icon: originIcon }).bindPopup("<b>Your Starting Point</b>");

        // Add Destination Marker (Finish Flag)
        const destIcon = L.divIcon({
          className: "dest-map-pin",
          iconSize: [36, 36],
          iconAnchor: [18, 18],
          html: `
            <div class="w-9 h-9 rounded-full bg-gradient-to-tr from-[#F59E0B] to-[#FBBF24] border-2 border-white text-black font-black text-sm flex items-center justify-center shadow-xl shadow-amber-500/50 animate-pulse">
              🏁
            </div>
          `,
        });
        const destMarker = L.marker(navTarget.coords, { icon: destIcon }).bindPopup(`<b>${navTarget.listing.title}</b>`);

        routeLayer.addLayer(glowLine);
        routeLayer.addLayer(coreLine);
        routeLayer.addLayer(originMarker);
        routeLayer.addLayer(destMarker);

        // Zoom map to fit full route nicely
        const bounds = L.latLngBounds(result.coordinates);
        map.fitBounds(bounds, { padding: [60, 60], maxZoom: 16 });
      })
      .catch((err) => {
        console.error("Navigation error:", err);
        setIsRouting(false);
      });
  }, [navTarget, navMode, userGpsCoords]);

  // Clear Navigation
  const handleExitNavigation = () => {
    setNavTarget(null);
    setRouteResult(null);
    if (routeLayerRef.current) {
      routeLayerRef.current.clearLayers();
    }
  };

  // Locate me trigger
  const handleLocateMe = () => {
    if (!navigator.geolocation || !mapInstanceRef.current) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserGpsCoords([latitude, longitude]);
        mapInstanceRef.current?.flyTo([latitude, longitude], 15, { duration: 1.2 });
      },
      (err) => console.warn("Geolocation:", err)
    );
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#090D16]">
      {/* Top Map Floating Header Bar */}
      {!navTarget && (
        <div className="absolute top-4 left-4 right-4 z-[400] flex flex-wrap items-center justify-between gap-3 pointer-events-none">
          <div className="glass-panel px-4 py-2 rounded-2xl pointer-events-auto flex items-center gap-3 border border-white/20 shadow-xl">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
              </span>
              <div>
                <p className="text-[11px] font-black text-sky-400 uppercase tracking-wider flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5" /> Leaflet GPS Radar
                </p>
                <h4 className="text-xs font-black text-white">
                  {selectedLocality ? selectedLocality.name : selectedCity.name} ({listings.length} Radar Pins)
                </h4>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={() => setRadarPulseActive(!radarPulseActive)}
              className={`px-3 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition border ${
                radarPulseActive
                  ? "bg-sky-500/20 text-sky-300 border-sky-400/40 shadow-lg shadow-sky-500/20"
                  : "glass-panel text-slate-400 border-white/10"
              }`}
              title="Toggle Radar Pulse"
            >
              <span className={`w-2 h-2 rounded-full ${radarPulseActive ? "bg-sky-400 animate-pulse" : "bg-slate-500"}`} />
              Radar
            </button>

            <button
              onClick={() => setMapStyle(mapStyle === "dark" ? "streets" : "dark")}
              className="px-3 py-2 glass-panel rounded-xl text-xs font-black text-white hover:text-sky-300 transition flex items-center gap-1.5 border border-white/15 shadow-xl"
              title="Switch Theme"
            >
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              {mapStyle === "dark" ? "Dark Map" : "Street Map"}
            </button>

            <button
              onClick={handleLocateMe}
              className="p-2 glass-panel rounded-xl text-white hover:text-sky-300 transition border border-white/15 shadow-xl"
              title="My GPS Location"
            >
              <LocateFixed className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>
      )}

      {/* Live Turn-by-Turn Navigation HUD Overlay */}
      {navTarget && (
        <NavigationPanel
          destinationListing={navTarget.listing}
          destinationCoords={navTarget.coords}
          routeResult={routeResult}
          isLoading={isRouting}
          selectedMode={navMode}
          onModeChange={(mode) => setNavMode(mode)}
          onClose={handleExitNavigation}
        />
      )}

      {/* Leaflet Map Div */}
      <div ref={mapContainerRef} className={className} />

      {/* Bottom Map Legend */}
      <div className="absolute bottom-4 left-4 right-4 z-[400] pointer-events-none flex flex-wrap items-center justify-between gap-2">
        <div className="glass-panel px-3 py-2 rounded-2xl pointer-events-auto border border-white/10 flex flex-wrap items-center gap-3 text-[11px] font-bold">
          <span className="text-slate-400">Map Legend:</span>
          <span className="flex items-center gap-1 text-blue-400">🏠 Stay</span>
          <span className="flex items-center gap-1 text-amber-400">🍲 Food</span>
          <span className="flex items-center gap-1 text-emerald-400">💼 Jobs</span>
          <span className="flex items-center gap-1 text-purple-400">🛋️ Market</span>
          <span className="flex items-center gap-1 text-cyan-400">🧹 Help</span>
          <span className="flex items-center gap-1 text-rose-400">📚 Survival</span>
        </div>

        <div className="glass-panel px-3 py-1.5 rounded-xl pointer-events-auto border border-white/10 text-[10px] text-slate-400">
          GPS & Routing by <span className="text-sky-400 font-black">Geoapify / OSRM</span>
        </div>
      </div>
    </div>
  );
}
