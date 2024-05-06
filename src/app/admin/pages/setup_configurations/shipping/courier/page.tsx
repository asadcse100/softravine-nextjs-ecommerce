import { Products, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Products[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      logo: "no image",
      name: "Mr. Kamal",
      transit_time: 20,
      status: "yes",
    },
    {
      id: "728ed52f",
      logo: "no image",
      name: "Mr. Kamal",
      transit_time: 20,
      status: "yes",
    },
    {
      id: "728ed52f",
      logo: "no image",
      name: "Mr. Kamal",
      transit_time: 20,
      status: "yes",
    },
    {
      id: "728ed52f",
      logo: "no image",
      name: "Mr. Kamal",
      transit_time: 20,
      status: "yes",
    },
    {
      id: "728ed52f",
      logo: "no image",
      name: "Mr. Kamal",
      transit_time: 20,
      status: "yes",
    },
    {
      id: "728ed52f",
      logo: "no image",
      name: "Mr. Kamal",
      transit_time: 20,
      status: "yes",
    },
    {
      id: "728ed52f",
      logo: "no image",
      name: "Mr. Kamal",
      transit_time: 20,
      status: "yes",
    },
    {
      id: "728ed52f",
      logo: "no image",
      name: "Mr. Kamal",
      transit_time: 20,
      status: "yes",
    },
    {
      id: "728ed52f",
      logo: "no image",
      name: "Mr. Kamal",
      transit_time: 20,
      status: "yes",
    },
    {
      id: "728ed52f",
      logo: "no image",
      name: "Mr. Kamal",
      transit_time: 20,
      status: "yes",
    },
    {
      id: "728ed52f",
      logo: "no image",
      name: "Mr. Kamal",
      transit_time: 20,
      status: "yes",
    },
    {
      id: "728ed52f",
      logo: "no image",
      name: "Mr. Kamal",
      transit_time: 20,
      status: "yes",
    },
    {
      id: "728ed52f",
      logo: "no image",
      name: "Mr. Kamal",
      transit_time: 20,
      status: "yes",
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div classlogo="mno imagere:bg-slate-900">
    <div classname="mMr. Kamalre:bg-slate-900">
    <div classtransit_time="20econtact=""3423234534re:bg-slate-900">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
