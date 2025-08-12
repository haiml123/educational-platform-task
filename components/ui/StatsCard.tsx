import React from "react";
import { Play } from "lucide-react";

export interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  value: string | number;
  label: string;
  iconColor?: string;
  className?: string;
}

export default function StatCard({
  icon: Icon,
  value,
  label,
  iconColor = "text-blue-600",
  className = "",
}: StatCardProps) {
  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-4 shadow-sm ${className}`}
    >
      <div className="flex items-center">
        <Icon className={`w-8 h-8 ${iconColor} mr-3`} />
        <div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-600">{label}</p>
        </div>
      </div>
    </div>
  );
}
