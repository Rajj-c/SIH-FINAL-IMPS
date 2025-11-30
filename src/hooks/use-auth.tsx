
'use client';

import {
  useState,
  useEffect,
  createContext,
  useContext,
  type ReactNode,
  useCallback,
} from 'react';
import { onAuthStateChangeWrapper, getUserProfile, updateUserProfile as fbUpdateUserProfile, logOut } from '@/lib/firebase/auth';
import type { User } from 'firebase/auth';
import type { UserProfile, College, CareerPathNode, SignUpData } from '@/lib/types';
import { usePathname, useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { setDoc, doc, deleteField } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import {
  saveCollege as fbSaveCollege,
  unsaveCollege as fbUnsaveCollege,
  getSavedColleges,
  saveCareerPath as fbSaveCareerPath,
  unsaveCareerPath as fbUnsaveCareerPath,
  getSavedCareerPaths,
} from '@/lib/firebase/database';


interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  savedColleges: College[];
  savedCareerPaths: CareerPathNode[];
  quizAnswers: Record<string, string> | null;
  parentQuizAnswers: Record<string, string> | null;
  updateQuizAnswers: (answers: Record<string, string>) => Promise<void>;
  updateParentQuizAnswers: (answers: Record<string, string>) => Promise<void>;
  resetQuizAnswers: () => Promise<void>;
  updateUserProfile: (data: Partial<Omit<UserProfile, 'uid' | 'email'>>) => Promise<void>;
  toggleSaveCollege: (college: College) => void;
  toggleSaveCareerPath: (path: CareerPathNode) => void;
  isCollegeSaved: (collegeId: string) => boolean;
  isCareerPathSaved: (pathName: string) => boolean;
  logout: () => Promise<void>;
  setGuestProfile: (type: 'student' | 'parent') => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  savedColleges: [],
  savedCareerPaths: [],
  quizAnswers: null,
  parentQuizAnswers: null,
  updateQuizAnswers: async () => { },
  updateParentQuizAnswers: async () => { },
  resetQuizAnswers: async () => { },
  updateUserProfile: async () => { },
  toggleSaveCollege: () => { },
  toggleSaveCareerPath: () => { },
  isCollegeSaved: () => false,
  isCareerPathSaved: () => false,
  logout: async () => { },
  setGuestProfile: () => { },
});

