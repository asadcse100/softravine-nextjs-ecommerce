"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Products = {
  id: string;
  user_name: string;
  product_name: string;
  question: string;
  reply: string;
  quest_time: string;
  reply_time: string;
  status: string;
  view: string;
};

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "user_name",
    header: "User Name",
  },
  {
    accessorKey: "product_name",
    header: "Product Name",
  },
  {
    accessorKey: "question",
    header: "Question",
  },
  {
    accessorKey: "reply",
    header: "Reply",
  },
  {
    accessorKey: "quest_time",
    header: "Quest Time",
  },
  {
    accessorKey: "reply_time",
    header: "Reply Time",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "view",
    header: "View",
  },
];
