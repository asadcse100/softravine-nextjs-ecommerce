"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/app/admin/components/ui/button";
import { Checkbox } from "@/app/admin/components/ui/checkbox";
import  { DatePickerWithRange }  from "@/app/admin/components/ui/daterange";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/admin/components/ui/dropdown-menu";

import { z } from "zod";
import Input from "@/shared/Input/Input";
import Link from "next/link";


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
  discount_date_range: number;
  seller_product: number;
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
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
    accessorKey: "seller_product",
    header: "Seller Product",
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
      <Link href="/">Set</Link>
      );
    },
  },
];
