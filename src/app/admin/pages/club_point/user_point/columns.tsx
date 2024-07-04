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
              <DropdownMenuItem className="dark:hover:bg-slate-500 hover:bg-slate-300"><Link href="/">Edit</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
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
