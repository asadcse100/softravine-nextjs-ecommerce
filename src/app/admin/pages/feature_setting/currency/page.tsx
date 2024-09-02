import Link from "next/link"
import { Products, columns } from "./columns"
import { DataTable } from "./data-table"
import Breadcrumb from "@/app/admin/components/Breadcrumbs/Breadcrumb"
import { Button } from "@/app/admin/components/ui/button"
async function getData(): Promise<Products[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      edit: "Edit",
      name: "Euro",
      symbol: "E",
      code: "EUR",
      exchange_rate: 120,
      status: "yes",
    },
    {
      id: "728ed52f",
      edit: "Edit",
      name: "Euro",
      symbol: "E",
      code: "EUR",
      exchange_rate: 120,
      status: "yes",
    },
    {
      id: "728ed52f",
      edit: "Edit",
      name: "Euro",
      symbol: "E",
      code: "EUR",
      exchange_rate: 120,
      status: "yes",
    },
    {
      id: "728ed52f",
      edit: "Edit",
      name: "Euro",
      symbol: "E",
      code: "EUR",
      exchange_rate: 120,
      status: "yes",
    },
    {
      id: "728ed52f",
      edit: "Edit",
      name: "Euro",
      symbol: "E",
      code: "EUR",
      exchange_rate: 120,
      status: "yes",
    },
    {
      id: "728ed52f",
      edit: "Edit",
      name: "Euro",
      symbol: "E",
      code: "EUR",
      exchange_rate: 120,
      status: "yes",
    },
    {
      id: "728ed52f",
      edit: "Edit",
      name: "Euro",
      symbol: "E",
      code: "EUR",
      exchange_rate: 120,
      status: "yes",
    },
    {
      id: "728ed52f",
      edit: "Edit",
      name: "Euro",
      symbol: "E",
      code: "EUR",
      exchange_rate: 120,
      status: "yes",
    },
    {
      id: "728ed52f",
      edit: "Edit",
      name: "Euro",
      symbol: "E",
      code: "EUR",
      exchange_rate: 120,
      status: "yes",
    },
    {
      id: "728ed52f",
      edit: "Edit",
      name: "Euro",
      symbol: "E",
      code: "EUR",
      exchange_rate: 120,
      status: "yes",
    },
    {
      id: "728ed52f",
      edit: "Edit",
      name: "Euro",
      symbol: "E",
      code: "EUR",
      exchange_rate: 120,
      status: "yes",
    },
    {
      id: "728ed52f",
      edit: "Edit",
      name: "Euro",
      symbol: "E",
      code: "EUR",
      exchange_rate: 120,
      status: "yes",
    },
    {
      id: "728ed52f",
      edit: "Edit",
      name: "Euro",
      symbol: "E",
      code: "EUR",
      exchange_rate: 120,
      status: "yes",
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl mt-2 p-4 py-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <div className="mb-3 flex flex-row items-center justify-between gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Breadcrumb pageName="All Currency" />
        <Link href="/admin/pages/feature_setting/currency/addnew">
          <Button variant="outline" className="flex flex-col ml-auto dark:text-slate-300">
            + Add New
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
