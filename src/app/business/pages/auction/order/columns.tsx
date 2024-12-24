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
import Link from "next/link";
import { showErrorToast, showSuccessToast } from "@/app/admin/components/Toast";

const handleDeleteWithConfirmation = async (id: number) => {
  if (window.confirm("Are you sure you want to delete this Auction product Order?")) {
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
      showSuccessToast("Auction product Order deleted successfully");
    } else {
      const errorData = await response.json();
      showErrorToast(errorData.error || "Error deleting Auction product Order");
    }
  } catch (error) {
    showErrorToast("Something went wrong");
  } 
};

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Products = {
  id: number;
  order_code: number;
  customer: string;
  grand_total: number;
  delivery_status: string;
  payment_method: string;
  payment_status: string;
  refund: string;
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
    accessorKey: "order_code",
    header: "Order Code",
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "grand_total",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("grand_total"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "delivery_status",
    header: "Delivery Status",
  },
  {
    accessorKey: "payment_method",
    header: "Payment Method",
  },
  {
    accessorKey: "payment_status",
    header: "Payment Status",
  },
  {
    accessorKey: "refund",
    header: "Refund",
  },
];
