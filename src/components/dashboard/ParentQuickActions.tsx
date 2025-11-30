import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { GraduationCap, Award, Calculator, Compass, Film, BookOpen } from 'lucide-react';

export function ParentQuickActions() {
    const actions = [
        { title: 'Explore Colleges', icon: GraduationCap, href: '/colleges', color: 'from-orange-500 to-rose-500' },
        { title: 'Financial Tools', icon: Calculator, href: '/parent-zone/financial-tools', color: 'from-amber-500 to-orange-500' },
        { title: 'Career Paths', icon: Compass, href: '/career-paths', color: 'from-blue-500 to-cyan-500' },
        { title: 'Course Guide', icon: BookOpen, href: '/parent-zone/videos', color: 'from-indigo-500 to-purple-500' },
        { title: 'Resources Hub', icon: Film, href: '/parent-zone/resources', color: 'from-green-500 to-emerald-500' },
        { title: 'Scholarships', icon: Award, href: '/parent-zone/financial-tools', color: 'from-purple-500 to-pink-500' },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {actions.map((action, idx) => {
                const Icon = action.icon;
                return (
                    <Link key={idx} href={action.href}>
                        <Card className="hover:shadow-lg transition-all cursor-pointer">
                            <CardContent className="p-4 text-center">
                                <div className={`p-3 rounded-lg bg-gradient-to-br ${action.color} w-fit mx-auto mb-2`}>
                                    <Icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="font-semibold text-sm">{action.title}</h3>
                            </CardContent>
                        </Card>
                    </Link>
                );
            })}
        </div>
    );
}
