import { Products, columns } from "./columns"
import { DataTable } from "./data-table"
import Breadcrumb from "@/app/admin/components/Breadcrumbs/Breadcrumb"

async function getData(): Promise<Products[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      referred_by: "Md rafad",
      referral_user: "Mr. Kamal",
      amount: 3243,
      order_id: "324543534",
      referral_type: "regular",
      product: "Apple iphone 16",
      date: "03-04-2024",
    },
    {
      id: "728ed52f",
      referred_by: "Md rafad",
      referral_user: "Mr. Kamal",
      amount: 3243,
      order_id: "324543534",
      referral_type: "regular",
      product: "Apple iphone 16",
      date: "03-04-2024",
    },
    {
      id: "728ed52f",
      referred_by: "Md rafad",
      referral_user: "Mr. Kamal",
      amount: 3243,
      order_id: "324543534",
      referral_type: "regular",
      product: "Apple iphone 16",
      date: "03-04-2024",
    },
    {
      id: "728ed52f",
      referred_by: "Md rafad",
      referral_user: "Mr. Kamal",
      amount: 3243,
      order_id: "324543534",
      referral_type: "regular",
      product: "Apple iphone 16",
      date: "03-04-2024",
    },
    {
      id: "728ed52f",
      referred_by: "Md rafad",
      referral_user: "Mr. Kamal",
      amount: 3243,
      order_id: "324543534",
      referral_type: "regular",
      product: "Apple iphone 16",
      date: "03-04-2024",
    },
    {
      id: "728ed52f",
      referred_by: "Md rafad",
      referral_user: "Mr. Kamal",
      amount: 3243,
      order_id: "324543534",
      referral_type: "regular",
      product: "Apple iphone 16",
      date: "03-04-2024",
    },
    {
      id: "728ed52f",
      referred_by: "Md rafad",
      referral_user: "Mr. Kamal",
      amount: 3243,
      order_id: "324543534",
      referral_type: "regular",
      product: "Apple iphone 16",
      date: "03-04-2024",
    },
    {
      id: "728ed52f",
      referred_by: "Md rafad",
      referral_user: "Mr. Kamal",
      amount: 3243,
      order_id: "324543534",
      referral_type: "regular",
      product: "Apple iphone 16",
      date: "03-04-2024",
    },
    {
      id: "728ed52f",
      referred_by: "Md rafad",
      referral_user: "Mr. Kamal",
      amount: 3243,
      order_id: "324543534",
      referral_type: "regular",
      product: "Apple iphone 16",
      date: "03-04-2024",
    },
    {
      id: "728ed52f",
      referred_by: "Md rafad",
      referral_user: "Mr. Kamal",
      amount: 3243,
      order_id: "324543534",
      referral_type: "regular",
      product: "Apple iphone 16",
      date: "03-04-2024",
    },
    {
      id: "728ed52f",
      referred_by: "Md rafad",
      referral_user: "Mr. Kamal",
      amount: 3243,
      order_id: "324543534",
      referral_type: "regular",
      product: "Apple iphone 16",
      date: "03-04-2024",
    },
    {
      id: "728ed52f",
      referred_by: "Md rafad",
      referral_user: "Mr. Kamal",
      amount: 3243,
      order_id: "324543534",
      referral_type: "regular",
      product: "Apple iphone 16",
      date: "03-04-2024",
    },
    {
      id: "728ed52f",
      referred_by: "Md rafad",
      referral_user: "Mr. Kamal",
      amount: 3243,
      order_id: "324543534",
      referral_type: "regular",
      product: "Apple iphone 16",
      date: "03-04-2024",
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl mt-2 p-4 py-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Breadcrumb pageName="Affiliate Logs" />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
