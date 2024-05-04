import { Products, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Products[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      date: '2024-02-03',
      seller: "Apple Store",
      total_amount_to_pay: 342,
      request_amount: 342,
      message: "Dear Sir plase give my balance!",
      status: "Pending",
    },
    {
      id: "728ed52f",
      date: '2024-02-03',
      seller: "Apple Store",
      total_amount_to_pay: 342,
      request_amount: 342,
      message: "Dear Sir plase give my balance!",
      status: "Pending",
    },
    {
      id: "728ed52f",
      date: '2024-02-03',
      seller: "Apple Store",
      total_amount_to_pay: 342,
      request_amount: 342,
      message: "Dear Sir plase give my balance!",
      status: "Pending",
    },
    {
      id: "728ed52f",
      date: '2024-02-03',
      seller: "Apple Store",
      total_amount_to_pay: 342,
      request_amount: 342,
      message: "Dear Sir plase give my balance!",
      status: "Pending",
    },
    {
      id: "728ed52f",
      date: '2024-02-03',
      seller: "Apple Store",
      total_amount_to_pay: 342,
      request_amount: 342,
      message: "Dear Sir plase give my balance!",
      status: "Pending",
    },
    {
      id: "728ed52f",
      date: '2024-02-03',
      seller: "Apple Store",
      total_amount_to_pay: 342,
      request_amount: 342,
      message: "Dear Sir plase give my balance!",
      status: "Pending",
    },
    {
      id: "728ed52f",
      date: '2024-02-03',
      seller: "Apple Store",
      total_amount_to_pay: 342,
      request_amount: 342,
      message: "Dear Sir plase give my balance!",
      status: "Pending",
    },
    {
      id: "728ed52f",
      date: '2024-02-03',
      seller: "Apple Store",
      total_amount_to_pay: 342,
      request_amount: 342,
      message: "Dear Sir plase give my balance!",
      status: "Pending",
    },
    {
      id: "728ed52f",
      date: '2024-02-03',
      seller: "Apple Store",
      total_amount_to_pay: 342,
      request_amount: 342,
      message: "Dear Sir plase give my balance!",
      status: "Pending",
    },
    {
      id: "728ed52f",
      date: '2024-02-03',
      seller: "Apple Store",
      total_amount_to_pay: 342,
      request_amount: 342,
      message: "Dear Sir plase give my balance!",
      status: "Pending",
    },
    {
      id: "728ed52f",
      date: '2024-02-03',
      seller: "Apple Store",
      total_amount_to_pay: 342,
      request_amount: 342,
      message: "Dear Sir plase give my balance!",
      status: "Pending",
    },
    {
      id: "728ed52f",
      date: '2024-02-03',
      seller: "Apple Store",
      total_amount_to_pay: 342,
      request_amount: 342,
      message: "Dear Sir plase give my balance!",
      status: "Pending",
    },
    {
      id: "728ed52f",
      date: '2024-02-03',
      seller: "Apple Store",
      total_amount_to_pay: 342,
      request_amount: 342,
      message: "Dear Sir plase give my balance!",
      status: "Pending",
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
