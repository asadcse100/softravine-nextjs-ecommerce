import { Products, columns } from "./columns"
import { DataTable } from "./data-table"
import CardDataStats from "@/app/seller/components/CardDataStats";

async function getData(): Promise<Products[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      view: "View",
      date: "02-02-2024",
      amount: 123,
      income_source: "Course",
      message: "Please give me money",
    },
    {
      id: "728ed52f",
      view: "View",
      date: "02-02-2024",
      amount: 123,
      income_source: "Reselling",
      message: "Your cannel 2 resller Poet Shekh Sadik of product sales from 1.98 taka add balance",
    },
    {
      id: "728ed52f",
      view: "View",
      date: "02-02-2024",
      amount: 123,
      income_source: "Drive Pack",
      message: "Please give me money",
    },
    {
      id: "728ed52f",
      view: "View",
      date: "02-02-2024",
      amount: 123,
      income_source: "Mobile Recharge",
      message: "Please give me money",
    },
    {
      id: "728ed52f",
      view: "View",
      date: "02-02-2024",
      amount: 123,
      income_source: "MBs Product",
      message: "Please give me money",
    },
    {
      id: "728ed52f",
      view: "View",
      date: "02-02-2024",
      amount: 123,
      income_source: "Product Commission",
      message: "Admin Commission $45 and your commission is $300",
    },
    {
      id: "728ed52f",
      view: "View",
      date: "02-02-2024",
      amount: 123,
      income_source: "Paid",
      message: "Please give me money",
    },
    {
      id: "728ed52f",
      view: "View",
      date: "02-02-2024",
      amount: 123,
      income_source: "Paid",
      message: "Please give me money",
    },
    {
      id: "728ed52f",
      view: "View",
      date: "02-02-2024",
      amount: 123,
      income_source: "Paid",
      message: "Please give me money",
    },
    {
      id: "728ed52f",
      view: "View",
      date: "02-02-2024",
      amount: 123,
      income_source: "Paid",
      message: "Please give me money",
    },
    {
      id: "728ed52f",
      view: "View",
      date: "02-02-2024",
      amount: 123,
      income_source: "Paid",
      message: "Please give me money",
    },
    {
      id: "728ed52f",
      view: "View",
      date: "02-02-2024",
      amount: 123,
      income_source: "Paid",
      message: "Please give me money",
    },
    {
      id: "728ed52f",
      view: "View",
      date: "02-02-2024",
      amount: 123,
      income_source: "Paid",
      message: "Please give me money",
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl p-4 mt-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">

      <div className="flex">
        <div className="block max-w-sm p-6 bg-white border border-slate-200 shadow hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">$567</h5>
          <p className="font-normal text-slate-700 dark:text-slate-400">Earning Balance</p>
        </div>
        <div className="block max-w-sm p-6 bg-white border border-slate-200 shadow hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700">
          <a href="#"><h5 className="mb-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white">Send Withdrew Request</h5></a>
        </div>
        <div className="block max-w-sm p-6 bg-white border border-slate-200 shadow hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700">
          <a href="#"><h5 className="mb-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white">Earning Balance to Voucher Balance</h5></a>
        </div>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  )
}
