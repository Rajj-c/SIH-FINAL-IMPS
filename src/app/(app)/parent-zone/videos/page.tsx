'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Search,
    GraduationCap,
    TrendingUp,
    Briefcase,
    DollarSign,
    BookOpen,
    Target,
    Award,
    Users,
    Clock,
    ChevronDown,
    ChevronUp,
    Lightbulb
} from 'lucide-react';
import { degreeCourses } from '@/lib/degree-courses-data';

export default function CourseEncyclopediaPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
    const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

    const difficulties = ['all', 'Easy', 'Medium', 'Hard'];

    const filteredCourses = degreeCourses.filter(course => {
        const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.whatYouLearn.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.shortName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDifficulty = selectedDifficulty === 'all' || course.difficulty === selectedDifficulty;
        return matchesSearch && matchesDifficulty;
    });

    const getDifficultyColor = (difficulty: string) => {
        const colors: Record<string, string> = {
            'Easy': 'bg-green-100 text-green-700 border-green-200',
            'Medium': 'bg-yellow-100 text-yellow-700 border-yellow-200',
            'Hard': 'bg-red-100 text-red-700 border-red-200'
        };
        return colors[difficulty] || 'bg-gray-100 text-gray-700';
    };

    const getDemandColor = (demand: string) => {
        const colors: Record<string, string> = {
            'High': 'text-green-600',
            'Medium': 'text-yellow-600',
            'Low': 'text-orange-600'
        };
        return colors[demand] || 'text-gray-600';
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Hero Section */}
            <div className="mb-12 text-center">
                <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl mb-4">
                    <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold mb-4">Course Encyclopedia</h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Complete guide to all degree courses. Make informed decisions about your child's future with detailed insights on career paths, salaries, and opportunities.
                </p>
            </div>

            {/* Why Education Matters */}
            <Card className="mb-8 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Lightbulb className="h-6 w-6 text-primary" />
                        <CardTitle className="text-2xl">Why Education Matters</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-green-500" />
                                Career Growth
                            </h3>
                            <p className="text-muted-foreground">
                                Higher education opens doors to better job opportunities, promotions, and career advancement. Graduates earn 2-3x more over their lifetime compared to non-graduates.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                <Users className="h-5 w-5 text-blue-500" />
                                Personal Development
                            </h3>
                            <p className="text-muted-foreground">
                                College education develops critical thinking, problem-solving skills, and confidence. Students learn to work in teams, communicate effectively, and adapt to challenges.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                <Award className="h-5 w-5 text-purple-500" />
                                Social Status
                            </h3>
                            <p className="text-muted-foreground">
                                A degree brings respect in society and increases marriage prospects. Parents feel proud when their child becomes a graduate and gains social recognition.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                <Target className="h-5 w-5 text-orange-500" />
                                Job Security
                            </h3>
                            <p className="text-muted-foreground">
                                Most government jobs require a graduation degree. Even private companies prefer graduates. Education provides a safety net and multiple career options.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Search and Filter */}
            <div className="mb-6 space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search courses..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <div className="flex flex-wrap gap-2">
                    <span className="text-sm font-semibold py-2">Difficulty:</span>
                    {difficulties.map((difficulty) => (
                        <Button
                            key={difficulty}
                            variant={selectedDifficulty === difficulty ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedDifficulty(difficulty)}
                        >
                            {difficulty === 'all' ? 'All Courses' : difficulty}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Course Cards */}
            <div className="space-y-4">
                {filteredCourses.map((course) => {
                    const isExpanded = expandedCourse === course.id;

                    return (
                        <Card key={course.id} className="hover:shadow-lg transition-all">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-3xl">{course.icon}</span>
                                            <div>
                                                <CardTitle className="text-xl">{course.name}</CardTitle>
                                                <CardDescription>{course.shortName} • {course.duration}</CardDescription>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            <Badge variant="secondary" className={getDifficultyColor(course.difficulty)}>
                                                {course.difficulty}
                                            </Badge>
                                            <Badge variant="outline" className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {course.duration}
                                            </Badge>
                                            {course.goodForGovtExams && (
                                                <Badge className="bg-green-100 text-green-700">
                                                    ✓ Govt Exams
                                                </Badge>
                                            )}
                                            <Badge variant="outline" className={getDemandColor(course.localDemandRating)}>
                                                {course.localDemandRating} Demand
                                            </Badge>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setExpandedCourse(isExpanded ? null : course.id)}
                                    >
                                        {isExpanded ? (
                                            <ChevronUp className="h-5 w-5" />
                                        ) : (
                                            <ChevronDown className="h-5 w-5" />
                                        )}
                                    </Button>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <p className="text-muted-foreground mb-4">{course.whatYouLearn}</p>

                                {isExpanded && (
                                    <div className="space-y-6 mt-6 pt-6 border-t">
                                        {/* Career Opportunities */}
                                        <div>
                                            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                                <Briefcase className="h-5 w-5 text-green-500" />
                                                Career Opportunities
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {course.jobOpportunities.map((job, idx) => (
                                                    <Badge key={idx} variant="secondary">
                                                        {job}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Salary & Fees */}
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <DollarSign className="h-5 w-5 text-green-600" />
                                                    <h4 className="font-semibold">Average Salary</h4>
                                                </div>
                                                <p className="text-xl font-bold text-green-700">{course.avgSalaryRange}</p>
                                            </div>

                                            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <GraduationCap className="h-5 w-5 text-blue-600" />
                                                    <h4 className="font-semibold">Course Fees</h4>
                                                </div>
                                                <p className="text-sm text-muted-foreground">{course.approxFees}</p>
                                                {course.scholarshipsAvailable && (
                                                    <p className="text-xs text-green-600 mt-1">💰 Scholarships available</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Future Scope */}
                                        <div>
                                            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                                                <TrendingUp className="h-5 w-5 text-blue-500" />
                                                Future Scope
                                            </h3>
                                            <p className="text-muted-foreground">{course.futureScope}</p>
                                        </div>

                                        {/* Higher Studies */}
                                        <div>
                                            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                                <BookOpen className="h-5 w-5 text-purple-500" />
                                                Higher Study Options
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {course.higherStudyOptions.map((option, idx) => (
                                                    <Badge key={idx} variant="outline" className="text-purple-600">
                                                        {option}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Government Exams */}
                                        {course.goodForGovtExams && (
                                            <div>
                                                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                                    <Award className="h-5 w-5 text-orange-500" />
                                                    Eligible Government Exams
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {course.govtExamsEligible.map((exam, idx) => (
                                                        <Badge key={idx} variant="secondary" className="bg-orange-100 text-orange-700">
                                                            {exam}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Local Demand */}
                                        <div>
                                            <h3 className="font-semibold text-lg mb-2">Job Market Demand</h3>
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="flex-1 bg-gray-200 rounded-full h-3">
                                                    <div
                                                        className={`h-3 rounded-full ${course.localDemandRating === 'High' ? 'bg-green-500 w-5/6' :
                                                                course.localDemandRating === 'Medium' ? 'bg-yellow-500 w-3/5' :
                                                                    'bg-orange-500 w-2/5'
                                                            }`}
                                                    />
                                                </div>
                                                <span className="font-semibold">{course.localDemandRating}</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{course.demandExplanation}</p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {filteredCourses.length === 0 && (
                <div className="text-center py-12">
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">No courses found matching your criteria</p>
                </div>
            )}
        </div>
    );
}
