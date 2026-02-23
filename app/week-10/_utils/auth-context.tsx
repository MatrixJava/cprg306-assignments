"use client";

import {
  GithubAuthProvider,
  User,
  onAuthStateChanged,
  signInWithRedirect,
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

function getFirebaseErrorCode(error: unknown) {
  if (typeof error === "object" && error !== null && "code" in error) {
    const possibleCode = (error as { code?: unknown }).code;
    if (typeof possibleCode === "string") {
      return possibleCode;
    }
  }

  return null;
}

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const gitHubSignIn = async () => {
    if (!auth) {
      throw new Error("Firebase is not configured.");
    }
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      if (getFirebaseErrorCode(error) === "auth/popup-blocked") {
        await signInWithRedirect(auth, provider);
        return;
      }
      throw error;
    }
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
