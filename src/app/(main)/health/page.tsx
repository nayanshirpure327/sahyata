"use client";

import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import LocationSelectorModal from "@/components/layout/LocationSelectorModal";
import PostListingModal from "@/components/forms/PostListingModal";
import ListingCard from "@/components/ui/ListingCard";
import { useLocationStore } from "@/stores/useLocationStore";
import { getFilteredListings } from "@/lib/db/queries";
import { HeartPulse, PhoneCall, AlertTriangle, ShieldCheck, Clock } from "lucide-react";

export default function HealthPage() {
  const { selectedCity, selectedLocality, searchQuery } = useLocationStore();

  const listings = getFilteredListings({
    category: "health",
    cityId: selectedCity.id,
    localityId: selectedLocality?.id,
    searchQuery: searchQuery,
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0F172A] text-[#0F172A] dark:text-white selection:bg-[#2563EB] selection:text-white relative">
      <Header />

      {/* Hero Banner with Maximalist Glassmorphism */}
      <section className="relative bg-[#0F172A] text-white pt-8 sm:pt-12 pb-16 sm:pb-24 px-3 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/25 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#2563EB]/25 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#EF4444_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-5 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="px-3.5 py-1.5 rounded-full glass-pill text-rose-300 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <HeartPulse className="w-3.5 h-3.5 text-[#EF4444]" />
              24/7 Health & Emergency Directory
            </span>
            <span className="text-xs text-slate-300 glass-pill px-3 py-1 rounded-full">
              📍 {selectedLocality ? selectedLocality.name : selectedCity.name}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            24/7 Chemists, Hospitals & Helplines in <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#FCA5A5] via-[#EF4444] to-[#FBBF24] bg-clip-text text-transparent">
              {selectedLocality ? selectedLocality.name : selectedCity.name}
            </span>
          </h1>

          <p className="text-xs sm:text-base text-slate-300 max-w-2xl font-normal leading-relaxed">
            Emergency night pharmacies, doorstep medicine delivery, emergency urgent care clinics, and local police control room numbers.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Emergency Quick Numbers Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass-card p-5 rounded-3xl border border-red-200 dark:border-red-900/50 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-[10px] font-black text-[#64748B] uppercase">Police Emergency Control</div>
              <div className="text-2xl font-black text-[#EF4444]">112 / 100</div>
              <span className="text-[10px] text-[#10B981] font-bold">24/7 Toll-Free</span>
            </div>
            <a href="tel:112" className="p-3 bg-[#FEF2F2] text-[#EF4444] rounded-2xl font-black text-xs shadow-md">
              <PhoneCall className="w-5 h-5" />
            </a>
          </div>

          <div className="glass-card p-5 rounded-3xl border border-rose-200 dark:border-rose-900/50 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-[10px] font-black text-[#64748B] uppercase">Medical Ambulance</div>
              <div className="text-2xl font-black text-[#F43F5E]">108 / 102</div>
              <span className="text-[10px] text-[#10B981] font-bold">24/7 Immediate Dispatch</span>
            </div>
            <a href="tel:108" className="p-3 bg-[#FFF1F2] text-[#F43F5E] rounded-2xl font-black text-xs shadow-md">
              <PhoneCall className="w-5 h-5" />
            </a>
          </div>

          <div className="glass-card p-5 rounded-3xl border border-blue-200 dark:border-blue-900/50 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-[10px] font-black text-[#64748B] uppercase">Sahayta City Helpline</div>
              <div className="text-xl font-black text-[#2563EB]">1800 123 4567</div>
              <span className="text-[10px] text-[#2563EB] font-bold">Newcomer Support Desk</span>
            </div>
            <a href="tel:18001234567" className="p-3 bg-[#EFF6FF] text-[#2563EB] rounded-2xl font-black text-xs shadow-md">
              <PhoneCall className="w-5 h-5" />
            </a>
          </div>
        </div>

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
