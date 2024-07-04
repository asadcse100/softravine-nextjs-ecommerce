"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/app/seller/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/seller/components/ui/dropdown-menu";
import Link from "next/link";
import  { DatePickerWithRange }  from "@/app/admin/components/ui/daterange";

import { z } from "zod";
import Input from "@/shared/Input/Input";


const formSchema = z.object({
  product_name: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
});

export type Products = {
  id: string;
  icon: string;
  name: string;
  parent_category: string;
  discount: number;
  discount_date_range: string;
  action: string;
};

function onSubmit(values: z.infer<typeof formSchema>) {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  console.log(values);
}

const inputClass =
  "w-full rounded-lg border-[1px] border-primary bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white";

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "icon",
    header: "Icon",
  },
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "parent_category",
    header: "Parent Category",
  },
  {
    accessorKey: "discount",
    header: "Discount",
    cell: ({ row }) => (
      <div className="flex items-center space-x-12">
        <Input className={inputClass} placeholder="0%" />
      </div>
    ),
  },
  {
    accessorKey: "discount_date_range",
    header: "Discount Date Range",
    cell: ({ row }) => (
      <DatePickerWithRange />
    ),
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
            <DropdownMenuItem className="dark:hover:bg-slate-500 hover:bg-slate-300"><Link href="/">Set</Link></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
