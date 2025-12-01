import { DashboardStat } from "@/types";

export const dashboardStats: DashboardStat[] = [
  {
    label: "Total Menus",
    value: 120,
    progress: 45,
    change: "+6 new this week",
    icon: "menu",
  },
  {
    label: "Total Orders Today",
    value: 180,
    progress: 62,
    change: "+14% vs yesterday",
    icon: "orders",
  },
  {
    label: "Guests Served Today",
    value: 240,
    progress: 78,
    change: "+32 new guests",
    icon: "users",
  },
  {
    label: "Revenue Today",
    value: 18200,
    progress: 85,
    change: "$20k goal",
    icon: "revenue",
  },
];

export const revenueSeries = [
  { label: "Jan", revenue: 10500 },
  { label: "Feb", revenue: 11800 },
  { label: "Mar", revenue: 13400 },
  { label: "Apr", revenue: 15200 },
  { label: "May", revenue: 17600 },
  { label: "Jun", revenue: 19200 },
];

export const ordersSummary = [
  { day: "Jun 24", pending: 12, fulfilled: 28, cancelled: 3 },
  { day: "Jun 25", pending: 9, fulfilled: 31, cancelled: 4 },
  { day: "Jun 26", pending: 15, fulfilled: 26, cancelled: 2 },
  { day: "Jun 27", pending: 11, fulfilled: 30, cancelled: 3 },
];
