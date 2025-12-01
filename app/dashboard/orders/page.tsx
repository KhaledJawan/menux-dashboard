"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOrders } from "@/lib/hooks/useOrders";

export default function OrdersPage() {
  const { data } = useOrders();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">Orders</h2>
        <p className="text-sm text-muted-foreground">
          Status board, filters, and side-sheet details will live here.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>In progress</CardTitle>
          <p className="text-sm text-muted-foreground">
            Orders data is mocked and ready for table/grid rendering.
          </p>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Loaded orders: {data?.length ?? 0}. We’ll add status badges, actions, and history next.
        </CardContent>
      </Card>
    </div>
  );
}
