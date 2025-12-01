"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ROLE_DEFAULTS, Role } from "@/lib/auth/permissions";

export function UserForm({ onClose }: { onClose?: () => void }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<Role>("staff");
  const [adminPassword, setAdminPassword] = useState("");
  const [canViewRevenue, setCanViewRevenue] = useState(false);
  const [canEditMenu, setCanEditMenu] = useState(false);
  const [canManageUsers, setCanManageUsers] = useState(false);
  const [canSeeOrders, setCanSeeOrders] = useState(true);
  const [canManageTables, setCanManageTables] = useState(true);

  const client = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          role,
          adminPassword,
          permissions: {
            canViewRevenue,
            canEditMenu,
            canManageUsers,
            canSeeOrders,
            canManageTables,
          },
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Failed to create user");
      }
      return res.json();
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["users"] });
      onClose?.();
    },
  });

  const applyRoleDefaults = (nextRole: Role) => {
    setRole(nextRole);
    const defaults = ROLE_DEFAULTS[nextRole];
    setCanViewRevenue(defaults.canViewRevenue);
    setCanEditMenu(defaults.canEditMenu);
    setCanManageUsers(defaults.canManageUsers);
    setCanSeeOrders(defaults.canSeeOrders);
    setCanManageTables(defaults.canManageTables);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create user (admin password required)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Email</label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Role</label>
          <Select value={role} onValueChange={(v) => applyRoleDefaults(v as Role)}>
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="staff">Staff</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <PermissionToggle label="View revenue" value={canViewRevenue} onChange={setCanViewRevenue} />
          <PermissionToggle label="Edit menu" value={canEditMenu} onChange={setCanEditMenu} />
          <PermissionToggle label="Manage users" value={canManageUsers} onChange={setCanManageUsers} />
          <PermissionToggle label="See orders" value={canSeeOrders} onChange={setCanSeeOrders} />
          <PermissionToggle label="Manage tables" value={canManageTables} onChange={setCanManageTables} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Admin password</label>
          <Input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            placeholder="Required to create or edit users"
          />
        </div>

        <Button onClick={() => createMutation.mutate()} disabled={createMutation.isPending} className="w-full">
          {createMutation.isPending ? "Creating..." : "Create user"}
        </Button>
        {createMutation.isError && (
          <p className="text-sm text-destructive">
            {(createMutation.error as Error).message || "Failed to create user"}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function PermissionToggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-muted/40 px-3 py-2">
      <p className="text-sm text-foreground">{label}</p>
      <Switch checked={value} onCheckedChange={onChange} />
    </div>
  );
}
