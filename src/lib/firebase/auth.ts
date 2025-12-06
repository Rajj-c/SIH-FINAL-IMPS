import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  GoogleAuthProvider,
  signInWithPopup,
  type User,
  type ConfirmationResult,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './client';
import type { SignUpData, UserProfile } from '../types';

export async function signUp(data: SignUpData): Promise<void> {
  const { email, password, name, mobile, classLevel, gender, userType } = data;

  const userCredential = await createUserWithEmailAndPassword(auth, email, password!);
  const user = userCredential.user;

  // Send email verification
  await sendEmailVerification(user);

  const profileData: UserProfile = {
    uid: user.uid,
    email: user.email!,
    name,
    userType,
  };

  if (mobile) {
    profileData.mobile = mobile;
  }

  if (userType === 'student') {
    profileData.classLevel = classLevel;
    profileData.gender = gender;
  }

  // Store additional user info in Firestore
  await setDoc(doc(db, 'users', user.uid), profileData);

  // It's good practice to sign the user out so they have to verify first.
  await signOut(auth);
}

export async function signIn(email: string, password: string): Promise<User> {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);

  if (!userCredential.user.emailVerified) {
    await signOut(auth);
    throw new Error('Please verify your email before logging in. A verification link was sent to your inbox. Don\'t forget to check the spam folder!');
  }

  return userCredential.user;
}

export function logOut(): Promise<void> {
  return signOut(auth);
}

export function onAuthStateChangeWrapper(callback: (user: User | null) => void) {
  // onAuthStateChanged returns the user object if logged in, regardless of verification.
  // We need to pass this user to the callback, and the logic inside useAuth will handle redirects.
  return onAuthStateChanged(auth, callback);
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const userDocRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    return userDoc.data() as UserProfile;
  } else {
    return null;
  }
}

export async function updateUserProfile(userId: string, data: Partial<UserProfile>): Promise<void> {
  const userDocRef = doc(db, 'users', userId);
  await setDoc(userDocRef, data, { merge: true });
}

export async function sendPasswordReset(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}

// --- Phone Auth ---

export function setupRecaptcha(elementId: string): RecaptchaVerifier {
  return new RecaptchaVerifier(auth, elementId, {
    'size': 'invisible', // or 'normal'
    'callback': () => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
    }
  });
}

export async function startPhoneLogin(phoneNumber: string, recaptchaVerifier: RecaptchaVerifier): Promise<ConfirmationResult> {
  return await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
}

export async function completePhoneLogin(confirmationResult: ConfirmationResult, otp: string): Promise<User> {
  const result = await confirmationResult.confirm(otp);
  return result.user;
}

// --- Google Auth ---

export async function signInWithGoogle(): Promise<User> {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
}
