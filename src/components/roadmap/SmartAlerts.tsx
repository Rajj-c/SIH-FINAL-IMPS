'use client';

import React from 'react';
import { Bell, AlertCircle, Calendar } from 'lucide-react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export function SmartAlerts() {
    // Mock alerts
    const alerts = [
        {
            id: 1,
            title: "Scholarship Deadline",
            message: "National Merit Scholarship closes in 5 days.",
            type: "urgent",
            date: "Oct 15"
        },
        {
            id: 2,
            title: "Exam Registration",
            message: "JEE Main registration starts next week.",
            type: "info",
            date: "Nov 01"
        },
        {
            id: 3,
            title: "Goal Reminder",
            message: "You haven't updated your 'Skill Building' goal this month.",
            type: "warning",
            date: "Today"
        }
    ];

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <Bell className="h-4 w-4" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-background" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
                <div className="p-4 border-b bg-secondary/10">
                    <h4 className="font-semibold flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-primary" />
                        Smart Alerts
                    </h4>
                </div>
                <ScrollArea className="h-[300px]">
                    <div className="divide-y">
                        {alerts.map((alert) => (
                            <div key={alert.id} className="p-4 hover:bg-muted/50 transition-colors">
                                <div className="flex justify-between items-start mb-1">
                                    <h5 className={`text-sm font-medium ${alert.type === 'urgent' ? 'text-red-600' : ''}`}>
                                        {alert.title}
                                    </h5>
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Calendar className="h-3 w-3" /> {alert.date}
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {alert.message}
                                </p>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                <div className="p-2 border-t text-center">
                    <Button variant="ghost" size="sm" className="w-full text-xs">
                        View All Notifications
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
