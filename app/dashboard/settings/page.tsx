"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/lib/i18n/language-context";
import { languageKeys } from "@/lib/i18n/keys";

export default function SettingsPage() {
  const { language, setLanguage, t } = useLanguage();
  const [localLanguage, setLocalLanguage] = useState<"en" | "de">(language);

  useEffect(() => {
    setLocalLanguage(language);
  }, [language]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">{t(languageKeys.settings.title)}</h2>
        <p className="text-sm text-muted-foreground">{t(languageKeys.settings.subtitle)}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t(languageKeys.settings.languageTitle)}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {t(languageKeys.settings.languageSubtitle)}
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          <Select
            value={localLanguage}
            onValueChange={(value) => {
              setLocalLanguage(value as "en" | "de");
              setLanguage(value as "en" | "de");
            }}
          >
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="de">German</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            {t(languageKeys.settings.remember)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
