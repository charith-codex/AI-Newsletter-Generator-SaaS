"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const categories = [
  {
    id: "technology",
    name: "Technology",
    description: "Latest tech news and innovations",
    icon: "💻",
  },
  {
    id: "business",
    name: "Business",
    description: "Business trends and market updates",
    icon: "💼",
  },
  {
    id: "sports",
    name: "Sports",
    description: "Sports news and highlights",
    icon: "⚽",
  },
  {
    id: "entertainment",
    name: "Entertainment",
    description: "Movies, TV, and celebrity news",
    icon: "🎬",
  },
  {
    id: "science",
    name: "Science",
    description: "Scientific discoveries and research",
    icon: "🔬",
  },
  {
    id: "health",
    name: "Health",
    description: "Health and wellness updates",
    icon: "🏥",
  },
  {
    id: "politics",
    name: "Politics",
    description: "Political news and current events",
    icon: "🏛️",
  },
  {
    id: "environment",
    name: "Environment",
    description: "Climate and environmental news",
    icon: "🌱",
  },
];

const frequencyOptions = [
  { id: "daily", name: "Daily", description: "Every day", icon: "📅" },
  { id: "weekly", name: "Weekly", description: "Once a week", icon: "📆" },
  {
    id: "biweekly",
    name: "Bi-weekly",
    description: "Twice a week",
    icon: "🗓️",
  },
];

export default function SelectPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFrequency, setSelectedFrequency] = useState<string>("weekly");
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSavePreferences = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedCategories.length === 0) {
      toast.warning("Please select at least one category");
      return;
    }

    if (!user) {
      toast.warning("Please sign in to continue");
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch("/api/user-preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categories: selectedCategories,
          frequency: selectedFrequency,
          email: user.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save preferences");
      }

      toast.success(
        "Your newsletter preferences have been saved."
      );
      router.push("/dashboard");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save preferences. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen  bg-emerald-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-gradient-to-br from-emerald-500 via-emerald-400 to-teal-500 backdrop-blur-lg rounded-2xl shadow-2xl shadow-emerald-300/50 border border-emerald-200/50 p-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-slate-800/70 bg-clip-text bg-gradient-to-r from-emerald-700 to-teal-600">
            Personalize Your Newsletter
          </h1>
          <p className="text-emerald-800/90 mt-2 text-sm">
            Curate your news experience with your favorite topics and schedule
          </p>
        </div>

        <form
          onSubmit={handleSavePreferences}
          className="flex flex-col lg:flex-row gap-6"
        >
          {/* Categories Section */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-emerald-900 mb-3">
              Choose Your Interests
            </h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleCategoryToggle(category.id)}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                    selectedCategories.includes(category.id)
                      ? "bg-emerald-100/80 border-emerald-300 shadow-md"
                      : "bg-white/80 hover:bg-emerald-50/80 border-emerald-200/50 hover:shadow-sm"
                  } border`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <div>
                      <h3 className="text-sm font-medium text-emerald-900">
                        {category.name}
                      </h3>
                      <p className="text-xs text-emerald-700/70">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedCategories.includes(category.id)
                        ? "bg-emerald-500 border-emerald-500"
                        : "border-emerald-300"
                    }`}
                  >
                    {selectedCategories.includes(category.id) && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Frequency and Summary Section */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Frequency Section */}
            <div>
              <h2 className="text-xl font-semibold text-emerald-900 mb-3">
                Delivery Schedule
              </h2>
              <div className="space-y-2">
                {frequencyOptions.map((frequency) => (
                  <div
                    key={frequency.id}
                    onClick={() => setSelectedFrequency(frequency.id)}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedFrequency === frequency.id
                        ? "bg-emerald-100/80 border-emerald-300 shadow-md"
                        : "bg-white/80 hover:bg-emerald-50/80 border-emerald-200/50 hover:shadow-sm"
                    } border`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{frequency.icon}</span>
                      <div>
                        <h3 className="text-sm font-medium text-emerald-900">
                          {frequency.name}
                        </h3>
                        <p className="text-xs text-emerald-700/70">
                          {frequency.description}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedFrequency === frequency.id
                          ? "bg-emerald-500 border-emerald-500"
                          : "border-emerald-300"
                      }`}
                    >
                      {selectedFrequency === frequency.id && (
                        <div className="w-2.5 h-2.5 bg-white rounded-full" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary and Actions */}
            <div>
              <h2 className="text-xl font-semibold text-emerald-900 mb-3">
                Your Selection
              </h2>
              <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-200/50">
                <div className="flex justify-between items-center px-20 font-semibold">
                  <span className="text-sm text-emerald-900">
                    {selectedCategories.length}{" "}
                    {selectedCategories.length === 1
                      ? "category"
                      : "categories"}
                  </span>
                  <span className="text-sm text-emerald-800">
                    {selectedFrequency} delivery
                  </span>
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <Button
                  type="submit"
                  disabled={selectedCategories.length === 0 || isSaving}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    selectedCategories.length === 0
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md hover:shadow-lg"
                  }`}
                >
                  {isSaving ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin mr-2 h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    "Save Preferences"
                  )}
                </Button>
                <Button
                  type="button"
                  onClick={() => router.push("/dashboard")}
                  className="flex-1 py-2 rounded-lg text-sm font-semibold border border-emerald-300 bg-white text-emerald-900 hover:bg-emerald-200"
                >
                  Back to Dashboard
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
