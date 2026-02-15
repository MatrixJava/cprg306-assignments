"use client";

import {
  GithubAuthProvider,
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, isFirebaseConfigured } from "./firebase";

interface AuthContextValue {
  user: User | null;
  gitHubSignIn: () => Promise<void>;
  firebaseSignOut: () => Promise<void>;
  firebaseConfigured: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const gitHubSignIn = async () => {
    if (!auth) {
      throw new Error("Firebase is not configured.");
    }
    const provider = new GithubAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const firebaseSignOut = async () => {
    if (!auth) {
      return;
    }
    await signOut(auth);
  };

  useEffect(() => {
    if (!auth) {
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, gitHubSignIn, firebaseSignOut, firebaseConfigured: isFirebaseConfigured }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useUserAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUserAuth must be used within an AuthContextProvider");
  }

  return context;
}
