import { Products, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Products[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      date: "03-03-2024",
      order_id: "12333432-23432",
      product: "Apple",
      amount: 203,
      status: "Approved",
      reason: "Show",
      approval: "yes",
      reject: "view",
    },
    {
      id: "728ed52f",
      date: "03-03-2024",
      order_id: "12333432-23432",
      product: "Apple",
      amount: 203,
      status: "Approved",
      reason: "Show",
      approval: "yes",
      reject: "view",
    },
    {
      id: "728ed52f",
      date: "03-03-2024",
      order_id: "12333432-23432",
      product: "Apple",
      amount: 203,
      status: "Approved",
      reason: "Show",
      approval: "yes",
      reject: "view",
    },
    {
      id: "728ed52f",
      date: "03-03-2024",
      order_id: "12333432-23432",
      product: "Apple",
      amount: 203,
      status: "Approved",
      reason: "Show",
      approval: "yes",
      reject: "view",
    },
    {
      id: "728ed52f",
      date: "03-03-2024",
      order_id: "12333432-23432",
      product: "Apple",
      amount: 203,
      status: "Approved",
      reason: "Show",
      approval: "yes",
      reject: "view",
    },
    {
      id: "728ed52f",
      date: "03-03-2024",
      order_id: "12333432-23432",
      product: "Apple",
      amount: 203,
      status: "Approved",
      reason: "Show",
      approval: "yes",
      reject: "view",
    },
    {
      id: "728ed52f",
      date: "03-03-2024",
      order_id: "12333432-23432",
      product: "Apple",
      amount: 203,
      status: "Approved",
      reason: "Show",
      approval: "yes",
      reject: "view",
    },
    {
      id: "728ed52f",
      date: "03-03-2024",
      order_id: "12333432-23432",
      product: "Apple",
      amount: 203,
      status: "Approved",
      reason: "Show",
      approval: "yes",
      reject: "view",
    },
    {
      id: "728ed52f",
      date: "03-03-2024",
      order_id: "12333432-23432",
      product: "Apple",
      amount: 203,
      status: "Approved",
      reason: "Show",
      approval: "yes",
      reject: "view",
    },
    {
      id: "728ed52f",
      date: "03-03-2024",
      order_id: "12333432-23432",
      product: "Apple",
      amount: 203,
      status: "Approved",
      reason: "Show",
      approval: "yes",
      reject: "view",
    },
    {
      id: "728ed52f",
      date: "03-03-2024",
      order_id: "12333432-23432",
      product: "Apple",
      amount: 203,
      status: "Approved",
      reason: "Show",
      approval: "yes",
      reject: "view",
    },
    {
      id: "728ed52f",
      date: "03-03-2024",
      order_id: "12333432-23432",
      product: "Apple",
      amount: 203,
      status: "Approved",
      reason: "Show",
      approval: "yes",
      reject: "view",
    },
    {
      id: "728ed52f",
      date: "03-03-2024",
      order_id: "12333432-23432",
      product: "Apple",
      amount: 203,
      status: "Approved",
      reason: "Show",
      approval: "yes",
      reject: "view",
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
