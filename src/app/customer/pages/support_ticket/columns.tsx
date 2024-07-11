"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Products = {
  id: string;
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
