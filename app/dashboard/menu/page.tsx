"use client";

import { MenuItemForm } from "@/components/dashboard/menu-item-form";
import { useMenu } from "@/lib/hooks/useMenu";

export default function MenuPage() {
  const { data } = useMenu();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Menu</h2>
        <p className="text-sm text-muted-foreground">
          Multilingual items with locale-aware names and descriptions.
        </p>
      </div>

      <MenuItemForm supportedLocales={["en", "de", "fr"]} defaultLocale="en" />

      <p className="text-sm text-muted-foreground">
        Current mock items: {data?.length ?? 0}. Saved items are stored in-memory for now.
      </p>
    </div>
  );
}
