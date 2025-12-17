'use client';

import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import {
  LogIn,
  Users,
  HeartHandshake,
  User,
} from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from '@/hooks/use-auth';
import { GuestModeDialog } from '@/components/common/GuestModeDialog';
import { HeroSection } from '@/components/landing/HeroSection';
import { CareerChoiceSection } from '@/components/landing/CareerChoiceSection';
import { AwarenessComparisonSection } from '@/components/landing/AwarenessComparisonSection';
import { SuccessStoriesSection } from '@/components/landing/SuccessStoriesSection';
import { PersonalityCTASection } from '@/components/landing/PersonalityCTASection';

import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

import { TeamSection } from '@/components/landing/TeamSection';

export default function Home() {
  const { setGuestProfile } = useAuth();
  const t = useTranslations('HomePage');
  const tNav = useTranslations('Navigation');
  const tCommon = useTranslations('Common');

  return (
    <>
      <GuestModeDialog />
      <div className="flex flex-col min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center px-4 md:px-6">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <Logo className="h-8 w-8 text-primary" />
              <span className="font-headline">{tCommon('appName')}</span>
            </Link>
            <div className="ml-auto flex items-center gap-2">
              <LanguageSwitcher />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    <LogIn className="mr-2 h-4 w-4" />
                    {tNav('loginSignup')}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/login">
                      <Users className="mr-2 h-4 w-4" />
                      {tNav('studentLogin')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/parent-zone/login">
                      <HeartHandshake className="mr-2 h-4 w-4" />
                      {tNav('parentLogin')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setGuestProfile('student')}>
                    <User className="mr-2 h-4 w-4" />
                    {tNav('guestMode')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <HeroSection title={t('title')} subtitle={t('subtitle')} />
          <CareerChoiceSection id="career-choice-section" />
          <AwarenessComparisonSection />
          <SuccessStoriesSection />
          <TeamSection />
          <PersonalityCTASection />
        </main>

        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-muted/20">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} EduPath Navigator. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link
              href="#"
              className="text-xs hover:underline underline-offset-4 text-muted-foreground"
              prefetch={false}
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-xs hover:underline underline-offset-4 text-muted-foreground"
              prefetch={false}
            >
              Privacy
            </Link>
          </nav>
        </footer>
      </div >
    </>
  );
}
