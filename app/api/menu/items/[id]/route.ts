import { NextResponse } from "next/server";
import { z } from "zod";
import { mockMenu } from "@/lib/mock/mockMenu";
import { DEFAULT_LOCALE, isSupportedLocale } from "@/lib/locales";

const translationSchema = z.record(
  z.string().min(2),
  z.object({
    name: z.string().min(1),
    description: z.string().optional(),
  })
);

const updateSchema = z.object({
  translations: translationSchema.optional(),
  price: z.number().optional(),
  isActive: z.boolean().optional(),
  defaultLocale: z.string().optional(),
  supportedLocales: z.array(z.string()).optional(),
});

export async function PATCH(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const body = await _request.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const existing = mockMenu.find((m) => m.id === params.id);
  if (!existing) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  const {
    translations,
    price,
    isActive,
    defaultLocale = DEFAULT_LOCALE,
    supportedLocales,
  } = parsed.data;

  if (translations) {
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
    (existing as typeof mockMenu[number]).translations = {
      ...(existing as typeof mockMenu[number]).translations,
      ...translations,
    };
  }

  if (price !== undefined) {
    (existing as typeof mockMenu[number]).price = price;
  }
  if (isActive !== undefined) {
    (existing as typeof mockMenu[number]).available = isActive;
  }
  (existing as typeof mockMenu[number]).updatedAt = new Date().toISOString();

  return NextResponse.json({ item: existing });
}
