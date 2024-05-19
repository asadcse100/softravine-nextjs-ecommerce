"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Products = {
  id: string;
  search_by: string;
  num_searche: number;
};

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "search_by",
    header: "Search By",
  },
  {
    accessorKey: "num_searche",
    header: "Number Searche",
  },
 
];
