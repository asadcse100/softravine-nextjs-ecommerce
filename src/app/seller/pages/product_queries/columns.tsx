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
            <DropdownMenuItem className="dark:hover:bg-slate-500 hover:bg-slate-300"><Link href="/">Delete</Link></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
