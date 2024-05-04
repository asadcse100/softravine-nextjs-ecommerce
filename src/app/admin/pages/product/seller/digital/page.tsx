import { Products, columns } from "./columns"
import { DataTable } from "./data-table"

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
    <div className="min-h-screen mx-auto max-w-screen-2xl p-4 mt-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
