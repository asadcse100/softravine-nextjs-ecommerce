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
    accessorKey: "package",
    header: "Package",
  },
  {
    accessorKey: "package_price",
    header: () => <div className="text-center">Package Price</div>,
    cell: ({ row }) => {
      const package_price = parseFloat(row.getValue("package_price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(package_price);

      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "payment_type",
    header: "Payment Type",
  },
];
