'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { findCollegesForCareerPath, type FindCollegesForCareerPathOutput } from '@/ai/flows/find-colleges-for-career-path';
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from '@/hooks/use-location';
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles, AlertCircle, Search, MapPin, Navigation, Loader2, Building2 } from 'lucide-react';
import { colleges } from '@/lib/data';
import { getAllNearbyColleges, formatDistance, geocodeCity } from '@/lib/geolocation';
import Link from 'next/link';

interface SuggestedCollegesProps {
  careerPathName: string;
  level: 'after_10th' | 'after_12th';
}

function SuggestionsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-6 w-40" />
      </div>
      <div className="space-y-3 pl-4">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    </div>
  );
}

export function SuggestedColleges({ careerPathName, level }: SuggestedCollegesProps) {
  const [suggestions, setSuggestions] = useState<FindCollegesForCareerPathOutput['suggestedColleges'] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { userProfile } = useAuth();
  const { location: userLocation, error: locationError, loading: locationLoading, requestLocation } = useLocation();
  const [cityInput, setCityInput] = useState('');
  const [searched, setSearched] = useState(false);
  const [distanceFilter, setDistanceFilter] = useState<number>(50); // Default 50km for city search
  const [nearbyColleges, setNearbyColleges] = useState<any[]>([]);
  const [useNearby, setUseNearby] = useState(false);
  const [searchMode, setSearchMode] = useState<'ai' | 'city' | 'nearby'>('city'); // Default to city search

  useEffect(() => {
    // Reset when career path changes
    setSuggestions(null);
    setCityInput('');
    setError(null);
    setSearched(false);
    setNearbyColleges([]);
    setUseNearby(false);
    setSearchMode('city');
  }, [careerPathName]);


  async function handleCitySearch() {
    if (!cityInput.trim()) return;

    setLoading(true);
    setError(null);
    setSearched(true);
    setSearchMode('city');
    setNearbyColleges([]);
    setSuggestions(null);

    try {
      // 1. Geocode the city
      const coords = await geocodeCity(cityInput);

      // 2. Fetch all colleges near that city center
      const results = await getAllNearbyColleges(
        colleges,
        coords.latitude,
        coords.longitude,
        distanceFilter, // Use the selected distance filter
        level
      );

      setNearbyColleges(results);
    } catch (err) {
      console.error("City search failed:", err);
      setError("Could not find colleges in this city. Please check the spelling or try a major city nearby.");
    } finally {
      setLoading(false);
    }
  }

  async function getAISuggestions() {
    if (!userProfile || !careerPathName) return;

    setLoading(true);
    setError(null);
    setSearched(true);
    setSearchMode('ai');
    setNearbyColleges([]);
    try {
      const result = await findCollegesForCareerPath({
        careerPathName,
        studentLocation: cityInput, // Can be empty for a nationwide search
        classLevel: userProfile.classLevel,
      });
      setSuggestions(result.suggestedColleges);
    } catch (err) {
      console.error("Failed to get college suggestions:", err);
      setError("Could not load college suggestions for this path.");
    } finally {
      setLoading(false);
    }
  }

  async function searchNearby() {
    if (!userLocation) {
      await requestLocation();
      return;
    }

    if (!userProfile || !careerPathName) return;

    setLoading(true);
    setError(null);
    setSearched(true);
    setSearchMode('nearby');
    setSuggestions(null);

    try {
      // Get all nearby colleges from database + OSM
      const nearby = await getAllNearbyColleges(
        colleges,
        userLocation.latitude,
        userLocation.longitude,
        distanceFilter,
        level
      );

      setNearbyColleges(nearby);
    } catch (err) {
      console.error("Failed to get nearby colleges:", err);
      setError("Could not find nearby colleges.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-headline flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Find Colleges for this Path
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Method Toggle */}
        <div className="flex gap-2 p-1 bg-secondary/50 rounded-lg overflow-x-auto">
          <Button
            variant={searchMode === 'city' ? "default" : "ghost"}
            size="sm"
            className="flex-1 whitespace-nowrap"
            onClick={() => setSearchMode('city')}
          >
            <Search className="h-4 w-4 mr-2" />
            By City
          </Button>
          <Button
            variant={searchMode === 'nearby' ? "default" : "ghost"}
            size="sm"
            className="flex-1 whitespace-nowrap"
            onClick={() => {
              setSearchMode('nearby');
              if (!userLocation) requestLocation();
            }}
          >
            <MapPin className="h-4 w-4 mr-2" />
            Near Me
          </Button>
          <Button
            variant={searchMode === 'ai' ? "default" : "ghost"}
            size="sm"
            className="flex-1 whitespace-nowrap"
            onClick={() => setSearchMode('ai')}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            AI Picks
          </Button>
        </div>

        {/* City Search */}
        {searchMode === 'city' && (
          <div className="space-y-3">
            <Label htmlFor="location-input" className="font-semibold">Enter City Name</Label>
            <div className="flex gap-2">
              <Input
                id="location-input"
                placeholder="e.g., Mumbai, Pune, Delhi"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCitySearch()}
              />
              <Button onClick={handleCitySearch} disabled={loading}>
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-xs text-muted-foreground whitespace-nowrap">Search Radius:</Label>
              <Select
                value={distanceFilter.toString()}
                onValueChange={(v) => setDistanceFilter(Number(v))}
              >
                <SelectTrigger className="h-8 text-xs w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20">20 km</SelectItem>
                  <SelectItem value="50">50 km</SelectItem>
                  <SelectItem value="100">100 km</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* AI Search Info */}
        {searchMode === 'ai' && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Get personalized college recommendations based on your profile and this career path.
            </p>
            <Button onClick={getAISuggestions} disabled={loading} className="w-full">
              <Sparkles className="mr-2 h-4 w-4" />
              Get AI Recommendations
            </Button>
          </div>
        )}

        {/* Location-Based Search */}
        {searchMode === 'nearby' && (
          <div className="space-y-3">
            <Label className="font-semibold">Search colleges near you</Label>
            <div className="grid grid-cols-2 gap-2">
              <Select
                value={distanceFilter.toString()}
                onValueChange={(v) => setDistanceFilter(Number(v))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="50">Within 50 km</SelectItem>
                  <SelectItem value="100">Within 100 km</SelectItem>
                  <SelectItem value="150">Within 150 km</SelectItem>
                  <SelectItem value="200">Within 200 km</SelectItem>
                  <SelectItem value="300">Within 300 km</SelectItem>
                </SelectContent>
              </Select>

              <Button
                onClick={searchNearby}
                disabled={locationLoading || loading}
                className="w-full"
              >
                {locationLoading || loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {locationLoading ? 'Getting...' : 'Searching...'}
                  </>
                ) : userLocation ? (
                  <>
                    <Navigation className="mr-2 h-4 w-4" />
                    Search
                  </>
                ) : (
                  <>
                    <MapPin className="mr-2 h-4 w-4" />
                    Enable Location
                  </>
                )}
              </Button>
            </div>

            {locationError && (
              <Alert variant="destructive">
                <AlertDescription className="text-sm">{locationError}</AlertDescription>
              </Alert>
            )}

            {userLocation && !loading && (
              <Alert>
                <AlertDescription className="text-sm flex items-center gap-2">
                  <MapPin className="h-3 w-3" />
                  Location enabled. Search for colleges within {distanceFilter}km.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {loading && <SuggestionsSkeleton />}

        {error && (
          <div className="text-red-500 text-sm flex items-center gap-2 p-3 bg-destructive/10 rounded-md">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        {/* AI Suggestions Results */}
        {!loading && !error && searchMode === 'ai' && suggestions && (
          <>
            {suggestions.length > 0 ? (
              <div className="space-y-3">
                <h4 className="font-semibold pt-2 border-t">Suggested Colleges:</h4>
                {suggestions.map(college => (
                  <div key={college.id} className="p-3 border rounded-lg bg-secondary/50 transition-all hover:bg-secondary/80">
                    <h4 className="font-semibold">{college.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{college.courses.join(', ')}</p>
                    <p className="text-sm text-muted-foreground mb-3">{college.reasoning}</p>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/colleges/${college.id}`}>View Details</Link>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              searched && <p className="text-sm text-muted-foreground text-center py-4">No specific college suggestions found for this path.</p>
            )}
          </>
        )}

        {/* Nearby/City Results (Unified Display) */}
        {!loading && !error && (searchMode === 'nearby' || searchMode === 'city') && nearbyColleges.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold pt-2 border-t flex justify-between items-center">
              <span>Found {nearbyColleges.length} Colleges</span>
              <span className="text-xs font-normal text-muted-foreground">Within {distanceFilter}km</span>
            </h4>
            <div className="max-h-[400px] overflow-y-auto pr-1 space-y-3 custom-scrollbar">
              {nearbyColleges.map(college => (
                <div key={college.id} className="p-3 border rounded-lg bg-secondary/50 transition-all hover:bg-secondary/80">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold flex-1 text-sm">{college.name}</h4>
                    <div className="flex gap-1 shrink-0">
                      {/* Source labels REMOVED as per user request */}
                      <span className="text-xs px-2 py-0.5 bg-green-500/10 text-green-700 dark:text-green-400 rounded-full font-medium whitespace-nowrap">
                        <Navigation className="inline h-3 w-3 mr-0.5" />
                        {formatDistance(college.distance)}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {college.district !== 'Unknown' ? college.district : ''} {college.state !== 'Unknown' ? `, ${college.state}` : ''}
                  </p>
                  {college.courses && college.courses.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{college.courses.slice(0, 3).join(', ')}</p>
                  )}
                  <div className="mt-2 flex gap-2">
                    {college.source === 'database' ? (
                      <Button asChild variant="outline" size="sm" className="h-7 text-xs">
                        <Link href={`/colleges/${college.id}`}>View Details</Link>
                      </Button>
                    ) : (
                      <Button asChild variant="outline" size="sm" className="h-7 text-xs">
                        <a href={college.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                          <Navigation className="mr-1.5 h-3 w-3" />
                          Directions
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && (searchMode === 'nearby' || searchMode === 'city') && searched && nearbyColleges.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No colleges found within {distanceFilter}km. Try increasing the search radius.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
