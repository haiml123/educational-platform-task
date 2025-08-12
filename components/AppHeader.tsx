import React from "react";
import { Plus } from "lucide-react";
import CreateVideoModalButton from "@/components/video/CreateVideoModalButton";
import Link from "next/link";

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  actionButton?: React.ReactNode;
}

export default function AppHeader({
  title = "EduVideo Platform",
  subtitle = "Discover and share educational content",
  actionButton = null,
}: AppHeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <Link href="/" className="block">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {title}
              </h1>
              <p className="text-gray-600 mt-1 text-sm md:text-base sm:block">
                {subtitle}
              </p>
            </Link>
          </div>

          <div className="flex items-center">
            {actionButton ?? <CreateVideoModalButton />}
          </div>
        </div>
      </div>
    </header>
  );
}
