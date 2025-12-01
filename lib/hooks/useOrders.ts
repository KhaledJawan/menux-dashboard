import { useQuery } from "@tanstack/react-query";
import { mockOrders } from "@/lib/mock/mockOrders";
import type { Order } from "@/types";

async function fetchOrders(): Promise<Order[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockOrders), 140);
  });
}

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });
}
