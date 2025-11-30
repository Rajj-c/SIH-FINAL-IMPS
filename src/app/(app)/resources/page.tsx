'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { resources } from '@/lib/resources';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from 'next/link';
import {
  ArrowUpRight,
  BookOpen,
  Laptop,
  Award,
  Building2,
  Target,
  Compass,
  Trophy,
  GraduationCap,
  Search,
  Filter,
  Youtube,
  MessageCircle,
  Globe,
  Smartphone,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  Loader2
} from 'lucide-react';
import type { Resource } from '@/lib/types';
import { useAuth } from '@/hooks/use-auth';
import { toggleBookmarkResource } from '@/lib/firebase/database';
import { recommendResources } from '@/ai/flows/recommend-resources';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';

const categoryIcons: { [key: string]: React.ElementType } = {
  'E-Books': BookOpen,
  'Skill Development': Laptop,
  'Scholarship Portals': Award,
  'Govt. Schemes': Building2,
  'Entrance Exams': Target,
  'Career Guidance': Compass,
  'Competitive Exams': Trophy,
  'Online Learning': GraduationCap,
};

const resourceTypeIcons: { [key: string]: React.ElementType } = {
  'YouTube': Youtube,
  'Telegram': MessageCircle,
  'Website': Globe,
  'Platform': Globe,
  'App': Smartphone,
};

