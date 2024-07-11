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
  order_code: number;
  admin_commission: number;
  earning: number;
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
    accessorKey: "earning",
    header: "Earning",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
];
