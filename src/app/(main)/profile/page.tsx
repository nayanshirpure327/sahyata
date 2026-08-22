"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import LocationSelectorModal from "@/components/layout/LocationSelectorModal";
import PostListingModal from "@/components/forms/PostListingModal";
import { useLocationStore } from "@/stores/useLocationStore";
import {
  User as UserIcon,
  MapPin,
  ShieldCheck,
  PlusCircle,
  Bookmark,
  ListFilter,
  Settings,
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
  Save,
  Sparkles,
} from "lucide-react";

export default function ProfilePage() {
  const { selectedCity, selectedLocality, setLocationModalOpen, setPostModalOpen } = useLocationStore();

  const [activeTab, setActiveTab] = useState<"posted" | "saved" | "settings">("posted");
  const [phoneNumber, setPhoneNumber] = useState("9960165693");
  const [isSavedAlert, setIsSavedAlert] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("sahayta_user_phone");
    if (stored) {
      setPhoneNumber(stored);
    }
  }, []);

  const handleSavePhone = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("sahayta_user_phone", phoneNumber);
    setIsSavedAlert(true);
    setTimeout(() => setIsSavedAlert(false), 3000);
  };

  const displayName = "Rahul Sharma";
  const displayEmail = "rahul.sharma@example.com";
  const initial = "R";

  return (
    <div className="min-h-screen flex flex-col bg-[#090D16] text-white selection:bg-[#2563EB] selection:text-white relative">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-8 pb-32 sm:pb-12 space-y-8">
        {/* User Profile Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#2563EB] to-[#0EA5E9] text-white font-black text-3xl flex items-center justify-center shadow-xl shadow-[#2563EB]/35 shrink-0 border-2 border-white/20">
              {initial}
            </div>

            <div className="space-y-1.5 text-center sm:text-left">
              <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                <h1 className="text-2xl sm:text-3xl font-black text-white">{displayName}</h1>
                <span className="px-3 py-1 bg-[#10B981]/20 text-[#10B981] text-xs font-black rounded-full flex items-center gap-1 border border-[#10B981]/40 shadow-sm">
                  <ShieldCheck className="w-4 h-4" /> Identity Verified
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium flex items-center gap-2 justify-center sm:justify-start">
                <Mail className="w-3.5 h-3.5 text-sky-400" /> {displayEmail}
              </p>
              <div className="flex items-center gap-2 justify-center sm:justify-start pt-1 text-xs text-[#38BDF8] font-bold">
                <MapPin className="w-3.5 h-3.5" />
                <span>Active City Pin: {selectedLocality ? selectedLocality.name : selectedCity.name}</span>
                <button
                  onClick={() => setLocationModalOpen(true)}
                  className="text-[11px] ml-1 text-[#F59E0B] hover:text-[#FBBF24] font-black"
                >
                  Change City
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => setPostModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#F59E0B] hover:bg-[#D97706] text-black rounded-2xl text-xs sm:text-sm font-black shadow-xl shadow-[#F59E0B]/30 transition shrink-0 hover:scale-105 btn-tactile"
          >
            <PlusCircle className="w-4 h-4" /> Post New Listing
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto scrollbar-none">
          {[
            { id: "posted", label: "My Active Listings", icon: ListFilter, count: 2 },
            { id: "saved", label: "Saved Bookmarks", icon: Bookmark, count: 4 },
            { id: "settings", label: "Contact Phone & WhatsApp", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition whitespace-nowrap btn-tactile ${
                  isActive
                    ? "bg-[#2563EB] text-white shadow-lg shadow-[#2563EB]/40"
                    : "glass-card text-slate-400 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? "bg-white/20 text-white" : "bg-white/10 text-slate-300"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Posted Listings */}
        {activeTab === "posted" && (
          <div className="space-y-4">
            <div className="glass-card p-6 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div className="space-y-1">
                <span className="px-3 py-1 bg-[#2563EB]/30 text-sky-300 text-[10px] font-black rounded-full uppercase border border-[#2563EB]/40">
                  Stay & PG
                </span>
                <h3 className="font-black text-white text-base">
                  Single Occupancy AC Room in Baner Co-living
                </h3>
                <p className="text-xs text-slate-400">
                  Posted in Baner, Pune • ₹12,000 / month • Contact: {phoneNumber}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-[#10B981]/20 text-[#10B981] text-xs font-black rounded-full border border-[#10B981]/40">
                  🟢 Live Active
                </span>
              </div>
            </div>

            <div className="glass-card p-6 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div className="space-y-1">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-[10px] font-black rounded-full uppercase border border-purple-500/40">
                  Marketplace
                </span>
                <h3 className="font-black text-white text-base">
                  Ergonomic Office Chair & Wooden Study Desk
                </h3>
                <p className="text-xs text-slate-400">
                  Posted in Hinjawadi Phase 1, Pune • ₹4,500 • Contact: {phoneNumber}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-[#10B981]/20 text-[#10B981] text-xs font-black rounded-full border border-[#10B981]/40">
                  🟢 Live Active
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Saved Bookmarks */}
        {activeTab === "saved" && (
          <div className="glass-card p-10 sm:p-14 rounded-3xl text-center space-y-3">
            <Bookmark className="w-10 h-10 text-[#F59E0B] mx-auto animate-bounce" />
            <h3 className="font-black text-white text-lg">Your Saved Bookmarks</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Save any PG, tiffin service, job, or second-hand furniture deal while exploring to view them here instantly.
            </p>
          </div>
        )}

        {/* Tab 3: Settings */}
        {activeTab === "settings" && (
          <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
            <h3 className="font-black text-white text-lg flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#10B981]" /> Direct Contact & WhatsApp Phone Number
            </h3>

            <form onSubmit={handleSavePhone} className="space-y-4 max-w-md">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">10-Digit Mobile / WhatsApp Number</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm text-white focus:outline-none focus:border-[#10B981]"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#10B981] hover:bg-[#059669] text-white font-black text-xs rounded-xl shadow-lg transition flex items-center gap-1.5 btn-tactile"
              >
                <Save className="w-4 h-4" /> Save Contact Phone
              </button>

              {isSavedAlert && (
                <div className="p-3 bg-[#10B981]/20 border border-[#10B981]/40 rounded-xl text-xs text-[#10B981] font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Phone number saved successfully!
                </div>
              )}
            </form>
          </div>
        )}
      </main>

      <LocationSelectorModal />
      <PostListingModal />
      <MobileNav />
    </div>
  );
}
