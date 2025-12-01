import { NextResponse } from "next/server";
import { mockDictionary } from "@/lib/mock/mockDictionary";
import { isSupportedLocale } from "@/lib/locales";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") ?? "en";
  const q = (searchParams.get("q") ?? "").toLowerCase();

  if (!q) {
    return NextResponse.json({ suggestions: [] });
  }

  if (!isSupportedLocale(locale)) {
    return NextResponse.json({ suggestions: [] });
  }

  const suggestions = mockDictionary
    .map((concept) => ({
      conceptKey: concept.key,
      value: concept.translations[locale as keyof typeof concept.translations] ?? "",
    }))
    .filter((item) => item.value.toLowerCase().includes(q))
    .slice(0, 8);

  return NextResponse.json({ suggestions });
}
