import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { College } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createGenericCollege(name: string): College {
  return {
    id: `generic-${name.toLowerCase().replace(/\s+/g, '-')}`,
    name: name,
    district: "Location Unavailable",
    state: "India",
    type: "Government",
    courses: ["Various Courses"],
    eligibility: "Please check official website for eligibility criteria.",
    imageUrl: `https://placehold.co/600x400?text=${encodeURIComponent(name)}`,
    about: "Detailed information for this college is currently being updated. Please visit the official website or search online for more details.",
    level: "after_12th",
    latitude: 0,
    longitude: 0,
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`,
    contactInfo: {
      website: `https://www.google.com/search?q=${encodeURIComponent(name)}`
    }
  };
}
