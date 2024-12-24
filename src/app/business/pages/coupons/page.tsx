import Breadcrumb from "@/app/business/components/Breadcrumbs/Breadcrumb"
import { Products, columns } from "./columns"
import { DataTable } from "./data-table"
import Link from "next/link"
import { Button } from "@/app/business/components/ui/button"

// async function getData(): Promise<Products[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       code: "MAZ100",
//       type: "Cart Base",
//       start_date: "20-04-2024",
//       end_date: "20-04-2024",
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
          <Breadcrumb pageName="Coupons" />
          <Link href="/business/pages/coupons/addnew">
            <Button variant="outline" className="flex flex-col ml-auto dark:text-slate-300">
              + Add New
            </Button>
          </Link>
        </div>
        <DataTable columns={columns} data={data} />
      </div>
      )
}
