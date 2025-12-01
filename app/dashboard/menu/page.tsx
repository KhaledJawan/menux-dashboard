"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMenu } from "@/lib/hooks/useMenu";

export default function MenuPage() {
  const { data } = useMenu();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold">Menu</h2>
          <p className="text-sm text-muted-foreground">
            Manage dishes, pricing, and availability. AI help will sit here next.
          </p>
        </div>
        <Button className="rounded-full px-4">Add new item</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Coming next</CardTitle>
          <p className="text-sm text-muted-foreground">
            Full CRUD table with filters, AI assistant side panel, and inline availability toggle.
          </p>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>Mock menu items loaded: {data?.length ?? 0}</p>
          <p>We’ll wire shadcn dialog + Zod validation in the next pass.</p>
        </CardContent>
      </Card>
    </div>
  );
}
