import Link from "next/link"
import { Products, columns } from "./columns"
import { DataTable } from "./data-table"
import Breadcrumb from "@/app/admin/components/Breadcrumbs/Breadcrumb"
import { Button } from "@/app/admin/components/ui/button"

async function getData(): Promise<Products[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "Mr. Kahn",
      where_from: "Dhaka",
      where_to: "Rajshahi",
      travel_date: "10/06/2024",
      return_date: "10/06/2024",
      ticket_category: "#",
      passenger_number: "011123134",
    },
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      where_from: "Dhaka",
      where_to: "Rajshahi",
      travel_date: "10/06/2024",
      return_date: "10/06/2024",
      ticket_category: "#",
      passenger_number: "011123134",
    },
  ]
}

// async function getData(): Promise<Products[]> {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
//   try {
//     const response = await fetch(`${apiUrl}/server/api/routes/admin/auctionProduct`);
    
//     if (!response.ok) {
//       throw new Error('Failed to fetch');
//     }

//     const result: Products[] = await response.json(); // Assuming the API returns an array of Products
//     return result; // Return the fetched data
//   } catch (err: any) {
//     console.error('Error fetching data:', err);
//     return []; // Return an empty array in case of an error
//   }
// }

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl mt-2 p-4 py-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <div className="mb-3 flex flex-row items-center justify-between gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Breadcrumb pageName="Air Ticket" />
        <Link href="/admin/pages/my_bis_option/air_ticket/addnew">
          <Button variant="outline" className="flex flex-col ml-auto dark:text-slate-300">
            + Add New
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
