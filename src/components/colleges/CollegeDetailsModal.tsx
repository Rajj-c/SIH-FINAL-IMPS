'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, BookOpen, CheckCircle, Target, MapPin, Building, Award, School, Bookmark, HandCoins, School2, Phone, Mail, Globe, Navigation } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import type { College } from '@/lib/types';
import { useState } from 'react';

interface CollegeDetailsModalProps {
    college: College;
    trigger: React.ReactNode;
}

export function CollegeDetailsModal({ college, trigger }: CollegeDetailsModalProps) {
    const { user, isCollegeSaved, toggleSaveCollege } = useAuth();
    const [open, setOpen] = useState(false);

    const isSaved = user ? isCollegeSaved(college.id) : false;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
                <ScrollArea className="h-full max-h-[90vh]">
                    <div className="p-6">
                        <div className="flex items-start justify-between gap-4 mb-6">
                            <div>
                                <DialogTitle className="text-3xl font-bold font-headline">{college.name}</DialogTitle>
                                <div className="flex items-center text-lg text-muted-foreground pt-1">
                                    <MapPin className="mr-2 h-5 w-5" />
                                    {college.district !== 'Unknown' ? college.district : 'Location details available on map'}
                                    {college.state !== 'Unknown' ? `, ${college.state}` : ''}
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2 shrink-0">
                                <Badge variant={college.type === 'Government' ? 'default' : 'secondary'} className="text-sm">
                                    <Award className="mr-1.5 h-4 w-4" />
                                    {college.type}
                                </Badge>
                                {user && (
                                    <Button variant="outline" size="sm" onClick={() => toggleSaveCollege(college)}>
                                        <Bookmark className={cn("h-4 w-4 mr-2", isSaved && "fill-primary text-primary")} />
                                        {isSaved ? 'Saved' : 'Save'}
                                    </Button>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-6">
                                {/* About Section */}
                                <Card>
                                    <CardContent className="pt-6">
                                        <h2 className="text-xl font-semibold mb-3 font-headline flex items-center gap-2">
                                            <Building className="h-5 w-5 text-primary" /> About the College
                                        </h2>
                                        <p className="text-muted-foreground leading-relaxed">{college.about}</p>
                                    </CardContent>
                                </Card>

                                {/* Contact Information */}
                                {college.contactInfo && (
                                    <Card>
                                        <CardContent className="pt-6">
                                            <h2 className="text-xl font-semibold mb-4 font-headline flex items-center gap-2">
                                                <Phone className="h-5 w-5 text-primary" /> Contact Information
                                            </h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {college.contactInfo.phone && (
                                                    <div className="flex items-start gap-3">
                                                        <Phone className="h-4 w-4 text-primary mt-1 shrink-0" />
                                                        <div>
                                                            <p className="text-xs font-semibold text-muted-foreground uppercase">Phone</p>
                                                            <a href={`tel:${college.contactInfo.phone}`} className="text-sm font-medium hover:text-primary transition-colors">
                                                                {college.contactInfo.phone}
                                                            </a>
                                                        </div>
                                                    </div>
                                                )}

                                                {college.contactInfo.email && (
                                                    <div className="flex items-start gap-3">
                                                        <Mail className="h-4 w-4 text-primary mt-1 shrink-0" />
                                                        <div>
                                                            <p className="text-xs font-semibold text-muted-foreground uppercase">Email</p>
                                                            <a href={`mailto:${college.contactInfo.email}`} className="text-sm font-medium hover:text-primary transition-colors break-all">
                                                                {college.contactInfo.email}
                                                            </a>
                                                        </div>
                                                    </div>
                                                )}

                                                {college.contactInfo.website && (
                                                    <div className="flex items-start gap-3">
                                                        <Globe className="h-4 w-4 text-primary mt-1 shrink-0" />
                                                        <div>
                                                            <p className="text-xs font-semibold text-muted-foreground uppercase">Website</p>
                                                            <a
                                                                href={college.contactInfo.website}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-sm font-medium text-blue-600 hover:underline break-all"
                                                            >
                                                                {college.contactInfo.website.replace(/^https?:\/\//, '')}
                                                            </a>
                                                        </div>
                                                    </div>
                                                )}

                                                {college.contactInfo.address && (
                                                    <div className="flex items-start gap-3 md:col-span-2">
                                                        <MapPin className="h-4 w-4 text-primary mt-1 shrink-0" />
                                                        <div>
                                                            <p className="text-xs font-semibold text-muted-foreground uppercase">Address</p>
                                                            <p className="text-sm font-medium text-foreground/80">
                                                                {college.contactInfo.address}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Google Maps Link */}
                                {college.googleMapsUrl && (
                                    <div className="pt-4 border-t">
                                        <a
                                            href={college.googleMapsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block"
                                        >
                                            <Button className="w-full md:w-auto" size="lg">
                                                <Navigation className="mr-2 h-5 w-5" />
                                                Visit College Location
                                            </Button>
                                        </a>
                                        <p className="text-xs text-muted-foreground mt-2">
                                            Opens in Google Maps for directions and navigation
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="lg:col-span-1 space-y-6">
                                <Card className="shadow-md">
                                    <CardHeader>
                                        <CardTitle className="text-xl font-headline flex items-center gap-2"><BookOpen className="h-5 w-5 text-primary" /> Courses Offered</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex flex-wrap gap-2">
                                        {college.courses.map(course => <Badge key={course} variant="outline" className="text-sm">{course}</Badge>)}
                                    </CardContent>
                                </Card>

                                {college.fee && (
                                    <Card className="shadow-md">
                                        <CardHeader>
                                            <CardTitle className="text-xl font-headline flex items-center gap-2"><HandCoins className="h-5 w-5 text-primary" /> Fee Structure</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground">{college.fee}</p>
                                        </CardContent>
                                    </Card>
                                )}

                                {college.eligibility && (
                                    <Card className="shadow-md">
                                        <CardHeader>
                                            <CardTitle className="text-xl font-headline flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Eligibility</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground">{college.eligibility}</p>
                                        </CardContent>
                                    </Card>
                                )}


                                {college.cutoff && (
                                    <Card className="shadow-md">
                                        <CardHeader>
                                            <CardTitle className="text-xl font-headline flex items-center gap-2"><Target className="h-5 w-5 text-primary" /> Admission Cut-off</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground">{college.cutoff}</p>
                                        </CardContent>
                                    </Card>
                                )}

                                {college.scholarships && (
                                    <Card className="shadow-md">
                                        <CardHeader>
                                            <CardTitle className="text-xl font-headline flex items-center gap-2"><School2 className="h-5 w-5 text-primary" /> Scholarships</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground">{college.scholarships}</p>
                                        </CardContent>
                                    </Card>
                                )}

                                {college.facilities && college.facilities.length > 0 && (
                                    <Card className="shadow-md">
                                        <CardHeader>
                                            <CardTitle className="text-xl font-headline">Facilities</CardTitle>
                                        </CardHeader>
                                        <CardContent className="grid grid-cols-2 gap-2">
                                            {college.facilities.map(facility => (
                                                <div key={facility} className="flex items-center text-sm text-muted-foreground">
                                                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                                    {facility}
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
