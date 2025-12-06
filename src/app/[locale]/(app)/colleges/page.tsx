'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { colleges } from '@/lib/data';
import { MapPin, Book, Search, Building2, GraduationCap, Navigation, Loader2, MapPinned } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from '@/hooks/use-location';
import { Skeleton } from '@/components/ui/skeleton';
import { getAllNearbyColleges, formatDistance } from '@/lib/geolocation';

export default function CollegesPage() {
  const [districtFilter, setDistrictFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [distanceFilter, setDistanceFilter] = useState<number>(100); // Default 100km
  const [showNearby, setShowNearby] = useState(false);
  const [nearbyColleges, setNearbyColleges] = useState<any[]>([]);
  const [fetchingNearby, setFetchingNearby] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.get('search');
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  const { userProfile, loading } = useAuth();
  const { location, error: locationError, loading: locationLoading, requestLocation } = useLocation();

  const relevantColleges = useMemo(() => {
    if (!userProfile) return [];

    // If searching, search across ALL colleges regardless of class level
    if (searchQuery) {
      return colleges;
    }

    const level = userProfile.classLevel === '10' ? 'after_10th' : 'after_12th';
    return colleges.filter(c => c.level === level);
  }, [userProfile, searchQuery]);

  const governmentColleges = useMemo(() => {
    return relevantColleges.filter(c => c.type === 'Government');
  }, [relevantColleges]);

  const districts = useMemo(() => ['all', ...Array.from(new Set(relevantColleges.map(c => c.district)))], [relevantColleges]);
  const courses = useMemo(() => ['all', ...Array.from(new Set(relevantColleges.flatMap(c => c.courses)))], [relevantColleges]);

  const getFilteredColleges = (collegeList: typeof colleges) => {
    return collegeList.filter(college => {
      const matchesDistrict = districtFilter === 'all' || college.district === districtFilter;
      const matchesCourse = courseFilter === 'all' || college.courses.includes(courseFilter);
      const matchesSearch = searchQuery === '' || college.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDistrict && matchesCourse && matchesSearch;
    });
  };


  const filteredGovernmentColleges = useMemo(() => getFilteredColleges(governmentColleges), [governmentColleges, districtFilter, courseFilter, searchQuery]);
  const filteredAllColleges = useMemo(() => getFilteredColleges(relevantColleges), [relevantColleges, districtFilter, courseFilter, searchQuery]);

  const handleSearchNearby = async () => {
    if (!location) {
      await requestLocation();
      return;
    }

    setFetchingNearby(true);
    try {
      const level = userProfile?.classLevel === '10' ? 'after_10th' : 'after_12th';
      const nearby = await getAllNearbyColleges(
        colleges,
        location.latitude,
        location.longitude,
        distanceFilter,
        level
      );
      setNearbyColleges(nearby);
      setShowNearby(true);
    } catch (error) {
      console.error('Error fetching nearby colleges:', error);
    } finally {
      setFetchingNearby(false);
    }
  };

  const displayedNearbyColleges = useMemo(() => {
    if (!showNearby) return [];
    return nearbyColleges.filter(college => {
      const matchesCourse = courseFilter === 'all' || college.courses.includes(courseFilter);
      const matchesSearch = searchQuery === '' || college.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCourse && matchesSearch;
    });
  }, [showNearby, nearbyColleges, courseFilter, searchQuery]);


  if (loading) {
    return (
      <div>
        <div className="mb-8 text-center">
          <Skeleton className="h-10 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-1/2 mx-auto mt-4" />
        </div>
        <Card className="mb-8 p-4 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-96 w-full" />)}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-headline">Government College Directory</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Showing colleges relevant for you after completing Class {userProfile?.classLevel}.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <Card className="p-4 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="space-y-2">
                <label htmlFor="search" className="text-sm font-medium">Search by Name</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search college name..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="district" className="text-sm font-medium">Filter by District</label>
                <Select value={districtFilter} onValueChange={setDistrictFilter}>
                  <SelectTrigger id="district">
                    <SelectValue placeholder="Select a district" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map(d => <SelectItem key={d} value={d}>{d === 'all' ? 'All Districts' : d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="course" className="text-sm font-medium">Filter by Course</label>
                <Select value={courseFilter} onValueChange={setCourseFilter}>
                  <SelectTrigger id="course">
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map(c => <SelectItem key={c} value={c}>{c === 'all' ? 'All Courses' : c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>



          {showNearby ? (
            /* Nearby Colleges Display */
            <div className="space-y-6">
              <h2 className="text-2xl font-bold font-headline">Colleges Near You</h2>
              {displayedNearbyColleges.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedNearbyColleges.map((college, index) => (
                    <motion.div
                      key={college.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card className={`h-full flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 ${college.type === 'Government' ? 'border-t-green-600' : 'border-t-primary'
                        }`}>
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between gap-2">
                            <CardTitle className="font-headline text-lg leading-tight flex-1">{college.name}</CardTitle>
                            <Badge
                              variant={college.source === 'database' ? 'default' : 'secondary'}
                              className="shrink-0"
                            >
                              {college.source === 'database' ? 'In DB' : 'OSM'}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm mt-1">
                            <div className="flex items-center text-muted-foreground">
                              <MapPin className="h-3.5 w-3.5 mr-1.5" />
                              {college.district}
                            </div>
                            <Badge variant="outline" className="bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300">
                              <Navigation className="h-3 w-3 mr-1" />
                              {formatDistance(college.distance)}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4 py-2">
                          {college.courses && college.courses.length > 0 && (
                            <div>
                              <div className="flex items-center text-xs font-semibold mb-2 text-primary uppercase tracking-wide">
                                <Book className="h-3.5 w-3.5 mr-1.5" />
                                Courses Offered
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {college.courses.slice(0, 3).map((course: string) => (
                                  <Badge key={course} variant="secondary" className="text-xs font-normal">
                                    {course}
                                  </Badge>
                                ))}
                                {college.courses.length > 3 && (
                                  <Badge variant="outline" className="text-xs font-normal">
                                    +{college.courses.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}

                          {college.fee && (
                            <div className="pt-2 border-t border-border/50">
                              <div className="text-xs font-semibold mb-1 text-primary uppercase tracking-wide">Fee</div>
                              <p className="text-sm text-foreground/80 font-medium">{college.fee}</p>
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className={`p-4 mt-auto ${college.type === 'Government' ? 'bg-green-50 dark:bg-green-950/20' : 'bg-secondary/10'
                          }`}>
                          {college.source === 'database' ? (
                            <Button asChild className="w-full" variant="outline">
                              <Link href={`/colleges/${college.id}`}>View Details</Link>
                            </Button>
                          ) : (
                            <Button asChild className="w-full" variant="outline">
                              <a href={college.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                                <Navigation className="mr-2 h-4 w-4" />
                                Get Directions
                              </a>
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-xl font-semibold">No colleges found within {distanceFilter}km</p>
                  <p className="text-muted-foreground mb-4">Try increasing the distance filter or view all colleges below</p>
                  <Button onClick={() => setShowNearby(false)} variant="outline">
                    View All Colleges
                  </Button>
                </div>
              )}
            </div>
          ) : (
            /* Standard List View */
            <div className="space-y-6">
              <div className="mb-4 p-4 bg-primary/10 border-l-4 border-primary rounded-md">
                <h3 className="font-semibold text-lg mb-1">Government Colleges</h3>
                <p className="text-sm text-muted-foreground">
                  Affordable, quality education from government-run institutions. These colleges offer subsidized fees and are recognized by the government.
                </p>
              </div>

              {filteredAllColleges.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAllColleges.map((college, index) => (
                    <motion.div
                      key={college.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card className="h-full flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-green-600">
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between gap-2">
                            <CardTitle className="font-headline text-lg leading-tight flex-1">{college.name}</CardTitle>
                            <Badge variant="default" className="shrink-0 bg-green-600">Government</Badge>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <MapPin className="h-3.5 w-3.5 mr-1.5" />
                            {college.district}
                          </div>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4 py-2">
                          <div>
                            <div className="flex items-center text-xs font-semibold mb-2 text-primary uppercase tracking-wide">
                              <Book className="h-3.5 w-3.5 mr-1.5" />
                              Courses Offered
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {college.courses.slice(0, 4).map(course => (
                                <Badge key={course} variant="secondary" className="text-xs font-normal">
                                  {course}
                                </Badge>
                              ))}
                              {college.courses.length > 4 && (
                                <Badge variant="outline" className="text-xs font-normal">
                                  +{college.courses.length - 4} more
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="pt-2 border-t border-border/50">
                            <div className="text-xs font-semibold mb-1 text-primary uppercase tracking-wide">Fee Structure</div>
                            <p className="text-sm text-foreground/80 font-medium">{college.fee}</p>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 bg-green-50 dark:bg-green-950/20 mt-auto">
                          <Button asChild className="w-full" variant="outline">
                            <Link href={`/colleges/${college.id}`}>View Details</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-xl font-semibold">No government colleges found</p>
                  <p className="text-muted-foreground">Try adjusting your filters.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar - Location Search */}
        <div className="lg:col-span-1">
          <Card className="p-4 shadow-md border-2 border-primary/20 sticky top-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPinned className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Find Nearby</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Locate government colleges near you.
              </p>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label htmlFor="distance" className="text-xs font-medium">Max Distance</label>
                  <Select
                    value={distanceFilter.toString()}
                    onValueChange={(v) => setDistanceFilter(Number(v))}
                  >
                    <SelectTrigger id="distance" className="h-8 text-xs">
                      <SelectValue placeholder="Select distance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50">Within 50 km</SelectItem>
                      <SelectItem value="100">Within 100 km</SelectItem>
                      <SelectItem value="150">Within 150 km</SelectItem>
                      <SelectItem value="200">Within 200 km</SelectItem>
                      <SelectItem value="300">Within 300 km</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleSearchNearby}
                  disabled={locationLoading || fetchingNearby}
                  className="w-full h-8 text-xs"
                  size="sm"
                >
                  {locationLoading || fetchingNearby ? (
                    <>
                      <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                      Searching...
                    </>
                  ) : location ? (
                    <>
                      <Navigation className="mr-2 h-3 w-3" />
                      Search Nearby
                    </>
                  ) : (
                    <>
                      <MapPin className="mr-2 h-3 w-3" />
                      Enable Location
                    </>
                  )}
                </Button>
              </div>

              {locationError && (
                <p className="text-xs text-destructive">{locationError}</p>
              )}

              {location && !showNearby && (
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Location active
                </p>
              )}

              {showNearby && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full h-8 text-xs mt-2"
                  onClick={() => setShowNearby(false)}
                >
                  Clear Search
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
