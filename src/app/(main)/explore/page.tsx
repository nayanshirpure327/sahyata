"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import LocationSelectorModal from "@/components/layout/LocationSelectorModal";
import PostListingModal from "@/components/forms/PostListingModal";
import ListingDetailModal from "@/components/ui/ListingDetailModal";
import ListingCard from "@/components/ui/ListingCard";
import RadarMapView from "@/components/maps/RadarMapView";
import { useLocationStore } from "@/stores/useLocationStore";
import { getFilteredListings } from "@/lib/db/queries";
import { SahaytaListing } from "@/lib/constants/seedData";
import { Compass, Map, Grid, Sparkles, Filter, SlidersHorizontal } from "lucide-react";

export default function ExplorePage() {
  const { selectedCity, selectedLocality, setLocationModalOpen, searchQuery } = useLocationStore();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "map">("map");
  const [sortBy, setSortBy] = useState<"newest" | "price-low" | "price-high" | "rating">("newest");
  const [selectedListing, setSelectedListing] = useState<SahaytaListing | null>(null);

  const listings = getFilteredListings({
    cityId: selectedCity.id,
    localityId: selectedLocality?.id,
    category: selectedCategory,
    searchQuery: searchQuery,
    sortBy: sortBy,
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#090D16] text-white selection:bg-[#2563EB] selection:text-white relative">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Page Title & Controls Header with Glass Panel */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-3xl shadow-xl">
          <div>
            <div className="flex items-center gap-1.5 text-sky-400 text-xs font-black uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4" /> Sahayta Live Radar Map
            </div>
            <h1 className="text-2xl sm:text-4xl font-black">
              Explore {selectedLocality ? selectedLocality.name : selectedCity.name}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Live Leaflet GPS radar updated in real-time across all categories for {selectedCity.name}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* View Mode Toggle */}
            <div className="flex items-center glass-pill p-1 rounded-2xl">
              <button
                onClick={() => setViewMode("map")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition ${
                  viewMode === "map"
                    ? "bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/40"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Map className="w-3.5 h-3.5" /> Map Radar
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition ${
                  viewMode === "grid"
                    ? "bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/40"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Grid className="w-3.5 h-3.5" /> Grid View
              </button>
            </div>

            {/* Change Location Button */}
            <button
              onClick={() => setLocationModalOpen(true)}
              className="px-3.5 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-black font-black rounded-xl text-xs shadow-md shadow-[#F59E0B]/25 transition"
            >
              📍 Change Locality
            </button>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3.5 py-2.5 glass-input text-white rounded-xl text-xs font-bold focus:outline-none focus:border-[#2563EB]"
            >
              <option value="newest" className="bg-[#0F172A]">Sort: Newest First</option>
              <option value="rating" className="bg-[#0F172A]">Sort: Top Rated</option>
              <option value="price-low" className="bg-[#0F172A]">Sort: Price (Low to High)</option>
              <option value="price-high" className="bg-[#0F172A]">Sort: Price (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: "all", label: "All Categories" },
            { id: "stay", label: "🏠 Stay & PG" },
            { id: "food", label: "🍲 Tiffin & Mess" },
            { id: "jobs", label: "💼 Jobs & Gigs" },
            { id: "marketplace", label: "🛋️ Pre-owned Essentials" },
            { id: "services", label: "🧹 Maids & Help" },
            { id: "resources", label: "📚 Survival Guides" },
            { id: "events", label: "🎉 Meetups & Events" },
            { id: "health", label: "🏥 Health & Chemists" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-black whitespace-nowrap border transition ${
                selectedCategory === cat.id
                  ? "bg-[#2563EB] text-white border-[#2563EB] shadow-lg shadow-[#2563EB]/40 scale-105"
                  : "glass-card hover:border-[#2563EB]/50 text-slate-300 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* View Mode Content */}
        {viewMode === "map" ? (
          <div className="space-y-4">
            <RadarMapView
              listings={listings}
              selectedCity={selectedCity}
              selectedLocality={selectedLocality}
              onSelectListing={(listing) => setSelectedListing(listing)}
              className="h-[560px] w-full"
            />

            {/* Quick Listing Strip Below Map */}
            <div className="glass-panel p-4 rounded-3xl space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sky-400" />
                  Pins in Radar ({listings.length} Results)
                </h3>
                <span className="text-xs text-slate-400">Click any card or map pin to inspect</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {listings.slice(0, 4).map((listing) => (
                  <div
                    key={listing.id}
                    onClick={() => setSelectedListing(listing)}
                    className="glass-card p-3 rounded-2xl cursor-pointer hover:border-sky-400/50 transition flex items-center gap-3"
                  >
                    <img
                      src={listing.images[0] || "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af"}
                      alt={listing.title}
                      className="w-12 h-12 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] text-sky-400 font-bold uppercase truncate">{listing.subCategory}</div>
                      <h4 className="text-xs font-bold text-white truncate">{listing.title}</h4>
                      <div className="text-xs font-black text-amber-400 mt-0.5">
                        {listing.price === 0 ? "FREE" : `₹${listing.price.toLocaleString()}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </main>

      <ListingDetailModal
        listing={selectedListing}
        onClose={() => setSelectedListing(null)}
      />
      <LocationSelectorModal />
      <PostListingModal />
      <MobileNav />
    </div>
  );
}