export default function ResourcesPage() {
  const { userProfile } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'personalized' | 'all' | 'bookmarks'>('personalized');
  const [selectedClass, setSelectedClass] = useState<string>(userProfile?.classLevel || 'All');
  const [selectedStream, setSelectedStream] = useState<string>('All');
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);
  const [recommendedIds, setRecommendedIds] = useState<number[]>([]);
  const [recommendationReasoning, setRecommendationReasoning] = useState<string>('');
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  const [bookmarkingId, setBookmarkingId] = useState<number | null>(null);

  const searchParams = useSearchParams();

  // Load bookmarks and recommendations on mount
  useEffect(() => {
    if (userProfile?.bookmarkedResources) {
      setBookmarkedIds(userProfile.bookmarkedResources);
    }

    // Load AI recommendations if user has completed quiz
    if (userProfile?.quizAnswers && Object.keys(userProfile.quizAnswers).length > 0) {
      loadRecommendations();
    }

    // Handle search param
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      setViewMode('all');
    }
  }, [userProfile, searchParams]);

  const loadRecommendations = async () => {
    if (!userProfile?.quizAnswers) return;

    setIsLoadingRecommendations(true);
    try {
      const result = await recommendResources({
        quizAnswers: userProfile.quizAnswers,
        classLevel: userProfile.classLevel as '10' | '12',
        recommendedStream: undefined, // Could be enhanced to pass recommended stream
      });

      setRecommendedIds(result.recommendedResourceIds);
      setRecommendationReasoning(result.reasoning);
    } catch (error) {
      console.error('Failed to load recommendations:', error);
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  const handleBookmarkToggle = async (resourceId: number) => {
    if (!userProfile) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to bookmark resources.",
        variant: "destructive",
      });
      return;
    }

    setBookmarkingId(resourceId);
    try {
      await toggleBookmarkResource(userProfile.uid, resourceId);

      // Update local state
      setBookmarkedIds(prev =>
        prev.includes(resourceId)
          ? prev.filter(id => id !== resourceId)
          : [...prev, resourceId]
      );

      toast({
        title: bookmarkedIds.includes(resourceId) ? "Bookmark removed" : "Resource bookmarked!",
        description: bookmarkedIds.includes(resourceId)
          ? "Resource removed from your bookmarks"
          : "Resource saved to your bookmarks",
      });
    } catch (error) {
      console.error('Failed to toggle bookmark:', error);
      toast({
        title: "Error",
        description: "Failed to update bookmark. Please try again.",
        variant: "destructive",
      });
    } finally {
      setBookmarkingId(null);
    }
  };

  // Filter resources based on all criteria
  const filteredResources = useMemo(() => {
    let filtered = resources;

    // Bookmarks view - only show bookmarked resources
    if (viewMode === 'bookmarks') {
      filtered = resources.filter(r => bookmarkedIds.includes(r.id));
    }
    // Personalized view
    else if (viewMode === 'personalized' && userProfile) {
      filtered = resources.filter(resource => {
        const matchesClass = !resource.targetClass ||
          resource.targetClass === 'All' ||
          resource.targetClass === userProfile.classLevel + 'th'; // Convert "10" to "10th"

        const matchesStream = !resource.targetStream || resource.targetStream === 'All';

        return matchesClass && matchesStream;
      });
    }
    // All resources view with manual filters
    else if (viewMode === 'all') {
      filtered = resources.filter(resource => {
        const matchesClassFilter = selectedClass === 'All' ||
          !resource.targetClass ||
          resource.targetClass === 'All' ||
          resource.targetClass === selectedClass;

        const matchesStreamFilter = selectedStream === 'All' ||
          !resource.targetStream ||
          resource.targetStream === 'All' ||
          resource.targetStream === selectedStream;

        return matchesClassFilter && matchesStreamFilter;
      });
    }

    // Apply search filter
    filtered = filtered.filter(resource => {
      const matchesSearch = searchQuery === '' ||
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesSearch;
    });

    // Apply category filter
    const matchesCategory = selectedCategory === 'All';
    if (!matchesCategory) {
      filtered = filtered.filter(r => r.category === selectedCategory);
    }

    return filtered;
  }, [resources, searchQuery, selectedCategory, viewMode, userProfile, selectedClass, selectedStream, bookmarkedIds]);

  // Get recommended resources
  const recommendedResources = useMemo(() => {
    return resources.filter(r => recommendedIds.includes(r.id));
  }, [recommendedIds]);

  // Group resources by category
  const groupedResources = filteredResources.reduce((acc, resource) => {
    const { category } = resource;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(resource);
    return acc;
  }, {} as Record<string, Resource[]>);

  // Get unique categories for filter
  const categories = ['All', ...Array.from(new Set(resources.map(r => r.category)))];

  // Resource Card Component
  const ResourceCard = ({ resource }: { resource: Resource }) => {
    const ResourceTypeIcon = resource.resourceType
      ? resourceTypeIcons[resource.resourceType]
      : Globe;
    const isBookmarked = bookmarkedIds.includes(resource.id);
    const isBookmarking = bookmarkingId === resource.id;

    return (
      <Card className="flex flex-col shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2 flex-1">
              {resource.icon && (
                <span className="text-2xl flex-shrink-0">{resource.icon}</span>
              )}
              <CardTitle className="text-lg font-headline leading-tight">
                {resource.title}
              </CardTitle>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              {resource.resourceType && (
                <ResourceTypeIcon className="h-4 w-4 text-muted-foreground" />
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleBookmarkToggle(resource.id)}
                disabled={isBookmarking}
              >
                {isBookmarking ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : isBookmarked ? (
                  <BookmarkCheck className="h-4 w-4 fill-primary text-primary" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          {/* Badges */}
          <div className="flex flex-wrap gap-1 mt-2">
            {resource.isPaid && (
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-300">
                💳 Paid
              </Badge>
            )}
            {!resource.isPaid && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                Free
              </Badge>
            )}
            {resource.targetClass && resource.targetClass !== 'All' && (
              <Badge variant="secondary">{resource.targetClass}</Badge>
            )}
            {resource.state && resource.state !== 'All India' && (
              <Badge variant="outline">{resource.state}</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
          <p className="text-sm text-muted-foreground mb-3 flex-grow">
            {resource.description}
          </p>

          {/* Tags */}
          {resource.tags && resource.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {resource.tags.slice(0, 3).map((tag, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {resource.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{resource.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          <Button asChild variant="outline" className="w-full mt-auto">
            <Link href={resource.link} target="_blank" rel="noopener noreferrer">
              Visit Resource
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline">
          {viewMode === 'personalized' && userProfile
            ? `Resources for Class ${userProfile.classLevel}`
            : viewMode === 'bookmarks'
              ? 'My Bookmarked Resources'
              : 'Student Resources'}
        </h1>
        <p className="text-muted-foreground mt-2 max-w-3xl mx-auto">
          {viewMode === 'bookmarks'
            ? 'Your saved resources for quick access.'
            : 'Curated resources including entrance exams, scholarships, skill development, and study materials.'}
          {viewMode === 'personalized' && ' Personalized based on your profile.'}
        </p>
      </div>

      {/* Recommended Resources Section (AI-driven) */}
      {viewMode === 'personalized' && userProfile?.quizAnswers && recommendedResources.length > 0 && (
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-6 border border-primary/20">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold font-headline">Recommended for You</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{recommendationReasoning}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      )}

      {isLoadingRecommendations && viewMode === 'personalized' && (
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-6 border border-primary/20 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
          <p className="text-muted-foreground">Loading personalized recommendations...</p>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between bg-card p-4 rounded-lg border">
        {/* Search */}
        <div className="relative flex-1 w-full lg:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search resources by name, description, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 items-center">
          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* View Mode Toggle */}
          <div className="flex gap-1 bg-muted p-1 rounded-md">
            <Button
              variant={viewMode === 'personalized' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('personalized')}
              disabled={!userProfile}
            >
              My Resources
            </Button>
            <Button
              variant={viewMode === 'bookmarks' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('bookmarks')}
              disabled={!userProfile}
            >
              <BookmarkCheck className="h-4 w-4 mr-1" />
              Bookmarks ({bookmarkedIds.length})
            </Button>
            <Button
              variant={viewMode === 'all' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('all')}
            >
              All Resources
            </Button>
          </div>
        </div>
      </div>

      {/* Additional Filters for "All Resources" view */}
      {viewMode === 'all' && (
        <div className="flex gap-3 flex-wrap">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Classes</SelectItem>
              <SelectItem value="10th">Class 10</SelectItem>
              <SelectItem value="12th">Class 12</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedStream} onValueChange={setSelectedStream}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Stream" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Streams</SelectItem>
              <SelectItem value="Science">Science</SelectItem>
              <SelectItem value="Commerce">Commerce</SelectItem>
              <SelectItem value="Arts">Arts</SelectItem>
              <SelectItem value="Vocational">Vocational</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing <span className="font-semibold text-foreground">{filteredResources.length}</span> resources
        {viewMode === 'bookmarks' && bookmarkedIds.length === 0 && ' - Start bookmarking resources to save them here'}
      </div>

      {/* Resources Grid by Category */}
      {Object.keys(groupedResources).length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <h3 className="text-lg font-semibold mb-1">
            {viewMode === 'bookmarks' ? 'No bookmarks yet' : 'No resources found'}
          </h3>
          <p className="text-muted-foreground">
            {viewMode === 'bookmarks'
              ? 'Click the bookmark icon on any resource to save it here'
              : 'Try adjusting your search or filter criteria'}
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          {Object.entries(groupedResources).map(([category, items]) => {
            const Icon = categoryIcons[category] || BookOpen;
            return (
              <div key={category}>
                <h2 className="text-2xl font-bold font-headline mb-4 flex items-center gap-3">
                  <Icon className="h-6 w-6 text-primary" />
                  {category}
                  <Badge variant="secondary" className="ml-2">{items.length}</Badge>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map(resource => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
