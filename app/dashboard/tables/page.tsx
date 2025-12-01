"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTables } from "@/lib/hooks/useTables";

export default function TablesPage() {
  const { data } = useTables();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">Tables</h2>
        <p className="text-sm text-muted-foreground">
          Visual floor grid + status side-sheet will be added next.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Mock tables ready</CardTitle>
          <p className="text-sm text-muted-foreground">
            Grid layout will include statuses (free, occupied, reserved, needs cleaning).
          </p>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Total tables: {data?.length ?? 0}. We’ll wire per-table actions soon.
        </CardContent>
      </Card>
    </div>
  );
}
