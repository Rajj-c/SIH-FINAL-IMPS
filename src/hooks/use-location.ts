import { useState, useCallback } from 'react';
import { getUserLocation, type UserLocation } from '@/lib/geolocation';

export interface UseLocationResult {
    location: UserLocation | null;
    error: string | null;
    loading: boolean;
    requestLocation: () => Promise<void>;
    hasPermission: boolean;
}

export function useLocation(): UseLocationResult {
    const [location, setLocation] = useState<UserLocation | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [hasPermission, setHasPermission] = useState(false);

    const requestLocation = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const userLocation = await getUserLocation();
            setLocation(userLocation);
            setHasPermission(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to get location');
            setHasPermission(false);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        location,
        error,
        loading,
        requestLocation,
        hasPermission,
    };
}
