'use client';

import { Logo } from '@/components/common/Logo';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles, GraduationCap, Globe, Users, Heart, Shield } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isParentZone = pathname?.includes('/parent-zone');

  // Theme configuration
  const theme = isParentZone ? {
    gradient: 'from-emerald-600 via-teal-500 to-cyan-600',
    accentColor: 'bg-emerald-500/30',
    title: 'Empower Their Future',
    description: 'Get the insights and tools you need to guide your child towards a successful and fulfilling career path.',
    features: [
      { icon: Users, title: 'Parent Community', desc: 'Connect with other parents' },
      { icon: Shield, title: 'Trusted Guidance', desc: 'Verified career information' }
    ]
  } : {
    gradient: 'from-orange-600 via-orange-500 to-rose-600',
    accentColor: 'bg-rose-500/30',
    title: 'Shape Your Future',
    description: 'Discover the perfect career path, explore top colleges, and get personalized guidance tailored just for you.',
    features: [
      { icon: Sparkles, title: 'AI Guidance', desc: 'Smart recommendations' },
      { icon: GraduationCap, title: 'Top Colleges', desc: 'Curated list for you' }
    ]
  };

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2">
      {/* Left Panel - Visual & Branding */}
      <div className={`hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br ${theme.gradient} text-white relative overflow-hidden transition-all duration-500`}>
        {/* Abstract Shapes/Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className={`absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 ${theme.accentColor} rounded-full blur-3xl`}></div>

        {/* Header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
            <Logo className="h-8 w-8 text-white" />
          </div>
          <span className="text-2xl font-bold font-headline tracking-tight">EduPath Navigator</span>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 text-sm font-medium">
            {isParentZone ? <Heart className="h-4 w-4 text-emerald-200" /> : <Globe className="h-4 w-4 text-orange-200" />}
            {isParentZone ? 'For Parents & Guardians' : 'For Students'}
          </div>
          <h1 className="text-5xl font-bold font-headline mb-6 leading-tight">
            {theme.title}
          </h1>
          <p className="text-lg text-white/90 mb-8 leading-relaxed">
            {theme.description}
          </p>

          <div className="grid grid-cols-2 gap-6">
            {theme.features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-colors">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-white/80">{feature.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} EduPath Navigator</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Forms */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12 bg-gray-50 dark:bg-gray-900 relative">
        <div className="absolute top-6 right-6 sm:top-12 sm:right-12">
          <Button asChild variant="ghost" className="gap-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo (Visible only on small screens) */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="flex items-center gap-2 text-2xl font-bold text-primary">
              <Logo className="h-10 w-10" />
              <span className="font-headline">EduPath</span>
            </div>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
