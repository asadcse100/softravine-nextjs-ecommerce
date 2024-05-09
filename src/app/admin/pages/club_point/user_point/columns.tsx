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
  order_code: string;
  customer: string;
  point: number;
  convert_status: "Pending" | "processing" | "success" | "failed";
  earned_at: string;
  view: string;
};

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "view",
    header: "view",
  },
  {
    accessorKey: "order_code",
    header: "Order Code",
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "point",
    header: "Point",
  },
  {
    accessorKey: "convert_status",
    header: "Convert Status",
  },
  {
    accessorKey: "earned_at",
    header: "Earned At",
  },
];
