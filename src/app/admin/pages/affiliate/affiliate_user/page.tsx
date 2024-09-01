import { Products, columns } from "./columns"
import { DataTable } from "./data-table"
import { Button } from "@/app/admin/components/ui/button"
import Breadcrumb from "@/app/admin/components/Breadcrumbs/Breadcrumb"
async function getData(): Promise<Products[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      phone: "0171732432",
      email: "m@example.com",
      verification_info: "show",
      approval: "yes",
      due_amount: 1000,
    },
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      phone: "0171732432",
      email: "m@example.com",
      verification_info: "show",
      approval: "yes",
      due_amount: 1000,
    },
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      phone: "0171732432",
      email: "m@example.com",
      verification_info: "show",
      approval: "yes",
      due_amount: 1000,
    },
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      phone: "0171732432",
      email: "m@example.com",
      verification_info: "show",
      approval: "yes",
      due_amount: 1000,
    },
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      phone: "0171732432",
      email: "m@example.com",
      verification_info: "show",
      approval: "yes",
      due_amount: 1000,
    },
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      phone: "0171732432",
      email: "m@example.com",
      verification_info: "show",
      approval: "yes",
      due_amount: 1000,
    },
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      phone: "0171732432",
      email: "m@example.com",
      verification_info: "show",
      approval: "yes",
      due_amount: 1000,
    },
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      phone: "0171732432",
      email: "m@example.com",
      verification_info: "show",
      approval: "yes",
      due_amount: 1000,
    },
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      phone: "0171732432",
      email: "m@example.com",
      verification_info: "show",
      approval: "yes",
      due_amount: 1000,
    },
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      phone: "0171732432",
      email: "m@example.com",
      verification_info: "show",
      approval: "yes",
      due_amount: 1000,
    },
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      phone: "0171732432",
      email: "m@example.com",
      verification_info: "show",
      approval: "yes",
      due_amount: 1000,
    },
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      phone: "0171732432",
      email: "m@example.com",
      verification_info: "show",
      approval: "yes",
      due_amount: 1000,
    },
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      phone: "0171732432",
      email: "m@example.com",
      verification_info: "show",
      approval: "yes",
      due_amount: 1000,
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Breadcrumb pageName="All Affiliate User" />
        <Button variant="outline" className="flex flex-col ml-auto dark:text-slate-300">
          + Add New
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
