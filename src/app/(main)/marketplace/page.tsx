"use client";

import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import LocationSelectorModal from "@/components/layout/LocationSelectorModal";
import PostListingModal from "@/components/forms/PostListingModal";
import ListingCard from "@/components/ui/ListingCard";
import { useLocationStore } from "@/stores/useLocationStore";
import { getFilteredListings } from "@/lib/db/queries";
import { ShoppingBag, Sparkles, Tag, ShieldCheck, Zap } from "lucide-react";

export default function MarketplacePage() {
  const { selectedCity, selectedLocality, setPostModalOpen, searchQuery } = useLocationStore();

  const listings = getFilteredListings({
    category: "marketplace",
    cityId: selectedCity.id,
    localityId: selectedLocality?.id,
    searchQuery: searchQuery,
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0F172A] text-[#0F172A] dark:text-white selection:bg-[#2563EB] selection:text-white relative">
      <Header />

      {/* Hero Banner with Maximalist Glassmorphism */}
      <section className="relative bg-[#0F172A] text-white pt-8 sm:pt-12 pb-16 sm:pb-24 px-3 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/25 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#2563EB]/25 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#A855F7_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-5 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="px-3.5 py-1.5 rounded-full glass-pill text-purple-300 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-[#F59E0B]" />
              Pre-Owned Essentials Marketplace
            </span>
            <span className="text-xs text-slate-300 glass-pill px-3 py-1 rounded-full">
              📍 {selectedLocality ? selectedLocality.name : selectedCity.name}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Buy & Sell Second-Hand Essentials in <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#D8B4FE] via-[#C084FC] to-[#FBBF24] bg-clip-text text-transparent">
              {selectedLocality ? selectedLocality.name : selectedCity.name}
            </span>
          </h1>

          <p className="text-xs sm:text-base text-slate-300 max-w-2xl font-normal leading-relaxed">
            Set up your room affordably! Pre-owned single beds, study desks, room desert coolers, mini-fridges, washing machines, and two-wheelers.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 max-w-4xl pt-2">
            {[
              { label: "Relocation Deals", val: "Up to 70% Off", icon: Tag, color: "text-[#F59E0B]" },
              { label: "Same Day Pickup", val: "Direct Handover", icon: Zap, color: "text-[#10B981]" },
              { label: "Verified Sellers", val: "True Pictures", icon: ShieldCheck, color: "text-[#2563EB]" },
              { label: "Listing Fee", val: "₹0 Free to Sell", icon: Sparkles, color: "text-purple-400" },
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
        <section className="glass-panel p-4 sm:p-5 rounded-3xl flex flex-wrap items-center justify-between gap-3 shadow-sm">
          <div>
            <h3 className="text-base font-black text-[#0F172A] dark:text-white">Active Pre-Owned Deals Nearby</h3>
            <p className="text-xs text-[#64748B]">Bargain prices from moving-out tenants and locals</p>
          </div>
          <button
            onClick={() => setPostModalOpen(true)}
            className="px-5 py-2 bg-[#F59E0B] text-black font-black rounded-xl text-xs shadow-md shadow-[#F59E0B]/25"
          >
            + Sell Used Item
          </button>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
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
