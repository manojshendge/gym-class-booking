import { initializeApp } from "firebase/app";
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
  serverTimestamp 
} from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
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
  logEvent(analytics, eventName, eventParams);
};

export default app;