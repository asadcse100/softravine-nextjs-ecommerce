import { Products, columns } from "./columns"
import { DataTable } from "./data-table"

// async function getData(): Promise<Products[]> {
//   // Fetch data from your API here.
//   const res = await fetch('https://api.example.com/')
//   return [
//     {
//       id: "728ed52f",
//       name: "Apple",
//       bid_starting_amount: 120,
//       auction_start_date: "10-03-2024",
//       auction_end_date: "10-03-2024",
//       total_bid: 3,
//     },
//   ]
// }

async function getData(): Promise<Products[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  try {
    const response = await fetch(`${apiUrl}/server/api/routes/customer/auctionProduct`);
    
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
      <DataTable columns={columns} data={data} />
    </div>
  )
}
