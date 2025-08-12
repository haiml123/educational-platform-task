import React from "react";
import StatCard from "@/components/ui/StatsCard";

interface StatItem {
  icon: React.ComponentType<{ className?: string }>;
  value: string | number;
  label: string;
  iconColor?: string;
}

interface StatsProps {
  stats: StatItem[];
  className?: string;
}

export default function Stats({ stats, className = "" }: StatsProps) {
  if (!stats || stats.length === 0) {
    return null;
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          icon={stat.icon}
          value={stat.value}
          label={stat.label}
          iconColor={stat.iconColor}
        />
      ))}
    </div>
  );
}
