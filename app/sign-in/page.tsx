"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/client";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const supabase = createClient();
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isSignedUp) {
        const { error } = await supabase.auth.signUp({ email, password });

        if (error) throw error;
        setMessage("Please check your email for confirmation.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        router.push("/dashboard");
      }
    } catch (error) {}
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-6 shadow-lg">
            <span className="text-3xl">📧</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            AI Newsletter
          </h1>
          <p className="text-xl text-gray-600 font-medium">
            {isSignedUp ? "Join the community" : "Welcome back"}
          </p>
          <p className="text-gray-500 mt-2">
            {isSignedUp
              ? "Create your account to get started"
              : "Sign in to access your personalized newsletters"}
          </p>
        </div>

        {/* Sign In Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mb-6">
          <form className="space-y-6" onSubmit={handleAuth}>
            {message && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-green-700 text-sm font-medium">
                    {message}
                  </p>
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-3">
              <Label htmlFor="email" className="text-gray-700 font-semibold">
                Email address
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 py-3 rounded-xl border-gray-300 focus:border-purple-400 focus:ring-purple-400 transition-colors duration-200"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-3">
              <Label htmlFor="password" className="text-gray-700 font-semibold">
                Password
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 py-3 rounded-xl border-gray-300 focus:border-purple-400 focus:ring-purple-400 transition-colors duration-200"
                />
              </div>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              size="lg"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>{isSignedUp ? "Create Account" : "Sign In"}</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 rounded-full">
                or
              </span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <Button
              onClick={() => setIsSignedUp((prev) => !prev)}
              variant="ghost"
              className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 font-medium px-6 py-3 rounded-xl transition-all duration-200"
            >
              {isSignedUp
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-500 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2">
            <svg
              className="w-4 h-4 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Secure authentication powered by Supabase</span>
          </div>
        </div>
      </div>
    </div>
  );
}
