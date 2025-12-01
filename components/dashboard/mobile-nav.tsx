"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./sidebar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="left-0 top-0 h-full max-w-xs translate-x-0 translate-y-0 rounded-none border-0 bg-white p-0 shadow-2xl dark:bg-neutral-900 data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left">
        <div className="flex flex-col gap-1 px-4 py-4">
          <p className="px-2 text-xs font-semibold uppercase text-muted-foreground">
            Navigation
          </p>
          {navItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onOpenChange(false)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition",
                  active
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted/70"
                )}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-white">
                  <Icon className="h-4 w-4" />
                </span>
                {item.label}
              </Link>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
