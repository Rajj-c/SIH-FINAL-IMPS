
'use client';

import {
  useState,
  useEffect,
  createContext,
  useContext,
  type ReactNode,
  useCallback,
} from 'react';
import {
  onAuthStateChangeWrapper,
  getUserProfile,
  updateUserProfile as fbUpdateUserProfile,
  logOut,
  startPhoneLogin,
  completePhoneLogin,
  setupRecaptcha,
  signInWithGoogle
} from '@/lib/firebase/auth';
import type { User, ConfirmationResult, RecaptchaVerifier } from 'firebase/auth';
import type { UserProfile, College, CareerPathNode, SignUpData } from '@/lib/types';
import { usePathname, useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { setDoc, doc, deleteField, deleteDoc } from 'firebase/firestore';
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
  saveQuizResult: (result: any) => Promise<void>;
  updateParentQuizAnswers: (answers: Record<string, string>) => Promise<void>;
  resetQuizAnswers: () => Promise<void>;
  updateUserProfile: (data: Partial<Omit<UserProfile, 'uid' | 'email'>>) => Promise<void>;
  toggleSaveCollege: (college: College) => void;
  toggleSaveCareerPath: (path: CareerPathNode) => void;
  isCollegeSaved: (collegeId: string) => boolean;
  isCareerPathSaved: (pathName: string) => boolean;
  logout: () => Promise<void>;
  setGuestProfile: (type: 'student' | 'parent') => void;
  // New Auth Methods
  startPhoneLogin: (phoneNumber: string, recaptchaVerifier: RecaptchaVerifier) => Promise<ConfirmationResult>;
  completePhoneLogin: (confirmationResult: ConfirmationResult, otp: string, isSignup?: boolean) => Promise<User>;
  setupRecaptcha: (elementId: string) => RecaptchaVerifier;
  signInWithGoogle: () => Promise<User>;
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
  saveQuizResult: async () => { },
  updateParentQuizAnswers: async () => { },
  resetQuizAnswers: async () => { },
  updateUserProfile: async () => { },
  toggleSaveCollege: () => { },
  toggleSaveCareerPath: () => { },
  isCollegeSaved: () => false,
  isCareerPathSaved: () => false,
  logout: async () => { },
  setGuestProfile: () => { },
  startPhoneLogin: async () => { throw new Error('Not implemented') },
  completePhoneLogin: async () => { throw new Error('Not implemented') },
  setupRecaptcha: () => { throw new Error('Not implemented') },
  signInWithGoogle: async () => { throw new Error('Not implemented') },
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

  const saveQuizResult = useCallback(async (result: any) => {
    if (user && userProfile?.userType === 'student') {
      try {
        await fbUpdateUserProfile(user.uid, { quizResult: result });
        setUserProfile(prev => prev ? { ...prev, quizResult: result } : null);
      } catch (error) {
        console.error("Failed to save quiz result:", error);
      }
    } else if (userProfile?.userType === 'student') { // Guest student
      setUserProfile(prev => prev ? { ...prev, quizResult: result } : null);
      // Also update session storage for guest persistence
      const currentGuest = sessionStorage.getItem('guestProfile');
      if (currentGuest) {
        const parsed = JSON.parse(currentGuest);
        parsed.quizResult = result;
        sessionStorage.setItem('guestProfile', JSON.stringify(parsed));
      }
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
        await fbUpdateUserProfile(user.uid, {
          quizAnswers: deleteField() as any,
          quizResult: deleteField() as any
        });
        setQuizAnswers(null);
        setUserProfile(prev => prev ? { ...prev, quizAnswers: undefined, quizResult: undefined } : null);
      } catch (error) {
        console.error("Failed to reset quiz answers:", error);
        throw error;
      }
    } else if (userProfile?.userType === 'student') { // Guest student
      setQuizAnswers(null);
      setUserProfile(prev => prev ? { ...prev, quizAnswers: undefined, quizResult: undefined } : null);
      // Clear from session storage
      const currentGuest = sessionStorage.getItem('guestProfile');
      if (currentGuest) {
        const parsed = JSON.parse(currentGuest);
        delete parsed.quizAnswers;
        delete parsed.quizResult;
        sessionStorage.setItem('guestProfile', JSON.stringify(parsed));
      }
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
    try {
      if (user) {
        await logOut();
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearState();
      router.push('/');
      router.refresh(); // Force refresh to ensure UI updates
    }
  }

  useEffect(() => {
    const guestProfileRaw = sessionStorage.getItem('guestProfile');
    if (guestProfileRaw) {
      const parsedProfile = JSON.parse(guestProfileRaw);
      setUserProfile(parsedProfile);
      if (parsedProfile.quizAnswers) {
        setQuizAnswers(parsedProfile.quizAnswers);
      }
      if (parsedProfile.parentQuizAnswers) {
        setParentQuizAnswers(parsedProfile.parentQuizAnswers);
      }
    }

    const unsubscribe = onAuthStateChangeWrapper(async (authUser) => {
      if (authUser) { // Removed emailVerified check for Phone/Google auth compatibility
        // For email/password, we might still want to check emailVerified, but for Phone it's always verified.
        // Google is also usually verified.
        // We can check providerData to see if it's password provider and if so check emailVerified.
        const isPasswordProvider = authUser.providerData.some(p => p.providerId === 'password');
        if (isPasswordProvider && !authUser.emailVerified) {
          // If it's password auth and not verified, treat as not logged in (or handle appropriately)
          // But existing logic in signIn throws error if not verified.
          // Here we just want to avoid auto-login if not verified.
          if (!guestProfileRaw) clearState();
          setLoading(false);
          return;
        }

        sessionStorage.removeItem('guestProfile');
        setUser(authUser);
        const profile = await getUserProfile(authUser.uid);
        setUserProfile(profile);
        if (profile?.userType === 'student') {
          setQuizAnswers(profile?.quizAnswers || null);
        } else if (profile?.userType === 'parent') {
          setParentQuizAnswers(profile?.parentQuizAnswers || null);
        }

        // Load saved items from Firestore
        try {
          const [colleges, paths] = await Promise.all([
            getSavedColleges(authUser.uid),
            getSavedCareerPaths(authUser.uid),
          ]);
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
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) return;

    // Normalize pathname to remove locale prefix (e.g., /en/login -> /login)
    // This assumes the locale is always the first segment if present.
    // We can use a regex or simple string manipulation.
    // Since we don't know the exact list of locales here easily without importing, 
    // we can check if the second segment matches our known routes.

    let normalizedPathname = pathname;
    const segments = pathname.split('/');
    // segments[0] is empty string, segments[1] is locale (e.g., 'en', 'hi') or the route if no locale (but middleware enforces locale usually)
    // If segments[1] is a 2-letter code (approx check for locale), we strip it.
    // Better yet, we can check if the path starts with /en/, /hi/, etc. or just use a regex.

    // Robust way: Remove the first path segment if it looks like a locale (2-3 chars)
    if (segments.length > 1 && segments[1].length <= 3) {
      normalizedPathname = '/' + segments.slice(2).join('/');
    }

    // Ensure root path is handled
    if (normalizedPathname === '') normalizedPathname = '/';

    const isAuthPage = normalizedPathname.startsWith('/login') || normalizedPathname.startsWith('/signup') || normalizedPathname.startsWith('/forgot-password') || normalizedPathname.startsWith('/parent-zone/login') || normalizedPathname.startsWith('/parent-zone/signup');
    const isPublicPage = ['/'].includes(normalizedPathname);
    const isCompleteProfilePage = normalizedPathname === '/complete-profile';

    // If not logged in, not a guest, and on a protected page
    if (!user && !userProfile && !isAuthPage && !isPublicPage && !isCompleteProfilePage) {
      router.replace('/');
      return;
    }

    // If logged in but no profile (New Phone/Google User)
    if (user && !userProfile && !isCompleteProfilePage && !isPublicPage) {
      router.replace('/complete-profile');
      return;
    }

    // If a student (real or guest) is trying to access parent-specific auth pages
    if (userProfile?.userType === 'student' && (normalizedPathname.startsWith('/parent-zone/login') || normalizedPathname.startsWith('/parent-zone/signup'))) {
      router.replace('/dashboard');
    }

    // If logged in and has profile
    if (user && userProfile) {
      // Redirect from auth pages (and complete-profile) to appropriate dashboard
      if (isAuthPage || isCompleteProfilePage) {
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
    saveQuizResult,
    updateParentQuizAnswers,
    resetQuizAnswers,
    updateUserProfile,
    logout: handleLogout,
    setGuestProfile,
    startPhoneLogin,
    completePhoneLogin: async (confirmationResult: ConfirmationResult, otp: string, isSignup?: boolean) => {
      const user = await completePhoneLogin(confirmationResult, otp);
      if (isSignup) {
        // If it's a signup attempt, we want to treat it as a new user.
        // If a profile exists, we delete it to force the "Complete Profile" flow.
        try {
          await deleteDoc(doc(db, 'users', user.uid));
          // Also clear local state so the useEffect triggers the redirect
          setUserProfile(null);
        } catch (e) {
          console.error("Error resetting profile on signup:", e);
        }
      }
      return user;
    },
    setupRecaptcha,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {loading && pathname !== '/' ? <AuthLoadingSkeleton /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
