'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';

export function ExportPDF() {
    const handlePrint = () => {
        window.print();
    };

    return (
        <Button variant="outline" onClick={handlePrint} className="gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export Plan</span>
        </Button>
    );
}
