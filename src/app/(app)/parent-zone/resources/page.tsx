'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Search,
    ExternalLink,
    BookOpen,
    Globe,
    Youtube,
    Smartphone,
    FileText,
    DollarSign,
    Award,
    Heart,
    GraduationCap,
    Building,
    Compass
} from 'lucide-react';
import {
    parentResources,
    getResourcesByCategory,
    getAllCategories,
    type ParentResource
} from '@/lib/parent-resources';

const categoryIcons: Record<string, any> = {
    'Financial Planning': DollarSign,
    'Scholarships': Award,
    'Parent Counseling': Heart,
    'Entrance Exams': GraduationCap,
    'Government Schemes': Building,
    'Career Guidance': Compass
};

const resourceTypeIcons: Record<string, any> = {
    'Website': Globe,
    'YouTube': Youtube,
    'App': Smartphone,
    'Platform': Globe,
    'PDF': FileText
};

export default function ResourcesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const categories = getAllCategories();

    // Filter resources
    const filteredResources = useMemo(() => {
        let resources = parentResources;

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            resources = resources.filter(r =>
                r.title.toLowerCase().includes(query) ||
                r.description.toLowerCase().includes(query)
            );
        }

        if (selectedCategory !== 'all') {
            resources = resources.filter(r => r.category === selectedCategory);
        }

        return resources;
    }, [searchQuery, selectedCategory]);

    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            'Financial Planning': 'bg-green-100 text-green-700 border-green-200',
            'Scholarships': 'bg-yellow-100 text-yellow-700 border-yellow-200',
            'Parent Counseling': 'bg-pink-100 text-pink-700 border-pink-200',
            'Entrance Exams': 'bg-blue-100 text-blue-700 border-blue-200',
            'Government Schemes': 'bg-purple-100 text-purple-700 border-purple-200',
            'Career Guidance': 'bg-orange-100 text-orange-700 border-orange-200'
        };
        return colors[category] || 'bg-gray-100 text-gray-700';
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
                        <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">Resources Hub</h1>
                        <p className="text-muted-foreground">Curated resources to support your parenting journey</p>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search resources..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
                <h3 className="text-sm font-semibold mb-3">Filter by Category</h3>
                <div className="flex flex-wrap gap-2">
                    <Button
                        variant={selectedCategory === 'all' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedCategory('all')}
                    >
                        All Resources ({parentResources.length})
                    </Button>
                    {categories.map((category) => {
                        const Icon = categoryIcons[category];
                        const count = getResourcesByCategory(category).length;
                        return (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setSelectedCategory(category)}
                                className="gap-1.5"
                            >
                                {Icon && <Icon className="h-3 w-3" />}
                                {category} ({count})
                            </Button>
                        );
                    })}
                </div>
            </div>

            {/* Results Count */}
            <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                    {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''} found
                </p>
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.length > 0 ? (
                    filteredResources.map((resource) => {
                        const ResourceIcon = resourceTypeIcons[resource.resourceType];

                        return (
                            <Card
                                key={resource.id}
                                className="hover:shadow-lg transition-all group"
                            >
                                <CardHeader>
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <Badge variant="secondary" className={getCategoryColor(resource.category)}>
                                            {resource.category}
                                        </Badge>
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <ResourceIcon className="h-3 w-3" />
                                            {resource.resourceType}
                                        </div>
                                    </div>
                                    <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                                        {resource.title}
                                    </CardTitle>
                                </CardHeader>

                                <CardContent>
                                    <CardDescription className="mb-4 line-clamp-3">
                                        {resource.description}
                                    </CardDescription>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full"
                                        asChild
                                    >
                                        <a
                                            href={resource.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2"
                                        >
                                            {resource.resourceType === 'PDF' ? 'Download' : 'Visit Resource'}
                                            <ExternalLink className="h-3 w-3" />
                                        </a>
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })
                ) : (
                    <div className="col-span-full text-center py-12">
                        <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                        <p className="text-muted-foreground">No resources found matching your criteria</p>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCategory('all');
                            }}
                            className="mt-4"
                        >
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>

            {/* Help Section */}
            <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Heart className="h-5 w-5 text-blue-500" />
                    Need More Help?
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                    Can't find what you're looking for? We're here to help you support your child's educational journey.
                </p>
                <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" asChild>
                        <a href="/parent-zone/videos">
                            Browse Career Videos
                        </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                        <a href="/parent-zone/financial-tools">
                            Use Financial Tools
                        </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                        <a href="/parent-zone?tab=quiz">
                            Take Guidance Quiz
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    );
}
