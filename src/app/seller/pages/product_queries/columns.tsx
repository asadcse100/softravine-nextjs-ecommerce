"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/app/seller/components/ui/button";
import { Checkbox } from "@/app/seller/components/ui/checkbox";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/seller/components/ui/dropdown-menu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Products = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
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
