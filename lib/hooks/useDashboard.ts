import { useQuery } from "@tanstack/react-query";
import { dashboardStats, ordersSummary, revenueSeries } from "@/lib/mock/mockDashboard";
import { mockOrders } from "@/lib/mock/mockOrders";

type DashboardOverview = {
  stats: typeof dashboardStats;
  revenue: typeof revenueSeries;
  ordersSummary: typeof ordersSummary;
  recentOrders: typeof mockOrders;
};

async function fetchDashboard(): Promise<DashboardOverview> {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          stats: dashboardStats,
          revenue: revenueSeries,
          ordersSummary,
          recentOrders: mockOrders.slice(0, 5),
        }),
      120
    );
  });
}

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: fetchDashboard,
  });
}
