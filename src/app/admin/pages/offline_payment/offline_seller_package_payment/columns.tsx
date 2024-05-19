"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Switch } from "@/app/admin/components/ui/switch";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Products = {
  id: string;
  name: string;
  package: string;
  method: string;
  txn_id: string;
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
