import { useQuery } from "@tanstack/react-query";
import { mockMenu } from "@/lib/mock/mockMenu";
import type { MenuItem } from "@/types";

async function fetchMenu(): Promise<MenuItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockMenu), 120);
  });
}

export function useMenu() {
  return useQuery({
    queryKey: ["menu"],
    queryFn: fetchMenu,
  });
}
