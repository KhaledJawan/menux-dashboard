"use client";

import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import type { Order } from "@/types";

const statusTone: Record<Order["status"], string> = {
  pending: "muted",
  accepted: "info",
  in_progress: "info",
  ready: "warning",
  served: "success",
  paid: "success",
  cancelled: "destructive",
};

export function RecentOrdersTable({ orders }: { orders: Order[] }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">Recent Orders</CardTitle>
          <p className="text-sm text-muted-foreground">
            Last 5 tickets across dine-in and takeaway
          </p>
        </div>
        <Badge variant="muted" className="rounded-full">
          Live
        </Badge>
      </CardHeader>
      <CardContent className="p-0">
        <Table containerClassName="border-0 rounded-none">
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, idx) => (
              <TableRow key={order.id}>
                <TableCell className="text-xs text-muted-foreground">
                  {idx + 1}
                </TableCell>
                <TableCell className="font-semibold">{order.id}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {format(new Date(order.placedAt), "MMM d, yyyy")}
                </TableCell>
                <TableCell className="text-sm">{order.customer}</TableCell>
                <TableCell className="text-xs font-semibold uppercase text-muted-foreground">
                  {order.type}
                </TableCell>
                <TableCell className="font-semibold">
                  {formatCurrency(order.total)}
                </TableCell>
                <TableCell>
                  <Badge variant={statusTone[order.status]}>
                    {order.status.replace("_", " ")}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
