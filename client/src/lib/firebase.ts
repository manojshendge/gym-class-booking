import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  doc, 
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  connectFirestoreEmulator 
} from "firebase/firestore";
import { getAnalytics, logEvent, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase - ensure only one instance
let app;
try {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
} catch (error) {
  console.error("Firebase initialization error", error);
  // Fallback to default app initialization
  app = initializeApp(firebaseConfig);
}

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize analytics only if supported in the browser
let analytics: any = null;
const initAnalytics = async () => {
  try {
    if (await isSupported()) {
      analytics = getAnalytics(app);
      console.log("Firebase Analytics initialized successfully");
    }
  } catch (error) {
    console.warn("Analytics not supported in this environment:", error);
  }
};

// Call analytics initialization but don't wait for it
initAnalytics().catch(error => {
  console.warn("Failed to initialize analytics:", error);
});

export const googleProvider = new GoogleAuthProvider();

// Authentication functions
export const loginWithEmail = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const registerWithEmail = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginWithGoogle = async () => {
  return signInWithPopup(auth, googleProvider);
};

export const logout = async () => {
  return signOut(auth);
};

// Firestore functions for user profile
export const createUserProfile = async (userId: string, userData: any) => {
  await setDoc(doc(db, "users", userId), {
    ...userData,
    createdAt: serverTimestamp()
  });
};

export const getUserProfile = async (userId: string) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

export const updateUserProfile = async (userId: string, userData: any) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, userData);
};

// Class booking functions
export const getAvailableClasses = async () => {
  const classesCollection = collection(db, "classes");
  const querySnapshot = await getDocs(classesCollection);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const bookClass = async (userId: string, classId: string, scheduleId: string, bookingDate: string) => {
  return addDoc(collection(db, "bookings"), {
    userId,
    classId,
    scheduleId,
    bookingDate,
    status: "confirmed",
    createdAt: serverTimestamp()
  });
};

export const getUserBookings = async (userId: string) => {
  const bookingsQuery = query(collection(db, "bookings"), where("userId", "==", userId));
  const querySnapshot = await getDocs(bookingsQuery);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// Newsletter subscription
export const subscribeToNewsletter = async (email: string, firstName?: string, lastName?: string) => {
  return addDoc(collection(db, "newsletter"), {
    email,
    firstName,
    lastName,
    subscribed: true,
    createdAt: serverTimestamp()
  });
};

// Analytics tracking
export const trackEvent = (eventName: string, eventParams?: any) => {
  if (analytics) {
    try {
      logEvent(analytics, eventName, eventParams);
    } catch (error) {
      console.warn("Failed to track event:", error);
    }
  }
};

export default app;