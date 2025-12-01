"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SessionUser } from "@/lib/auth/permissions";

export function UserCard({ user }: { user: SessionUser }) {
  return (
    <Card className="border-border/70 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base">{user.name}</CardTitle>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
        <Badge variant="info" className="capitalize">
          {user.role}
        </Badge>
      </CardHeader>
      <CardContent className="text-xs text-muted-foreground space-y-1">
        <p>
          Revenue: {user.permissions.canViewRevenue ? "Yes" : "No"} • Edit menu:{" "}
          {user.permissions.canEditMenu ? "Yes" : "No"}
        </p>
        <p>
          Orders: {user.permissions.canSeeOrders ? "Yes" : "No"} • Tables:{" "}
          {user.permissions.canManageTables ? "Yes" : "No"}
        </p>
        <p>Manage users: {user.permissions.canManageUsers ? "Yes" : "No"}</p>
      </CardContent>
    </Card>
  );
}
