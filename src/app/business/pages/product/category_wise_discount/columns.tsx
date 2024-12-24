"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/app/business/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/business/components/ui/dropdown-menu";
import Link from "next/link";
import  { DatePickerWithRange }  from "@/app/admin/components/ui/daterange";

import { z } from "zod";
import Input from "@/shared/Input/Input";
import { showErrorToast, showSuccessToast } from "@/app/admin/components/Toast";

const handleDeleteWithConfirmation = async (id: number) => {
  if (window.confirm("Are you sure you want to delete this Category wise discount?")) {
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
      showErrorToast(errorData.error || "Error deleting Category wise discount");
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
