"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Switch } from "@/app/admin/components/ui/switch";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Products = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "show_hide",
    header: "Show Hide",
    cell: ({ row }) => (
      <div className="flex items-center space-x-12">
        <Switch />
      </div>
    ),
  },
];
