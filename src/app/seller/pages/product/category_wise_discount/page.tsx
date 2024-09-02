import Breadcrumb from "@/app/seller/components/Breadcrumbs/Breadcrumb"
import { Products, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Products[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      icon: "No Image",
      name: "Apple",
      parent_category: "-",
      discount: 10,
      discount_date_range: "Select Date",
      action: "Set",
    },
    {
      id: "728ed52f",
      icon: "No Image",
      name: "Apple",
      parent_category: "-",
      discount: 10,
      discount_date_range: "Select Date",
      action: "Set",
    },
    {
      id: "728ed52f",
      icon: "No Image",
      name: "Apple",
      parent_category: "-",
      discount: 10,
      discount_date_range: "Select Date",
      action: "Set",
    },
    {
      id: "728ed52f",
      icon: "No Image",
      name: "Apple",
      parent_category: "-",
      discount: 10,
      discount_date_range: "Select Date",
      action: "Set",
    },
    {
      id: "728ed52f",
      icon: "No Image",
      name: "Apple",
      parent_category: "-",
      discount: 10,
      discount_date_range: "Select Date",
      action: "Set",
    },
    {
      id: "728ed52f",
      icon: "No Image",
      name: "Apple",
      parent_category: "-",
      discount: 10,
      discount_date_range: "Select Date",
      action: "Set",
    },
    {
      id: "728ed52f",
      icon: "No Image",
      name: "Apple",
      parent_category: "-",
      discount: 10,
      discount_date_range: "Select Date",
      action: "Set",
    },
    {
      id: "728ed52f",
      icon: "No Image",
      name: "Apple",
      parent_category: "-",
      discount: 10,
      discount_date_range: "Select Date",
      action: "Set",
    },
    {
      id: "728ed52f",
      icon: "No Image",
      name: "Apple",
      parent_category: "-",
      discount: 10,
      discount_date_range: "Select Date",
      action: "Set",
    },
    {
      id: "728ed52f",
      icon: "No Image",
      name: "Apple",
      parent_category: "-",
      discount: 10,
      discount_date_range: "Select Date",
      action: "Set",
    },
    {
      id: "728ed52f",
      icon: "No Image",
      name: "Apple",
      parent_category: "-",
      discount: 10,
      discount_date_range: "Select Date",
      action: "Set",
    },
    {
      id: "728ed52f",
      icon: "No Image",
      name: "Apple",
      parent_category: "-",
      discount: 10,
      discount_date_range: "Select Date",
      action: "Set",
    },
    {
      id: "728ed52f",
      icon: "No Image",
      name: "Apple",
      parent_category: "-",
      discount: 10,
      discount_date_range: "Select Date",
      action: "Set",
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl mt-2 p-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Breadcrumb pageName="Category Wise Discount" />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
