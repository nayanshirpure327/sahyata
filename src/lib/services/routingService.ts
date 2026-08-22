export interface RouteStep {
  instruction: string;
  distanceMeters: number;
  durationSeconds: number;
}

export interface RouteResult {
  coordinates: [number, number][]; // [lat, lng] array for Leaflet polyline
  distanceKm: number;
  durationMinutes: number;
  steps: RouteStep[];
  mode: "drive" | "motorcycle" | "walk" | "transit";
}

const API_KEY =
  process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY ||
  process.env.NEXT_PUBLIC_MAP_API_KEY ||
  "321ba8bd31564a648a1d57f97f5b7f80";

export async function calculateRoute(
  from: [number, number], // [lat, lng]
  to: [number, number],   // [lat, lng]
  mode: "drive" | "motorcycle" | "walk" | "transit" = "drive"
): Promise<RouteResult> {
  const [fromLat, fromLng] = from;
  const [toLat, toLng] = to;

  // 1. Try Geoapify Routing API with user's key
  try {
    const geoapifyMode = mode === "motorcycle" ? "motorcycle" : mode === "walk" ? "walk" : mode === "transit" ? "transit" : "drive";
    const url = `https://api.geoapify.com/v1/routing?waypoints=${fromLat},${fromLng}|${toLat},${toLng}&mode=${geoapifyMode}&details=instruction_details&apiKey=${API_KEY}`;

    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (data.features && data.features.length > 0) {
        const feature = data.features[0];
        const rawCoords: [number, number][] = feature.geometry.coordinates; // [lng, lat]
        const leafletCoords: [number, number][] = rawCoords.map(([lng, lat]) => [lat, lng]);

        const distanceMeters = feature.properties.distance || 0;
        const durationSeconds = feature.properties.time || 0;

        const steps: RouteStep[] = (feature.properties.legs?.[0]?.steps || []).map((step: any) => ({
          instruction: step.instruction?.text || "Continue along route",
          distanceMeters: step.distance || 0,
          durationSeconds: step.time || 0,
        }));

        return {
          coordinates: leafletCoords,
          distanceKm: parseFloat((distanceMeters / 1000).toFixed(1)),
          durationMinutes: Math.max(1, Math.round(durationSeconds / 60)),
          steps,
          mode,
        };
      }
    }
  } catch (err) {
    console.warn("Geoapify routing failed, attempting fallback OSRM:", err);
  }

  // 2. High-speed OpenStreetMap OSRM Fallback (No key required)
  try {
    const osrmProfile = mode === "walk" ? "foot" : mode === "motorcycle" ? "driving" : "driving";
    const osrmUrl = `https://router.project-osrm.org/route/v1/${osrmProfile}/${fromLng},${fromLat};${toLng},${toLat}?overview=full&geometries=geojson&steps=true`;

    const res = await fetch(osrmUrl);
    if (res.ok) {
      const data = await res.json();
      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const rawCoords: [number, number][] = route.geometry.coordinates; // [lng, lat]
        const leafletCoords: [number, number][] = rawCoords.map(([lng, lat]) => [lat, lng]);

        const steps: RouteStep[] = (route.legs?.[0]?.steps || []).map((step: any) => ({
          instruction: step.maneuver?.type === "turn" ? `Turn ${step.maneuver.modifier} onto ${step.name || "road"}` : step.name ? `Head on ${step.name}` : "Proceed straight",
          distanceMeters: step.distance || 0,
          durationSeconds: step.duration || 0,
        }));

        return {
          coordinates: leafletCoords,
          distanceKm: parseFloat((route.distance / 1000).toFixed(1)),
          durationMinutes: Math.max(1, Math.round(route.duration / 60)),
          steps,
          mode,
        };
      }
    }
  } catch (err) {
    console.warn("OSRM routing fallback failed:", err);
  }

  // 3. Fallback direct line if offline or network blocks routing
  const straightDistance = calculateHaversineKm(fromLat, fromLng, toLat, toLng);
  return {
    coordinates: [from, to],
    distanceKm: parseFloat(straightDistance.toFixed(1)),
    durationMinutes: Math.max(1, Math.round((straightDistance / 25) * 60)),
    steps: [
      { instruction: "Proceed towards destination locality", distanceMeters: straightDistance * 1000, durationSeconds: (straightDistance / 25) * 3600 }
    ],
    mode,
  };
}

// Great-circle distance helper
function calculateHaversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Helper to generate direct Google Maps & Apple Maps navigation links
export function getExternalNavigationUrl(toLat: number, toLng: number, mode: string = "driving"): string {
  const travelMode = mode === "walk" ? "walking" : mode === "transit" ? "transit" : mode === "motorcycle" ? "two_wheeler" : "driving";
  return `https://www.google.com/maps/dir/?api=1&destination=${toLat},${toLng}&travelmode=${travelMode}`;
}
