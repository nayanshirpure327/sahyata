"use client";

import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import LocationSelectorModal from "@/components/layout/LocationSelectorModal";
import PostListingModal from "@/components/forms/PostListingModal";
import ListingCard from "@/components/ui/ListingCard";
import { useLocationStore } from "@/stores/useLocationStore";
import { getFilteredListings } from "@/lib/db/queries";
import { BookOpen, FileText, Compass, ShieldAlert, Download, CheckCircle2, Globe } from "lucide-react";

export default function ResourcesPage() {
  const { selectedCity, selectedLocality, searchQuery } = useLocationStore();

  const listings = getFilteredListings({
    category: "resources",
    cityId: selectedCity.id,
    localityId: selectedLocality?.id,
    searchQuery: searchQuery,
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0F172A] text-[#0F172A] dark:text-white selection:bg-[#2563EB] selection:text-white relative">
      <Header />

      {/* Hero Banner with Maximalist Glassmorphism */}
      <section className="relative bg-[#0F172A] text-white pt-8 sm:pt-12 pb-16 sm:pb-24 px-3 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0EA5E9]/25 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#2563EB]/25 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#0EA5E9_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-5 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="px-3.5 py-1.5 rounded-full glass-pill text-sky-300 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#0EA5E9]" />
              City Survival Guides & Documentation Checklists
            </span>
            <span className="text-xs text-slate-300 glass-pill px-3 py-1 rounded-full">
              📍 {selectedCity.name} Region
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Newcomer Survival Guides for <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#7DD3FC] via-[#38BDF8] to-[#93C5FD] bg-clip-text text-transparent">
              {selectedCity.name}
            </span>
          </h1>

          <p className="text-xs sm:text-base text-slate-300 max-w-2xl font-normal leading-relaxed">
            Free downloadable 11-month rental agreements, online police tenant verification portal links, local transit maps, and survival phrasebooks.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Free Survival Downloads Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-3xl space-y-4 shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#EFF6FF] text-[#2563EB] rounded-2xl shadow-md">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-[#0F172A] dark:text-white text-base">
                  Standard 11-Month Rental Agreement Template (2026)
                </h3>
                <span className="text-xs text-[#10B981] font-bold">Free Word (.docx) & PDF Format</span>
              </div>
            </div>
            <p className="text-xs text-[#64748B] dark:text-slate-300 leading-relaxed">
              Standard legal format with tenant protection clauses for security deposits, maintenance fees, lock-in period, and notice period.
            </p>
            <button
              onClick={() => alert("Downloading Rent Agreement Template...")}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-xs font-black shadow-md shadow-[#2563EB]/25 transition"
            >
              <Download className="w-4 h-4" /> Download Agreement Draft
            </button>
          </div>

          <div className="glass-card p-6 rounded-3xl space-y-4 shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#FFFBEB] text-[#B45309] rounded-2xl shadow-md">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-[#0F172A] dark:text-white text-base">
                  Online Tenant Police Verification Form Links
                </h3>
                <span className="text-xs text-[#2563EB] font-bold">Official State Police Portals</span>
              </div>
            </div>
            <p className="text-xs text-[#64748B] dark:text-slate-300 leading-relaxed">
              Direct state police portal links (Haryana Police Citizen Portal, Delhi Police Tenant Verification, Karnataka Seva Sindhu) for hassle-free verification.
            </p>
            <button
              onClick={() => window.open("https://digital.sahayta.in/verification", "_blank")}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-black rounded-xl text-xs font-black shadow-md shadow-[#F59E0B]/25 transition"
            >
              <Compass className="w-4 h-4" /> Open Verification Portal
            </button>
          </div>
        </div>

        {/* Listings */}
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
