"use client";

import { useState } from "react";
import { useLocationStore } from "@/stores/useLocationStore";
import { addListing } from "@/lib/db/queries";
import { X, PlusCircle, CheckCircle, Upload, MapPin, Tag, Phone } from "lucide-react";

export default function PostListingModal() {
  const { isPostModalOpen, setPostModalOpen, selectedCity, selectedLocality } = useLocationStore();

  const [category, setCategory] = useState<"stay" | "food" | "jobs" | "marketplace" | "services" | "resources">("stay");
  const [subCategory, setSubCategory] = useState("Co-living PG");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [priceUnit, setPriceUnit] = useState("per month");
  const [address, setAddress] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactWhatsapp, setContactWhatsapp] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isPostModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !contactName || !contactPhone) {
      alert("Please fill in all required fields!");
      return;
    }

    addListing({
      title,
      category,
      subCategory: subCategory || category.toUpperCase(),
      description: description || "No detailed description provided.",
      price: price ? parseInt(price) : 0,
      priceUnit: priceUnit || "fixed",
      cityId: selectedCity.id,
      localityId: selectedLocality?.id || selectedCity.localities[0]?.id || "general",
      localityName: `${selectedLocality?.name || selectedCity.name}, ${selectedCity.name}`,
      address: address || `${selectedCity.name} Area`,
      contactName,
      contactPhone,
      contactWhatsapp: contactWhatsapp || contactPhone,
      images: [
        imageUrl ||
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      ],
      tags: tagsInput
        ? tagsInput.split(",").map((t) => t.trim())
        : ["Verified Newcomer Listing", "Available Now"],
      meta: {},
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setPostModalOpen(false);
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#F8FAFC] dark:bg-[#0F172A] rounded-3xl shadow-2xl max-w-xl w-full border border-slate-200 dark:border-slate-800 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header using Deep Trust Blue #2563EB */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-blue-700 bg-[#2563EB] text-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/15 rounded-2xl">
              <PlusCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold">Post a New Listing / Service</h2>
              <p className="text-xs text-blue-100">
                Help newcomers in {selectedCity.name} discover your offer
              </p>
            </div>
          </div>
          <button
            onClick={() => setPostModalOpen(false)}
            className="p-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-10 sm:p-14 text-center space-y-3 bg-white dark:bg-slate-900">
            <div className="w-16 h-16 bg-[#ECFDF5] text-[#10B981] rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-white">
              Listing Published Successfully!
            </h3>
            <p className="text-[#64748B] text-xs sm:text-sm">
              Your listing is now live in real-time for newcomers in {selectedCity.name}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto bg-white dark:bg-slate-900">
            {/* Category Selection */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-2 block">
                Listing Category *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "stay", label: "🏠 Stay & PG" },
                  { id: "food", label: "🍲 Food & Tiffin" },
                  { id: "jobs", label: "💼 Jobs & Gigs" },
                  { id: "marketplace", label: "🛋️ Marketplace" },
                  { id: "services", label: "🧹 Services" },
                  { id: "resources", label: "📚 Guides & Info" },
                ].map((cat) => (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => {
                      setCategory(cat.id as any);
                      if (cat.id === "stay") setSubCategory("Co-living PG");
                      if (cat.id === "food") setSubCategory("Daily Tiffin");
                      if (cat.id === "jobs") setSubCategory("Entry Level Job");
                      if (cat.id === "marketplace") setSubCategory("Pre-owned Furniture");
                      if (cat.id === "services") setSubCategory("House Maid & Cook");
                      if (cat.id === "resources") setSubCategory("City Guide");
                    }}
                    className={`py-2 px-2.5 rounded-xl border text-xs font-bold text-center transition ${category === cat.id
                        ? "border-[#2563EB] bg-[#EFF6FF] text-[#2563EB] dark:bg-blue-950/50 dark:text-blue-300"
                        : "border-slate-200 dark:border-slate-800 text-[#64748B] hover:border-slate-300"
                      }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1 block">
                Listing Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Spacious Single Room PG with Food"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-800 text-xs sm:text-sm text-[#0F172A] dark:text-white focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            {/* Price & Unit */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1 block">
                  Price (₹)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 10000 (0 if free)"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-800 text-xs sm:text-sm text-[#0F172A] dark:text-white focus:outline-none focus:border-[#2563EB]"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1 block">
                  Price Unit
                </label>
                <select
                  value={priceUnit}
                  onChange={(e) => setPriceUnit(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-800 text-xs sm:text-sm text-[#0F172A] dark:text-white focus:outline-none focus:border-[#2563EB]"
                >
                  <option value="per month">per month</option>
                  <option value="per meal">per meal</option>
                  <option value="per day">per day</option>
                  <option value="fixed">fixed price</option>
                  <option value="free">free</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1 block">
                Description
              </label>
              <textarea
                rows={3}
                placeholder="Mention key highlights, amenities, location advantages..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-800 text-xs sm:text-sm text-[#0F172A] dark:text-white focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1 block">
                  Contact Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-800 text-xs sm:text-sm text-[#0F172A] dark:text-white focus:outline-none focus:border-[#2563EB]"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1 block">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 9876543210"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-800 text-xs sm:text-sm text-[#0F172A] dark:text-white focus:outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>

            {/* Submit Button using Warm Amber #F59E0B */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3.5 bg-[#F59E0B] hover:bg-[#D97706] text-black rounded-2xl font-black shadow-lg shadow-[#F59E0B]/25 transition text-xs sm:text-sm"
              >
                Publish Listing in {selectedCity.name}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
