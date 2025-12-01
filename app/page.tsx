import Link from "next/link";
import { ArrowRight, Lock, Mail, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

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
              <p className="text-sm font-semibold text-muted-foreground">
                Menux
              </p>
              <p className="text-xl font-semibold text-foreground">
                Restaurant OS
              </p>
            </div>
          </div>
          <Button
            asChild
            variant="ghost"
            className="rounded-full border border-border"
          >
            <Link href="/contact" className="inline-flex items-center gap-2">
              Contact us <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </header>

        <main className="mt-12 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-muted-foreground shadow-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              AI-powered control - start free
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-foreground md:text-5xl">
              Sign in or create a Menux account to run your restaurant
              beautifully.
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              Menux is the all-in-one, AI-assisted restaurant OS - simple
              onboarding, reliable day-to-day ops, and instant insights for
              menus, orders, and tables.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="rounded-full px-6" asChild>
                <Link href="#auth">
                  Get started free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-6"
                asChild
              >
                <Link href="/(public)/customer">Preview customer ordering</Link>
              </Button>
            </div>
          </div>

          <Card id="auth" className="border-border/70 shadow-lg">
            <CardHeader>
              <CardTitle>Log in or create an account</CardTitle>
              <p className="text-sm text-muted-foreground">
                Use email + password or sign in with Google. Your account is
                free to try - no commitment.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-foreground"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@restaurant.com"
                    className="pl-9"
                    defaultValue="1234"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-foreground"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    defaultValue="1234"
                    className="pl-9"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  New here? Use any email to create your workspace and explore
                  the AI dashboard.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Button className="w-full" asChild>
                  <Link href="/dashboard">Continue with email</Link>
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <User className="h-4 w-4" />
                  Continue with Google
                </Button>
              </div>

              <div className="rounded-xl border border-dashed border-border bg-muted/50 p-3 text-sm text-muted-foreground">
                Lightning-fast sign-in with Google; any email works if you
                prefer. Your trial includes full AI features for menus, orders,
                and analytics.
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
