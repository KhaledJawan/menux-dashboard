import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { mockUsers } from "@/lib/mock/mockUsers";
import { mockSessionUser } from "@/lib/auth/mock-session";
import { resolvePermissions, Role } from "@/lib/auth/permissions";

let adminPasswordHash: string | null = null;

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!mockSessionUser.permissions.canManageUsers && mockSessionUser.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  const body = await request.json();
  const { adminPassword, role, permissions } = body;

  if (!adminPasswordHash) {
    adminPasswordHash = await bcrypt.hash("changeme123", 10); // bootstrap
  }
  const ok = await bcrypt.compare(adminPassword, adminPasswordHash);
  if (!ok) {
    return NextResponse.json({ error: "Invalid admin password" }, { status: 401 });
  }

  const user = mockUsers.find((u) => u.id === id);
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (role) {
    user.role = role as Role;
    user.permissions = resolvePermissions(user.role, permissions);
  } else if (permissions) {
    user.permissions = resolvePermissions(user.role, permissions);
  }

  return NextResponse.json({ user });
}
