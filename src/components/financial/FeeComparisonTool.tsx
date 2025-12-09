import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BarChart3, Plus, X } from 'lucide-react';

interface CollegeComparison {
    id: number;
    name: string;
    tuition: number;
    hostel: number;
    placement: number;
}

export function FeeComparisonTool() {
    const [colleges, setColleges] = useState<CollegeComparison[]>([
        { id: 1, name: '', tuition: 0, hostel: 0, placement: 0 },
    ]);

    const addCollege = () => {
        setColleges([
            ...colleges,
            {
                id: Date.now(),
                name: '',
                tuition: 0,
                hostel: 0,
                placement: 0,
            },
        ]);
    };

    const searchParams = useSearchParams();
    const childUid = searchParams.get('child');

    useEffect(() => {
        async function loadChildColleges() {
            if (!childUid) return;

            try {
                const { getSavedColleges } = await import('@/lib/firebase/database');
                const saved = await getSavedColleges(childUid);

                if (saved.length > 0) {
                    const mapped = saved.map(c => {
                        const parseFee = (str?: string) => {
                            if (!str) return 0;
                            // Check for Lakhs
                            const isLakh = str.toLowerCase().includes('lakh') || str.toLowerCase().includes('lpa');
                            // Extract first number found
                            const match = str.replace(/,/g, '').match(/(\d+(\.\d+)?)/);
                            if (!match) return 0;
                            let val = parseFloat(match[0]);
                            if (isLakh) val *= 100000;
                            return val;
                        };

                        return {
                            id: Date.now() + Math.random(),
                            name: c.name,
                            tuition: parseFee(c.fee) || 50000,
                            hostel: parseFee(c.hostelFees || c.hostelInfo?.fees) || 60000,
                            placement: parseFee(c.averagePackage) / 100000 || 3.5 // Convert back to LPA for display
                        };
                    });
                    setColleges(mapped);
                }
            } catch (e) {
                console.error("Failed to load child colleges", e);
            }
        }
        loadChildColleges();
    }, [childUid]);

    const removeCollege = (id: number) => {
        if (colleges.length > 1) {
            setColleges(colleges.filter((c) => c.id !== id));
        }
    };

    const updateCollege = (id: number, field: keyof CollegeComparison, value: string | number) => {
        setColleges(
            colleges.map((c) => (c.id === id ? { ...c, [field]: value } : c))
        );
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-purple-500" />
                        <div>
                            <CardTitle>Fee Comparison Tool</CardTitle>
                            <CardDescription>Compare multiple colleges side-by-side</CardDescription>
                        </div>
                    </div>
                    <Button onClick={addCollege} size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-1" />
                        Add College
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left p-3 font-semibold">Parameter</th>
                                {colleges.map((college) => (
                                    <th key={college.id} className="p-3 min-w-[200px]">
                                        <div className="flex items-center justify-between gap-2">
                                            <Input
                                                placeholder="College Name"
                                                value={college.name}
                                                onChange={(e) => updateCollege(college.id, 'name', e.target.value)}
                                                className="font-normal"
                                            />
                                            {colleges.length > 1 && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeCollege(college.id)}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="p-3 font-medium">Annual Tuition (Rs)</td>
                                {colleges.map((college) => (
                                    <td key={college.id} className="p-3">
                                        <Input
                                            type="number"
                                            value={college.tuition}
                                            onChange={(e) => updateCollege(college.id, 'tuition', Number(e.target.value))}
                                            placeholder="0"
                                        />
                                    </td>
                                ))}
                            </tr>

                            <tr className="border-b">
                                <td className="p-3 font-medium">Annual Hostel (Rs)</td>
                                {colleges.map((college) => (
                                    <td key={college.id} className="p-3">
                                        <Input
                                            type="number"
                                            value={college.hostel}
                                            onChange={(e) => updateCollege(college.id, 'hostel', Number(e.target.value))}
                                            placeholder="0"
                                        />
                                    </td>
                                ))}
                            </tr>

                            <tr className="border-b bg-orange-50 dark:bg-orange-950/20">
                                <td className="p-3 font-semibold">Total 4-Year Cost (Rs)</td>
                                {colleges.map((college) => (
                                    <td key={college.id} className="p-3">
                                        <div className="text-lg font-bold text-orange-600">
                                            Rs {((college.tuition + college.hostel) * 4).toLocaleString('en-IN')}
                                        </div>
                                    </td>
                                ))}
                            </tr>

                            <tr className="border-b">
                                <td className="p-3 font-medium">Avg. Placement Package (Rs LPA)</td>
                                {colleges.map((college) => (
                                    <td key={college.id} className="p-3">
                                        <Input
                                            type="number"
                                            value={college.placement}
                                            onChange={(e) => updateCollege(college.id, 'placement', Number(e.target.value))}
                                            placeholder="0"
                                        />
                                    </td>
                                ))}
                            </tr>

                            <tr className="bg-blue-50 dark:bg-blue-950/20">
                                <td className="p-3 font-semibold">Cost Recovery Time</td>
                                {colleges.map((college) => {
                                    const totalCost = (college.tuition + college.hostel) * 4;
                                    const annualEarnings = college.placement * 100000;
                                    const yearsToRecover = annualEarnings > 0 ? (totalCost / annualEarnings).toFixed(1) : 'N/A';

                                    return (
                                        <td key={college.id} className="p-3">
                                            <div className="text-lg font-bold text-blue-600">
                                                {yearsToRecover === 'N/A' ? 'N/A' : `${yearsToRecover} Years`}
                                            </div>
                                            <div className="text-xs text-muted-foreground mt-1">
                                                to earn back fees
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}
