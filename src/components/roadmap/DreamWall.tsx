'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, PenTool, Image as ImageIcon, Save } from 'lucide-react';
import { useRoadmap } from './RoadmapContext';
import { motion } from 'framer-motion';

export function DreamWall() {
    const { state } = useRoadmap();
    const [journalEntry, setJournalEntry] = useState('');
    const [isSaved, setIsSaved] = useState(false);

    const handleSaveJournal = () => {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    return (
        <div className="space-y-6">
            {/* Personality Tagline */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl text-white shadow-lg"
            >
                <Sparkles className="h-8 w-8 mx-auto mb-2 text-yellow-300 animate-pulse" />
                <h2 className="text-3xl font-bold mb-1">"{state.personalityTagline}"</h2>
                <p className="text-white/80 text-sm">Your Unique Career Identity</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Daily Journal */}
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <PenTool className="h-5 w-5 text-primary" />
                            Daily Learning Journal
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Textarea
                            placeholder="What did you learn today? Even a small step counts..."
                            className="min-h-[150px] resize-none mb-4 bg-secondary/20"
                            value={journalEntry}
                            onChange={(e) => setJournalEntry(e.target.value)}
                        />
                        <Button onClick={handleSaveJournal} className="w-full" disabled={!journalEntry}>
                            {isSaved ? (
                                <span className="flex items-center gap-2">Saved <Save className="h-4 w-4" /></span>
                            ) : (
                                "Save Entry"
                            )}
                        </Button>
                    </CardContent>
                </Card>

                {/* Dream Poster */}
                <Card className="h-full overflow-hidden relative group cursor-pointer">
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <Button variant="secondary" className="gap-2">
                            <ImageIcon className="h-4 w-4" />
                            Customize Poster
                        </Button>
                    </div>
                    <CardContent className="p-0 h-full min-h-[250px] bg-slate-900 flex flex-col items-center justify-center text-center text-white p-6 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center">
                        <div className="bg-black/50 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                            <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                                FUTURE {state.careerGoal.toUpperCase()}
                            </h3>
                            <p className="text-sm text-gray-300 italic">
                                "The future belongs to those who believe in the beauty of their dreams."
                            </p>
                            <div className="mt-4 text-xs text-gray-400">
                                Target Year: 2029
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
