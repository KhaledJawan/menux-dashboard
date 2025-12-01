"use client";

import { useMemo } from "react";
import { Bell, Menu, Moon, Search, Sun } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type TopbarProps = {
  title?: string;
  description?: string;
  onMenuClick?: () => void;
};

export function Topbar({ title, description, onMenuClick }: TopbarProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const pageTitle = useMemo(() => {
    if (title) return title;
    if (pathname.includes("/menu")) return "Menu";
    if (pathname.includes("/orders")) return "Orders";
    if (pathname.includes("/tables")) return "Tables";
    if (pathname.includes("/settings")) return "Settings";
    return "Dashboard";
  }, [pathname, title]);

  const pageDescription =
    description ||
    "Live pulse of your restaurant—orders, revenue, and guest flow in one view.";

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-4 border-b border-border/70 bg-white/85 px-4 py-4 backdrop-blur-md dark:bg-background/90 md:px-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            {pageTitle}
          </h1>
          <p className="text-sm text-muted-foreground">{pageDescription}</p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-3">
        <div className="hidden w-full max-w-md items-center gap-2 rounded-xl border border-border bg-white px-3 py-2 shadow-sm dark:bg-neutral-900 md:flex">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            className="h-9 border-none bg-transparent px-0 text-sm shadow-none focus-visible:ring-0"
            placeholder="Search orders, tables, menu..."
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full border border-border"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>

        <Button variant="ghost" size="icon" className="rounded-full border border-border">
          <Bell className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 rounded-full border border-border bg-white px-2 py-1 pl-1 shadow-sm transition hover:-translate-y-[1px] dark:bg-neutral-900">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-sm font-semibold text-primary-foreground shadow">
                MX
              </span>
              <span className="hidden text-left text-sm font-semibold leading-5 text-foreground md:flex md:flex-col">
                Odama Studio
                <span className="text-xs font-normal text-muted-foreground">
                  Admin
                </span>
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Switch workspace
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className={cn("cursor-pointer text-destructive")}>
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
