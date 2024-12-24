import { Products, columns } from "./columns"
import { DataTable } from "./data-table"
import CardDataStats from "@/app/business/components/CardDataStats";
import Breadcrumb from "@/app/business/components/Breadcrumbs/Breadcrumb"

// async function getData(): Promise<Products[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       view: "View",
//       date: "02-02-2024",
//       amount: 123,
//       income_source: "Course",
//       message: "Please give me money",
//     },
//   ]
// }

async function getData(): Promise<Products[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  try {
    const response = await fetch(`${apiUrl}/server/api/routes/business/auctionProduct`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }

    const result: Products[] = await response.json(); // Assuming the API returns an array of Products
    return result; // Return the fetched data
  } catch (err: any) {
    console.error('Error fetching data:', err);
    return []; // Return an empty array in case of an error
  }
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl p-4 mt-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Breadcrumb pageName="Voucher Balance" />
      </div>
      <div className="flex">
        <div className="block max-w-sm p-6 bg-white border border-slate-200 shadow hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">$567</h5>
          <p className="font-normal text-slate-700 dark:text-slate-400">Voucher Balance</p>
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
