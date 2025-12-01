import type { DashboardStat } from "@/types";
import { StatCard } from "./stat-card";

type OverviewCardsProps = {
  stats: DashboardStat[];
};

export function OverviewCards({ stats }: OverviewCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, idx) => (
        <StatCard key={stat.label} stat={stat} tone={idx === 0 ? "dark" : "muted"} />
      ))}
    </div>
  );
}
