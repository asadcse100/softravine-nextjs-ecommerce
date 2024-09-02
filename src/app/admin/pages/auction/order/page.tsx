import { Products, columns } from "./columns"
import { DataTable } from "./data-table"
import Breadcrumb from "@/app/admin/components/Breadcrumbs/Breadcrumb"

async function getData(): Promise<Products[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      order_code: 100904 - 4353346,
      customer: "Mr. Kamal",
      amount: 3454,
      delivery_status: "Pending",
      payment_method: "Cash On delivery",
      payment_status: "Paid",
      refund: "No Refund",
    },
    {
      id: "728ed52f",
      order_code: 100904 - 4353346,
      customer: "Mr. Kamal",
      amount: 3454,
      delivery_status: "Pending",
      payment_method: "Cash On delivery",
      payment_status: "Paid",
      refund: "No Refund",
    },
    {
      id: "728ed52f",
      order_code: 100904 - 4353346,
      customer: "Mr. Kamal",
      amount: 3454,
      delivery_status: "Pending",
      payment_method: "Cash On delivery",
      payment_status: "Paid",
      refund: "No Refund",
    },
    {
      id: "728ed52f",
      order_code: 100904 - 4353346,
      customer: "Mr. Kamal",
      amount: 3454,
      delivery_status: "Pending",
      payment_method: "Cash On delivery",
      payment_status: "Paid",
      refund: "No Refund",
    },
    {
      id: "728ed52f",
      order_code: 100904 - 4353346,
      customer: "Mr. Kamal",
      amount: 3454,
      delivery_status: "Pending",
      payment_method: "Cash On delivery",
      payment_status: "Paid",
      refund: "No Refund",
    },
    {
      id: "728ed52f",
      order_code: 100904 - 4353346,
      customer: "Mr. Kamal",
      amount: 3454,
      delivery_status: "Pending",
      payment_method: "Cash On delivery",
      payment_status: "Paid",
      refund: "No Refund",
    },
    {
      id: "728ed52f",
      order_code: 100904 - 4353346,
      customer: "Mr. Kamal",
      amount: 3454,
      delivery_status: "Pending",
      payment_method: "Cash On delivery",
      payment_status: "Paid",
      refund: "No Refund",
    },
    {
      id: "728ed52f",
      order_code: 100904 - 4353346,
      customer: "Mr. Kamal",
      amount: 3454,
      delivery_status: "Pending",
      payment_method: "Cash On delivery",
      payment_status: "Paid",
      refund: "No Refund",
    },
    {
      id: "728ed52f",
      order_code: 100904 - 4353346,
      customer: "Mr. Kamal",
      amount: 3454,
      delivery_status: "Pending",
      payment_method: "Cash On delivery",
      payment_status: "Paid",
      refund: "No Refund",
    },
    {
      id: "728ed52f",
      order_code: 100904 - 4353346,
      customer: "Mr. Kamal",
      amount: 3454,
      delivery_status: "Pending",
      payment_method: "Cash On delivery",
      payment_status: "Paid",
      refund: "No Refund",
    },
    {
      id: "728ed52f",
      order_code: 100904 - 4353346,
      customer: "Mr. Kamal",
      amount: 3454,
      delivery_status: "Pending",
      payment_method: "Cash On delivery",
      payment_status: "Paid",
      refund: "No Refund",
    },
    {
      id: "728ed52f",
      order_code: 100904 - 4353346,
      customer: "Mr. Kamal",
      amount: 3454,
      delivery_status: "Pending",
      payment_method: "Cash On delivery",
      payment_status: "Paid",
      refund: "No Refund",
    },
    {
      id: "728ed52f",
      order_code: 100904 - 4353346,
      customer: "Mr. Kamal",
      amount: 3454,
      delivery_status: "Pending",
      payment_method: "Cash On delivery",
      payment_status: "Paid",
      refund: "No Refund",
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl mt-2 p-4 py-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <div className="mb-3 flex gap-3 flex-row items-center justify-between sm:flex-row sm:items-center sm:justify-between">
        <Breadcrumb pageName="Auction Product Orders" />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
