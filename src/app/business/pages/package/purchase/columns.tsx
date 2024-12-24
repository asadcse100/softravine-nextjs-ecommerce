"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/app/business/components/ui/button";
import { Checkbox } from "@/app/business/components/ui/checkbox";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/business/components/ui/dropdown-menu";
import { showErrorToast, showSuccessToast } from "@/app/admin/components/Toast";

const handleDeleteWithConfirmation = async (id: number) => {
  if (window.confirm("Are you sure you want to delete this Package purchas?")) {
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
      showSuccessToast("Package purchas deleted successfully");
    } else {
      const errorData = await response.json();
      showErrorToast(errorData.error || "Error deleting Package purchas");
    }
  } catch (error) {
    showErrorToast("Something went wrong");
  } 
};

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Products = {
  id: number;
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
