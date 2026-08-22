"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import LocationSelectorModal from "@/components/layout/LocationSelectorModal";
import PostListingModal from "@/components/forms/PostListingModal";
import ListingCard from "@/components/ui/ListingCard";
import { useLocationStore } from "@/stores/useLocationStore";
import { getFilteredListings } from "@/lib/db/queries";
import { UtensilsCrossed, ShieldCheck, Zap, Heart, Flame, Filter } from "lucide-react";

export default function FoodPage() {
  const { selectedCity, selectedLocality, setPostModalOpen, searchQuery } = useLocationStore();
  const [mealType, setMealType] = useState("all");

  const listings = getFilteredListings({
    category: "food",
    cityId: selectedCity.id,
    localityId: selectedLocality?.id,
    searchQuery: searchQuery,
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0F172A] text-[#0F172A] dark:text-white selection:bg-[#2563EB] selection:text-white relative">
      <Header />

      {/* Hero Banner with Maximalist Glassmorphism */}
      <section className="relative bg-[#0F172A] text-white pt-8 sm:pt-12 pb-16 sm:pb-24 px-3 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F59E0B]/25 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#2563EB]/25 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-5 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="px-3.5 py-1.5 rounded-full glass-pill text-amber-300 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#F59E0B]" />
              Daily Tiffin & Home Food Network
            </span>
            <span className="text-xs text-slate-300 glass-pill px-3 py-1 rounded-full">
              📍 {selectedLocality ? selectedLocality.name : selectedCity.name}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Home-Cooked Tiffins & Mess in <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#FBBF24] via-[#F59E0B] to-[#93C5FD] bg-clip-text text-transparent">
              {selectedLocality ? selectedLocality.name : selectedCity.name}
            </span>
          </h1>

          <p className="text-xs sm:text-base text-slate-300 max-w-2xl font-normal leading-relaxed">
            Hygienic, warm North Indian, South Indian, Maharashtrian, and Jain meals delivered directly to your doorstep.
          </p>

          {/* Floating Glass Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 max-w-4xl pt-2">
            {[
              { label: "Hygiene Standard", val: "100% Home Cooked", icon: ShieldCheck, color: "text-[#10B981]" },
              { label: "Trial Meals", val: "From ₹90 / meal", icon: UtensilsCrossed, color: "text-[#F59E0B]" },
              { label: "Doorstep Delivery", val: "Free in 3-5 km", icon: Zap, color: "text-[#0EA5E9]" },
              { label: "Meal Plans", val: "Lunch & Dinner", icon: Heart, color: "text-[#2563EB]" },
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
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#F59E0B]" />
            <span className="text-xs font-black text-[#0F172A] dark:text-slate-200">Dietary Preference:</span>
            <div className="flex gap-2 ml-2">
              {["all", "Pure Veg", "Veg & Non-Veg", "Jain Meals"].map((t) => (
                <button
                  key={t}
                  onClick={() => setMealType(t)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    mealType === t
                      ? "bg-[#F59E0B] text-black shadow-md shadow-[#F59E0B]/25"
                      : "bg-white dark:bg-slate-800 text-[#64748B] border border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {t === "all" ? "All Diets" : t}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => setPostModalOpen(true)}
            className="px-4 py-1.5 bg-[#F59E0B] text-black font-black rounded-xl text-xs shadow-md"
          >
            + Register as Tiffin Provider
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
