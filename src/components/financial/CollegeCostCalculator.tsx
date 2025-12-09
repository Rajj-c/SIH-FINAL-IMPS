import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, School } from 'lucide-react';
import { College } from '@/lib/types';

interface CollegeCostCalculatorProps {
    suggestedDuration?: number;
    suggestedCollege?: College;
}

export function CollegeCostCalculator({ suggestedDuration = 4, suggestedCollege }: CollegeCostCalculatorProps) {
    const [tuition, setTuition] = useState(50000);
    const [hostel, setHostel] = useState(40000);
    const [books, setBooks] = useState(10000);
    const [misc, setMisc] = useState(20000);
    const [years, setYears] = useState(suggestedDuration);

    // Update state when props change
    useEffect(() => {
        setYears(suggestedDuration);
    }, [suggestedDuration]);

    useEffect(() => {
        if (suggestedCollege) {
            const parseFee = (feeStr?: string) => {
                if (!feeStr) return 0;
                // Remove non-numeric characters except dots
                const numeric = feeStr.replace(/[^0-9.]/g, '');
                return Number(numeric) || 0;
            };

            if (suggestedCollege.fee) {
                setTuition(parseFee(suggestedCollege.fee));
            }

            const hostelFeeStr = suggestedCollege.hostelFees || suggestedCollege.hostelInfo?.fees;
            if (hostelFeeStr) {
                setHostel(parseFee(hostelFeeStr));
            }
        }
    }, [suggestedCollege]);

    const yearlyTotal = tuition + hostel + books + misc;
    const totalCost = yearlyTotal * years;

    const BreakdownRow = ({ label, value, isTotal = false }: { label: string, value: number, isTotal?: boolean }) => (
        <div className={`flex justify-between items-center py-2 ${isTotal ? 'font-bold text-lg pt-4 border-t' : 'text-sm'}`}>
            <span className={isTotal ? '' : 'text-muted-foreground'}>{label}</span>
            <div className="text-right">
                <div className={isTotal ? '' : 'font-medium'}>Rs {value.toLocaleString('en-IN')} / yr</div>
                <div className={`text-xs ${isTotal ? 'text-base mt-1 text-orange-600' : 'text-muted-foreground'}`}>
                    Total ({years}y): Rs {(value * years).toLocaleString('en-IN')}
                </div>
            </div>
        </div>
    );

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-orange-500" />
                    <div>
                        <CardTitle>College Cost Calculator</CardTitle>
                        <CardDescription>Estimate total education expenses</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {suggestedCollege && (
                    <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg p-4 flex gap-3">
                        <School className="h-5 w-5 text-orange-600 dark:text-orange-500 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                            <h4 className="font-semibold text-sm text-orange-800 dark:text-orange-400">
                                Estimating for {suggestedCollege.name}
                            </h4>
                            <p className="text-xs text-orange-700 dark:text-orange-500">
                                We've pre-filled the tuition and hostel fees based on the college data. Please adjust Books & Misc expenses as needed.
                            </p>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label>Annual Tuition Fee (Rs)</Label>
                        <Input
                            type="number"
                            value={tuition}
                            onChange={(e) => setTuition(Number(e.target.value))}
                            min="0"
                        />
                    </div>
                    <div>
                        <Label>Annual Hostel Fee (Rs)</Label>
                        <Input
                            type="number"
                            value={hostel}
                            onChange={(e) => setHostel(Number(e.target.value))}
                            min="0"
                        />
                    </div>
                    <div>
                        <Label>Annual Books & Materials (Rs)</Label>
                        <Input
                            type="number"
                            value={books}
                            onChange={(e) => setBooks(Number(e.target.value))}
                            min="0"
                        />
                    </div>
                    <div>
                        <Label>Annual Miscellaneous (Rs)</Label>
                        <Input
                            type="number"
                            value={misc}
                            onChange={(e) => setMisc(Number(e.target.value))}
                            min="0"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <Label>Course Duration (Years)</Label>
                        <Input
                            type="number"
                            value={years}
                            onChange={(e) => setYears(Number(e.target.value))}
                            min="1"
                            max="6"
                        />
                    </div>
                </div>

                <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-900/50">
                    <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-muted-foreground">Detailed Cost Breakdown</h3>
                    <div className="space-y-1">
                        <BreakdownRow label="Tuition Fees" value={tuition} />
                        <BreakdownRow label="Hostel & Accommodation" value={hostel} />
                        <BreakdownRow label="Books & Materials" value={books} />
                        <BreakdownRow label="Miscellaneous / Other" value={misc} />
                        <BreakdownRow label="Total Estimated Cost" value={yearlyTotal} isTotal />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
