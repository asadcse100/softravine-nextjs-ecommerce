"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Switch } from "@/app/admin/components/ui/switch";

import { showErrorToast, showSuccessToast } from "@/app/admin/components/Toast";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Products = {
  id: number;
  name: string;
  code: string;
  show_hide: string;
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
