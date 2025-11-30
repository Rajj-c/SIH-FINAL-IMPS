
'use client';

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, Building, Compass, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function SavedItemsPage() {
  const { savedColleges, savedCareerPaths } = useAuth();

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-headline flex items-center justify-center gap-3">
          <Bookmark className="h-10 w-10" />
          My Saved Items
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Here are the colleges and career paths you've saved for future reference.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section>
          <h2 className="text-2xl font-bold font-headline mb-4 flex items-center gap-3">
            <Building className="h-6 w-6 text-primary" />
            Saved Colleges
          </h2>
          {savedColleges.length > 0 ? (
            <div className="space-y-4">
              {savedColleges.map(college => (
                <Card key={college.id} className="shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <div className="flex items-start justify-between">
                             <div>
                                <CardTitle className="font-headline text-xl">{college.name}</CardTitle>
                                <div className="flex items-center text-sm text-muted-foreground mt-1">
                                    <MapPin className="h-4 w-4 mr-1.5" />
                                    {college.district}
                                </div>
                            </div>
                            <Button asChild variant="outline" size="sm">
                                <Link href={`/colleges/${college.id}`}>View Details</Link>
                            </Button>
                        </div>
                    </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">You haven't saved any colleges yet.</p>
              <Button asChild variant="link" className="mt-2">
                <Link href="/colleges">Browse Colleges</Link>
              </Button>
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold font-headline mb-4 flex items-center gap-3">
            <Compass className="h-6 w-6 text-primary" />
            Saved Career Paths
          </h2>
          {savedCareerPaths.length > 0 ? (
            <div className="space-y-4">
              {savedCareerPaths.map(path => (
                 <Card key={path.name} className="shadow-md hover:shadow-lg transition-shadow">
                     <CardHeader>
                        <div className="flex items-start justify-between">
                            <div>
                                <CardTitle className="font-headline text-xl">{path.name}</CardTitle>
                                <p className="text-sm text-muted-foreground">{path.type}</p>
                            </div>
                            <Button asChild variant="outline" size="sm">
                                <Link href="/career-paths">View Path</Link>
                            </Button>
                        </div>
                    </CardHeader>
                 </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">You haven't saved any career paths yet.</p>
              <Button asChild variant="link" className="mt-2">
                <Link href="/career-paths">Explore Paths</Link>
              </Button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
