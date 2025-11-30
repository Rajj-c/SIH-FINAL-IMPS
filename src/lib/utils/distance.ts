/**
 * Calculate distance between two points using Haversine formula
 * @param lat1 Latitude of first point
 * @param lon1 Longitude of first point
 * @param lat2 Latitude of second point
 * @param lon2 Longitude of second point
 * @returns Distance in kilometers
 */
export function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

/**
 * Convert degrees to radians
 */
function toRad(degrees: number): number {
    return degrees * (Math.PI / 180);
}

/**
 * Format distance for display
 * @param distanceKm Distance in kilometers
 * @returns Formatted string like "5.2 km" or "125 km"
 */
export function formatDistance(distanceKm: number): string {
    if (distanceKm < 1) {
        return `${Math.round(distanceKm * 1000)} m`;
    }
    if (distanceKm < 10) {
        return `${distanceKm.toFixed(1)} km`;
    }
    return `${Math.round(distanceKm)} km`;
}

/**
 * Get user's current  location
 * @returns Promise with {latitude, longitude} or null if denied
 */
export function getUserLocation(): Promise<GeolocationPosition | null> {
    return new Promise((resolve) => {
        if (!navigator.geolocation) {
            resolve(null);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => resolve(position),
            (error) => {
                console.error('Geolocation error:', error);
                resolve(null);
            },
            {
                enableHighAccuracy: false,
                timeout: 5000,
                maximumAge: 300000, // Cache for 5 minutes
            }
        );
    });
}
