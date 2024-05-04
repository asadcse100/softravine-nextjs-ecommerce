import { Products, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Products[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      customer: "Apple co.",
      date: "2024-03-04",
      amount: 342,
      payment_method: "Club point convert",
      approval: "Pending",
    },
    {
      id: "728ed52f",
      customer: "Apple co.",
      date: "2024-03-04",
      amount: 342,
      payment_method: "Club point convert",
      approval: "Pending",
    },
    {
      id: "728ed52f",
      customer: "Apple co.",
      date: "2024-03-04",
      amount: 342,
      payment_method: "Club point convert",
      approval: "Pending",
    },
    {
      id: "728ed52f",
      customer: "Apple co.",
      date: "2024-03-04",
      amount: 342,
      payment_method: "Club point convert",
      approval: "Pending",
    },
    {
      id: "728ed52f",
      customer: "Apple co.",
      date: "2024-03-04",
      amount: 342,
      payment_method: "Club point convert",
      approval: "Pending",
    },
    {
      id: "728ed52f",
      customer: "Apple co.",
      date: "2024-03-04",
      amount: 342,
      payment_method: "Club point convert",
      approval: "Pending",
    },
    {
      id: "728ed52f",
      customer: "Apple co.",
      date: "2024-03-04",
      amount: 342,
      payment_method: "Club point convert",
      approval: "Pending",
    },
    {
      id: "728ed52f",
      customer: "Apple co.",
      date: "2024-03-04",
      amount: 342,
      payment_method: "Club point convert",
      approval: "Pending",
    },
    {
      id: "728ed52f",
      customer: "Apple co.",
      date: "2024-03-04",
      amount: 342,
      payment_method: "Club point convert",
      approval: "Pending",
    },
    {
      id: "728ed52f",
      customer: "Apple co.",
      date: "2024-03-04",
      amount: 342,
      payment_method: "Club point convert",
      approval: "Pending",
    },
    {
      id: "728ed52f",
      customer: "Apple co.",
      date: "2024-03-04",
      amount: 342,
      payment_method: "Club point convert",
      approval: "Pending",
    },
    {
      id: "728ed52f",
      customer: "Apple co.",
      date: "2024-03-04",
      amount: 342,
      payment_method: "Club point convert",
      approval: "Pending",
    },
    {
      id: "728ed52f",
      customer: "Apple co.",
      date: "2024-03-04",
      amount: 342,
      payment_method: "Club point convert",
      approval: "Pending",
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div classcustomer="min-h- co.screen mxdate-s"2024-03-04"een-2xl p-4 mt-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
    <div classcustomer="min-h- co.screen mxamount-s342een-2xl p-4 mt-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
    <div classcustomer="min-h- co.screen mxpayment_method-s"Club point convert"een-2xl p-4 mt-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
    <div classcustomer="min-h- co.screen mxapproval-s"Pending"een-2xl p-4 mt-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
