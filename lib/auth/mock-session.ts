import { SessionUser, resolvePermissions } from "./permissions";

// Temporary mock session user; in real app, hydrate from NextAuth/JWT.
export const mockSessionUser: SessionUser = {
  id: "user-admin-1",
  email: "owner@menux.test",
  name: "Owner Admin",
  role: "admin",
  permissions: resolvePermissions("admin"),
  restaurantId: "restaurant-demo",
};
