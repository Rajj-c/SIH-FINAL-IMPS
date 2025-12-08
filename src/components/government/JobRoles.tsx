'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Award, TrendingUp } from 'lucide-react';
import { jobRoles } from '@/lib/data/government-exams';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function JobRoles() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Briefcase className="h-6 w-6 text-primary" />
                    Popular Job Roles
                </h2>
                <p className="text-muted-foreground">Explore prestigious government positions</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {jobRoles.map((role) => (
                    <Card key={role.id} className="overflow-hidden">
                        <CardHeader className="bg-secondary/20 pb-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-xl">{role.title}</CardTitle>
                                    <CardDescription className="mt-1 font-medium text-primary">
                                        {role.department}
                                    </CardDescription>
                                </div>
                                <div className="flex flex-col gap-1 items-end">
                                    {role.examRequired.map(exam => (
                                        <Badge key={exam} variant="secondary" className="text-xs">
                                            {exam}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-4">
                            <p className="text-sm text-muted-foreground">
                                {role.description}
                            </p>

                            <div className="flex items-center gap-2 text-sm font-medium">

                                <span>{role.salary}</span>
                            </div>

                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="perks">
                                    <AccordionTrigger className="text-sm py-2">Perks & Benefits</AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                            {role.perks.map((perk, i) => (
                                                <li key={i}>{perk}</li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="growth">
                                    <AccordionTrigger className="text-sm py-2">Career Growth</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                                            {role.promotionPath.map((promo, i) => (
                                                <span key={i} className="flex items-center">
                                                    {promo}
                                                    {i < role.promotionPath.length - 1 && (
                                                        <TrendingUp className="h-3 w-3 mx-2 text-primary/50" />
                                                    )}
                                                </span>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
