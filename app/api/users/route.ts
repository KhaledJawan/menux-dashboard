import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { mockUsers, buildUser } from "@/lib/mock/mockUsers";
import { mockSessionUser } from "@/lib/auth/mock-session";
import { Role } from "@/lib/auth/permissions";

let adminPasswordHash: string | null = null;

export async function GET() {
  if (!mockSessionUser.permissions.canManageUsers && mockSessionUser.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  return NextResponse.json({ users: mockUsers });
}

export async function POST(request: Request) {
  if (!mockSessionUser.permissions.canManageUsers && mockSessionUser.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  const { adminPassword, email, name, role, permissions } = await request.json();
  if (!adminPasswordHash) {
    adminPasswordHash = await bcrypt.hash("changeme123", 10); // placeholder bootstrap
  }
  const ok = await bcrypt.compare(adminPassword, adminPasswordHash);
  if (!ok) {
    return NextResponse.json({ error: "Invalid admin password" }, { status: 401 });
  }
  const roleValue = (role as Role) ?? "staff";
  const newUser = buildUser({
    email,
    name,
    role: roleValue,
    permissions,
  });
  mockUsers.push(newUser);
  return NextResponse.json({ user: newUser });
}
