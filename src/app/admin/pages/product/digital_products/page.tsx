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
      product_name: "Acer Nitro 50 N50-620-UA91 Gaming Desktop",
      price: 5445,
      today_deal: "ok",
      published: "ok",
      featured: "ok",
    },

    {
      id: "728ed52f",
      image: "No Image",
      product_name: "Acer Nitro 50 N50-620-UA91 Gaming Desktop",
      price: 5445,
      today_deal: "ok",
      published: "ok",
      featured: "ok",
    },

    {
      id: "728ed52f",
      image: "No Image",
      product_name: "Acer Nitro 50 N50-620-UA91 Gaming Desktop",
      price: 445,
      today_deal: "ok",
      published: "ok",
      featured: "ok",
    },

    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl mt-2 p-4 py-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Breadcrumb pageName="All Product" />
        <Link href="/admin/pages/product/digital_products/addnew">
          <Button variant="outline" className="flex flex-col ml-auto dark:text-slate-300">
            + Add New
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
