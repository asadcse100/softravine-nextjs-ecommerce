"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Products = {
  id: string;
  code: string;
  points: number;
  converted: string;
  date: string;
  action: string;
};

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "points",
    header: "Points",
  },
  {
    accessorKey: "converted",
    header: "Converted",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "action",
    header: "Action",
  },
];
