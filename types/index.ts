export type MenuCategory = "drink" | "food" | "dessert" | "starter" | "special";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  category: MenuCategory | string;
  price: number;
  tags?: string[];
  available: boolean;
  updatedAt: string;
  translations?: MenuItemTranslations;
  defaultLocale?: LocaleCode;
  supportedLocales?: LocaleCode[];
};

export type OrderStatus =
  | "pending"
  | "accepted"
  | "in_progress"
  | "ready"
  | "served"
  | "paid"
  | "cancelled";

export type OrderItem = {
  name: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  customer: string;
  table?: string;
  placedAt: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  type: "dine-in" | "takeaway" | "delivery";
};

export type TableStatus = "free" | "occupied" | "reserved" | "needs_cleaning";

export type Table = {
  id: string;
  label: string;
  status: TableStatus;
  capacity: number;
  currentOrderId?: string;
};

export type DashboardStat = {
  label: string;
  value: number;
  suffix?: string;
  change?: string;
  progress?: number;
  icon?: string;
};

export type LocaleCode = "en" | "de" | "fr" | "it" | "es" | string;

export type TranslationInput = {
  name: string;
  description?: string;
};

export type MenuItemTranslations = Record<LocaleCode, TranslationInput>;

export type RestaurantLocaleConfig = {
  defaultLocale: LocaleCode;
  supportedLocales: LocaleCode[];
};
