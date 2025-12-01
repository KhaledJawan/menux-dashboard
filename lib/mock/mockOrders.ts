import { Order } from "@/types";

export const mockOrders: Order[] = [
  {
    id: "MX-8421",
    customer: "Roberto Carlo",
    table: "T12",
    placedAt: "2024-06-17T11:20:00Z",
    items: [
      { name: "Cardamom Flat White", quantity: 2, price: 5.5 },
      { name: "Truffle Fries", quantity: 1, price: 7 },
    ],
    total: 18,
    status: "in_progress",
    type: "dine-in",
  },
  {
    id: "MX-8422",
    customer: "Rohmad Khoir",
    table: "T07",
    placedAt: "2024-06-17T10:45:00Z",
    items: [
      { name: "Brioche Slider Duo", quantity: 1, price: 14 },
      { name: "Smoked Citrus Cooler", quantity: 1, price: 8 },
    ],
    total: 22,
    status: "pending",
    type: "dine-in",
  },
  {
    id: "MX-8423",
    customer: "Layla Hussein",
    placedAt: "2024-06-17T10:10:00Z",
    items: [{ name: "Burnt Basque Cheesecake", quantity: 2, price: 9 }],
    total: 18,
    status: "ready",
    type: "takeaway",
  },
  {
    id: "MX-8424",
    customer: "David Kim",
    table: "T03",
    placedAt: "2024-06-17T09:55:00Z",
    items: [
      { name: "Signature Espresso", quantity: 2, price: 4.5 },
      { name: "Citrus Crunch Salad", quantity: 1, price: 12 },
    ],
    total: 21,
    status: "served",
    type: "dine-in",
  },
  {
    id: "MX-8425",
    customer: "Ava Nguyen",
    placedAt: "2024-06-17T09:30:00Z",
    items: [{ name: "Midnight Truffle Pasta", quantity: 1, price: 19 }],
    total: 19,
    status: "accepted",
    type: "delivery",
  },
  {
    id: "MX-8426",
    customer: "Mateo Silva",
    placedAt: "2024-06-16T20:10:00Z",
    items: [
      { name: "Smoked Citrus Cooler", quantity: 3, price: 8 },
      { name: "Brioche Slider Duo", quantity: 1, price: 14 },
    ],
    total: 38,
    status: "paid",
    type: "dine-in",
  },
];
