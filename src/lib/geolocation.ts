/**
 * Geolocation utilities for finding nearby colleges
 * Combines database colleges with OpenStreetMap data
 */

export interface UserLocation {
    latitude: number;
    longitude: number;
}

export interface CollegeWithDistance {
    college: any;
    distance: number;
    source: 'database' | 'openstreetmap';
}

/**
 * Get user's current location using browser geolocation API
 */
export async function getUserLocation(): Promise<UserLocation> {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => {
                let errorMessage = 'Unable to retrieve your location';
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Location permission denied. Please enable location access.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Location information unavailable.';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'Location request timed out.';
                        break;
                }
                reject(new Error(errorMessage));
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    });
}

/**
 * Geocode a city name to coordinates using Nominatim API
 */
export async function geocodeCity(city: string): Promise<UserLocation> {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}&limit=1`, {
            headers: {
                'User-Agent': 'CareerGuidanceApp/1.0'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to geocode city');
        }

        const data = await response.json();

        if (data && data.length > 0) {
            return {
                latitude: parseFloat(data[0].lat),
                longitude: parseFloat(data[0].lon)
            };
        }

        throw new Error('City not found');
    } catch (error) {
        console.error('Geocoding error:', error);
        throw error;
    }
}

/**
 * Calculate distance between two points using Haversine formula
 * Returns distance in kilometers
 */
export function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

/**
 * Fetch nearby colleges from OpenStreetMap using Overpass API
 */
export async function fetchOpenStreetMapColleges(
    latitude: number,
    longitude: number,
    radiusKm: number
): Promise<any[]> {
    try {
        // Convert km to meters for Overpass API
        const radiusMeters = radiusKm * 1000;

        // Overpass QL query for educational institutions
        const query = `
      [out:json][timeout:25];
      (
        node["amenity"="college"](around:${radiusMeters},${latitude},${longitude});
        node["amenity"="university"](around:${radiusMeters},${latitude},${longitude});
        way["amenity"="college"](around:${radiusMeters},${latitude},${longitude});
        way["amenity"="university"](around:${radiusMeters},${latitude},${longitude});
        relation["amenity"="college"](around:${radiusMeters},${latitude},${longitude});
        relation["amenity"="university"](around:${radiusMeters},${latitude},${longitude});
      );
      out body;
      >;
      out skel qt;
    `;

        const response = await fetch('https://overpass-api.de/api/interpreter', {
            method: 'POST',
            body: query,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch from OpenStreetMap');
        }

        const data = await response.json();

        // Transform OSM data to our college format
        const colleges = data.elements
            .filter((element: any) => element.tags?.name) // Only include named institutions
            .map((element: any) => {
                const lat = element.lat || element.center?.lat;
                const lon = element.lon || element.center?.lon;

                // Skip if no coordinates
                if (!lat || !lon) return null;

                const distance = calculateDistance(latitude, longitude, lat, lon);

                const isGovernment =
                    element.tags.operator?.toLowerCase().includes('government') ||
                    element.tags.operator?.toLowerCase().includes('govt') ||
                    element.tags.operator?.toLowerCase().includes('public') ||
                    element.tags.name?.toLowerCase().includes('government') ||
                    element.tags.name?.toLowerCase().includes('govt') ||
                    element.tags.name?.toLowerCase().includes('state university');

                if (!isGovernment) return null;

                return {
                    id: `osm-${element.id}`,
                    name: element.tags.name || 'Unknown College',
                    district: element.tags['addr:city'] || element.tags['addr:town'] || element.tags['addr:district'] || element.tags['addr:county'] || element.tags['addr:suburb'] || 'Unknown',
                    state: element.tags['addr:state'] || element.tags['is_in:state'] || 'Unknown',
                    type: 'Government',
                    courses: [], // OSM doesn't have course data
                    eligibility: 'Contact college for details',
                    imageUrl: 'https://picsum.photos/seed/osm' + element.id + '/600/400',
                    about: element.tags.description || `${element.tags.name} is a government educational institution.`,
                    level: 'after_12th' as const,
                    fee: 'Contact for fee details',
                    latitude: lat,
                    longitude: lon,
                    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`,
                    contactInfo: {
                        phone: element.tags.phone || element.tags['contact:phone'],
                        email: element.tags.email || element.tags['contact:email'],
                        website: element.tags.website || element.tags['contact:website'],
                        address: [
                            element.tags['addr:housenumber'],
                            element.tags['addr:street'],
                            element.tags['addr:city'],
                            element.tags['addr:state'],
                            element.tags['addr:postcode']
                        ].filter(Boolean).join(', ') || undefined,
                    },
                    distance,
                    source: 'openstreetmap' as const,
                };
            })
            .filter((college: any) => college !== null);

        return colleges;
    } catch (error) {
        console.error('Error fetching from OpenStreetMap:', error);
        return [];
    }
}

/**
 * Get nearby colleges from database
 */
export function getNearbyCollegesFromDatabase(
    colleges: any[],
    userLat: number,
    userLon: number,
    maxDistanceKm: number
): CollegeWithDistance[] {
    return colleges
        .map(college => {
            const distance = calculateDistance(
                userLat,
                userLon,
                college.latitude,
                college.longitude
            );

            return {
                college: {
                    ...college,
                    distance,
                    source: 'database' as const,
                },
                distance,
                source: 'database' as const,
            };
        })
        .filter(item => item.distance <= maxDistanceKm)
        .sort((a, b) => a.distance - b.distance);
}

/**
 * Combine database and OpenStreetMap colleges
 */
export async function getAllNearbyColleges(
    databaseColleges: any[],
    userLat: number,
    userLon: number,
    maxDistanceKm: number,
    userLevel: 'after_10th' | 'after_12th'
): Promise<any[]> {
    // Get colleges from database
    const dbColleges = getNearbyCollegesFromDatabase(
        databaseColleges.filter(c => c.level === userLevel),
        userLat,
        userLon,
        maxDistanceKm
    );

    // Fetch from OpenStreetMap
    const osmColleges = await fetchOpenStreetMapColleges(
        userLat,
        userLon,
        maxDistanceKm
    );

    // Combine both sources
    const allColleges = [
        ...dbColleges.map(item => item.college),
        ...osmColleges,
    ];

    // Remove duplicates based on similar names and locations
    const uniqueColleges = deduplicateColleges(allColleges);

    // Sort by distance
    return uniqueColleges.sort((a, b) => a.distance - b.distance);
}

/**
 * Remove duplicate colleges (same name or very close location)
 */
function deduplicateColleges(colleges: any[]): any[] {
    const unique: any[] = [];
    const seen = new Set<string>();

    for (const college of colleges) {
        // Create a key based on normalized name and approximate location
        const nameKey = college.name.toLowerCase().replace(/[^a-z0-9]/g, '');
        const locationKey = `${Math.round(college.latitude * 100)}_${Math.round(college.longitude * 100)}`;
        const key = `${nameKey}_${locationKey}`;

        if (!seen.has(key)) {
            seen.add(key);
            unique.push(college);
        }
    }

    return unique;
}

/**
 * Format distance for display
 */
export function formatDistance(distanceKm: number): string {
    if (distanceKm < 1) {
        return `${Math.round(distanceKm * 1000)} m`;
    }
    return `${distanceKm.toFixed(1)} km`;
}
