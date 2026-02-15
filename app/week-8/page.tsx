"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function Week8Page() {
  const { user, gitHubSignIn, firebaseSignOut, firebaseConfigured } = useUserAuth();

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
              onClick={gitHubSignIn}
              disabled={!firebaseConfigured}
              className="rounded bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-500"
            >
              Sign in with GitHub
            </button>
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
