"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Products = {
  id: string;
  view: string;
  date: string;
  amount: number;
  income_source: string;
  message: string;
};

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "view",
    header: "Details",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "income_source",
    header: "Income Source",
  },
  {
    accessorKey: "message",
    header: "Message",
  },
];
