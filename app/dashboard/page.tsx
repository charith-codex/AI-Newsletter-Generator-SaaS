"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SquarePen } from "lucide-react";
import { useEffect, useState } from "react";

interface UserPreferences {
  categories: string[];
  frequency: string;
  email: string;
  is_active: boolean;
  created_at: string;
}

export default function DashboardPage() {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchPreferences();

    async function fetchPreferences() {
      const response = await fetch("/api/user-preferences");
      const data = await response.json();
      setPreferences(data);
    }
  }, []);

  async function handleUnsubscribe() {
    const response = await fetch("/api/user-preferences", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_active: false }),
    });

    if (response.ok) {
      setPreferences((prev) => (prev ? { ...prev, is_active: false } : null));
      router.refresh();
    }
  }

  async function handleSubscribe() {
    const response = await fetch("/api/user-preferences", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_active: true }),
    });

    if (response.ok) {
      setPreferences((prev) => (prev ? { ...prev, is_active: true } : null));
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-emerald-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-emerald-900">
            Your{" "}
            <span className="bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
              Newsletter
            </span>{" "}
            Dashboard
          </h1>
          <p className="mt-3 text-emerald-800/80">
            Manage your personalized newsletter preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-emerald-500 via-emerald-400 to-teal-500 backdrop-blur-sm shadow-xl shadow-emerald-100/70 p-6">
            <h2 className="text-xl font-semibold text-emerald-900 mb-4">
              Current Preferences
            </h2>
            {preferences ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wide">
                    Categories
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {Array.isArray(preferences.categories) &&
                    preferences.categories.length > 0 ? (
                      preferences.categories.map((category, key) => (
                        <span
                          key={key}
                          className="inline-flex items-center rounded-lg border border-emerald-200 bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 shadow-sm"
                        >
                          {category}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-emerald-50/90">
                        No categories selected
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/40 p-4">
                    <h3 className="text-xs font-semibold text-emerald-700/80 uppercase tracking-wider">
                      Frequency
                    </h3>
                    <p className="mt-1 text-lg font-medium text-emerald-900">
                      {preferences.frequency}
                    </p>
                  </div>
                  <div className="rounded-xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/40 p-4">
                    <h3 className="text-xs font-semibold text-emerald-700/80 uppercase tracking-wider">
                      Email
                    </h3>
                    <p className="mt-1 text-lg font-medium text-emerald-900 break-all">
                      {preferences.email}
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/40 p-4">
                    <h3 className="text-xs font-semibold text-emerald-700/80 uppercase tracking-wider">
                      Status
                    </h3>
                    <p className="mt-1">
                      <span
                        className={`inline-flex items-center rounded-lg px-3 py-1 text-sm font-medium ${
                          preferences.is_active
                            ? "bg-emerald-600 text-white font-semibold"
                            : "bg-red-500/90 text-white font-semibold"
                        }`}
                      >
                        {preferences.is_active ? "Active" : "Inactive"}
                      </span>
                    </p>
                  </div>
                  <div className="rounded-xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/40 p-4">
                    <h3 className="text-xs font-semibold text-emerald-700/80 uppercase tracking-wider">
                      Created
                    </h3>
                    <p className="mt-1 text-emerald-900">
                      {new Date(preferences.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 rounded-xl border border-emerald-200 bg-white/60">
                <p className="text-emerald-800/80 mb-6">
                  No preferences set yet.
                </p>
                <Link
                  href="/select"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-200/60 transition hover:from-emerald-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-emerald-600/50"
                >
                  Set Up Newsletter
                </Link>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-emerald-500 via-emerald-400 to-teal-500 backdrop-blur-sm shadow-xl shadow-emerald-100/70 p-6">
            <h2 className="text-xl font-semibold text-emerald-900 mb-4">
              Actions
            </h2>
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => router.push("/select")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-200/60 transition hover:from-emerald-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-emerald-600/50"
              >
                <SquarePen className="h-4 w-4" /> Update Preferences
              </Button>

              {preferences && (
                <>
                  {preferences.is_active ? (
                    <Button
                      onClick={handleUnsubscribe}
                      className="rounded-xl border border-emerald-200 bg-white text-emerald-900 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                    >
                      Unsubscribe NewsLetter
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubscribe}
                      className="rounded-xl font-semibold bg-gradient-to-r from-emerald-600 to-emerald-600 hover:from-emerald-700 hover:to-green-700 focus:outline-none"
                    >
                      Subscribe NewsLetter
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
