"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import LocationSelectorModal from "@/components/layout/LocationSelectorModal";
import PostListingModal from "@/components/forms/PostListingModal";
import ListingCard from "@/components/ui/ListingCard";
import LiveTicker from "@/components/ui/LiveTicker";
import { useLocationStore } from "@/stores/useLocationStore";
import { getFilteredListings } from "@/lib/db/queries";
import { CITIES_AND_LOCALITIES } from "@/lib/constants/citiesAndLocalities";
import {
  MapPin,
  Search,
  Home,
  UtensilsCrossed,
  Briefcase,
  ShoppingBag,
  Wrench,
  BookOpen,
  Sparkles,
  ShieldCheck,
  Building2,
  Users,
  ArrowRight,
  PlusCircle,
  Compass,
  Zap,
  CheckCircle2,
  TrendingUp,
  Award,
  Layers,
  Flame,
  Globe2,
  Lock,
  Clock,
  Heart,
} from "lucide-react";

export default function HomePage() {
  const {
    selectedCity,
    selectedLocality,
    setCity,
    setLocality,
    setLocationModalOpen,
    setPostModalOpen,
    searchQuery,
    setSearchQuery,
  } = useLocationStore();

  const [activeTab, setActiveTab] = useState("all");
  const [quickFilter, setQuickFilter] = useState<string | null>(null);

  // Memoized listings to avoid heavy filtering computations on every re-render
  const listings = useMemo(() => {
    let items = getFilteredListings({
      cityId: selectedCity.id,
      localityId: selectedLocality?.id,
      category: activeTab,
      searchQuery: searchQuery,
    });

    if (quickFilter === "no-brokerage") {
      items = items.filter((item) =>
        item.tags.some((t) => t.toLowerCase().includes("no brokerage") || t.toLowerCase().includes("verified"))
      );
    } else if (quickFilter === "food-included") {
      items = items.filter(
        (item) =>
          item.category === "food" ||
          item.tags.some((t) => t.toLowerCase().includes("food") || t.toLowerCase().includes("meal"))
      );
    } else if (quickFilter === "budget") {
      items = items.filter((item) => item.price > 0 && item.price <= 10000);
    }
    return items;
  }, [selectedCity.id, selectedLocality?.id, activeTab, searchQuery, quickFilter]);

  const categories = useMemo(
    () => [
      { id: "all", label: "All Nearby", icon: Compass, vibe: "All Categories", count: "1,420+" },
      { id: "stay", label: "PGs & Co-Living", icon: Home, vibe: "0% Brokerage", count: "480+" },
      { id: "food", label: "Tiffin & Mess", icon: UtensilsCrossed, vibe: "Home Food", count: "210+" },
      { id: "jobs", label: "Jobs & Gigs", icon: Briefcase, vibe: "Freshers Hiring", count: "95+" },
      { id: "marketplace", label: "Marketplace", icon: ShoppingBag, vibe: "Pre-owned", count: "340+" },
      { id: "services", label: "Maids & Help", icon: Wrench, vibe: "Verified Helpers", count: "180+" },
      { id: "resources", label: "Survival Guides", icon: BookOpen, vibe: "Free Checklists", count: "12 Guides" },
    ],
    []
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#090D16] text-white selection:bg-[#2563EB] selection:text-white relative">
      <Header />

      {/* Hero Section - Maximalist & Glassmorphic Command Deck */}
      <section className="relative pt-8 sm:pt-14 pb-20 sm:pb-32 px-3 sm:px-6 lg:px-8 overflow-hidden border-b border-white/10">
        {/* Optimized Ambient Lights */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#2563EB]/35 via-[#0EA5E9]/25 to-[#F59E0B]/15 rounded-full blur-[90px] pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 relative z-10">
          {/* Top Ticker: Live Real-time Activity Pulse */}
          <div className="flex flex-wrap items-center justify-between gap-3 max-w-4xl mx-auto">
            {/* Live City Badge */}
            <div
              onClick={() => setLocationModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill hover:border-[#2563EB] text-xs font-semibold text-white shadow-xl transition cursor-pointer btn-tactile"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981]"></span>
              </span>
              <span className="text-[#38BDF8] font-black">{selectedCity.name}</span>
              <span className="text-slate-300 font-medium hidden sm:inline">• Live Real-Time Radar</span>
              <span className="text-[10px] bg-[#F59E0B] text-black font-black px-2 py-0.5 rounded-full uppercase ml-1">Live</span>
            </div>

            {/* Isolated Live Activity Feed */}
            <LiveTicker />
          </div>

          {/* Main Hero Typography */}
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08]">
              New to <br className="hidden sm:inline" />
              <span className="text-gradient-shimmer">
                {selectedCity.name}
              </span>
              ? Settle Down Fast.
            </h1>

            <p className="text-sm sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
              The high-velocity local discovery engine for city newcomers. Find verified PGs, home tiffin delivery, freshers jobs, pre-owned furniture, and trusted maids in{" "}
              <button
                onClick={() => setLocationModalOpen(true)}
                className="font-black text-[#F59E0B] hover:text-[#FBBF24] transition"
              >
                {selectedLocality ? selectedLocality.name : selectedCity.name}
              </button>.
            </p>
          </div>

          {/* Ultra Glassmorphic Search & Action Console */}
          <div className="max-w-3xl mx-auto glass-panel p-3 sm:p-4 rounded-3xl shadow-2xl shadow-[#2563EB]/25 flex flex-col sm:flex-row items-center gap-3">
            {/* City Switcher Trigger */}
            <button
              onClick={() => setLocationModalOpen(true)}
              className="w-full sm:w-auto flex items-center justify-between gap-3 px-4 py-3 glass-pill rounded-2xl text-left border border-white/20 transition group shrink-0 btn-tactile"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#2563EB] flex items-center justify-center text-white font-black shadow-lg shadow-[#2563EB]/40 group-hover:scale-110 transition-transform">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-[10px] text-sky-300 uppercase font-extrabold tracking-wider">Active City</div>
                  <div className="text-xs sm:text-sm font-black text-white truncate max-w-[130px]">
                    {selectedLocality ? selectedLocality.name : selectedCity.name}
                  </div>
                </div>
              </div>
              <span className="text-[11px] text-[#F59E0B] font-black ml-1">Switch</span>
            </button>

            {/* Real-time Search Input */}
            <div className="flex-1 w-full relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder={`Search PGs, tiffin, jobs, furniture in ${selectedLocality ? selectedLocality.name : selectedCity.name}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl glass-input text-white placeholder:text-slate-400 text-xs sm:text-sm font-medium focus:outline-none shadow-inner"
              />
            </div>

            {/* Post Listing CTA using Warm Amber #F59E0B */}
            <button
              onClick={() => setPostModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#F59E0B] hover:bg-[#D97706] text-black font-black text-xs sm:text-sm rounded-2xl shadow-xl shadow-[#F59E0B]/30 transition flex items-center justify-center gap-2 shrink-0 btn-tactile"
            >
              <PlusCircle className="w-4 h-4" /> Post Free
            </button>
          </div>

          {/* Maximalist Stats Floating Glass Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 max-w-4xl mx-auto pt-2">
            {[
              { icon: ShieldCheck, label: "Verified Providers", val: "100% Direct", color: "text-[#10B981]" },
              { icon: Zap, label: "Instant Connect", val: "WhatsApp / Call", color: "text-[#F59E0B]" },
              { icon: Home, label: "Brokerage Fee", val: "₹0 Zero Broker", color: "text-[#0EA5E9]" },
              { icon: Clock, label: "Avg. Settle Time", val: "24-48 Hours", color: "text-[#2563EB]" },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="glass-pill p-3 rounded-2xl flex items-center gap-2.5 text-left border border-white/15 hover:scale-105 transition-transform"
                >
                  <div className={`p-2 rounded-xl bg-white/10 ${stat.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-white">{stat.val}</div>
                    <div className="text-[10px] text-slate-300 font-medium">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick City Jump Carousel */}
          <div className="pt-1 flex items-center justify-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-slate-400 shrink-0 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-[#F59E0B]" /> Hubs:
            </span>
            {CITIES_AND_LOCALITIES.slice(0, 6).map((city) => {
              const isSelected = selectedCity.id === city.id;
              return (
                <button
                  key={city.id}
                  onClick={() => setCity(city.id)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition border btn-tactile ${
                    isSelected
                      ? "bg-[#2563EB] text-white border-[#2563EB] shadow-md shadow-[#2563EB]/40 font-bold"
                      : "bg-white/5 hover:bg-white/15 text-slate-300 border-white/10"
                  }`}
                >
                  {city.name}
                </button>
              );
            })}
            <button
              onClick={() => setLocationModalOpen(true)}
              className="px-3 py-1 rounded-full text-xs font-black text-[#F59E0B] bg-[#F59E0B]/10 hover:bg-[#F59E0B]/20 border border-[#F59E0B]/30 whitespace-nowrap transition btn-tactile"
            >
              + Any City in India
            </button>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-14">
        {/* Category Shortcuts Ribbon */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
                <Building2 className="w-5 h-5 text-[#2563EB]" />
                Explore By Need in {selectedCity.name}
              </h2>
              <p className="text-xs text-slate-400">Click any category for instant filtered listings</p>
            </div>
            <button
              onClick={() => setLocationModalOpen(true)}
              className="text-xs font-bold text-[#38BDF8] hover:text-white hidden sm:inline-flex items-center gap-1 btn-tactile"
            >
              <Globe2 className="w-3.5 h-3.5" /> Change City Pin
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`p-4 rounded-3xl border text-left flex flex-col justify-between transition-all duration-300 group btn-tactile ${
                    isSelected
                      ? "border-[#2563EB] bg-[#2563EB] text-white shadow-xl shadow-[#2563EB]/35 scale-105"
                      : "glass-card hover:border-[#38BDF8]/60 text-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center transition shadow-sm ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-white/10 text-[#38BDF8] group-hover:bg-[#2563EB] group-hover:text-white"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-white/10 text-slate-400"}`}>
                      {cat.count}
                    </span>
                  </div>
                  <div>
                    <div className="font-black text-xs sm:text-sm leading-tight text-white">{cat.label}</div>
                    <div className={`text-[10px] mt-0.5 font-medium ${isSelected ? "text-blue-100" : "text-slate-400"}`}>
                      {cat.vibe}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Quick Filter Pills Ribbon */}
        <section className="flex flex-wrap items-center justify-between gap-3 glass-panel p-4 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#38BDF8]" />
            <span className="text-xs font-black text-white">Vibe Filters:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: null, label: "All Listings" },
              { id: "no-brokerage", label: "⚡ Zero Brokerage" },
              { id: "food-included", label: "🍲 Food Included" },
              { id: "budget", label: "🏷️ Under ₹10,000" },
            ].map((f) => (
              <button
                key={f.label}
                onClick={() => setQuickFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition btn-tactile ${
                  quickFilter === f.id
                    ? "bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/40"
                    : "glass-pill text-slate-300 hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </section>

        {/* Real-time Listings Grid */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Verified Listings in {selectedLocality ? selectedLocality.name : selectedCity.name}
                </h2>
                <span className="px-2.5 py-0.5 bg-[#2563EB]/30 text-sky-300 text-xs font-black rounded-full border border-[#2563EB]/40">
                  {listings.length} Available
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Contact owners & vendors directly on WhatsApp or Call
              </p>
            </div>
            <Link
              href="/explore"
              className="inline-flex items-center gap-1.5 text-xs font-black text-[#38BDF8] hover:text-[#60A5FA] btn-tactile"
            >
              Open Live Radar Map <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {listings.length === 0 ? (
            <div className="glass-card rounded-3xl p-10 sm:p-16 text-center space-y-4">
              <div className="w-16 h-16 bg-[#2563EB]/25 text-sky-400 rounded-2xl flex items-center justify-center mx-auto shadow-md">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                No listings found with these filters in {selectedCity.name}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
                Try switching categories or posting a new listing in {selectedCity.name}.
              </p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                <button
                  onClick={() => {
                    setActiveTab("all");
                    setQuickFilter(null);
                    setSearchQuery("");
                  }}
                  className="px-5 py-2.5 bg-[#2563EB] text-white rounded-xl font-bold text-xs shadow-md btn-tactile"
                >
                  Reset Filters
                </button>
                <button
                  onClick={() => setPostModalOpen(true)}
                  className="px-5 py-2.5 bg-[#F59E0B] text-black rounded-xl font-bold text-xs shadow-md btn-tactile"
                >
                  + Post First Listing
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </section>

        {/* Locality Vibe Matrix */}
        <section className="space-y-4">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              Neighborhood Vibe Matrix in {selectedCity.name}
            </h3>
            <p className="text-xs text-slate-400">Know where to stay based on tech parks, budget, and lifestyle</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedCity.localities.map((loc) => (
              <div
                key={loc.id}
                onClick={() => {
                  setLocality(loc.id);
                  window.scrollTo({ top: 350, behavior: "smooth" });
                }}
                className="glass-card p-5 rounded-3xl cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black px-2.5 py-1 bg-[#2563EB]/25 text-sky-300 rounded-full uppercase tracking-wider border border-[#2563EB]/40">
                    {loc.type}
                  </span>
                  <span className="text-xs font-bold text-[#10B981] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> High Safety
                  </span>
                </div>
                <h4 className="text-base font-black text-white group-hover:text-[#38BDF8] transition">
                  {loc.name}
                </h4>
                <div className="flex flex-wrap gap-1 mt-2.5">
                  {loc.popularFor.map((p) => (
                    <span key={p} className="text-[10px] bg-white/5 text-slate-300 px-2 py-0.5 rounded-lg font-medium border border-white/5">
                      {p}
                    </span>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#38BDF8]">
                  <span>Explore Listings in {loc.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Sahayta - Newcomer Benefits Banner */}
        <section className="bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#0F172A] text-white rounded-3xl p-6 sm:p-12 shadow-2xl border border-blue-400/20 relative overflow-hidden">
          <div className="max-w-3xl space-y-6 relative z-10">
            <span className="px-3.5 py-1.5 bg-white/15 text-sky-200 text-xs font-black rounded-full uppercase tracking-wider">
              Built for City Newcomers
            </span>
            <h2 className="text-2xl sm:text-4xl font-black leading-tight">
              Moving to a new city alone? Sahayta makes it effortless.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
              <div className="space-y-2 p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 hover:scale-105 transition-transform">
                <div className="w-11 h-11 rounded-2xl bg-[#10B981] text-white flex items-center justify-center font-black shadow-lg shadow-[#10B981]/30">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm">Verified Listings</h4>
                <p className="text-xs text-blue-100 leading-relaxed">Zero fake brokers. Verified PGs, home cooks, and furniture sellers.</p>
              </div>
              <div className="space-y-2 p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 hover:scale-105 transition-transform">
                <div className="w-11 h-11 rounded-2xl bg-[#0EA5E9] text-white flex items-center justify-center font-black shadow-lg shadow-[#0EA5E9]/30">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm">Locality Focused</h4>
                <p className="text-xs text-blue-100 leading-relaxed">Find options within 5-10 mins of your office, college, or transit hub.</p>
              </div>
              <div className="space-y-2 p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 hover:scale-105 transition-transform">
                <div className="w-11 h-11 rounded-2xl bg-[#F59E0B] text-black flex items-center justify-center font-black shadow-lg shadow-[#F59E0B]/30">
                  <Zap className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm">Instant WhatsApp</h4>
                <p className="text-xs text-blue-100 leading-relaxed">Connect in 1-click with providers and flatmates without waiting.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#090D16]/90 border-t border-white/10 py-10 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#2563EB] text-white font-black flex items-center justify-center text-sm shadow-md shadow-[#2563EB]/40 border border-white/20">
              S
            </div>
            <span className="font-black text-white text-sm">Sahayta</span> – Settle Down Fast in Any City.
          </div>
          <div>© 2026 Sahayta Platform. Real-time platform for city newcomers across India & worldwide.</div>
        </div>
      </footer>

      {/* Modals & Mobile Navigation */}
      <LocationSelectorModal />
      <PostListingModal />
      <MobileNav />
    </div>
  );
}
