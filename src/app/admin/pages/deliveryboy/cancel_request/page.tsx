import { Products, columns } from "./columns"
import { DataTable } from "./data-table"
import Breadcrumb from "@/app/admin/components/Breadcrumbs/Breadcrumb"
async function getData(): Promise<Products[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      code: 23543456-545464,
      request_by: "Leton",
      request_at: "2024-05-03",
    },
    {
      id: "728ed52f",
      code: 23543456-545464,
      request_by: "Leton",
      request_at: "2024-05-03",
    },
    {
      id: "728ed52f",
      code: 23543456-545464,
      request_by: "Leton",
      request_at: "2024-05-03",
    },
    {
      id: "728ed52f",
      code: 23543456-545464,
      request_by: "Leton",
      request_at: "2024-05-03",
    },
    {
      id: "728ed52f",
      code: 23543456-545464,
      request_by: "Leton",
      request_at: "2024-05-03",
    },
    {
      id: "728ed52f",
      code: 23543456-545464,
      request_by: "Leton",
      request_at: "2024-05-03",
    },
    {
      id: "728ed52f",
      code: 23543456-545464,
      request_by: "Leton",
      request_at: "2024-05-03",
    },
    {
      id: "728ed52f",
      code: 23543456-545464,
      request_by: "Leton",
      request_at: "2024-05-03",
    },
    {
      id: "728ed52f",
      code: 23543456-545464,
      request_by: "Leton",
      request_at: "2024-05-03",
    },
    {
      id: "728ed52f",
      code: 23543456-545464,
      request_by: "Leton",
      request_at: "2024-05-03",
    },
    {
      id: "728ed52f",
      code: 23543456-545464,
      request_by: "Leton",
      request_at: "2024-05-03",
    },
    {
      id: "728ed52f",
      code: 23543456-545464,
      request_by: "Leton",
      request_at: "2024-05-03",
    },
    {
      id: "728ed52f",
      code: 23543456-545464,
      request_by: "Leton",
      request_at: "2024-05-03",
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl p-4 mt-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
