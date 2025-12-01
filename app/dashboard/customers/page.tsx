import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CustomersPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">Customers</h2>
        <p className="text-sm text-muted-foreground">
          Lightweight placeholder for future CRM and loyalty insights.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Coming soon</CardTitle>
          <p className="text-sm text-muted-foreground">
            Recent visitors, repeat guests, and segmenting will appear here.
          </p>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          This stub keeps routing ready for when APIs arrive.
        </CardContent>
      </Card>
    </div>
  );
}
