"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCard } from "@/components/dashboard/access/user-card";
import { UserForm } from "@/components/dashboard/access/user-form";
import { useState } from "react";
import { SessionUser } from "@/lib/auth/permissions";
import { mockSessionUser } from "@/lib/auth/mock-session";

export default function AccessPage() {
  const [showForm, setShowForm] = useState(false);
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Failed to load users");
      return res.json() as Promise<{ users: SessionUser[] }>;
    },
  });

  const canManageUsers = mockSessionUser.permissions.canManageUsers;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Admin / Users Access</h2>
          <p className="text-sm text-muted-foreground">
            Gate access with admin password; create or edit staff roles and permissions.
          </p>
        </div>
        {canManageUsers && (
          <Button onClick={() => setShowForm((v) => !v)} className="rounded-full px-4">
            {showForm ? "Close" : "Create new user"}
          </Button>
        )}
      </div>

      {showForm && <UserForm onClose={() => setShowForm(false)} />}

      <Card>
        <CardHeader>
          <CardTitle>Existing users</CardTitle>
          <p className="text-sm text-muted-foreground">
            Admin actions require the admin password.
          </p>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {usersQuery.data?.users.map((u) => (
            <UserCard key={u.id} user={u} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
