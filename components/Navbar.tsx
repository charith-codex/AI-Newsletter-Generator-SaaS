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
    <header className="bg-white/80 backdrop-blur-md shadow-xl border-b border-purple-100/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-4">
            {/* Logo/Icon */}
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg">
              <span className="text-xl">📧</span>
            </div>
            {/* Brand */}
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                AI Newsletter
              </h1>
              <p className="text-xs text-gray-500 -mt-1">
                Personalized & Smart
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {/* User Info */}
            <div className="hidden sm:flex items-center space-x-3 bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-2 rounded-full border border-purple-100">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
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
                <span className="text-sm font-medium text-gray-700">
                  Welcome back!
                </span>
                <span className="text-xs text-gray-500 -mt-0.5">
                  {user.email}
                </span>
              </div>
            </div>

            {/* Mobile User Icon */}
            <div className="sm:hidden w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
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
              className="group inline-flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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
