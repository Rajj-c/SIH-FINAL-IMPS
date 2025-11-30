
'use client';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// This layout can be used to protect the parent zone
export default function ParentZoneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user || userProfile?.userType !== 'parent') {
        router.replace('/parent-zone/login');
      }
    }
  }, [user, userProfile, loading, router]);
  
  if (loading || !user || userProfile?.userType !== 'parent') {
    // You can return a loading spinner here
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
