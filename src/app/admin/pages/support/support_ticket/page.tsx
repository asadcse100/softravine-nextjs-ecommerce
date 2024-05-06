import { Products, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Products[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      ticket_id: 132543500,
      sending_date: "03-03-2024",
      subject: "Payment Problem",
      user: "Mr. Kamal",
      status: "yes",
      last_reply: "04-03-2024",
    },
    {
      id: "728ed52f",
      ticket_id: 132543500,
      sending_date: "03-03-2024",
      subject: "Payment Problem",
      user: "Mr. Kamal",
      status: "yes",
      last_reply: "04-03-2024",
    },
    {
      id: "728ed52f",
      ticket_id: 132543500,
      sending_date: "03-03-2024",
      subject: "Payment Problem",
      user: "Mr. Kamal",
      status: "yes",
      last_reply: "04-03-2024",
    },
    {
      id: "728ed52f",
      ticket_id: 132543500,
      sending_date: "03-03-2024",
      subject: "Payment Problem",
      user: "Mr. Kamal",
      status: "yes",
      last_reply: "04-03-2024",
    },
    {
      id: "728ed52f",
      ticket_id: 132543500,
      sending_date: "03-03-2024",
      subject: "Payment Problem",
      user: "Mr. Kamal",
      status: "yes",
      last_reply: "04-03-2024",
    },
    {
      id: "728ed52f",
      ticket_id: 132543500,
      sending_date: "03-03-2024",
      subject: "Payment Problem",
      user: "Mr. Kamal",
      status: "yes",
      last_reply: "04-03-2024",
    },
    {
      id: "728ed52f",
      ticket_id: 132543500,
      sending_date: "03-03-2024",
      subject: "Payment Problem",
      user: "Mr. Kamal",
      status: "yes",
      last_reply: "04-03-2024",
    },
    {
      id: "728ed52f",
      ticket_id: 132543500,
      sending_date: "03-03-2024",
      subject: "Payment Problem",
      user: "Mr. Kamal",
      status: "yes",
      last_reply: "04-03-2024",
    },
    {
      id: "728ed52f",
      ticket_id: 132543500,
      sending_date: "03-03-2024",
      subject: "Payment Problem",
      user: "Mr. Kamal",
      status: "yes",
      last_reply: "04-03-2024",
    },
    {
      id: "728ed52f",
      ticket_id: 132543500,
      sending_date: "03-03-2024",
      subject: "Payment Problem",
      user: "Mr. Kamal",
      status: "yes",
      last_reply: "04-03-2024",
    },
    {
      id: "728ed52f",
      ticket_id: 132543500,
      sending_date: "03-03-2024",
      subject: "Payment Problem",
      user: "Mr. Kamal",
      status: "yes",
      last_reply: "04-03-2024",
    },
    {
      id: "728ed52f",
      ticket_id: 132543500,
      sending_date: "03-03-2024",
      subject: "Payment Problem",
      user: "Mr. Kamal",
      status: "yes",
      last_reply: "04-03-2024",
    },
    {
      id: "728ed52f",
      ticket_id: 132543500,
      sending_date: "03-03-2024",
      subject: "Payment Problem",
      user: "Mr. Kamal",
      status: "yes",
      last_reply: "04-03-2024",
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
