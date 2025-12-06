'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type RoadmapItemType = 'course' | 'skill' | 'project' | 'certification' | 'internship' | 'exam';

export interface RoadmapItem {
    id: string;
    type: RoadmapItemType;
    title: string;
    status: 'pending' | 'in-progress' | 'completed';
    dueDate?: string;
    isAutomated?: boolean; // If true, added by the system based on career goal
}

export interface YearData {
    year: number;
    title: string; // e.g., "Foundation Year", "Skill Building"
    items: RoadmapItem[];
}

export interface RoadmapState {
    careerGoal: string; // e.g., "Software Engineer"
    courseId: string; // e.g., "btech-cs"
    years: YearData[];
    monthlyMilestones: { month: string; task: string; completed: boolean }[];
    skills: { name: string; acquired: boolean }[];
    selectedYear: number;
    savedColleges: string[];
    personalityTagline: string;
}

interface RoadmapContextType {
    state: RoadmapState;
    setCareerGoal: (goal: string) => void;
    setSelectedYear: (year: number) => void;
    addItemToYear: (year: number, item: Omit<RoadmapItem, 'id' | 'status'>) => void;
    toggleItemStatus: (year: number, itemId: string) => void;
    addSkill: (skill: string) => void;
    toggleSkill: (skillName: string) => void;
    saveCollege: (collegeName: string) => void;
    updateMonthlyMilestone: (index: number, completed: boolean) => void;
    addMonthlyMilestone: (task: string, month: string) => void;
    setCourseId: (id: string) => void;
}

const defaultState: RoadmapState = {
    careerGoal: 'Software Engineer', // Default for now
    courseId: 'btech-cs',
    selectedYear: 2025,
    years: [
        { year: 2025, title: 'Foundation Year', items: [] },
        { year: 2026, title: 'Skill Building', items: [] },
        { year: 2027, title: 'Advanced Concepts', items: [] },
        { year: 2028, title: 'Professional Readiness', items: [] },
    ],
    monthlyMilestones: [
        { month: 'April', task: 'Finish Excel basics', completed: false },
        { month: 'May', task: 'Complete resume draft', completed: false },
        { month: 'June', task: 'Apply for scholarships', completed: false },
    ],
    skills: [],
    savedColleges: [],
    personalityTagline: 'Visionary Planner',
};

const RoadmapContext = createContext<RoadmapContextType | undefined>(undefined);

import { CAREER_PATHS } from '@/lib/suggested-tasks';

export function RoadmapProvider({ children, initialGoal, initialCourseId }: { children: React.ReactNode, initialGoal?: string, initialCourseId?: string }) {
    const [state, setState] = useState<RoadmapState>(defaultState);

    // Initialize or Reset based on props
    useEffect(() => {
        // If we have an initial goal/courseId, and it's different from current state, update it
        if (initialCourseId && initialGoal) {
            const savedState = localStorage.getItem('roadmapState');
            let shouldReset = true;

            if (savedState) {
                const parsed = JSON.parse(savedState);
                // Only reset if the saved goal is different from the new recommendation
                // OR if the saved state is the default "Software Engineer" but the user is not one
                if (parsed.careerGoal === initialGoal) {
                    shouldReset = false;
                    setState(parsed);
                }
            }

            if (shouldReset) {
                resetRoadmap(initialGoal, initialCourseId);
            }
        } else {
            // Load from local storage if no props (fallback)
            const saved = localStorage.getItem('roadmapState');
            if (saved) {
                try {
                    setState(JSON.parse(saved));
                } catch (e) {
                    console.error('Failed to load roadmap state', e);
                }
            }
        }
    }, [initialGoal, initialCourseId]);

    // Save to localStorage on change
    useEffect(() => {
        localStorage.setItem('roadmapState', JSON.stringify(state));
    }, [state]);

    const resetRoadmap = (goal: string, courseId: string) => {
        const careerData = CAREER_PATHS[courseId] || CAREER_PATHS['generic'];
        const currentYear = new Date().getFullYear();

        const newYears = careerData.years.map(y => ({
            year: currentYear + y.yearOffset,
            title: y.title,
            items: [] // Start empty, tasks are in recommendations now
        }));

        const newState: RoadmapState = {
            careerGoal: goal,
            courseId: courseId,
            selectedYear: currentYear,
            years: newYears,
            monthlyMilestones: careerData.monthlyMilestones || [],
            skills: [],
            savedColleges: [],
            personalityTagline: 'Future Achiever', // Could be dynamic too
        };

        setState(newState);
    };

    const setCareerGoal = (goal: string) => {
        setState(prev => ({ ...prev, careerGoal: goal }));
    };

    const setCourseId = (id: string) => {
        setState(prev => ({ ...prev, courseId: id }));
    };

    const setSelectedYear = (year: number) => {
        setState(prev => ({ ...prev, selectedYear: year }));
    };

    const addItemToYear = (year: number, item: Omit<RoadmapItem, 'id' | 'status'>) => {
        setState(prev => {
            const newYears = prev.years.map(y => {
                if (y.year === year) {
                    return {
                        ...y,
                        items: [...y.items, { ...item, id: Math.random().toString(36).substr(2, 9), status: 'pending' as const }]
                    };
                }
                return y;
            });
            return { ...prev, years: newYears };
        });
    };

    const toggleItemStatus = (year: number, itemId: string) => {
        setState(prev => {
            const newYears = prev.years.map(y => {
                if (y.year === year) {
                    return {
                        ...y,
                        items: y.items.map(item => {
                            if (item.id === itemId) {
                                const newStatus: RoadmapItem['status'] = item.status === 'completed' ? 'pending' : 'completed';
                                return { ...item, status: newStatus };
                            }
                            return item;
                        })
                    };
                }
                return y;
            });
            return { ...prev, years: newYears };
        });
    };

    const addSkill = (skill: string) => {
        if (!state.skills.find(s => s.name === skill)) {
            setState(prev => ({ ...prev, skills: [...prev.skills, { name: skill, acquired: false }] }));
        }
    };

    const toggleSkill = (skillName: string) => {
        setState(prev => ({
            ...prev,
            skills: prev.skills.map(s => s.name === skillName ? { ...s, acquired: !s.acquired } : s)
        }));
    };

    const saveCollege = (collegeName: string) => {
        if (!state.savedColleges.includes(collegeName)) {
            setState(prev => ({ ...prev, savedColleges: [...prev.savedColleges, collegeName] }));
        }
    };

    const updateMonthlyMilestone = (index: number, completed: boolean) => {
        setState(prev => {
            const newMilestones = [...prev.monthlyMilestones];
            newMilestones[index].completed = completed;
            return { ...prev, monthlyMilestones: newMilestones };
        });
    };

    const addMonthlyMilestone = (task: string, month: string) => {
        setState(prev => ({
            ...prev,
            monthlyMilestones: [...prev.monthlyMilestones, { month, task, completed: false }]
        }));
    };

    return (
        <RoadmapContext.Provider value={{
            state,
            setCareerGoal,
            setCourseId,
            setSelectedYear,
            addItemToYear,
            toggleItemStatus,
            addSkill,
            toggleSkill,
            saveCollege,
            updateMonthlyMilestone,
            addMonthlyMilestone
        }}>
            {children}
        </RoadmapContext.Provider>
    );
}

export function useRoadmap() {
    const context = useContext(RoadmapContext);
    if (context === undefined) {
        throw new Error('useRoadmap must be used within a RoadmapProvider');
    }
    return context;
}
