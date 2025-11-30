'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Calendar, ExternalLink, Clock, AlertCircle, FileText, DollarSign } from 'lucide-react';
import { admissionEvents, getPersonalizedEvents, type AdmissionEvent } from '@/lib/admission-calendar-data';
import { ParentOnboardingData } from '@/lib/types';

interface AdmissionAlertsProps {
    onboardingData?: ParentOnboardingData;
    recommendedStreams?: string[];
}

export function AdmissionAlerts({ onboardingData, recommendedStreams }: AdmissionAlertsProps) {
    const [selectedType, setSelectedType] = useState<'all' | AdmissionEvent['type']>('all');
    const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

    // Get personalized events
    const events = useMemo(() => {
        if (onboardingData?.childClass) {
            return getPersonalizedEvents(
                onboardingData.childClass,
                recommendedStreams,
                onboardingData.location?.state
            ).slice(0, 8); // Show top 8 events
        }
        return admissionEvents.slice(0, 8);
    }, [onboardingData, recommendedStreams]);

    // Filter by type
    const filteredEvents = selectedType === 'all'
        ? events
        : events.filter(e => e.type === selectedType);

    // Calculate days remaining
    const getDaysRemaining = (date: Date) => {
        const today = new Date();
        const eventDate = new Date(date);
        const diffTime = eventDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const getUrgencyColor = (urgency: 'High' | 'Medium' | 'Low') => {
        switch (urgency) {
            case 'High': return 'bg-red-100 text-red-700 border-red-200';
            case 'Medium': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'Low': return 'bg-green-100 text-green-700 border-green-200';
        }
    };

    const getTypeIcon = (type: AdmissionEvent['type']) => {
        switch (type) {
            case 'Exam': return '📖';
            case 'Application': return '📝';
            case 'Counseling': return '🎓';
            case 'Scholarship': return '💰';
            case 'Document': return '📄';
            case 'Registration': return '📋';
        }
    };

    return (
        <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg">
                        <Bell className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                        <CardTitle>Admission Alerts & Important Dates</CardTitle>
                        <CardDescription>Don't miss these deadlines</CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2">
                    <Button
                        variant={selectedType === 'all' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedType('all')}
                    >
                        All ({events.length})
                    </Button>
                    <Button
                        variant={selectedType === 'Exam' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedType('Exam')}
                    >
                        📖 Exams
                    </Button>
                    <Button
                        variant={selectedType === 'Scholarship' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedType('Scholarship')}
                    >
                        💰 Scholarships
                    </Button>
                    <Button
                        variant={selectedType === 'Counseling' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedType('Counseling')}
                    >
                        🎓 Counseling
                    </Button>
                </div>

                {/* Events List */}
                <div className="space-y-3">
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => {
                            const daysLeft = getDaysRemaining(event.dates.end);
                            const isExpanded = expandedEvent === event.id;

                            return (
                                <div
                                    key={event.id}
                                    className={`border rounded-lg overflow-hidden transition-all ${event.urgency === 'High' ? 'border-red-300' : ''
                                        }`}
                                >
                                    {/* Event Header */}
                                    <div
                                        className="p-3 cursor-pointer hover:bg-secondary/50 transition-colors"
                                        onClick={() => setExpandedEvent(isExpanded ? null : event.id)}
                                    >
                                        <div className="flex items-start gap-3">
                                            <span className="text-2xl">{getTypeIcon(event.type)}</span>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2 mb-1">
                                                    <h4 className="font-semibold text-sm line-clamp-1">{event.title}</h4>
                                                    <Badge
                                                        variant="outline"
                                                        className={`text-xs shrink-0 ${getUrgencyColor(event.urgency)}`}
                                                    >
                                                        {event.urgency}
                                                    </Badge>
                                                </div>
                                                <p className="text-xs text-muted-foreground mb-2">{event.institution}</p>

                                                <div className="flex flex-wrap items-center gap-2 text-xs">
                                                    <span className="flex items-center gap-1 text-muted-foreground">
                                                        <Calendar className="h-3 w-3" />
                                                        {new Date(event.dates.end).toLocaleDateString('en-IN', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        })}
                                                    </span>
                                                    {daysLeft > 0 ? (
                                                        <Badge variant="secondary" className="text-xs">
                                                            <Clock className="h-3 w-3 mr-1" />
                                                            {daysLeft} days left
                                                        </Badge>
                                                    ) : daysLeft === 0 ? (
                                                        <Badge variant="destructive" className="text-xs">
                                                            <AlertCircle className="h-3 w-3 mr-1" />
                                                            Last day
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="outline" className="text-xs opacity-60">
                                                            Closed
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expanded Details */}
                                    {isExpanded && (
                                        <div className="px-3 pb-3 space-y-2 border-t bg-secondary/20">
                                            <div className="pt-2">
                                                <p className="text-xs text-muted-foreground">{event.details}</p>
                                            </div>

                                            {event.fees && (
                                                <div className="flex items-center gap-2 text-xs">
                                                    <DollarSign className="h-3 w-3 text-green-500" />
                                                    <span className="font-medium">Fees:</span>
                                                    <span className="text-muted-foreground">{event.fees}</span>
                                                </div>
                                            )}

                                            {event.documentsRequired && event.documentsRequired.length > 0 && (
                                                <div>
                                                    <div className="flex items-center gap-2 text-xs font-medium mb-1">
                                                        <FileText className="h-3 w-3" />
                                                        Required Documents:
                                                    </div>
                                                    <ul className="space-y-0.5 ml-5">
                                                        {event.documentsRequired.slice(0, 5).map((doc, idx) => (
                                                            <li key={idx} className="text-xs text-muted-foreground">
                                                                • {doc}
                                                            </li>
                                                        ))}
                                                        {event.documentsRequired.length > 5 && (
                                                            <li className="text-xs text-muted-foreground">
                                                                • +{event.documentsRequired.length - 5} more documents
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>
                                            )}

                                            {event.link && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="w-full mt-2"
                                                    asChild
                                                >
                                                    <a href={event.link} target="_blank" rel="noopener noreferrer">
                                                        <ExternalLink className="h-3 w-3 mr-2" />
                                                        Official Website
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-center text-sm text-muted-foreground py-8">
                            No {selectedType !== 'all' ? selectedType.toLowerCase() : ''} events found
                        </p>
                    )}
                </div>

                {/* Help Text */}
                {!onboardingData?.childClass && (
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200">
                        <p className="text-xs text-blue-700 dark:text-blue-300">
                            💡 Complete onboarding to see personalized admission alerts based on your child's class and interests
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
