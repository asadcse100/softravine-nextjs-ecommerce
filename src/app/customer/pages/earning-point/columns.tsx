"use client";

import { ColumnDef } from "@tanstack/react-table";
import { showErrorToast, showSuccessToast } from "@/app/admin/components/Toast";

const handleDeleteWithConfirmation = async (id: number) => {
  if (window.confirm("Are you sure you want to delete this Earning point?")) {
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
      showSuccessToast("Earning point deleted successfully");
    } else {
      const errorData = await response.json();
      showErrorToast(errorData.error || "Error deleting Earning point");
    }
  } catch (error) {
    showErrorToast("Something went wrong");
  } 
};

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Products = {
  id: number;
  code: string;
  points: number;
  converted: string;
  date: string;
  action: string;
};

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "points",
    header: "Points",
  },
  {
    accessorKey: "converted",
    header: "Converted",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "action",
    header: "Action",
  },
];
