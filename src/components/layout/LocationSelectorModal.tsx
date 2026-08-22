"use client";

import { useState } from "react";
import { useLocationStore } from "@/stores/useLocationStore";
import { CITIES_AND_LOCALITIES } from "@/lib/constants/citiesAndLocalities";
import {
  MapPin,
  X,
  Check,
  Building2,
  Compass,
  Search,
  Crosshair,
  Sparkles,
  Plus,
  Loader2,
} from "lucide-react";

export default function LocationSelectorModal() {
  const {
    selectedCity,
    selectedLocality,
    setCity,
    setCityByName,
    setLocality,
    isLocationModalOpen,
    setLocationModalOpen,
  } = useLocationStore();

  const [citySearch, setCitySearch] = useState("");
  const [customCityInput, setCustomCityInput] = useState("");
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  if (!isLocationModalOpen) return null;

  const filteredCities = CITIES_AND_LOCALITIES.filter(
    (c) =>
      c.name.toLowerCase().includes(citySearch.toLowerCase()) ||
      c.state.toLowerCase().includes(citySearch.toLowerCase()) ||
      c.localities.some((l) => l.name.toLowerCase().includes(citySearch.toLowerCase()))
  );

  // Real-time GPS Location Detection
  const handleDetectLocation = () => {
    setIsDetectingLocation(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setIsDetectingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          // Reverse geocode using free OpenStreetMap Nominatim API
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const detectedCity =
            data.address?.city ||
            data.address?.state_district ||
            data.address?.town ||
            data.address?.suburb ||
            "Bengaluru";

          setCityByName(detectedCity);
          setIsDetectingLocation(false);
          setLocationModalOpen(false);
        } catch (e) {
          // Fallback to Bengaluru if network fails
          setCity("bengaluru");
          setIsDetectingLocation(false);
          setLocationModalOpen(false);
        }
      },
      (err) => {
        setLocationError("Could not detect location. Please select or type your city below.");
        setIsDetectingLocation(false);
      },
      { timeout: 8000 }
    );
  };

  const handleAddCustomCity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customCityInput.trim()) return;
    setCityByName(customCityInput.trim());
    setCustomCityInput("");
    setLocationModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div className="bg-[#F8FAFC] dark:bg-[#0F172A] rounded-3xl shadow-2xl max-w-xl w-full border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#EFF6FF] dark:bg-blue-950/50 text-[#2563EB] rounded-2xl">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-white">
                Choose or Type Any City
              </h2>
              <p className="text-xs text-[#64748B] dark:text-slate-400">
                Discover real-time verified PGs, food, jobs & essentials
              </p>
            </div>
          </div>
          <button
            onClick={() => setLocationModalOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* GPS Auto-Detect Button */}
          <div>
            <button
              onClick={handleDetectLocation}
              disabled={isDetectingLocation}
              className="w-full flex items-center justify-center gap-2.5 py-3 px-4 bg-white dark:bg-slate-900 hover:bg-[#EFF6FF] text-[#2563EB] font-bold text-xs sm:text-sm rounded-2xl border-2 border-dashed border-[#2563EB]/40 hover:border-[#2563EB] transition shadow-sm"
            >
              {isDetectingLocation ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#2563EB]" />
                  <span>Detecting GPS Location in Real-Time...</span>
                </>
              ) : (
                <>
                  <Crosshair className="w-4 h-4 text-[#2563EB]" />
                  <span>📍 Auto-Detect My Current City (Live GPS)</span>
                </>
              )}
            </button>
            {locationError && (
              <p className="text-[11px] text-[#EF4444] mt-1.5 text-center font-medium">
                {locationError}
              </p>
            )}
          </div>

          {/* Type ANY Custom City */}
          <form onSubmit={handleAddCustomCity} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              Type Any City In The World
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Surat, Varanasi, Bhopal, Dehradun, London..."
                value={customCityInput}
                onChange={(e) => setCustomCityInput(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-[#0F172A] dark:text-white focus:outline-none focus:border-[#2563EB]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#F59E0B] hover:bg-[#D97706] text-black font-bold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center gap-1 shrink-0"
              >
                <Plus className="w-4 h-4" /> Set City
              </button>
            </div>
          </form>

          {/* Quick Search & Popular Cities */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                Or Select From Popular Hubs
              </label>
              <span className="text-[10px] text-[#64748B]">{filteredCities.length} Cities</span>
            </div>

            {/* City Live Search Filter */}
            <div className="relative mb-3">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
              <input
                type="text"
                placeholder="Filter cities..."
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-[#0F172A] dark:text-white focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
              {filteredCities.map((city) => {
                const isSelected = selectedCity.id === city.id || selectedCity.name.toLowerCase() === city.name.toLowerCase();
                return (
                  <button
                    key={city.id}
                    onClick={() => setCity(city.id)}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-left border font-medium text-xs transition-all ${isSelected
                      ? "border-[#2563EB] bg-[#EFF6FF] text-[#2563EB] dark:bg-blue-950/40 dark:text-blue-300 shadow-sm"
                      : "border-slate-200 dark:border-slate-800 hover:border-slate-300 text-[#0F172A] dark:text-slate-300 bg-white dark:bg-slate-900"
                      }`}
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <Building2 className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-[#2563EB]" : "text-slate-400"}`} />
                      <span className="truncate">{city.name}</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#2563EB] shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Locality Selector for active city */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                Neighborhoods & Hubs in {selectedCity.name}
              </label>
              <button
                onClick={() => setLocality(null)}
                className={`text-[11px] font-bold px-2 py-0.5 rounded transition ${selectedLocality === null
                  ? "bg-[#2563EB] text-white"
                  : "text-[#38BDF8] hover:text-white"
                  }`}
              >
                All Areas
              </button>
            </div>
            <div className="space-y-2">
              {selectedCity.localities.map((loc) => {
                const isLocSelected = selectedLocality?.id === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => {
                      setLocality(loc.id);
                      setLocationModalOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl border text-left transition-all ${isLocSelected
                      ? "border-[#2563EB] bg-[#EFF6FF] dark:bg-blue-950/40 text-[#2563EB] dark:text-blue-200 shadow-sm"
                      : "border-slate-200 dark:border-slate-800 hover:border-[#2563EB]/40 bg-white dark:bg-slate-900"
                      }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 font-bold text-[#0F172A] dark:text-slate-100 text-xs sm:text-sm">
                        <Compass className="w-4 h-4 text-[#0EA5E9] shrink-0" />
                        <span>{loc.name}</span>
                        <span className="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-[#64748B] rounded-full font-normal">
                          {loc.type}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1 ml-6">
                        {loc.popularFor.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] bg-slate-100 dark:bg-slate-800 text-[#64748B] px-1.5 py-0.5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    {isLocSelected && <Check className="w-5 h-5 text-[#2563EB] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-end gap-3">
          <button
            onClick={() => setLocationModalOpen(false)}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition"
          >
            Done (Explore {selectedCity.name})
          </button>
        </div>
      </div>
    </div>
  );
}
