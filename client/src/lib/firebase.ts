import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
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
  Timestamp,
} from "firebase/firestore";
import { getAnalytics, logEvent, isSupported } from "firebase/analytics";
import { z } from "zod";

// -------------------- Firebase Config --------------------
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// -------------------- Firebase Init --------------------
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// -------------------- Analytics --------------------
let analytics: any = null;
const initAnalytics = async () => {
  if (await isSupported()) {
    analytics = getAnalytics(app);
    console.log("Analytics initialized");
  }
};
initAnalytics().catch(console.error);

// -------------------- Auth Functions --------------------
export const loginWithEmail = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const registerWithEmail = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

export const logout = () => signOut(auth);

// -------------------- Firestore User Profile --------------------
export const createUserProfile = async (userId: string, userData: any) => {
  await setDoc(doc(db, "users", userId), {
    ...userData,
    createdAt: Timestamp.now(),
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

// -------------------- Zod Booking Schema --------------------
const bookingSchema = z.object({
  userId: z.string().min(1),
  classId: z.string().min(1),
  scheduleId: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
});

type BookingInput = z.infer<typeof bookingSchema>;

// -------------------- Bookings --------------------
export const getAvailableClasses = async () => {
  const classesCollection = collection(db, "classes");
  const querySnapshot = await getDocs(classesCollection);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const bookClass = async (
  userId: string,
  classId: string,
  scheduleId: string,
  date: string
) => {
  // Validate input
  const parseResult = bookingSchema.safeParse({ userId, classId, scheduleId, date });

  if (!parseResult.success) {
    console.error("Booking validation error:", parseResult.error.flatten());
    throw new Error("Invalid booking data. Please check your input.");
  }

  try {
    const booking = {
      ...parseResult.data,
      status: "confirmed",
      createdAt: Timestamp.now(),
      bookedAt: Timestamp.now(),
    };

    await addDoc(collection(db, "bookings"), booking);
  } catch (error) {
    console.error("Error booking class:", error);
    throw new Error("Failed to book class. Please try again.");
  }
};

export const getUserBookings = async (userId: string) => {
  const bookingsQuery = query(
    collection(db, "bookings"),
    where("userId", "==", userId)
  );
  const querySnapshot = await getDocs(bookingsQuery);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// -------------------- Newsletter --------------------
export const subscribeToNewsletter = async (
  email: string,
  firstName?: string,
  lastName?: string
) => {
  return addDoc(collection(db, "newsletter"), {
    email,
    firstName,
    lastName,
    subscribed: true,
    createdAt: Timestamp.now(),
  });
};

// -------------------- Analytics Tracking --------------------
export const trackEvent = (eventName: string, eventParams?: any) => {
  if (analytics) {
    try {
      logEvent(analytics, eventName, eventParams);
    } catch (error) {
      console.warn("Analytics error:", error);
    }
  }
};

export default app;
