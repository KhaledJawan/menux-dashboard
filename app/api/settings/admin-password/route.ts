import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { mockSessionUser } from "@/lib/auth/mock-session";

let adminPasswordHash: string | null = null;

export async function POST(request: Request) {
  if (mockSessionUser.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { password } = await request.json();
  if (!password || password.length < 8) {
    return NextResponse.json({ error: "Password too short" }, { status: 400 });
  }

  const hash = await bcrypt.hash(password, 12);
  adminPasswordHash = hash;

  return NextResponse.json({ success: true });
}

export async function GET() {
  return NextResponse.json({ configured: Boolean(adminPasswordHash) });
}

export async function POST_verify(request: Request) {
  const { password } = await request.json();
  if (!adminPasswordHash) return NextResponse.json({ ok: false }, { status: 401 });
  const ok = await bcrypt.compare(password, adminPasswordHash);
  if (!ok) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json({ ok: true });
}
