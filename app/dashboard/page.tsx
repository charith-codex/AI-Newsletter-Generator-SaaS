"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SquarePen } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  return (
    <div>
      <div>
        <div>
          <h1>Your Newsletter Dashboard</h1>
          <p>Manage your personalized newsletter preferences</p>
        </div>

        <div>
          <div>
            <h2>Current Preferences</h2>
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No preferences set yet.</p>
              <Link
                href="/select"
                className="inline-flex items-center px-4 py-2 border"
              >
                Set Up Newsletter
              </Link>
            </div>
          </div>

          <div>
            <h2>Actions</h2>
            <div className="text-center py-8 items-center">
              <Button onClick={() => router.push("/select")}>
              <SquarePen />  Update Preferences
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
