import { NextResponse } from "next/server";
import { z } from "zod";
import { DEFAULT_LOCALE, isSupportedLocale } from "@/lib/locales";
import { mockMenu } from "@/lib/mock/mockMenu";

const translationSchema = z.record(
  z.string().min(2),
  z.object({
    name: z.string().min(1),
    description: z.string().optional(),
  })
);

const createSchema = z.object({
  restaurantId: z.string(),
  categoryId: z.string().optional(),
  translations: translationSchema,
  price: z.number(),
  isActive: z.boolean().default(true),
  defaultLocale: z.string().default(DEFAULT_LOCALE),
  supportedLocales: z.array(z.string()).optional(),
});

// In lieu of a database, reuse mockMenu for now.

export async function POST(request: Request) {
  const json = await request.json();
  const parsed = createSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const {
    restaurantId,
    categoryId,
    translations,
    price,
    isActive,
    defaultLocale,
    supportedLocales,
  } = parsed.data;

  if (!translations[defaultLocale]) {
    return NextResponse.json(
      { error: "Default locale translation is required." },
      { status: 400 }
    );
  }

  if (supportedLocales) {
    const invalid = Object.keys(translations).filter(
      (loc) => !supportedLocales.includes(loc) || !isSupportedLocale(loc)
    );
    if (invalid.length > 0) {
      return NextResponse.json(
        { error: `Unsupported locales: ${invalid.join(", ")}` },
        { status: 400 }
      );
    }
  }

  const newItem = {
    id: `mx-${Date.now()}`,
    restaurantId,
    categoryId,
    translations,
    price,
    available: isActive,
    updatedAt: new Date().toISOString(),
    name: translations[defaultLocale].name,
    description: translations[defaultLocale].description ?? "",
    category: translations[defaultLocale].name,
    tags: [] as string[],
  };

  mockMenu.unshift(newItem as (typeof mockMenu)[number]);

  return NextResponse.json({ item: newItem });
}

export async function GET() {
  return NextResponse.json({ items: mockMenu });
}
