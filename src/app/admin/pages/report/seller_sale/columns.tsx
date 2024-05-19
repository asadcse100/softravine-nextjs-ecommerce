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
  seller_name: string;
  shop_name: string;
  num_of_sale: number;
  order_amount: number;
};

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "seller_name",
    header: "Seller Name",
  },
  {
    accessorKey: "shop_name",
    header: "Shop Name",
  },
  {
    accessorKey: "num_of_sale",
    header: "Num Of Sale",
  },
  {
    accessorKey: "order_amount",
    header: "Order Amount",
  },
  
];
