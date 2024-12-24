"use client";

import { ColumnDef } from "@tanstack/react-table";
import { showErrorToast, showSuccessToast } from "@/app/admin/components/Toast";

const handleDeleteWithConfirmation = async (id: number) => {
  if (window.confirm("Are you sure you want to delete this Support ticket?")) {
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
      showSuccessToast("Blog Support ticket deleted successfully");
    } else {
      const errorData = await response.json();
      showErrorToast(errorData.error || "Error deleting Support ticket");
    }
  } catch (error) {
    showErrorToast("Something went wrong");
  } 
};

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Products = {
  id: number;
  ticket_id: number;
  sending_date: string;
  subject: string;
  status: string;
  view: string;
};

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "ticket_id",
    header: "Ticket Id",
  },
  {
    accessorKey: "sending_date",
    header: "Sending Date",
  },
  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "view",
    header: "View",
  },

];
