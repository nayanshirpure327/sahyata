"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocationStore } from "@/stores/useLocationStore";
import {
  MapPin,
  Search,
  PlusCircle,
  Home,
  UtensilsCrossed,
  Briefcase,
  ShoppingBag,
  Wrench,
  BookOpen,
  User,
  Compass,
  Sparkles,
} from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const {
    selectedCity,
    selectedLocality,
    setLocationModalOpen,
    setPostModalOpen,
    searchQuery,
    setSearchQuery,
  } = useLocationStore();

  const navLinks = [
    { href: "/explore", label: "Live Radar", icon: Compass },
    { href: "/stay", label: "Stay & PG", icon: Home },
    { href: "/food", label: "Food & Tiffin", icon: UtensilsCrossed },
    { href: "/jobs", label: "Jobs & Gigs", icon: Briefcase },
    { href: "/marketplace", label: "Marketplace", icon: ShoppingBag },
    { href: "/services", label: "Maids & Help", icon: Wrench },
    { href: "/resources", label: "Survival Guides", icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#090D16]/80 backdrop-blur-2xl border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-4">
          {/* Logo & City Selector */}
          <div className="flex items-center gap-3 sm:gap-5">
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-[#0EA5E9] flex items-center justify-center text-white font-black text-xl shadow-lg shadow-[#2563EB]/40 group-hover:scale-105 transition-transform border border-white/20">
                S
              </div>
              <div className="hidden sm:block">
                <span className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                  Sahayta <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#2563EB]/25 text-sky-300 font-bold border border-[#2563EB]/40">City Hub</span>
                </span>
                <p className="text-[10px] font-medium text-slate-400">
                  Settle Down Fast in Any City
                </p>
              </div>
            </Link>

            {/* Real-time Location Selector Glass Badge */}
            <button
              onClick={() => setLocationModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-2xl border border-white/10 glass-pill hover:border-[#2563EB]/60 transition group text-left max-w-[150px] sm:max-w-[210px] shadow-sm"
            >
              <div className="p-1 bg-[#2563EB] text-white rounded-lg group-hover:scale-110 transition shrink-0 shadow-md shadow-[#2563EB]/40">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div className="truncate text-xs">
                <div className="font-black text-white truncate flex items-center gap-1">
                  {selectedCity.name}
                  {selectedCity.isCustom && <Sparkles className="w-2.5 h-2.5 text-[#F59E0B]" />}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {selectedLocality ? selectedLocality.name : "All Localities"}
                </div>
              </div>
            </button>
          </div>

          {/* Quick Real-Time Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              placeholder={`Search in ${selectedCity.name} (PG, food, jobs, furniture)...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-2xl glass-input text-xs font-medium text-white placeholder:text-slate-400 focus:outline-none transition shadow-inner"
            />
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* CTA Button using Warm Amber #F59E0B */}
            <button
              onClick={() => setPostModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-[#F59E0B] hover:bg-[#D97706] text-black font-black rounded-2xl text-xs shadow-lg shadow-[#F59E0B]/25 transition hover:scale-105 btn-tactile"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Post Free</span>
              <span className="sm:hidden">Post</span>
            </button>

            <Link
              href="/profile"
              className="p-2.5 glass-pill text-slate-300 hover:text-white rounded-2xl transition btn-tactile"
              title="Profile & Dashboard"
            >
              <User className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Sub-Navigation Bar for Desktop with Frosted Glass Tabs */}
        <div className="hidden lg:flex items-center gap-1.5 py-2 overflow-x-auto border-t border-white/10 scrollbar-none">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition btn-tactile ${
                  isActive
                    ? "bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/40"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
