import { resolvePermissions, Role, SessionUser } from "@/lib/auth/permissions";

export type UserRecord = SessionUser & { adminPasswordVerifiedAt?: string };

export const mockUsers: UserRecord[] = [
  {
    id: "user-admin-1",
    email: "owner@menux.test",
    name: "Owner Admin",
    role: "admin",
    permissions: resolvePermissions("admin"),
    restaurantId: "restaurant-demo",
    adminPasswordVerifiedAt: undefined,
  },
  {
    id: "user-staff-1",
    email: "staff@menux.test",
    name: "Floor Staff",
    role: "staff",
    permissions: resolvePermissions("staff"),
    restaurantId: "restaurant-demo",
  },
];

export function buildUser(
  input: { email: string; name: string; role: Role; permissions?: Partial<SessionUser["permissions"]> }
): UserRecord {
  return {
    id: `user-${Date.now()}`,
    email: input.email,
    name: input.name,
    role: input.role,
    permissions: resolvePermissions(input.role, input.permissions),
    restaurantId: "restaurant-demo",
  };
}
