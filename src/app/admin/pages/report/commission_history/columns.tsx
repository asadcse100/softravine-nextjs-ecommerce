"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Products = {
  id: string;
  order_code: number;
  admin_commission: number;
  seller_earing: number;
  created_at: string;
};

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "order_code",
    header: "Order Code",
  },
  {
    accessorKey: "admin_commission",
    header: "Admin Commission",
  },
  {
    accessorKey: "seller_earing",
    header: "Seller Earing",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
];
