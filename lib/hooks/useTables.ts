import { useQuery } from "@tanstack/react-query";
import { mockTables } from "@/lib/mock/mockTables";
import type { Table } from "@/types";

async function fetchTables(): Promise<Table[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockTables), 100);
  });
}

export function useTables() {
  return useQuery({
    queryKey: ["tables"],
    queryFn: fetchTables,
  });
}
