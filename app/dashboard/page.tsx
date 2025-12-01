"use client";

import { OverviewCards } from "@/components/dashboard/overview-cards";
import { OrdersSummaryChart } from "@/components/dashboard/orders-summary-chart";
import { RecentOrdersTable } from "@/components/dashboard/recent-orders-table";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { AnalyticsAssistant } from "@/components/dashboard/analytics-assistant";
import { Card } from "@/components/ui/card";
import { useDashboard } from "@/lib/hooks/useDashboard";

export default function DashboardPage() {
  const { data, isLoading } = useDashboard();

  if (isLoading || !data) {
    return (
      <div className="grid gap-4 md:gap-6">
        <Card className="h-32 animate-pulse bg-muted/60" />
        <Card className="h-32 animate-pulse bg-muted/60" />
        <Card className="h-32 animate-pulse bg-muted/60" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <OverviewCards stats={data.stats} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RevenueChart data={data.revenue} />
        <OrdersSummaryChart data={data.ordersSummary} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentOrdersTable orders={data.recentOrders} />
        </div>
        <AnalyticsAssistant />
      </div>
    </div>
  );
}
