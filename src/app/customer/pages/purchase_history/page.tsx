import { Products, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Products[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      date: "02-02-2024",
      code: "02-02-2024",
      amount: 123,
      delivery_status: "Delivered",
      payment_status: "Paid",
    },
    {
      id: "728ed52f",
      date: "02-02-2024",
      code: "02-02-2024",
      amount: 123,
      delivery_status: "Delivered",
      payment_status: "Paid",
    },
    {
      id: "728ed52f",
      date: "02-02-2024",
      code: "02-02-2024",
      amount: 123,
      delivery_status: "Delivered",
      payment_status: "Paid",
    },
    {
      id: "728ed52f",
      date: "02-02-2024",
      code: "02-02-2024",
      amount: 123,
      delivery_status: "Delivered",
      payment_status: "Paid",
    },
    {
      id: "728ed52f",
      date: "02-02-2024",
      code: "02-02-2024",
      amount: 123,
      delivery_status: "Delivered",
      payment_status: "Paid",
    },
    {
      id: "728ed52f",
      date: "02-02-2024",
      code: "02-02-2024",
      amount: 123,
      delivery_status: "Delivered",
      payment_status: "Paid",
    },
    {
      id: "728ed52f",
      date: "02-02-2024",
      code: "02-02-2024",
      amount: 123,
      delivery_status: "Delivered",
      payment_status: "Paid",
    },
    {
      id: "728ed52f",
      date: "02-02-2024",
      code: "02-02-2024",
      amount: 123,
      delivery_status: "Delivered",
      payment_status: "Paid",
    },
    {
      id: "728ed52f",
      date: "02-02-2024",
      code: "02-02-2024",
      amount: 123,
      delivery_status: "Delivered",
      payment_status: "Paid",
    },
    {
      id: "728ed52f",
      date: "02-02-2024",
      code: "02-02-2024",
      amount: 123,
      delivery_status: "Delivered",
      payment_status: "Paid",
    },
    {
      id: "728ed52f",
      date: "02-02-2024",
      code: "02-02-2024",
      amount: 123,
      delivery_status: "Delivered",
      payment_status: "Paid",
    },
    {
      id: "728ed52f",
      date: "02-02-2024",
      code: "02-02-2024",
      amount: 123,
      delivery_status: "Delivered",
      payment_status: "Paid",
    },
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
