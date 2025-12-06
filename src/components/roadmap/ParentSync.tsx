'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Users, Link as LinkIcon, Check } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function ParentSync() {
    const [isSynced, setIsSynced] = useState(false);
    const [parentEmail, setParentEmail] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleSync = () => {
        setIsSynced(true);
        setIsOpen(false);
        // In a real app, this would send an invite
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant={isSynced ? "secondary" : "outline"} className="gap-2">
                    <Users className="h-4 w-4" />
                    {isSynced ? "Synced with Parents" : "Sync with Parents"}
                    {isSynced && <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Keep Parents in the Loop 👨‍👩‍👧‍👦</DialogTitle>
                    <DialogDescription>
                        Share your roadmap with your parents so they can support your journey.
                        They will get a read-only view of your progress.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="sync-mode" className="flex flex-col space-y-1">
                            <span>Enable Parent Access</span>
                            <span className="font-normal text-xs text-muted-foreground">
                                Allow parents to view your roadmap
                            </span>
                        </Label>
                        <Switch id="sync-mode" checked={isSynced} onCheckedChange={setIsSynced} />
                    </div>

                    {isSynced && (
                        <div className="space-y-2">
                            <Label>Parent's Email / Phone</Label>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="parent@example.com"
                                    value={parentEmail}
                                    onChange={(e) => setParentEmail(e.target.value)}
                                />
                                <Button onClick={handleSync}>
                                    <LinkIcon className="h-4 w-4 mr-2" />
                                    Invite
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                We'll send them a magic link to view your plan.
                            </p>
                        </div>
                    )}

                    {isSynced && parentEmail && (
                        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-2 rounded border border-green-200">
                            <Check className="h-4 w-4" />
                            Invite sent to {parentEmail}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
