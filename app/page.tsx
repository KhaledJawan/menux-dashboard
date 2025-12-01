import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background via-white to-[#f1f2f6]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(3,2,19,0.06),_transparent_40%),radial-gradient(circle_at_80%_20%,_rgba(142,148,255,0.16),_transparent_35%)]" />
      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-10 md:px-10">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              MX
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground">Menux</p>
              <p className="text-xl font-semibold text-foreground">Restaurant OS</p>
            </div>
          </div>
          <Button asChild variant="ghost" className="rounded-full border border-border">
            <Link href="/dashboard" className="inline-flex items-center gap-2">
              Go to dashboard <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </header>

        <main className="mt-12 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-muted-foreground shadow-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              AI-first restaurant toolkit
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-foreground md:text-5xl">
              Run ordering, menu, and tables from one calm dashboard.
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              Menux unifies your guest app and operator console. Manage menus, track live orders,
              and get AI insights on demand.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="rounded-full px-6" asChild>
                <Link href="/dashboard">
                  Enter admin
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-6" asChild>
                <Link href="/(public)/customer">View customer app</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-1">
            <Card className="border-border/70 shadow-lg">
              <CardHeader>
                <CardTitle>Owner Dashboard</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Stat cards, charts, AI analyst, and management views.
                </p>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center justify-between rounded-xl bg-muted px-4 py-3 text-foreground shadow-sm">
                  <span className="font-semibold">120 Menus</span>
                  <span className="text-xs text-muted-foreground">45% completion</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-muted px-4 py-3 text-foreground shadow-sm">
                  <span className="font-semibold">$19.2k Revenue</span>
                  <span className="text-xs text-muted-foreground">Weekly trend ↑</span>
                </div>
                <div className="rounded-xl border border-dashed border-border px-4 py-3 text-foreground">
                  AI hints for pricing, promos, and menu language built in.
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/70">
              <CardHeader>
                <CardTitle>Guest App</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Mobile-first ordering, built with the same Menux tokens.
                </p>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Powered by the `restaurant-app` sample — we’ll keep styling cohesive between guest
                and admin surfaces.
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
