import {
    collection,
    doc,
    setDoc,
    deleteDoc,
    getDocs,
    getDoc,
    query,
    orderBy,
    where,
    limit,
    Timestamp,
    addDoc
} from 'firebase/firestore';
import { db } from './client';
import type { College, CareerPathNode, SavedCollege, SavedCareerPath, UserProfile, MentorshipRequest } from '../types';

// ============================================
// Saved Colleges
// ============================================

/**
 * Save a college for a user
 */
export async function saveCollege(userId: string, college: College): Promise<void> {
    const savedCollegeRef = doc(db, 'users', userId, 'savedColleges', college.id);
    await setDoc(savedCollegeRef, {
        college,
        savedAt: Timestamp.now(),
    });
}

/**
 * Unsave a college for a user
 */
export async function unsaveCollege(userId: string, collegeId: string): Promise<void> {
    const savedCollegeRef = doc(db, 'users', userId, 'savedColleges', collegeId);
    await deleteDoc(savedCollegeRef);
}

/**
 * Get all saved colleges for a user
 */
export async function getSavedColleges(userId: string): Promise<College[]> {
    const savedCollegesRef = collection(db, 'users', userId, 'savedColleges');
    const q = query(savedCollegesRef, orderBy('savedAt', 'desc'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => {
        const data = doc.data() as SavedCollege;
        return data.college;
    });
}

/**
 * Check if a college is saved
 */
export async function isCollegeSaved(userId: string, collegeId: string): Promise<boolean> {
    const savedCollegeRef = doc(db, 'users', userId, 'savedColleges', collegeId);
    const docSnap = await getDoc(savedCollegeRef);
    return docSnap.exists();
}

// ============================================
// Saved Career Paths
// ============================================

/**
 * Generate a unique ID from career path name
 */
function generatePathId(pathName: string): string {
    return pathName.toLowerCase().replace(/[^a-z0-9]/g, '-');
}

/**
 * Save a career path for a user
 */
export async function saveCareerPath(userId: string, path: CareerPathNode): Promise<void> {
    const pathId = generatePathId(path.name);
    const savedPathRef = doc(db, 'users', userId, 'savedCareerPaths', pathId);
    await setDoc(savedPathRef, {
        path,
        savedAt: Timestamp.now(),
    });
}

/**
 * Unsave a career path for a user
 */
export async function unsaveCareerPath(userId: string, pathName: string): Promise<void> {
    const pathId = generatePathId(pathName);
    const savedPathRef = doc(db, 'users', userId, 'savedCareerPaths', pathId);
    await deleteDoc(savedPathRef);
}

/**
 * Get all saved career paths for a user
 */
export async function getSavedCareerPaths(userId: string): Promise<CareerPathNode[]> {
    const savedPathsRef = collection(db, 'users', userId, 'savedCareerPaths');
    const q = query(savedPathsRef, orderBy('savedAt', 'desc'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => {
        const data = doc.data() as SavedCareerPath;
        return data.path;
    });
}

/**
 * Check if a career path is saved
 */
export async function isCareerPathSaved(userId: string, pathName: string): Promise<boolean> {
    const pathId = generatePathId(pathName);
    const savedPathRef = doc(db, 'users', userId, 'savedCareerPaths', pathId);
    const docSnap = await getDoc(savedPathRef);
    return docSnap.exists();
}

// ============================================
// Bookmarked Resources
// ============================================

/**
 * Toggle bookmark for a resource (add if not bookmarked, remove if bookmarked)
 */
export async function toggleBookmarkResource(userId: string, resourceId: number): Promise<void> {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        throw new Error('User not found');
    }

    const userData = userSnap.data();
    const currentBookmarks = (userData.bookmarkedResources as number[]) || [];

    let updatedBookmarks: number[];
    if (currentBookmarks.includes(resourceId)) {
        // Remove bookmark
        updatedBookmarks = currentBookmarks.filter(id => id !== resourceId);
    } else {
        // Add bookmark
        updatedBookmarks = [...currentBookmarks, resourceId];
    }

    await setDoc(userRef, { bookmarkedResources: updatedBookmarks }, { merge: true });
}

/**
 * Get all bookmarked resource IDs for a user
 */
export async function getBookmarkedResources(userId: string): Promise<number[]> {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        return [];
    }

    const userData = userSnap.data();
    return (userData.bookmarkedResources as number[]) || [];
}

export async function isResourceBookmarked(userId: string, resourceId: number): Promise<boolean> {
    const bookmarks = await getBookmarkedResources(userId);
    return bookmarks.includes(resourceId);
}

// ============================================
// Parent-Student Sync
// ============================================

/**
 * Generate a unique 6-digit code for a student to share with their parent
 */
export async function generateParentShareCode(userId: string): Promise<string> {
    // Generate a random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Save to user profile
    await setDoc(doc(db, 'users', userId), { parentShareCode: code }, { merge: true });

    return code;
}

/**
 * Find a student by their share code
 */


export async function getStudentByShareCode(code: string): Promise<UserProfile | null> {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('parentShareCode', '==', code), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        return null;
    }

    const userDoc = querySnapshot.docs[0];
    return { uid: userDoc.id, ...userDoc.data() } as UserProfile;
}
/**
 * Save a new mentorship request
 */
export async function saveMentorshipRequest(request: Omit<MentorshipRequest, 'id' | 'createdAt' | 'status'>): Promise<string> {
    const requestsRef = collection(db, 'mentorship_requests');
    const docRef = await addDoc(requestsRef, {
        ...request,
        status: 'pending',
        createdAt: Timestamp.now()
    });
    return docRef.id;
}
