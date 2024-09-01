import { Products, columns } from "./columns"
import { DataTable } from "./data-table"
import Breadcrumb from "@/app/admin/components/Breadcrumbs/Breadcrumb"
async function getData(): Promise<Products[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      date: "2024-03-03",
      seller: "Mr. Ballal",
      seller_phone: "0324252342",
      amount: 1231,
      payment_detail: "Cash",
    },
    {
      id: "728ed52f",
      date: "2024-03-03",
      seller: "Mr. Ballal",
      seller_phone: "0324252342",
      amount: 1231,
      payment_detail: "Cash",
    },
    {
      id: "728ed52f",
      date: "2024-03-03",
      seller: "Mr. Ballal",
      seller_phone: "0324252342",
      amount: 1231,
      payment_detail: "Cash",
    },
    {
      id: "728ed52f",
      date: "2024-03-03",
      seller: "Mr. Ballal",
      seller_phone: "0324252342",
      amount: 1231,
      payment_detail: "Cash",
    },
    {
      id: "728ed52f",
      date: "2024-03-03",
      seller: "Mr. Ballal",
      seller_phone: "0324252342",
      amount: 1231,
      payment_detail: "Cash",
    },
    {
      id: "728ed52f",
      date: "2024-03-03",
      seller: "Mr. Ballal",
      seller_phone: "0324252342",
      amount: 1231,
      payment_detail: "Cash",
    },
    {
      id: "728ed52f",
      date: "2024-03-03",
      seller: "Mr. Ballal",
      seller_phone: "0324252342",
      amount: 1231,
      payment_detail: "Cash",
    },
    {
      id: "728ed52f",
      date: "2024-03-03",
      seller: "Mr. Ballal",
      seller_phone: "0324252342",
      amount: 1231,
      payment_detail: "Cash",
    },
    {
      id: "728ed52f",
      date: "2024-03-03",
      seller: "Mr. Ballal",
      seller_phone: "0324252342",
      amount: 1231,
      payment_detail: "Cash",
    },
    {
      id: "728ed52f",
      date: "2024-03-03",
      seller: "Mr. Ballal",
      seller_phone: "0324252342",
      amount: 1231,
      payment_detail: "Cash",
    },
    {
      id: "728ed52f",
      date: "2024-03-03",
      seller: "Mr. Ballal",
      seller_phone: "0324252342",
      amount: 1231,
      payment_detail: "Cash",
    },
    {
      id: "728ed52f",
      date: "2024-03-03",
      seller: "Mr. Ballal",
      seller_phone: "0324252342",
      amount: 1231,
      payment_detail: "Cash",
    },
    {
      id: "728ed52f",
      date: "2024-03-03",
      seller: "Mr. Ballal",
      seller_phone: "0324252342",
      amount: 1231,
      payment_detail: "Cash",
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