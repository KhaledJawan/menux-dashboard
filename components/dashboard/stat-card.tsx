import { Gauge, LayoutList, ShoppingBag, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn, formatCurrency } from "@/lib/utils";
import type { DashboardStat } from "@/types";

const icons = {
  menu: LayoutList,
  orders: ShoppingBag,
  users: Users,
  revenue: Gauge,
} as const;

type StatCardProps = {
  stat: DashboardStat;
  tone?: "dark" | "muted";
};

export function StatCard({ stat, tone }: StatCardProps) {
  const Icon = stat.icon ? icons[stat.icon as keyof typeof icons] ?? Gauge : Gauge;
  const valueLabel =
    stat.icon === "revenue"
      ? formatCurrency(stat.value)
      : stat.suffix
        ? `${stat.value}${stat.suffix}`
        : stat.value.toLocaleString();

  return (
    <Card
      className={cn(
        "overflow-hidden",
        tone === "dark" && "bg-gradient-to-br from-[#0b0b12] to-[#141420] text-white shadow-lg"
      )}
    >
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="space-y-1">
          <CardTitle
            className={cn(
              "text-base font-semibold text-foreground",
              tone === "dark" && "text-white"
            )}
          >
            {stat.label}
          </CardTitle>
          <p
            className={cn(
              "text-3xl font-semibold tracking-tight text-foreground",
              tone === "dark" && "text-white"
            )}
          >
            {valueLabel}
          </p>
          {stat.change && (
            <p
              className={cn(
                "text-xs font-medium text-muted-foreground",
                tone === "dark" && "text-white/70"
              )}
            >
              {stat.change}
            </p>
          )}
        </div>
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-white text-foreground shadow",
            tone === "dark" && "border-white/10 bg-white/10 text-white"
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent className="pb-5">
        <Progress
          value={stat.progress ?? 0}
          className={cn(
            "h-2 bg-white/40",
            tone !== "dark" && "bg-muted"
          )}
        />
      </CardContent>
    </Card>
  );
}
