"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/app/admin/components/ui/button";
import { Checkbox } from "@/app/admin/components/ui/checkbox";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/admin/components/ui/dropdown-menu";

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
    accessorKey: "order_code",
    header: "Order Code",
  },
  {
    accessorKey: "seller_name",
    header: "Seller Name",
  },
  {
    accessorKey: "product",
    header: "Product",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "seller_approval",
    header: "Seller Approval",
  },
  {
    accessorKey: "admin_approval",
    header: "Admin Approval",
  },
  {
    accessorKey: "refund_status",
    header: "Refund Status",
  },
];
