'use client';

import { Slider } from '@/components/ui/slider';
import { useState } from 'react';

interface SliderQuestionProps {
    value?: number;
    onChange: (value: number) => void;
    minLabel?: string;
    maxLabel?: string;
    min?: number;
    max?: number;
}

export function SliderQuestion({
    value = 5,
    onChange,
    minLabel = 'Not at all',
    maxLabel = 'Very much',
    min = 1,
    max = 10
}: SliderQuestionProps) {
    const [currentValue, setCurrentValue] = useState(value);

    const handleChange = (newValue: number[]) => {
        setCurrentValue(newValue[0]);
        onChange(newValue[0]);
    };

    const getColorForValue = (val: number) => {
        const percentage = ((val - min) / (max - min)) * 100;
        if (percentage < 33) return 'text-red-500';
        if (percentage < 67) return 'text-yellow-500';
        return 'text-green-500';
    };

    return (
        <div className="space-y-6">
            {/* Current Value Display */}
            <div className="text-center">
                <div className={`text-6xl font-bold ${getColorForValue(currentValue)} transition-colors`}>
                    {currentValue}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                    {currentValue <= 3 && minLabel}
                    {currentValue > 3 && currentValue < 8 && 'Moderate'}
                    {currentValue >= 8 && maxLabel}
                </p>
            </div>

            {/* Slider */}
            <div className="px-4">
                <Slider
                    value={[currentValue]}
                    onValueChange={handleChange}
                    min={min}
                    max={max}
                    step={1}
                    className="w-full"
                />
            </div>

            {/* Labels */}
            <div className="flex justify-between text-sm text-muted-foreground px-2">
                <span>{minLabel}</span>
                <span>{maxLabel}</span>
            </div>

            {/* Visual Indicator Dots */}
            <div className="flex justify-between px-2">
                {Array.from({ length: max - min + 1 }, (_, i) => i + min).map((num) => (
                    <div
                        key={num}
                        className={`
              w-2 h-2 rounded-full transition-all duration-200
              ${currentValue === num
                                ? 'bg-primary scale-150'
                                : currentValue > num
                                    ? 'bg-primary/40'
                                    : 'bg-muted'
                            }
            `}
                    />
                ))}
            </div>
        </div>
    );
}
