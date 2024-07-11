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
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Products = {
  id: string;
  product: string;
  my_bid: number;
  highest_bid: number;
  end_date: string;
};

export const columns: ColumnDef<Products>[] = [
  {
    header: "Action",
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="dark:bg-slate-700 dark:text-slate-200 bg-slate-100" align="start">
            <DropdownMenuItem className="dark:hover:bg-slate-500 hover:bg-slate-300"><Link href="/">View</Link></DropdownMenuItem>
            <DropdownMenuItem className="dark:hover:bg-slate-500 hover:bg-slate-300"><Link href="/">Download</Link></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "product",
    header: "Product",
  },
  {
    accessorKey: "my_bid",
    header: () => <div className="text-right">My Bid</div>,
    cell: ({ row }) => {
      const my_bid = parseFloat(row.getValue("my_bid"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(my_bid);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "highest_bid",
    header: () => <div className="text-right">Highest Bid</div>,
    cell: ({ row }) => {
      const highest_bid = parseFloat(row.getValue("highest_bid"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(highest_bid);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "end_date",
    header: "End Date",
  },
];
