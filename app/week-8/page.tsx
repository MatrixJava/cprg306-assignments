"use client";

import Link from "next/link";
import { useState } from "react";
import { useUserAuth } from "./_utils/auth-context";

function getAuthErrorMessage(error: unknown) {
  const code =
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as { code?: unknown }).code === "string"
      ? (error as { code: string }).code
      : null;

  switch (code) {
    case "auth/configuration-not-found":
      return "GitHub provider is not configured in Firebase. In Authentication > Sign-in method, enable GitHub and add Client ID/Secret.";
    case "auth/operation-not-allowed":
      return "GitHub sign-in is not enabled in Firebase. Enable GitHub in Authentication > Sign-in method.";
    case "auth/unauthorized-domain":
      return "This domain is not authorized. Add localhost to Firebase Authentication authorized domains.";
    case "auth/invalid-api-key":
      return "Invalid Firebase API key. Recheck your NEXT_PUBLIC_FIREBASE_* values.";
    case "auth/popup-closed-by-user":
      return "Sign-in popup was closed before completing login.";
    case "auth/cancelled-popup-request":
      return "A sign-in popup is already open. Complete it or close it first.";
    case "auth/network-request-failed":
      return "Network error during sign-in. Check your internet connection and try again.";
    default:
      return error instanceof Error
        ? error.message
        : "Sign-in failed. Check Firebase Authentication setup and try again.";
  }
}

export default function Week8Page() {
  const { user, gitHubSignIn, firebaseSignOut, firebaseConfigured } = useUserAuth();
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleGitHubSignIn = async () => {
    setAuthError(null);
    setIsSigningIn(true);
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("GitHub sign-in failed:", error);
      setAuthError(getAuthErrorMessage(error));
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-slate-100">
      <Link href="/" className="mb-4 inline-block text-blue-400 hover:underline">
        ← Home
      </Link>
      <h1 className="mb-6 text-3xl font-bold">Week 8: Firebase Authentication</h1>

      <div className="max-w-xl rounded-xl border border-slate-700 bg-slate-900 p-6">
        {!firebaseConfigured && (
          <p className="mb-4 text-amber-300">
            Firebase environment variables are missing. Configure them to enable login.
          </p>
        )}
        {!user ? (
          <>
            <p className="mb-4">Sign in with GitHub to access your shopping list.</p>
            <button
              type="button"
              onClick={handleGitHubSignIn}
              disabled={!firebaseConfigured || isSigningIn}
              className="rounded bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-500"
            >
              {isSigningIn ? "Signing in..." : "Sign in with GitHub"}
            </button>
            {authError && <p className="mt-3 text-sm text-red-400">{authError}</p>}
          </>
        ) : (
          <>
            <p className="mb-2">
              Welcome, <span className="font-semibold">{user.displayName ?? user.email}</span>
            </p>
            <p className="mb-4 text-sm text-slate-300">{user.email}</p>
            <div className="flex gap-3">
              <Link
                href="/week-8/shopping-list"
                className="rounded bg-emerald-600 px-4 py-2 font-semibold hover:bg-emerald-500"
              >
                Go to Shopping List
              </Link>
              <button
                type="button"
                onClick={firebaseSignOut}
                className="rounded bg-slate-700 px-4 py-2 font-semibold hover:bg-slate-600"
              >
                Sign Out
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
