import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  linkLabel: string;
  wip?: boolean;
}

export function DashboardCard({
  title,
  description,
  icon: Icon,
  link,
  linkLabel,
  wip = false,
}: DashboardCardProps) {
  return (
    <Card className="flex flex-col shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex-row items-center gap-4 space-y-0 pb-2">
        <div className="p-3 bg-primary/10 rounded-full">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="font-headline text-xl">{title}</CardTitle>
        {wip && (
          <Badge variant="outline" className="ml-auto">
            WIP
          </Badge>
        )}
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" disabled={wip}>
          <Link href={link}>
            {linkLabel}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
