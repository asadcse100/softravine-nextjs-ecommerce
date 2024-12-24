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

import { showErrorToast, showSuccessToast } from "@/app/admin/components/Toast";

const handleDeleteWithConfirmation = async (id: number) => {
  if (window.confirm("Are you sure you want to delete this category wise discount?")) {
    await handleDelete(id);
  }
};

const handleDelete = async (id: number) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
  // setIsLoading(true);
  try {
    const response = await fetch(`${apiUrl}/server/api/routes/admin/blogs/blogCategories/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      showSuccessToast("Category wise discount deleted successfully");
    } else {
      const errorData = await response.json();
      showErrorToast(errorData.error || "Error deleting category wise discount");
    }
  } catch (error) {
    showErrorToast("Something went wrong");
  } 
};

const formSchema = z.object({
  product_name: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
});

export type Products = {
  id: number;
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

const inputClass ="bg-zinc-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-900 dark:border-slate-800 dark:placeholder-slate-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

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
