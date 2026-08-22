"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import LocationSelectorModal from "@/components/layout/LocationSelectorModal";
import PostListingModal from "@/components/forms/PostListingModal";
import ListingCard from "@/components/ui/ListingCard";
import { useLocationStore } from "@/stores/useLocationStore";
import { getFilteredListings } from "@/lib/db/queries";
import {
  Home,
  Filter,
  Sparkles,
  ShieldCheck,
  Zap,
  Key,
  Users,
  CheckCircle2,
  Building,
  TrendingUp,
  MapPin,
} from "lucide-react";

export default function StayPage() {
  const { selectedCity, selectedLocality, setLocationModalOpen, setPostModalOpen, searchQuery } = useLocationStore();
  const [subFilter, setSubFilter] = useState("all");
  const [sharingType, setSharingType] = useState("all");

  const listings = getFilteredListings({
    category: "stay",
    cityId: selectedCity.id,
    localityId: selectedLocality?.id,
    searchQuery: searchQuery,
  });

  const filtered = listings.filter((item) => {
    if (subFilter !== "all" && item.subCategory.toLowerCase() !== subFilter.toLowerCase()) return false;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0F172A] text-[#0F172A] dark:text-white selection:bg-[#2563EB] selection:text-white relative">
      <Header />

      {/* Hero Banner with Maximalist Glassmorphism */}
      <section className="relative bg-[#0F172A] text-white pt-8 sm:pt-12 pb-16 sm:pb-24 px-3 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2563EB]/30 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#0EA5E9]/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-5 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="px-3.5 py-1.5 rounded-full glass-pill text-sky-300 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-[#F59E0B]" />
              Verified Stay & Accommodation Finder
            </span>
            <span className="text-xs text-slate-300 glass-pill px-3 py-1 rounded-full">
              📍 {selectedLocality ? selectedLocality.name : selectedCity.name}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            PGs, Co-Living & Shared Flats in <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#93C5FD] via-[#38BDF8] to-[#FBBF24] bg-clip-text text-transparent">
              {selectedLocality ? selectedLocality.name : selectedCity.name}
            </span>
          </h1>

          <p className="text-xs sm:text-base text-slate-300 max-w-2xl font-normal leading-relaxed">
            Zero brokerage, fully furnished PGs and shared flatmate rooms with Wi-Fi, 3 daily meals, and 24/7 security.
          </p>

          {/* Floating Glass Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 max-w-4xl pt-2">
            {[
              { label: "Brokerage Fee", val: "₹0 Free", icon: ShieldCheck, color: "text-[#10B981]" },
              { label: "Available Rooms", val: `${listings.length} Properties`, icon: Home, color: "text-[#2563EB]" },
              { label: "Deposit Range", val: "1-2 Months", icon: Key, color: "text-[#F59E0B]" },
              { label: "Instant Connect", val: "WhatsApp / Call", icon: Zap, color: "text-[#0EA5E9]" },
            ].map((st, i) => {
              const Icon = st.icon;
              return (
                <div key={i} className="glass-pill p-3 rounded-2xl flex items-center gap-2.5 text-left">
                  <div className={`p-2 rounded-xl bg-white/10 ${st.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-white">{st.val}</div>
                    <div className="text-[10px] text-slate-300">{st.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-8 pb-32 sm:pb-12 space-y-8">
        {/* Maximalist Filter Glass Deck */}
        <section className="glass-panel p-4 sm:p-5 rounded-3xl space-y-3.5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#2563EB]" />
              <span className="text-xs font-black text-[#0F172A] dark:text-slate-200">Accommodation Type:</span>
            </div>
            <button
              onClick={() => setPostModalOpen(true)}
              className="px-4 py-1.5 bg-[#F59E0B] text-black font-black rounded-xl text-xs shadow-md"
            >
              + List Your PG / Room
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {["all", "Co-living PG", "Shared Flat", "Executive PG", "Hostel / PG"].map((type) => (
              <button
                key={type}
                onClick={() => setSubFilter(type)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                  subFilter === type
                    ? "bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/30"
                    : "bg-white dark:bg-slate-800 text-[#64748B] hover:text-[#0F172A] border border-slate-200 dark:border-slate-700"
                }`}
              >
                {type === "all" ? "All Accommodation Types" : type}
              </button>
            ))}
          </div>
        </section>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </main>

      <LocationSelectorModal />
      <PostListingModal />
      <MobileNav />
    </div>
  );
}
