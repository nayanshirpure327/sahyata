import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CITIES_AND_LOCALITIES, City, Locality, getOrCreateCity } from "@/lib/constants/citiesAndLocalities";

interface LocationState {
  selectedCity: City;
  selectedLocality: Locality | null;
  searchQuery: string;
  activeCategory: string;
  isLocationModalOpen: boolean;
  isPostModalOpen: boolean;

  setCity: (cityId: string) => void;
  setCityByName: (cityName: string) => void;
  setLocality: (localityId: string | null) => void;
  setSearchQuery: (query: string) => void;
  setActiveCategory: (category: string) => void;
  setLocationModalOpen: (isOpen: boolean) => void;
  setPostModalOpen: (isOpen: boolean) => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      selectedCity: CITIES_AND_LOCALITIES[0], // Pune default
      selectedLocality: CITIES_AND_LOCALITIES[0].localities[0], // Hinjawadi default
      searchQuery: "",
      activeCategory: "all",
      isLocationModalOpen: false,
      isPostModalOpen: false,

      setCity: (cityId: string) => {
        const city =
          CITIES_AND_LOCALITIES.find((c) => c.id === cityId) || getOrCreateCity(cityId);
        set({
          selectedCity: city,
          selectedLocality: city.localities[0] || null,
        });
      },

      setCityByName: (cityName: string) => {
        const city = getOrCreateCity(cityName);
        set({
          selectedCity: city,
          selectedLocality: city.localities[0] || null,
        });
      },

      setLocality: (localityId: string | null) => {
        set((state) => {
          if (!localityId) return { selectedLocality: null };
          const locality = state.selectedCity.localities.find((l) => l.id === localityId) || null;
          return { selectedLocality: locality };
        });
      },

      setSearchQuery: (query: string) => set({ searchQuery: query }),
      setActiveCategory: (category: string) => set({ activeCategory: category }),
      setLocationModalOpen: (isOpen: boolean) => set({ isLocationModalOpen: isOpen }),
      setPostModalOpen: (isOpen: boolean) => set({ isPostModalOpen: isOpen }),
    }),
    {
      name: "sahayta-location-storage",
      partialize: (state) => ({
        selectedCity: state.selectedCity,
        selectedLocality: state.selectedLocality,
      }),
    }
  )
);