function AuthLoadingSkeleton() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b">
        <div className="container flex h-14 items-center">
          <Skeleton className="h-8 w-40" />
          <div className="ml-auto">
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-8">
          <div className="space-y-4">
            <Skeleton className="h-12 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const [savedColleges, setSavedColleges] = useState<College[]>([]);
  const [savedCareerPaths, setSavedCareerPaths] = useState<CareerPathNode[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string> | null>(null);
  const [parentQuizAnswers, setParentQuizAnswers] = useState<Record<string, string> | null>(null);

  const clearState = () => {
    setUser(null);
    setUserProfile(null);
    setQuizAnswers(null);
    setParentQuizAnswers(null);
    setSavedColleges([]);
    setSavedCareerPaths([]);
    sessionStorage.removeItem('guestProfile');
  };

  const setGuestProfile = useCallback((type: 'student' | 'parent') => {
    const guestProfile: UserProfile = {
      uid: 'guest',
      name: 'Guest',
      email: 'guest@example.com',
      userType: type,
      classLevel: '12',
      gender: 'Prefer not to say',
    };
    setUserProfile(guestProfile);
    sessionStorage.setItem('guestProfile', JSON.stringify(guestProfile));
    setLoading(false);
    router.push(type === 'student' ? '/dashboard' : '/parent-zone');
  }, [router]);

  const updateQuizAnswers = useCallback(async (answers: Record<string, string>) => {
    if (user && userProfile?.userType === 'student') {
      try {
        await fbUpdateUserProfile(user.uid, { quizAnswers: answers });
        setQuizAnswers(answers);
        setUserProfile(prev => prev ? { ...prev, quizAnswers: answers } : null);
      } catch (error) {
        console.error("Failed to save student quiz answers:", error);
      }
    } else if (userProfile?.userType === 'student') { // Guest student
      setQuizAnswers(answers);
      setUserProfile(prev => prev ? { ...prev, quizAnswers: answers } : null);
    }
  }, [user, userProfile]);

  const updateParentQuizAnswers = useCallback(async (answers: Record<string, string>) => {
    if (user && userProfile?.userType === 'parent') {
      try {
        await fbUpdateUserProfile(user.uid, { parentQuizAnswers: answers });
        setParentQuizAnswers(answers);
        setUserProfile(prev => prev ? { ...prev, parentQuizAnswers: answers } : null);
      } catch (error) {
        console.error("Failed to save parent quiz answers:", error);
      }
    } else if (userProfile?.userType === 'parent') { // Guest parent
      setParentQuizAnswers(answers);
      setUserProfile(prev => prev ? { ...prev, parentQuizAnswers: answers } : null);
    }
  }, [user, userProfile]);

  const resetQuizAnswers = useCallback(async () => {
    if (user && userProfile?.userType === 'student') {
      try {
        // Use deleteField() to properly remove the field from Firestore
        await fbUpdateUserProfile(user.uid, { quizAnswers: deleteField() as any });
        setQuizAnswers(null);
        setUserProfile(prev => prev ? { ...prev, quizAnswers: undefined } : null);
      } catch (error) {
        console.error("Failed to reset quiz answers:", error);
        throw error;
      }
    } else if (userProfile?.userType === 'student') { // Guest student
      setQuizAnswers(null);
      setUserProfile(prev => prev ? { ...prev, quizAnswers: undefined } : null);
    }
  }, [user, userProfile]);

  const updateUserProfile = useCallback(async (data: Partial<Omit<UserProfile, 'uid' | 'email'>>) => {
    if (user) {
      await fbUpdateUserProfile(user.uid, data);
      const updatedProfile = await getUserProfile(user.uid);
      setUserProfile(updatedProfile);
    } else {
      // Handle guest profile update
      setUserProfile(prev => prev ? { ...prev, ...data } : null);
    }
  }, [user]);

  const toggleSaveCollege = useCallback(async (college: College) => {
    const isSaved = savedColleges.some(c => c.id === college.id);

    if (user) {
      // Authenticated user - persist to Firestore
      try {
        if (isSaved) {
          await fbUnsaveCollege(user.uid, college.id);
          setSavedColleges(prev => prev.filter(c => c.id !== college.id));
        } else {
          await fbSaveCollege(user.uid, college);
          setSavedColleges(prev => [...prev, college]);
        }
      } catch (error) {
        console.error('Failed to toggle save college:', error);
      }
    } else {
      // Guest user - only update local state
      setSavedColleges(prev =>
        isSaved ? prev.filter(c => c.id !== college.id) : [...prev, college]
      );
    }
  }, [user, savedColleges]);

  const isCollegeSaved = (collegeId: string) => {
    return savedColleges.some(c => c.id === collegeId);
  };

  const toggleSaveCareerPath = useCallback(async (path: CareerPathNode) => {
    const isSaved = savedCareerPaths.some(p => p.name === path.name);

    if (user) {
      // Authenticated user - persist to Firestore
      try {
        if (isSaved) {
          await fbUnsaveCareerPath(user.uid, path.name);
          setSavedCareerPaths(prev => prev.filter(p => p.name !== path.name));
        } else {
          await fbSaveCareerPath(user.uid, path);
          setSavedCareerPaths(prev => [...prev, path]);
        }
      } catch (error) {
        console.error('Failed to toggle save career path:', error);
      }
    } else {
      // Guest user - only update local state
      setSavedCareerPaths(prev =>
        isSaved ? prev.filter(p => p.name !== path.name) : [...prev, path]
      );
    }
  }, [user, savedCareerPaths]);

  const isCareerPathSaved = (pathName: string) => {
    return savedCareerPaths.some(p => p.name === pathName);
  };

  const handleLogout = async () => {
    if (user) {
      await logOut();
    }
    clearState();
    router.push('/');
  }

  useEffect(() => {
    const guestProfileRaw = sessionStorage.getItem('guestProfile');
    if (guestProfileRaw) {
      setUserProfile(JSON.parse(guestProfileRaw));
    }

    const unsubscribe = onAuthStateChangeWrapper(async (authUser) => {
      console.log('Auth state changed:', authUser?.email);
      if (authUser && authUser.emailVerified) {
        sessionStorage.removeItem('guestProfile');
        setUser(authUser);
        console.log('Fetching user profile...');
        const profile = await getUserProfile(authUser.uid);
        console.log('User profile fetched:', profile);
        setUserProfile(profile);
        if (profile?.userType === 'student') {
          setQuizAnswers(profile?.quizAnswers || null);
        } else if (profile?.userType === 'parent') {
          setParentQuizAnswers(profile?.parentQuizAnswers || null);
        }

        // Load saved items from Firestore
        try {
          console.log('Fetching saved items...');
          const [colleges, paths] = await Promise.all([
            getSavedColleges(authUser.uid),
            getSavedCareerPaths(authUser.uid),
          ]);
          console.log('Saved items fetched');
          setSavedColleges(colleges);
          setSavedCareerPaths(paths);
        } catch (error) {
          console.error('Failed to load saved items:', error);
        }
      } else {
        if (!guestProfileRaw) {
          clearState();
        }
      }
      console.log('Setting loading to false');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) return;

    const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/signup') || pathname.startsWith('/forgot-password') || pathname.startsWith('/parent-zone/login') || pathname.startsWith('/parent-zone/signup');
    const isPublicPage = ['/'].includes(pathname);
    const isGuest = !user && userProfile;

    // If not logged in, not a guest, and on a protected page
    if (!user && !userProfile && !isAuthPage && !isPublicPage) {
      router.replace('/');
      return;
    }

    // If a student (real or guest) is trying to access parent-specific auth pages
    if (userProfile?.userType === 'student' && (pathname.startsWith('/parent-zone/login') || pathname.startsWith('/parent-zone/signup'))) {
      router.replace('/dashboard');
    }

    // If logged in
    if (user && userProfile) {
      // Redirect from auth pages to appropriate dashboard
      if (isAuthPage) {
        router.replace(userProfile.userType === 'parent' ? '/parent-zone' : '/dashboard');
      }
    }

  }, [user, userProfile, loading, pathname, router]);

  const contextValue = {
    user,
    userProfile,
    loading,
    savedColleges,
    savedCareerPaths,
    toggleSaveCollege,
    toggleSaveCareerPath,
    isCollegeSaved,
    isCareerPathSaved,
    quizAnswers,
    parentQuizAnswers,
    updateQuizAnswers,
    updateParentQuizAnswers,
    resetQuizAnswers,
    updateUserProfile,
    logout: handleLogout,
    setGuestProfile,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {loading && pathname !== '/' ? <AuthLoadingSkeleton /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
