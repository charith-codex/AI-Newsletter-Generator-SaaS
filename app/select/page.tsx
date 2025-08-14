"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

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
      alert("Please select at least one category");
      return;
    }

    if (!user) {
      alert("Please sign in to continue");
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

      alert(
        "Your newsletter preferences have been saved! You'll start receiving newsletters according to your schedule."
      );
      router.push("/dashboard");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save preferences. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-6">
            <span className="text-2xl">📧</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Customize Your Newsletter
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Curate your perfect newsletter experience by selecting your favorite
            topics and delivery schedule
          </p>
        </div>

        <form onSubmit={handleSavePreferences} className="space-y-12">
          {/* Categories Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Choose Your Interests
              </h2>
              <p className="text-gray-600">
                Select the topics that spark your curiosity
              </p>
              <div className="mt-4">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-800 text-sm font-medium">
                  {selectedCategories.length} selected
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleCategoryToggle(category.id)}
                  className={`relative cursor-pointer group transition-all duration-300 ${
                    selectedCategories.includes(category.id)
                      ? "scale-105"
                      : "hover:scale-102"
                  }`}
                >
                  <div
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                      selectedCategories.includes(category.id)
                        ? "border-purple-400 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg"
                        : "border-gray-200 bg-white hover:border-purple-200 hover:shadow-md"
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-3">{category.icon}</div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {category.description}
                      </p>
                    </div>

                    {/* Selection Indicator */}
                    <div
                      className={`absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        selectedCategories.includes(category.id)
                          ? "border-purple-500 bg-purple-500"
                          : "border-gray-300 group-hover:border-purple-300"
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
                </div>
              ))}
            </div>
          </div>

          {/* Frequency Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Delivery Schedule
              </h2>
              <p className="text-gray-600">
                How often would you like to receive your curated newsletter?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {frequencyOptions.map((frequency) => (
                <div
                  key={frequency.id}
                  onClick={() => setSelectedFrequency(frequency.id)}
                  className={`relative cursor-pointer group transition-all duration-300 ${
                    selectedFrequency === frequency.id
                      ? "scale-105"
                      : "hover:scale-102"
                  }`}
                >
                  <div
                    className={`p-8 rounded-2xl border-2 text-center transition-all duration-300 ${
                      selectedFrequency === frequency.id
                        ? "border-purple-400 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg"
                        : "border-gray-200 bg-white hover:border-purple-200 hover:shadow-md"
                    }`}
                  >
                    <div className="text-4xl mb-4">{frequency.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {frequency.name}
                    </h3>
                    <p className="text-gray-600">{frequency.description}</p>

                    {/* Radio Indicator */}
                    <div
                      className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        selectedFrequency === frequency.id
                          ? "border-purple-500 bg-purple-500"
                          : "border-gray-300 group-hover:border-purple-300"
                      }`}
                    >
                      {selectedFrequency === frequency.id && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Section */}
          <div className="text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 max-w-md mx-auto">
              <div className="mb-6">
                <p className="text-gray-600 mb-2">Your selection:</p>
                <div className="space-y-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-medium">
                    {selectedCategories.length} categor
                    {selectedCategories.length !== 1 ? "ies" : "y"}
                  </span>
                  <br />
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-pink-100 text-pink-800 text-sm font-medium">
                    {selectedFrequency} delivery
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                disabled={selectedCategories.length === 0 || isSaving}
                className={`w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  selectedCategories.length === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                }`}
              >
                {isSaving ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
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
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </span>
                ) : (
                  "Save My Preferences"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
