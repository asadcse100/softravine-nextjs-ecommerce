import { Products, columns } from "./columns"
import { DataTable } from "./data-table"
import Breadcrumb from "@/app/admin/components/Breadcrumbs/Breadcrumb"
async function getData(): Promise<Products[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      date: "03-04-2024",
      title: "Apple phone",
      sender: "Mr. Kamal",
      receiver: "Mr. Rahim",
    },
    {
      id: "728ed52f",
      date: "03-04-2024",
      title: "Apple phone",
      sender: "Mr. Kamal",
      receiver: "Mr. Rahim",
    },
    {
      id: "728ed52f",
      date: "03-04-2024",
      title: "Apple phone",
      sender: "Mr. Kamal",
      receiver: "Mr. Rahim",
    },
    {
      id: "728ed52f",
      date: "03-04-2024",
      title: "Apple phone",
      sender: "Mr. Kamal",
      receiver: "Mr. Rahim",
    },
    {
      id: "728ed52f",
      date: "03-04-2024",
      title: "Apple phone",
      sender: "Mr. Kamal",
      receiver: "Mr. Rahim",
    },
    {
      id: "728ed52f",
      date: "03-04-2024",
      title: "Apple phone",
      sender: "Mr. Kamal",
      receiver: "Mr. Rahim",
    },
    {
      id: "728ed52f",
      date: "03-04-2024",
      title: "Apple phone",
      sender: "Mr. Kamal",
      receiver: "Mr. Rahim",
    },
    {
      id: "728ed52f",
      date: "03-04-2024",
      title: "Apple phone",
      sender: "Mr. Kamal",
      receiver: "Mr. Rahim",
    },
    {
      id: "728ed52f",
      date: "03-04-2024",
      title: "Apple phone",
      sender: "Mr. Kamal",
      receiver: "Mr. Rahim",
    },
    {
      id: "728ed52f",
      date: "03-04-2024",
      title: "Apple phone",
      sender: "Mr. Kamal",
      receiver: "Mr. Rahim",
    },
    {
      id: "728ed52f",
      date: "03-04-2024",
      title: "Apple phone",
      sender: "Mr. Kamal",
      receiver: "Mr. Rahim",
    },
    {
      id: "728ed52f",
      date: "03-04-2024",
      title: "Apple phone",
      sender: "Mr. Kamal",
      receiver: "Mr. Rahim",
    },
    {
      id: "728ed52f",
      date: "03-04-2024",
      title: "Apple phone",
      sender: "Mr. Kamal",
      receiver: "Mr. Rahim",
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl mt-2 p-4 py-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <div className="mb-3 flex flex-row items-center justify-between gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Breadcrumb pageName="Support Conversion" />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
