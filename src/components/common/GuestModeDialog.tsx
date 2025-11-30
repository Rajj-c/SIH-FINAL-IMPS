
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useState } from 'react';
import { Users, HeartHandshake } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export function GuestModeDialog() {
  const { user, userProfile, setGuestProfile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleGuestSelect = (type: 'student' | 'parent') => {
    setGuestProfile(type);
    setIsOpen(false);
    router.push(type === 'student' ? '/dashboard' : '/parent-zone');
  };

  const handleOpenChange = (open: boolean) => {
     if (!user && !userProfile) {
      setIsOpen(open);
     }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline">Explore as a Guest</DialogTitle>
          <DialogDescription>
            Choose how you'd like to explore the app. You can create an account at any time.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            size="lg"
            className="w-full justify-start h-auto py-4"
            onClick={() => handleGuestSelect('student')}
          >
            <Users className="mr-4 h-6 w-6" />
            <div className='text-left'>
                <p className="font-semibold text-base">Continue as Student</p>
                <p className="font-normal text-sm text-primary-foreground/80">Take quizzes, explore paths, and find colleges.</p>
            </div>
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="w-full justify-start h-auto py-4"
            onClick={() => handleGuestSelect('parent')}
          >
            <HeartHandshake className="mr-4 h-6 w-6" />
             <div className='text-left'>
                <p className="font-semibold text-base">Continue as Parent</p>
                <p className="font-normal text-sm text-secondary-foreground/80">Get guidance and explore resources for your child.</p>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
