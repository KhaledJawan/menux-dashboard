import { NextResponse } from "next/server";
import { mockMenu } from "@/lib/mock/mockMenu";
import { DEFAULT_LOCALE, isSupportedLocale } from "@/lib/locales";

export async function GET(
  request: Request,
  { params }: { params: { restaurantSlug: string } }
) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") ?? DEFAULT_LOCALE;

  const items = mockMenu.map((item) => {
    const translations = (item as typeof mockMenu[number]).translations ?? {};
    const fallback = translations[DEFAULT_LOCALE];
    const localized = translations[locale] ?? fallback ?? {
      name: item.name,
      description: item.description,
    };
    return {
      id: item.id,
      category: item.category,
      price: item.price,
      available: item.available,
      name: localized?.name,
      description: localized?.description,
    };
  });

  return NextResponse.json({
    restaurant: params.restaurantSlug,
    locale: isSupportedLocale(locale) ? locale : DEFAULT_LOCALE,
    items,
  });
}
