import { mockMenu } from "@/lib/mock/mockMenu";
import { mockOrders } from "@/lib/mock/mockOrders";
import { formatCurrency } from "@/lib/utils";

const AI_RESPONSE_DELAY = 260;

function summarizeTopItems() {
  const counts: Record<string, number> = {};
  mockOrders.forEach((order) => {
    order.items.forEach((item) => {
      counts[item.name] = (counts[item.name] || 0) + item.quantity;
    });
  });
  const sorted = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return sorted
    .map(([name, qty], idx) => `${idx + 1}. ${name} (${qty} orders)`)
    .join("\n");
}

export async function generateAIResponse(prompt: string): Promise<string> {
  const trimmed = prompt.toLowerCase();

  if (trimmed.includes("popular") || trimmed.includes("most ordered")) {
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve(
            `Top items right now:\n${summarizeTopItems()}\n\nMost upsell-ready: Cardamom Flat White → pair with Brioche Slider Duo.`
          ),
        AI_RESPONSE_DELAY
      )
    );
  }

  if (trimmed.includes("price") || trimmed.includes("suggest")) {
    const mid = mockMenu[Math.floor(Math.random() * mockMenu.length)];
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve(
            `Suggested price window for ${mid.name}: ${formatCurrency(
              mid.price - 1
            )} – ${formatCurrency(mid.price + 2)} based on similar items.`
          ),
        AI_RESPONSE_DELAY
      )
    );
  }

  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(
          "Here’s a quick take based on today’s data: dinner rush peaks 7–9pm, and drink add-ons lift revenue by ~12%. Try highlighting the Smoked Citrus Cooler in the hero banner."
        ),
      AI_RESPONSE_DELAY
    )
  );
}
