import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">Settings</h2>
        <p className="text-sm text-muted-foreground">
          Branding, language, and theme controls will land here.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Upcoming</CardTitle>
          <p className="text-sm text-muted-foreground">
            Local preferences with next-themes + i18n scaffolding.
          </p>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Add localization options (EN/DE/FA), restaurant info form, and theme toggles.
        </CardContent>
      </Card>
    </div>
  );
}
