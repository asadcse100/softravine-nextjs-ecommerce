import { Products, columns } from "./columns"
import { DataTable } from "./data-table"
import Breadcrumb from "@/app/admin/components/Breadcrumbs/Breadcrumb"
async function getData(): Promise<Products[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "Apple Store",
      phone: "0213424",
      email: "m@example.com",
      verification: "No",
      approval: "Yes",
      num_of_product: 45,
      due_to_seller: 43453,
      status: "Regular",
    },
    {
      id: "728ed52f",
      name: "Apple Store",
      phone: "0213424",
      email: "m@example.com",
      verification: "No",
      approval: "Yes",
      num_of_product: 45,
      due_to_seller: 43453,
      status: "Regular",
    },
    {
      id: "728ed52f",
      name: "Apple Store",
      phone: "0213424",
      email: "m@example.com",
      verification: "No",
      approval: "Yes",
      num_of_product: 45,
      due_to_seller: 43453,
      status: "Regular",
    },
    {
      id: "728ed52f",
      name: "Apple Store",
      phone: "0213424",
      email: "m@example.com",
      verification: "No",
      approval: "Yes",
      num_of_product: 45,
      due_to_seller: 43453,
      status: "Regular",
    },
    {
      id: "728ed52f",
      name: "Apple Store",
      phone: "0213424",
      email: "m@example.com",
      verification: "No",
      approval: "Yes",
      num_of_product: 45,
      due_to_seller: 43453,
      status: "Regular",
    },
    {
      id: "728ed52f",
      name: "Apple Store",
      phone: "0213424",
      email: "m@example.com",
      verification: "No",
      approval: "Yes",
      num_of_product: 45,
      due_to_seller: 43453,
      status: "Regular",
    },
    {
      id: "728ed52f",
      name: "Apple Store",
      phone: "0213424",
      email: "m@example.com",
      verification: "No",
      approval: "Yes",
      num_of_product: 45,
      due_to_seller: 43453,
      status: "Regular",
    },
    {
      id: "728ed52f",
      name: "Apple Store",
      phone: "0213424",
      email: "m@example.com",
      verification: "No",
      approval: "Yes",
      num_of_product: 45,
      due_to_seller: 43453,
      status: "Regular",
    },
    {
      id: "728ed52f",
      name: "Apple Store",
      phone: "0213424",
      email: "m@example.com",
      verification: "No",
      approval: "Yes",
      num_of_product: 45,
      due_to_seller: 43453,
      status: "Regular",
    },
    {
      id: "728ed52f",
      name: "Apple Store",
      phone: "0213424",
      email: "m@example.com",
      verification: "No",
      approval: "Yes",
      num_of_product: 45,
      due_to_seller: 43453,
      status: "Regular",
    },
    {
      id: "728ed52f",
      name: "Apple Store",
      phone: "0213424",
      email: "m@example.com",
      verification: "No",
      approval: "Yes",
      num_of_product: 45,
      due_to_seller: 43453,
      status: "Regular",
    },
    {
      id: "728ed52f",
      name: "Apple Store",
      phone: "0213424",
      email: "m@example.com",
      verification: "No",
      approval: "Yes",
      num_of_product: 45,
      due_to_seller: 43453,
      status: "Regular",
    },
    {
      id: "728ed52f",
      name: "Apple Store",
      phone: "0213424",
      email: "m@example.com",
      verification: "No",
      approval: "Yes",
      num_of_product: 45,
      due_to_seller: 43453,
      status: "Regular",
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl mt-2 p-4 py-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <div className="mb-3 flex flex-row items-center justify-between gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Breadcrumb pageName="All Seller" />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
