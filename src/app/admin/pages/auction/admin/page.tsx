import { Button } from "@/app/admin/components/ui/button"
import { Products, columns } from "./columns"
import { DataTable } from "./data-table"
import Breadcrumb from "@/app/admin/components/Breadcrumbs/Breadcrumb"

async function getData(): Promise<Products[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "Apple",
      added_by: "Mr. Lama;",
      bid_stating_amount: 450,
      bid_stating_date: "2024-06-12",
      bid_end_date: "2024-06-12",
      total_bid: 32,
    },
    {
      id: "728ed52f",
      name: "Apple",
      added_by: "Mr. Lama;",
      bid_stating_amount: 450,
      bid_stating_date: "2024-06-12",
      bid_end_date: "2024-06-12",
      total_bid: 32,
    },
    {
      id: "728ed52f",
      name: "Apple",
      added_by: "Mr. Lama;",
      bid_stating_amount: 450,
      bid_stating_date: "2024-06-12",
      bid_end_date: "2024-06-12",
      total_bid: 32,
    },
    {
      id: "728ed52f",
      name: "Apple",
      added_by: "Mr. Lama;",
      bid_stating_amount: 450,
      bid_stating_date: "2024-06-12",
      bid_end_date: "2024-06-12",
      total_bid: 32,
    },
    {
      id: "728ed52f",
      name: "Apple",
      added_by: "Mr. Lama;",
      bid_stating_amount: 450,
      bid_stating_date: "2024-06-12",
      bid_end_date: "2024-06-12",
      total_bid: 32,
    },
    {
      id: "728ed52f",
      name: "Apple",
      added_by: "Mr. Lama;",
      bid_stating_amount: 450,
      bid_stating_date: "2024-06-12",
      bid_end_date: "2024-06-12",
      total_bid: 32,
    },
    {
      id: "728ed52f",
      name: "Apple",
      added_by: "Mr. Lama;",
      bid_stating_amount: 450,
      bid_stating_date: "2024-06-12",
      bid_end_date: "2024-06-12",
      total_bid: 32,
    },
    {
      id: "728ed52f",
      name: "Apple",
      added_by: "Mr. Lama;",
      bid_stating_amount: 450,
      bid_stating_date: "2024-06-12",
      bid_end_date: "2024-06-12",
      total_bid: 32,
    },
    {
      id: "728ed52f",
      name: "Apple",
      added_by: "Mr. Lama;",
      bid_stating_amount: 450,
      bid_stating_date: "2024-06-12",
      bid_end_date: "2024-06-12",
      total_bid: 32,
    },
    {
      id: "728ed52f",
      name: "Apple",
      added_by: "Mr. Lama;",
      bid_stating_amount: 450,
      bid_stating_date: "2024-06-12",
      bid_end_date: "2024-06-12",
      total_bid: 32,
    },
    {
      id: "728ed52f",
      name: "Apple",
      added_by: "Mr. Lama;",
      bid_stating_amount: 450,
      bid_stating_date: "2024-06-12",
      bid_end_date: "2024-06-12",
      total_bid: 32,
    },
    {
      id: "728ed52f",
      name: "Apple",
      added_by: "Mr. Lama;",
      bid_stating_amount: 450,
      bid_stating_date: "2024-06-12",
      bid_end_date: "2024-06-12",
      total_bid: 32,
    },
    {
      id: "728ed52f",
      name: "Apple",
      added_by: "Mr. Lama;",
      bid_stating_amount: 450,
      bid_stating_date: "2024-06-12",
      bid_end_date: "2024-06-12",
      total_bid: 32,
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl p-4 mt-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Breadcrumb pageName="Inhouse Auction Products" />
        <Button variant="outline" className="flex flex-col ml-auto dark:text-slate-300">
          + Add New
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
