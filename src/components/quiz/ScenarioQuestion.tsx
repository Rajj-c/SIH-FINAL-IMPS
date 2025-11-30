'use client';

import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export interface Scenario {
    id: string;
    icon: string;
    title: string;
    description: string;
}

interface ScenarioQuestionProps {
    scenarios: Scenario[];
    selectedId?: string;
    onSelect: (id: string) => void;
}

export function ScenarioQuestion({ scenarios, selectedId, onSelect }: ScenarioQuestionProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {scenarios.map((scenario) => {
                const isSelected = selectedId === scenario.id;

                return (
                    <motion.div
                        key={scenario.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Card
                            className={`
                cursor-pointer transition-all duration-200 relative overflow-hidden
                ${isSelected
                                    ? 'border-primary border-2 shadow-lg bg-primary/5'
                                    : 'border-2 hover:border-primary/50 hover:shadow-md'
                                }
              `}
                            onClick={() => onSelect(scenario.id)}
                        >
                            {isSelected && (
                                <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                                    <Check className="h-4 w-4" />
                                </div>
                            )}
                            <CardContent className="p-6 text-center space-y-3">
                                <div className="text-6xl mb-4">{scenario.icon}</div>
                                <h4 className="font-semibold text-lg">{scenario.title}</h4>
                                <p className="text-sm text-muted-foreground leading-snug">
                                    {scenario.description}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                );
            })}
        </div>
    );
}
