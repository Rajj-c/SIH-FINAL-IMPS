import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Award, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Scholarship {
    name: string;
    provider: string;
    amount: string;
    eligibility: string[];
    link: string;
}

const scholarships: Scholarship[] = [
    {
        name: 'National Scholarship Portal',
        provider: 'Government of India',
        amount: 'Up to Rs 50,000/year',
        eligibility: ['Income < Rs 8L', 'Merit-based', 'SC/ST/OBC'],
        link: 'https://scholarships.gov.in',
    },
    {
        name: 'Post-Matric Scholarship',
        provider: 'Ministry of Social Justice',
        amount: 'Up to Rs 1.2L/year',
        eligibility: ['SC/ST students', 'Income < Rs 2.5L'],
        link: 'https://scholarships.gov.in',
    },
    {
        name: 'Merit-cum-Means Scholarship',
        provider: 'UGC',
        amount: 'Rs 20,000/year',
        eligibility: ['Income < Rs 6L', '60%+ marks'],
        link: 'https://www.ugc.gov.in',
    },
    {
        name: 'AICTE Pragati Scholarship',
        provider: 'AICTE',
        amount: 'Rs 50,000/year',
        eligibility: ['Girls only', 'Technical courses', 'Income < Rs 8L'],
        link: 'https://www.aicte-india.org',
    },
];

export function ScholarshipMatcher() {
    const [income, setIncome] = useState('below-8');
    const [category, setCategory] = useState('general');
    const [gender, setGender] = useState('female');

    const matchedScholarships = scholarships.filter((s) => {
        const eligString = s.eligibility.join(' ').toLowerCase();

        if (income === 'below-6' && !eligString.includes('< Rs 6l') && !eligString.includes('< Rs 8l')) {
            return false;
        }

        if (category !== 'general' && !eligString.includes(category.toLowerCase())) {
            return eligString.includes('merit');
        }

        if (gender === 'female' && eligString.includes('girls')) {
            return true;
        }

        return true;
    });

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-green-500" />
                    <div>
                        <CardTitle>Scholarship Matcher</CardTitle>
                        <CardDescription>Find scholarships you may be eligible for</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <Label>Annual Household Income</Label>
                        <Select value={income} onValueChange={setIncome}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="below-6">Below Rs 6 Lakhs</SelectItem>
                                <SelectItem value="below-8">Below Rs 8 Lakhs</SelectItem>
                                <SelectItem value="above-8">Above Rs 8 Lakhs</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>Category</Label>
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="general">General</SelectItem>
                                <SelectItem value="sc">SC</SelectItem>
                                <SelectItem value="st">ST</SelectItem>
                                <SelectItem value="obc">OBC</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>Gender</Label>
                        <Select value={gender} onValueChange={setGender}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="border-t pt-4">
                    <div className="mb-3">
                        <span className="font-semibold">{matchedScholarships.length} Matching Scholarships</span>
                    </div>

                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {matchedScholarships.map((scholarship, idx) => (
                            <div key={idx} className="p-4 border rounded-lg hover:border-green-300 transition-colors">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h4 className="font-semibold">{scholarship.name}</h4>
                                        <p className="text-sm text-muted-foreground">{scholarship.provider}</p>
                                    </div>
                                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                                        {scholarship.amount}
                                    </Badge>
                                </div>

                                <div className="flex flex-wrap gap-1 mb-2">
                                    {scholarship.eligibility.map((elig, i) => (
                                        <Badge key={i} variant="outline" className="text-xs">
                                            {elig}
                                        </Badge>
                                    ))}
                                </div>

                                <a href={scholarship.link} target="_blank" rel="noopener noreferrer">
                                    <Button size="sm" variant="outline" className="w-full">
                                        Apply Now
                                        <ExternalLink className="ml-2 h-3 w-3" />
                                    </Button>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
