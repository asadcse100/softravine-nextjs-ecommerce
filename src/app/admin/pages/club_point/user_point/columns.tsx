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
import Link from "next/link";

import { showErrorToast, showSuccessToast } from "@/app/admin/components/Toast";

const handleDeleteWithConfirmation = async (id: number) => {
  if (window.confirm("Are you sure you want to delete this User Point?")) {
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
      showSuccessToast("User Point deleted successfully");
    } else {
      const errorData = await response.json();
      showErrorToast(errorData.error || "Error deleting User Point");
    }
  } catch (error) {
    showErrorToast("Something went wrong");
  } 
};

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Products = {
  id: number;
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
        const id = row.original.id;
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dark:bg-slate-700 dark:text-slate-200 bg-slate-100" align="start">
              {/* <DropdownMenuItem className="dark:hover:bg-slate-500 hover:bg-slate-300"><Link href={`/admin/pages/club_point/user_point/addnew?id=${id}`}>Edit</Link></DropdownMenuItem> */}
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
