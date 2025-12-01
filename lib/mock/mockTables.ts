import { Table } from "@/types";

export const mockTables: Table[] = [
  { id: "T01", label: "Table 1", capacity: 2, status: "free" },
  { id: "T02", label: "Table 2", capacity: 4, status: "reserved" },
  { id: "T03", label: "Table 3", capacity: 4, status: "occupied", currentOrderId: "MX-8424" },
  { id: "T04", label: "Table 4", capacity: 6, status: "needs_cleaning" },
  { id: "T05", label: "Patio 5", capacity: 2, status: "occupied", currentOrderId: "MX-8421" },
  { id: "T06", label: "Counter 6", capacity: 1, status: "free" },
  { id: "T07", label: "Table 7", capacity: 2, status: "occupied", currentOrderId: "MX-8422" },
  { id: "T08", label: "Lounge 8", capacity: 3, status: "free" },
];
