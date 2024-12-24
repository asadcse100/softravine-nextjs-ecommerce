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

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Category = {
  id: number;
  category_name: string;
};

const handleDeleteWithConfirmation = async (id: number) => {
  if (window.confirm("Are you sure you want to delete this category?")) {
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
      showSuccessToast("Blog category deleted successfully");
    } else {
      const errorData = await response.json();
      showErrorToast(errorData.error || "Error deleting category");
    }
  } catch (error) {
    showErrorToast("Something went wrong");
  } 
};

// const handleDelete = async (id: number) => {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
//   try {
//     const response = await fetch(`${apiUrl}/server/api/routes/admin/blogs/blogCategories/${id}`, {
//       method: 'DELETE',
//     });

//     if (response.ok) {
      
//       showSuccessToast("Blog category deleted successfully");
//       // toast.success("Blog category deleted successfully");
//     } else {
//       const errorData = await response.json();
//       showErrorToast(errorData.error || "Error deleting category");
//       // toast.error(errorData.error || "Error deleting category");
//     }
//   } catch (error) {
//     showErrorToast("Something went wrong");
//     // toast.error("Something went wrong");
//   }
// };


export const columns: ColumnDef<Category>[] = [
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
    header: "Action",
    id: "actions",
    cell: ({ row }) => {
      const blog_category = row.original;
      const id = blog_category.id;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="dark:bg-slate-700 dark:text-slate-200 bg-slate-100" align="start">
            <DropdownMenuItem className="dark:hover:bg-slate-500 hover:bg-slate-300"><Link href={`/admin/pages/blog_system/category/addnew?id=${id}`}>Edit</Link></DropdownMenuItem>
            <DropdownMenuItem className="dark:hover:bg-slate-500 hover:bg-slate-300" onClick={() => handleDeleteWithConfirmation(id)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "category_name",
    header: "Category Name",
  },
  {
    id: "created_at",
    accessorKey: "created_at",
    header: "Created At",
    cell: function render({ getValue }) {
      return new Date(getValue<any>()).toLocaleString(undefined, {
        timeZone: "UTC",
      });
    },
  },
  {
    id: "updated_at",
    accessorKey: "updated_at",
    header: "Updated_at At",
    cell: function render({ getValue }) {
      return new Date(getValue<any>()).toLocaleString(undefined, {
        timeZone: "UTC",
      });
    },
  },
];
