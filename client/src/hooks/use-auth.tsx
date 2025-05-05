import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { auth, createUserProfile, getUserProfile } from "@/lib/firebase";

// Define types for the auth context
type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  membershipType?: "Basic" | "Premium" | "Elite";
  phone?: string;
  role?: "user" | "admin" | "owner";
};

type AuthContextType = {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<UserCredential>;
  register: (
    email: string,
    password: string,
    profile: UserProfile
  ) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: () => boolean;
  isOwner: () => boolean;
  hasAdminAccess: () => boolean;
};

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Fetch user profile from Firestore
        const userProfile = await getUserProfile(currentUser.uid);
        if (userProfile) {
          setProfile(userProfile as UserProfile);
        }
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Register function
  // Register function
  const register = async (
    email: string,
    password: string,
    userProfile: UserProfile
  ) => {
    try {
      // Set default role to 'user' if not provided
      const profile = {
        ...userProfile,
        role: userProfile.role || "user",
      };

      // Create user in Firebase Auth
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Store user profile in Firestore
      await createUserProfile(user.uid, profile);

      // Optionally update local state immediately
      setUser(user);
      setProfile(profile);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error; // Rethrow to allow UI to handle
    }
  };

  // Logout function
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setProfile(null);
  };

  // Role check functions
  const isAdmin = () => {
    return profile?.role === "admin";
  };

  const isOwner = () => {
    return profile?.role === "owner";
  };

  const hasAdminAccess = () => {
    return profile?.role === "admin" || profile?.role === "owner";
  };

  const value = {
    user,
    profile,
    loading,
    login,
    register,
    logout,
    isAdmin,
    isOwner,
    hasAdminAccess,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
