import Link from "next/link"
import { Products, columns } from "./columns"
import { DataTable } from "./data-table"
import Breadcrumb from "@/app/admin/components/Breadcrumbs/Breadcrumb"
import { Button } from "@/app/admin/components/ui/button"

// async function getData(): Promise<Products[]> {
//   // Fetch data from your API here.

//     try {
//       const response = await fetch('http://localhost:3000/server/api/routes/admin/auctionProduct');
//       console.log(response);
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch');
//       }
//       const result = await response.json();
//       // setData(result); // Set the data from API response
//     } catch (err: any) {
//       return { success: false };
//     }

//   return [
//     {
//       id: "728ed52f",
//       name: "Apple",
//       added_by: "Mr. Lama;",
//       bid_stating_amount: 450,
//       bid_stating_date: "2024-06-12",
//       bid_end_date: "2024-06-12",
//       total_bid: 32,
//     },
//   ]
// }

interface Products {
  id: string;
  name: string;
  added_by: string;
  bid_stating_amount: number;
  bid_stating_date: string;
  bid_end_date: string;
  total_bid: number;
}

async function getData(): Promise<Products[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  try {
    const response = await fetch(`${apiUrl}/server/api/routes/admin/auctionProduct`);
    
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
    <div className="min-h-screen mx-auto max-w-screen-2xl mt-2 p-4 py-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Breadcrumb pageName="All Auction Product" />
        <Link href="/admin/pages/auction/addnew">
          <Button variant="outline" className="flex flex-col ml-auto dark:text-slate-300">
            + Add New
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
