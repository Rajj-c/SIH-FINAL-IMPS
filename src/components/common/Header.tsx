
'use client';

import { Link, usePathname, useRouter } from '@/navigation';
import {
  Compass,
  GraduationCap,
  Lightbulb,
  Menu,
  Calendar,
  Sparkles,
  LayoutDashboard,
  LogOut,
  Library,
  User as UserIcon,
  HeartHandshake,
  LogIn,
  TrendingUp,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/common/Logo';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';


import { useTranslations } from 'next-intl';

export function Header() {
  const pathname = usePathname();
  const { user, userProfile, logout } = useAuth();
  const router = useRouter();
  const t = useTranslations('Navigation');
  const tCommon = useTranslations('Common');

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const studentNavLinks = [
    { href: '/dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { href: '/quiz', label: t('aptitudeQuiz'), icon: Lightbulb },
    { href: '/one-stop-advisor', label: t('oneStopAdvisor'), icon: Sparkles },
    { href: '/my-plan', label: t('myPlan'), icon: TrendingUp },
    { href: '/career-paths', label: t('careerPaths'), icon: Compass },
    { href: '/colleges', label: t('colleges'), icon: GraduationCap },
    { href: '/timeline', label: t('timeline'), icon: Calendar },
    { href: '/resources', label: t('resources'), icon: Library },
  ];

  const parentNavLinks = [
    { href: '/parent-zone', label: t('dashboard'), icon: LayoutDashboard },
    { href: '/career-paths', label: t('careerPaths'), icon: Compass },
    { href: '/colleges', label: t('colleges'), icon: GraduationCap },
    { href: '/resources', label: t('resources'), icon: Library },
  ];

  const navLinks = userProfile?.userType === 'parent' ? parentNavLinks : studentNavLinks;

  const renderNavLinks = (isMobile = false) =>
    navLinks.map((link) => (
      <Button
        key={link.href}
        variant={pathname.startsWith(link.href) ? 'secondary' : 'ghost'}
        asChild
        className={cn('justify-start', isMobile ? 'w-full' : '')}
      >
        <Link href={link.href}>
          <link.icon className="mr-2 h-4 w-4" />
          {link.label}
        </Link>
      </Button>
    ));

  const isGuest = !user && userProfile;
  const mainDashboardLink = userProfile ? (userProfile.userType === 'parent' ? '/parent-zone' : '/dashboard') : '/';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link
          href={mainDashboardLink}
          className="mr-6 flex items-center space-x-2"
          prefetch={false}
        >
          <Logo className="h-8 w-8 text-primary" />
          <span className="hidden font-bold sm:inline-block font-headline">
            {tCommon('appName')}
          </span>
        </Link>

        {(user || isGuest) && (
          <nav className="hidden md:flex items-center space-x-1">
            {renderNavLinks()}
          </nav>
        )}

        <div className="flex flex-1 items-center justify-end gap-2">
          <LanguageSwitcher />
          {user && userProfile ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{userProfile?.name?.[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userProfile?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {userProfile?.userType === 'student' && (
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>{t('myProfile')}</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                {userProfile?.userType === 'parent' && (
                  <DropdownMenuItem asChild>
                    <Link href="/parent-zone">
                      <HeartHandshake className="mr-2 h-4 w-4" />
                      <span>{t('parentZone')}</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t('logout')}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          ) : isGuest ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{t('guestMode')}</span>
              <Button asChild>
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  {t('loginSignup')}
                </Link>
              </Button>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" className="font-semibold">{t('loginSignup')}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild><Link href="/login">{t('studentLogin')}</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/parent-zone/login">{t('parentLogin')}</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {(user || isGuest) && (
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <div className="p-4">
                    <Link href={mainDashboardLink} className="flex items-center gap-2 font-bold text-lg mb-4">
                      <Logo className="h-8 w-8 text-primary" />
                      <span className="font-headline">{tCommon('appName')}</span>
                    </Link>
                    <nav className="flex flex-col gap-2">{renderNavLinks(true)}</nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
