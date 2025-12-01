import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BadgePercent,
  Home,
  LayoutDashboard,
  LucideIcon,
  Settings,
  ShoppingBag,
  Table as TableIcon,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n/language-context";
import { languageKeys } from "@/lib/i18n/keys";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  { href: "/dashboard", label: languageKeys.nav.overview, icon: LayoutDashboard },
  { href: "/dashboard/menu", label: languageKeys.nav.menu, icon: ShoppingBag },
  { href: "/dashboard/orders", label: languageKeys.nav.orders, icon: Home },
  { href: "/dashboard/tables", label: languageKeys.nav.tables, icon: TableIcon },
  { href: "/dashboard/customers", label: languageKeys.nav.customers, icon: Users },
  { href: "/dashboard/settings", label: languageKeys.nav.settings, icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-60 flex-col bg-[#0b0b12] text-white md:flex">
      <div className="flex items-center gap-3 p-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10">
          <span className="text-lg font-semibold">MX</span>
        </div>
        <div>
          <p className="text-sm font-medium text-white/70">Menux</p>
          <p className="text-base font-semibold text-white">Control Hub</p>
        </div>
      </div>

      <div className="mt-2 flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition",
                active
                  ? "bg-white text-[#0b0b12] shadow-lg shadow-primary/10 ring-1 ring-white/40"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 bg-white/5 transition",
                  active && "bg-[#0b0b12]/80 text-white"
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
              <span>{t(item.label)}</span>
            </Link>
          );
        })}
      </div>

      <div className="px-4 pb-5">
        <Card className="flex flex-col gap-3 rounded-xl bg-white/5 text-white/90 ring-1 ring-white/10">
          <div className="px-4 pt-4">
            <p className="text-sm font-semibold">AI Specials</p>
            <p className="text-xs text-white/70">
              Generate promos and smarter menus with one click.
            </p>
          </div>
          <div className="px-4 pb-4">
            <Button
              variant="secondary"
              className="w-full rounded-xl bg-white text-[#0b0b12] hover:-translate-y-[1px]"
            >
              <BadgePercent className="mr-2 h-4 w-4" />
              Ask AI
            </Button>
          </div>
        </Card>
      </div>
    </aside>
  );
}
