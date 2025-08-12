"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, Sparkles } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  debounceMs?: number;
  className?: string;
  initialValue?: string;
  initialAiMode?: boolean;
}

export default function SearchBar({
  placeholder = "Search...",
  debounceMs = 600,
  initialValue = "",
  initialAiMode = false,
}: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [value, setValue] = useState(initialValue);
  const [aiMode, setAiMode] = useState(initialAiMode);

  // Keep the input in sync with URL (helps with back/forward)
  useEffect(() => setValue(initialValue), [initialValue]);

  // Update AI mode from URL params
  useEffect(() => {
    setAiMode(params.get("isRag") === "true");
  }, [params]);

  // Debounced URL updates
  useEffect(() => {
    const t = setTimeout(() => {
      const next = new URLSearchParams(params);
      if (value) {
        next.set("freeText", value);
      } else {
        next.delete("freeText");
      }

      // Update AI search parameter
      if (aiMode) {
        next.set("isRag", "true");
      } else {
        next.delete("isRag");
      }

      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    }, debounceMs);
    return () => clearTimeout(t);
  }, [value, aiMode, params, pathname, router]);

  const toggleAiMode = () => {
    setAiMode(!aiMode);
  };

  return (
    <div className={`mb-8`}>
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder={aiMode ? "Ask AI anything..." : placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`w-full pl-10 pr-12 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
            aiMode
              ? "border-purple-300 focus:ring-purple-500 bg-gradient-to-r from-purple-50 to-blue-50"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        />
        <button
          onClick={toggleAiMode}
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-md transition-all duration-200 hover:scale-110 ${
            aiMode
              ? "text-purple-600 bg-purple-100 shadow-md"
              : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          }`}
          title={aiMode ? "Disable AI Search" : "Enable AI Search"}
        >
          <Sparkles className={`w-4 h-4 ${aiMode ? "animate-pulse" : ""}`} />
        </button>
      </div>
      {aiMode && (
        <div className="max-w-md mx-auto mt-2">
          <p className="text-xs text-purple-600 text-center font-medium">
            ✨ AI Search Mode Active
          </p>
        </div>
      )}
    </div>
  );
}
