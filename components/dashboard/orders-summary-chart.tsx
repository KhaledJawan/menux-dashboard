"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartCard } from "./chart-card";

type OrdersSummaryChartProps = {
  data: { day: string; pending: number; fulfilled: number; cancelled: number }[];
};

export function OrdersSummaryChart({ data }: OrdersSummaryChartProps) {
  return (
    <ChartCard title="Orders Summary" periodLabel="Weekly" contentClassName="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barCategoryGap={24}>
          <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="var(--color-border)" />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              borderColor: "var(--color-border)",
            }}
          />
          <Bar dataKey="fulfilled" stackId="orders" fill="#c7c9ff" radius={[8, 8, 0, 0]} />
          <Bar dataKey="pending" stackId="orders" fill="#090918" radius={[8, 8, 0, 0]} />
          <Bar dataKey="cancelled" stackId="orders" fill="#f4b6c6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
