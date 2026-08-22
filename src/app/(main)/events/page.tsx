"use client";

import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import LocationSelectorModal from "@/components/layout/LocationSelectorModal";
import PostListingModal from "@/components/forms/PostListingModal";
import ListingCard from "@/components/ui/ListingCard";
import { useLocationStore } from "@/stores/useLocationStore";
import { getFilteredListings } from "@/lib/db/queries";
import { Calendar, Users, Zap, Heart } from "lucide-react";

export default function EventsPage() {
  const { selectedCity, selectedLocality, setPostModalOpen, searchQuery } = useLocationStore();

  const listings = getFilteredListings({
    category: "events",
    cityId: selectedCity.id,
    localityId: selectedLocality?.id,
    searchQuery: searchQuery,
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0F172A] text-[#0F172A] dark:text-white selection:bg-[#2563EB] selection:text-white relative">
      <Header />

      {/* Hero Banner with Maximalist Glassmorphism */}
      <section className="relative bg-[#0F172A] text-white pt-8 sm:pt-12 pb-16 sm:pb-24 px-3 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-600/25 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#2563EB]/25 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#8B5CF6_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-5 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="px-3.5 py-1.5 rounded-full glass-pill text-purple-300 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#F59E0B]" />
              City Events & Newcomer Social Circles
            </span>
            <span className="text-xs text-slate-300 glass-pill px-3 py-1 rounded-full">
              📍 {selectedLocality ? selectedLocality.name : selectedCity.name}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Meetups, Sports & Circles in <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#C4B5FD] via-[#A78BFA] to-[#FBBF24] bg-clip-text text-transparent">
              {selectedLocality ? selectedLocality.name : selectedCity.name}
            </span>
          </h1>

          <p className="text-xs sm:text-base text-slate-300 max-w-2xl font-normal leading-relaxed">
            Make new friends easily in your city! Weekend breakfast runs, filter coffee meetups, board game nights, and tech discussions.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 max-w-4xl pt-2">
            {[
              { label: "Community", val: "Newcomers Welcome", icon: Users, color: "text-[#10B981]" },
              { label: "Entry Fee", val: "100% Free RSVP", icon: Zap, color: "text-[#F59E0B]" },
              { label: "Vibe", val: "Informal & Fun", icon: Heart, color: "text-[#0EA5E9]" },
              { label: "Schedule", val: "Every Weekend", icon: Calendar, color: "text-[#2563EB]" },
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-8 space-y-8">
        <section className="glass-panel p-4 sm:p-5 rounded-3xl flex flex-wrap items-center justify-between gap-3 shadow-sm">
          <div>
            <h3 className="text-base font-black text-[#0F172A] dark:text-white">Upcoming Newcomer Meetups</h3>
            <p className="text-xs text-[#64748B]">Join fellow city migrants for coffee, runs, and exploring the city</p>
          </div>
          <button
            onClick={() => setPostModalOpen(true)}
            className="px-5 py-2 bg-[#F59E0B] text-black font-black rounded-xl text-xs shadow-md shadow-[#F59E0B]/25"
          >
            + Host a Meetup
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
