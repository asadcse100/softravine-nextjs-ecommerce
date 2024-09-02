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
      image: "No Image",
      name: "Mr Kamal",
      owner: "Apple Store",
      price: 3423,
      point: 3,
      edit: "edit",
    },
    {
      id: "728ed52f",
      image: "No Image",
      name: "Mr Kamal",
      owner: "Apple Store",
      price: 3423,
      point: 3,
      edit: "edit",
    },
    {
      id: "728ed52f",
      image: "No Image",
      name: "Mr Kamal",
      owner: "Apple Store",
      price: 3423,
      point: 3,
      edit: "edit",
    },
    {
      id: "728ed52f",
      image: "No Image",
      name: "Mr Kamal",
      owner: "Apple Store",
      price: 3423,
      point: 3,
      edit: "edit",
    },
    {
      id: "728ed52f",
      image: "No Image",
      name: "Mr Kamal",
      owner: "Apple Store",
      price: 3423,
      point: 3,
      edit: "edit",
    },
    {
      id: "728ed52f",
      image: "No Image",
      name: "Mr Kamal",
      owner: "Apple Store",
      price: 3423,
      point: 3,
      edit: "edit",
    },
    {
      id: "728ed52f",
      image: "No Image",
      name: "Mr Kamal",
      owner: "Apple Store",
      price: 3423,
      point: 3,
      edit: "edit",
    },
    {
      id: "728ed52f",
      image: "No Image",
      name: "Mr Kamal",
      owner: "Apple Store",
      price: 3423,
      point: 3,
      edit: "edit",
    },
    {
      id: "728ed52f",
      image: "No Image",
      name: "Mr Kamal",
      owner: "Apple Store",
      price: 3423,
      point: 3,
      edit: "edit",
    },
    {
      id: "728ed52f",
      image: "No Image",
      name: "Mr Kamal",
      owner: "Apple Store",
      price: 3423,
      point: 3,
      edit: "edit",
    },
    {
      id: "728ed52f",
      image: "No Image",
      name: "Mr Kamal",
      owner: "Apple Store",
      price: 3423,
      point: 3,
      edit: "edit",
    },
    {
      id: "728ed52f",
      image: "No Image",
      name: "Mr Kamal",
      owner: "Apple Store",
      price: 3423,
      point: 3,
      edit: "edit",
    },
    {
      id: "728ed52f",
      image: "No Image",
      name: "Mr Kamal",
      owner: "Apple Store",
      price: 3423,
      point: 3,
      edit: "edit",
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl mt-2 p-4 py-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Breadcrumb pageName="All Auction Product" />
        <Link href="/admin/pages/club_point/product_point/addnew">
          <Button variant="outline" className="flex flex-col ml-auto dark:text-slate-300">
            + Add New
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
