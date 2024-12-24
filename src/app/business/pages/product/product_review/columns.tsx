"use client";

import { ColumnDef } from "@tanstack/react-table";
import { showErrorToast, showSuccessToast } from "@/app/admin/components/Toast";

const handleDeleteWithConfirmation = async (id: number) => {
  if (window.confirm("Are you sure you want to delete this Product review?")) {
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
      showSuccessToast("Product review deleted successfully");
    } else {
      const errorData = await response.json();
      showErrorToast(errorData.error || "Error deleting Product review");
    }
  } catch (error) {
    showErrorToast("Something went wrong");
  } 
};

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Products = {
  id: number;
  product_name: string;
  customer: string;
  rating: string;
  comment: string;
  published: string;
};

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "product_name",
    header: "Product Name",
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },
  {
    accessorKey: "comment",
    header: "Comment",
  },
  {
    accessorKey: "published",
    header: "Published",
  },
 
];
