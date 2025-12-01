"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DEFAULT_LOCALE, isSupportedLocale } from "@/lib/locales";
import type { LocaleCode, TranslationInput } from "@/types";

type Suggestion = { value: string; conceptKey: string };

async function fetchSuggestions(locale: string, q: string) {
  const res = await fetch(`/api/dictionary/suggest?locale=${locale}&q=${encodeURIComponent(q)}`);
  if (!res.ok) return [];
  const data = (await res.json()) as { suggestions: Suggestion[] };
  return data.suggestions ?? [];
}

export function MenuItemForm({
  supportedLocales = ["en", "de", "fr"],
  defaultLocale = DEFAULT_LOCALE,
}: {
  supportedLocales?: LocaleCode[];
  defaultLocale?: LocaleCode;
}) {
  const [activeLocale, setActiveLocale] = useState<LocaleCode>(defaultLocale);
  const [translations, setTranslations] = useState<Record<LocaleCode, TranslationInput>>({
    [defaultLocale]: { name: "", description: "" },
  });
  const [price, setPrice] = useState<string>("0");
  const [isActive, setIsActive] = useState(true);
  const [query, setQuery] = useState("");

  const suggestionQuery = useQuery({
    queryKey: ["dictionary-suggest", activeLocale, query],
    queryFn: () => fetchSuggestions(activeLocale, query),
    enabled: query.length >= 2,
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/menu/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurantId: "demo-restaurant",
          translations,
          price: Number(price),
          isActive,
          defaultLocale,
          supportedLocales,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Failed to save");
      }
      return res.json();
    },
  });

  const localesToRender = useMemo(
    () => supportedLocales.filter((loc): loc is LocaleCode => isSupportedLocale(loc)),
    [supportedLocales]
  );

  const updateTranslation = (locale: LocaleCode, field: "name" | "description", value: string) => {
    setTranslations((prev) => ({
      ...prev,
      [locale]: {
        ...prev[locale],
        [field]: value,
      },
    }));
    if (field === "name") {
      setQuery(value);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add or edit menu item (multilingual)</CardTitle>
        <p className="text-sm text-muted-foreground">
          Provide translations per locale. Default locale is {defaultLocale.toUpperCase()}.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex flex-wrap gap-2">
          {localesToRender.map((locale) => (
            <Button
              key={locale}
              type="button"
              variant={locale === activeLocale ? "default" : "outline"}
              className={cn("rounded-full px-4", locale === defaultLocale && "border-dashed")}
              onClick={() => setActiveLocale(locale)}
            >
              {locale.toUpperCase()} {locale === defaultLocale ? "(default)" : ""}
            </Button>
          ))}
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Name ({activeLocale})</label>
            <Input
              value={translations[activeLocale]?.name ?? ""}
              onChange={(e) => updateTranslation(activeLocale, "name", e.target.value)}
              placeholder="Still water"
            />
            {suggestionQuery.data && suggestionQuery.data.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {suggestionQuery.data.map((s) => (
                  <button
                    key={`${s.conceptKey}-${s.value}`}
                    type="button"
                    onClick={() => updateTranslation(activeLocale, "name", s.value)}
                    className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold text-foreground"
                  >
                    {s.value}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Description ({activeLocale}) (optional)
            </label>
            <Textarea
              value={translations[activeLocale]?.description ?? ""}
              onChange={(e) => updateTranslation(activeLocale, "description", e.target.value)}
              placeholder="250ml glass bottle"
            />
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Price</label>
            <Input
              type="number"
              min="0"
              step="0.1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between rounded-xl border border-border bg-muted/50 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-foreground">Availability</p>
              <p className="text-xs text-muted-foreground">Toggle to hide/show in the menu.</p>
            </div>
            <Switch checked={isActive} onCheckedChange={setIsActive} />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="muted">Multilingual</Badge>
          <Badge variant="info">AI-ready</Badge>
        </div>

        <div className="flex gap-3">
          <Button onClick={() => createMutation.mutate()} disabled={createMutation.isPending}>
            {createMutation.isPending ? "Saving..." : "Save item"}
          </Button>
          {createMutation.isError && (
            <p className="text-sm text-destructive">
              {(createMutation.error as Error).message || "Failed to save"}
            </p>
          )}
          {createMutation.isSuccess && (
            <p className="text-sm text-emerald-600">Saved locally (mock API).</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
