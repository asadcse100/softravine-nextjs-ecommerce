import { Products, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Products[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      product_name: "Acer Nitro 50 N50-620-UA91 Gaming Desktop",
      added_by: "Alamin",
      num_of_sale: 254,
      price: 5445,
      rating: 445,
      total_stock: 4250,
      today_deal: true,
      published: true,
      featured: true,
    },
 
    {
      id: "728ed52f",
      product_name: "Acer Nitro 50 N50-620-UA91 Gaming Desktop",
      added_by: "Alamin",
      num_of_sale: 254,
      price: 5445,
      rating: 445,
      total_stock: 4250,
      today_deal: true,
      published: true,
      featured: true,
    },
 
    {
      id: "728ed52f",
      product_name: "Acer Nitro 50 N50-620-UA91 Gaming Desktop",
      added_by: "Alamin",
      num_of_sale: 29,
      price: 445,
      rating: 445,
      total_stock: 450,
      today_deal: true,
      published: true,
      featured: true,
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
