import { Products, columns } from "./columns"
import { DataTable } from "./data-table"
import Breadcrumb from "@/app/admin/components/Breadcrumbs/Breadcrumb"
async function getData(): Promise<Products[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      icon: "No Image",
      name: "Women Clothing & Fashion",
      parent_category: "Woman",
      discount: 0,
      discount_date_range: 0,
      seller_product: 0,
    },

    {
      id: "728ed52f",
      icon: "No Image",
      name: "Women Clothing & Fashion",
      parent_category: "Woman",
      discount: 0,
      discount_date_range: 0,
      seller_product: 0,
    },

    {
      id: "728ed52f",
      icon: "No Image",
      name: "Women Clothing & Fashion",
      parent_category: "Woman",
      discount: 0,
      discount_date_range: 0,
      seller_product: 0,
    },

    {
      id: "728ed52f",
      icon: "No Image",
      name: "Women Clothing & Fashion",
      parent_category: "Woman",
      discount: 0,
      discount_date_range: 0,
      seller_product: 0,
    },

    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl mt-2 p-4 py-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Breadcrumb pageName="Category Wise Discount" />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
