"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/sign-in");
  };

  if (!user) {
    return null;
  }

  return (
    <header className="bg-gradient-to-r from-emerald-700 via-emerald-400 to-teal-600  backdrop-blur-md shadow-xl border-b border-emerald-100/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-4">
            {/* Logo/Icon */}
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full shadow-lg ring-2 ring-slate-700/60">
              <span className="text-xl font-extrabold text-slate-700">Z</span>
            </div>
            {/* Brand */}
            <div>
              <h1 className="text-2xl font-bold text-slate-200">
                AI Newsletter
              </h1>
              <p className="text-xs text-slate-300">
                Personalized & Smart
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {/* User Info */}
            <div className="hidden sm:flex items-center space-x-3 bg-gradient-to-r from-emerald-200 to-green-100 px-4 py-2 rounded-full border border-emerald-100 shadow-sm">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-emerald-900">
                  Welcome back!
                </span>
                <span className="text-xs text-emerald-800/70 -mt-0.5">
                  {user.email}
                </span>
              </div>
            </div>

            {/* Mobile User Icon */}
            <div className="sm:hidden w-10 h-10 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="group inline-flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-400 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-600/40"
            >
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:rotate-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
