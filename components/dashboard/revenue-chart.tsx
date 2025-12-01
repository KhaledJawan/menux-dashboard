"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import { ChartCard } from "./chart-card";
import { formatCurrency } from "@/lib/utils";

type RevenueChartProps = {
  data: { label: string; revenue: number }[];
};

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <ChartCard title="Revenue" periodLabel="Monthly" contentClassName="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: 0, right: 0 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#030213" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#030213" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `$${value / 1000}k`}
            tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
          />
          <Tooltip
            cursor={{ stroke: "var(--color-border)" }}
            contentStyle={{
              borderRadius: 12,
              borderColor: "var(--color-border)",
            }}
            formatter={(value: number) => formatCurrency(value)}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#030213"
            strokeWidth={2.8}
            fill="url(#revenueGradient)"
            dot={{ strokeWidth: 2, r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
