import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator } from 'lucide-react';

export function EMICalculator() {
    const [loanAmount, setLoanAmount] = useState(500000);
    const [interestRate, setInterestRate] = useState(8.5);
    const [tenure, setTenure] = useState(5);

    // EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
    const monthlyRate = interestRate / 12 / 100;
    const months = tenure * 12;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayment = emi * months;
    const totalInterest = totalPayment - loanAmount;

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-blue-500" />
                    <div>
                        <CardTitle>Education Loan EMI Calculator</CardTitle>
                        <CardDescription>Calculate monthly loan payments</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between mb-2">
                            <Label>Loan Amount</Label>
                            <span className="text-sm font-semibold">Rs {loanAmount.toLocaleString('en-IN')}</span>
                        </div>
                        <Input
                            type="range"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(Number(e.target.value))}
                            min="50000"
                            max="5000000"
                            step="10000"
                            className="w-full"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between mb-2">
                            <Label>Interest Rate (% per annum)</Label>
                            <span className="text-sm font-semibold">{interestRate}%</span>
                        </div>
                        <Input
                            type="range"
                            value={interestRate}
                            onChange={(e) => setInterestRate(Number(e.target.value))}
                            min="5"
                            max="15"
                            step="0.5"
                            className="w-full"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between mb-2">
                            <Label>Loan Tenure (Years)</Label>
                            <span className="text-sm font-semibold">{tenure} years</span>
                        </div>
                        <Input
                            type="range"
                            value={tenure}
                            onChange={(e) => setTenure(Number(e.target.value))}
                            min="1"
                            max="15"
                            step="1"
                            className="w-full"
                        />
                    </div>
                </div>

                <div className="border-t pt-4 space-y-3">
                    <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-white">
                        <div className="text-sm opacity-90 mb-1">Monthly EMI</div>
                        <div className="text-3xl font-bold">Rs {Math.round(emi).toLocaleString('en-IN')}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="p-3 bg-muted rounded">
                            <div className="text-muted-foreground mb-1">Principal Amount</div>
                            <div className="font-semibold">Rs {loanAmount.toLocaleString('en-IN')}</div>
                        </div>
                        <div className="p-3 bg-muted rounded">
                            <div className="text-muted-foreground mb-1">Total Interest</div>
                            <div className="font-semibold text-orange-600">Rs {Math.round(totalInterest).toLocaleString('en-IN')}</div>
                        </div>
                    </div>

                    <div className="p-3 border rounded">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Total Payment:</span>
                            <span className="font-bold text-lg">Rs {Math.round(totalPayment).toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
