export type Role = "admin" | "manager" | "staff" | "viewer";

export type Permissions = {
  canViewRevenue: boolean;
  canEditMenu: boolean;
  canManageUsers: boolean;
  canSeeOrders: boolean;
  canManageTables: boolean;
};

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
  permissions: Permissions;
  restaurantId?: string;
};

export const ROLE_DEFAULTS: Record<Role, Permissions> = {
  admin: {
    canViewRevenue: true,
    canEditMenu: true,
    canManageUsers: true,
    canSeeOrders: true,
    canManageTables: true,
  },
  manager: {
    canViewRevenue: true,
    canEditMenu: true,
    canManageUsers: false,
    canSeeOrders: true,
    canManageTables: true,
  },
  staff: {
    canViewRevenue: false,
    canEditMenu: false,
    canManageUsers: false,
    canSeeOrders: true,
    canManageTables: true,
  },
  viewer: {
    canViewRevenue: false,
    canEditMenu: false,
    canManageUsers: false,
    canSeeOrders: false,
    canManageTables: false,
  },
};

export function resolvePermissions(role: Role, override?: Partial<Permissions>): Permissions {
  return { ...ROLE_DEFAULTS[role], ...(override ?? {}) };
}
