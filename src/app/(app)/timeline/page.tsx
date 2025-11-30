'use client';

import { timelineEvents } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, AlertCircle, Bell, CalendarPlus, Search, Filter, ArrowRight, GraduationCap, Trophy, BookOpen } from 'lucide-react';
import { format, parseISO, isPast, differenceInDays } from 'date-fns';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function TimelinePage() {
  const { userProfile } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedClass, setSelectedClass] = useState<string>(userProfile?.classLevel || '12');
  const [selectedStream, setSelectedStream] = useState<string>('All');

  const filteredEvents = useMemo(() => {
    return timelineEvents
      .filter(event => {
        // Search filter
        if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase()) && !event.description.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }
        // Category filter
        if (selectedCategory !== 'all' && event.category.toLowerCase() !== selectedCategory) {
          return false;
        }
        // Class filter
        if (event.targetClass && event.targetClass !== selectedClass) {
          return false;
        }
        // Stream filter (only for Class 12)
        if (selectedClass === '12' && event.targetStream && event.targetStream !== 'All' && selectedStream !== 'All' && event.targetStream !== selectedStream) {
          return false;
        }
        return true;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [searchQuery, selectedCategory, selectedClass, selectedStream]);

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'Admission': return {
        badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800',
        icon: GraduationCap,
        color: 'text-blue-600 dark:text-blue-400',
        bg: 'bg-blue-100 dark:bg-blue-900/20'
      };
      case 'Scholarship': return {
        badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
        icon: Trophy,
        color: 'text-emerald-600 dark:text-emerald-400',
        bg: 'bg-emerald-100 dark:bg-emerald-900/20'
      };
      case 'Exam': return {
        badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800',
        icon: BookOpen,
        color: 'text-amber-600 dark:text-amber-400',
        bg: 'bg-amber-100 dark:bg-amber-900/20'
      };
      default: return {
        badge: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700',
        icon: CalendarDays,
        color: 'text-gray-600 dark:text-gray-400',
        bg: 'bg-gray-100 dark:bg-gray-800'
      };
    }
  };

  const addToGoogleCalendar = (event: typeof timelineEvents[0]) => {
    const startDate = new Date(event.date).toISOString().replace(/-|:|\.\d\d\d/g, "");
    const endDate = new Date(new Date(event.date).getTime() + 60 * 60 * 1000).toISOString().replace(/-|:|\.\d\d\d/g, ""); // 1 hour duration

    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(event.description)}`;
    window.open(url, '_blank');
  };

  const enableNotification = (event: typeof timelineEvents[0]) => {
    if (!("Notification" in window)) {
      toast({
        title: "Error",
        description: "This browser does not support desktop notification",
        variant: "destructive",
      });
    } else if (Notification.permission === "granted") {
      new Notification(`Reminder set for ${event.title}`);
      toast({
        title: "Reminder Set",
        description: `Reminder set for ${event.title}`,
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          new Notification(`Reminder set for ${event.title}`);
          toast({
            title: "Reminder Set",
            description: `Reminder set for ${event.title}`,
          });
        }
      });
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-5xl min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center space-y-4"
      >
        <div className="inline-block p-2 rounded-2xl bg-primary/5 mb-4">
          <Badge variant="outline" className="px-4 py-1 text-sm border-primary/20 bg-background text-primary">
            Academic Year 2025-26
          </Badge>
        </div>
        <h1 className="text-5xl font-bold font-headline bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Timeline Tracker
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
          Your personal roadmap to success. Track exams, admissions, and scholarships with precision.
        </p>
      </motion.div>

      {/* Filters Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="mb-12 border-none shadow-xl bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl ring-1 ring-white/20 dark:ring-white/5">
          <CardContent className="pt-8 pb-8">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              <div className="flex flex-col sm:flex-row w-full gap-4">
                <div className="relative flex-1 group">
                  <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    placeholder="Search events..."
                    className="pl-10 h-10 bg-background/50 border-muted-foreground/20 focus:border-primary/50 transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-4">
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-[140px] h-10 bg-background/50 border-muted-foreground/20">
                      <SelectValue placeholder="Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">Class 10</SelectItem>
                      <SelectItem value="12">Class 12</SelectItem>
                    </SelectContent>
                  </Select>
                  {selectedClass === '12' && (
                    <Select value={selectedStream} onValueChange={setSelectedStream}>
                      <SelectTrigger className="w-[140px] h-10 bg-background/50 border-muted-foreground/20">
                        <SelectValue placeholder="Stream" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Streams</SelectItem>
                        <SelectItem value="Science">Science</SelectItem>
                        <SelectItem value="Commerce">Commerce</SelectItem>
                        <SelectItem value="Arts">Arts</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
                <TabsList className="w-full sm:w-auto grid grid-cols-2 sm:grid-cols-4 bg-muted/50 p-1 rounded-xl">
                  <TabsTrigger value="all" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">All Events</TabsTrigger>
                  <TabsTrigger value="exam" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">Exams</TabsTrigger>
                  <TabsTrigger value="admission" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">Admissions</TabsTrigger>
                  <TabsTrigger value="scholarship" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">Scholarships</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Timeline */}
      <div className="relative pl-8 space-y-12">
        {/* Vertical Line with Gradient */}
        <div className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-primary/80 via-purple-500/50 to-transparent rounded-full" />

        <AnimatePresence mode="popLayout">
          {filteredEvents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-20"
            >
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
                <Filter className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No events found</h3>
              <p className="text-muted-foreground">Try adjusting your filters to see more events.</p>
            </motion.div>
          ) : (
            filteredEvents.map((event, index) => {
              const eventDate = parseISO(event.date);
              const hasPassed = isPast(eventDate);
              const daysLeft = differenceInDays(eventDate, new Date());
              const styles = getCategoryStyles(event.category);
              const Icon = styles.icon;

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Timeline Node */}
                  <div className="absolute left-[-21px] top-6 z-10">
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center border-2 border-background shadow-md transition-all duration-300 group-hover:scale-110 ${hasPassed ? 'bg-muted text-muted-foreground' : 'bg-primary text-primary-foreground'}`}>
                      <div className="h-2 w-2 rounded-full bg-current" />
                    </div>
                  </div>

                  <Card className={`ml-6 transition-all duration-300 border-l-4 ${hasPassed ? 'opacity-70 bg-muted/20 border-l-muted' : 'hover:shadow-xl hover:-translate-y-1 bg-card border-l-primary'} overflow-hidden`}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start gap-6">
                        {/* Date Box */}
                        <div className={`flex flex-col items-center justify-center min-w-[80px] p-3 rounded-xl border ${hasPassed ? 'bg-muted/50 border-muted' : 'bg-primary/5 border-primary/10'}`}>
                          <span className="text-2xl font-bold font-headline">{format(eventDate, 'dd')}</span>
                          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{format(eventDate, 'MMM')}</span>
                          <span className="text-xs text-muted-foreground/70">{format(eventDate, 'yyyy')}</span>
                        </div>

                        <div className="flex-1 space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <CardTitle className={`text-xl font-bold font-headline ${hasPassed ? 'text-muted-foreground decoration-line-through' : ''}`}>
                                  {event.title}
                                </CardTitle>
                                {event.link && (
                                  <a
                                    href={event.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                                    title="Visit Official Website"
                                  >
                                    <ArrowRight className="h-3 w-3 -rotate-45" />
                                  </a>
                                )}
                              </div>
                              <div className="flex flex-wrap items-center gap-2 text-sm">
                                <Badge variant="outline" className={`${styles.badge} border`}>
                                  <Icon className="h-3 w-3 mr-1" />
                                  {event.category}
                                </Badge>
                                {!hasPassed && daysLeft <= 30 && daysLeft > 0 && (
                                  <Badge variant="destructive" className="animate-pulse">
                                    Closing Soon
                                  </Badge>
                                )}
                              </div>
                            </div>

                            {!hasPassed ? (
                              <div className="text-right">
                                <span className="text-2xl font-bold text-primary">{daysLeft}</span>
                                <span className="text-xs text-muted-foreground block">days left</span>
                              </div>
                            ) : (
                              <Badge variant="secondary" className="bg-muted text-muted-foreground">
                                Completed
                              </Badge>
                            )}
                          </div>

                          <p className="text-muted-foreground leading-relaxed">
                            {event.description}
                          </p>

                          {!hasPassed && (
                            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/50 mt-4">
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                                onClick={() => addToGoogleCalendar(event)}
                              >
                                <CalendarPlus className="h-4 w-4" />
                                Add to Calendar
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="gap-2 text-muted-foreground hover:text-primary"
                                onClick={() => enableNotification(event)}
                              >
                                <Bell className="h-4 w-4" />
                                Remind Me
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
