"use client";

import { ColumnDef } from "@tanstack/react-table";

import { showErrorToast, showSuccessToast } from "@/app/admin/components/Toast";

const handleDeleteWithConfirmation = async (id: number) => {
  if (window.confirm("Are you sure you want to delete this Commission history?")) {
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
      showSuccessToast("Commission history deleted successfully");
    } else {
      const errorData = await response.json();
      showErrorToast(errorData.error || "Error deleting Commission history");
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
  admin_commission: number;
  seller_earing: number;
  created_at: string;
};

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "order_code",
    header: "Order Code",
  },
  {
    accessorKey: "admin_commission",
    header: "Admin Commission",
  },
  {
    accessorKey: "seller_earing",
    header: "Seller Earing",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
];
