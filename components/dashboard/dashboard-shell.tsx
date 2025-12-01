"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { MobileNav } from "./mobile-nav";
import { Topbar } from "./topbar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-background to-[#f3f4f7] text-foreground dark:from-background dark:to-background">
      <Sidebar />
      <div className="md:pl-60">
        <Topbar onMenuClick={() => setMobileOpen(true)} />
        <main className="px-4 pb-10 pt-4 sm:px-6 md:p-6 space-y-6">{children}</main>
      </div>
      <MobileNav open={mobileOpen} onOpenChange={setMobileOpen} />
    </div>
  );
}
