import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator } from 'lucide-react';

export function CollegeCostCalculator() {
    const [tuition, setTuition] = useState(50000);
    const [hostel, setHostel] = useState(40000);
    const [books, setBooks] = useState(10000);
    const [misc, setMisc] = useState(20000);
    const [years, setYears] = useState(4);

    const yearlyTotal = tuition + hostel + books + misc;
    const totalCost = yearlyTotal * years;

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
            <CardContent className="space-y-4">
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
                    <div>
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

                <div className="border-t pt-4 space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Yearly Total:</span>
                        <span className="font-semibold">Rs {yearlyTotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-500 to-rose-500 rounded-lg text-white">
                        <span className="text-lg font-semibold">Total {years}-Year Cost:</span>
                        <span className="text-2xl font-bold">Rs {totalCost.toLocaleString('en-IN')}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
