"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Products = {
  id: string;
  order_id: number;
  seller_id: string;
  image: string;
  product: string;
  refund_amount: number;
  seller_approval: string;
  admin_approval: string;
  refund_status: string;
};

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "order_id",
    header: "Order Code",
  },
  {
    accessorKey: "seller_id",
    header: "Seller Name",
  },
  {
    accessorKey: "product",
    header: "Product",
  },
  {
    accessorKey: "refund_amount",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("refund_amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "seller_approval",
    header: "Seller Approval",
  },
  {
    accessorKey: "admin_approval",
    header: "Admin Approval",
  },
  {
    accessorKey: "refund_status",
    header: "Refund Status",
  },
];
