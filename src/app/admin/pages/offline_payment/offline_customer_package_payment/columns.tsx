"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Switch } from "@/app/admin/components/ui/switch";

import { showErrorToast, showSuccessToast } from "@/app/admin/components/Toast";

const handleDeleteWithConfirmation = async (id: number) => {
  if (window.confirm("Are you sure you want to delete this Online customer package payment?")) {
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
      showSuccessToast("Online customer package payment deleted successfully");
    } else {
      const errorData = await response.json();
      showErrorToast(errorData.error || "Error deleting Online customer package payment");
    }
  } catch (error) {
    showErrorToast("Something went wrong");
  } 
};

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Products = {
  id: number;
  name: string;
  package: string;
  method: string;
  txn_d: string;
  reciept: string;
  approval: string;
  date: string;
};

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "package",
    header: "Package",
  },
  {
    accessorKey: "method",
    header: "Method",
  },
  {
    accessorKey: "txn_id",
    header: "TXN ID",
  },
  {
    accessorKey: "reciept",
    header: "Reciept",
  },
  {
    accessorKey: "approval",
    header: "Approval",
    cell: ({ row }) => (
      <div className="flex items-center space-x-12">
        <Switch />
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
  },
];
