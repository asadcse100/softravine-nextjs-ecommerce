"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Products = {
  id: string;
  product_name: string;
  customer: string;
  rating: string;
  comment: string;
  published: string;
};

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "product_name",
    header: "Product Name",
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },
  {
    accessorKey: "comment",
    header: "Comment",
  },
  {
    accessorKey: "published",
    header: "Published",
  },
 
];
