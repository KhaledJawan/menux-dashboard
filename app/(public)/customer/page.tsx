import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CustomerPreviewPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-4 py-10 md:px-8">
      <Button asChild variant="ghost" className="w-fit rounded-full border border-border">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Customer Web App</CardTitle>
          <p className="text-sm text-muted-foreground">
            Placeholder entry point for the mobile menu/ordering surface.
          </p>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            The production customer experience lives inside the `restaurant-app` package today.
            We’ll mirror its branding tokens in this workspace and later link routes directly.
          </p>
          <p>
            For now, navigate the admin via the left rail. Customer routes will be wired to the same
            backend once APIs land.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
