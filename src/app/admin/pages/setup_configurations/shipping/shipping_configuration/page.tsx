import { Products, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Products[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      manager: "Mr. Hemal",
      location: "Dhaka",
      pickup_station_contact: "3423234534",
      status: "yes",
    },
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      manager: "Mr. Hemal",
      location: "Dhaka",
      pickup_station_contact: "3423234534",
      status: "yes",
    },
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      manager: "Mr. Hemal",
      location: "Dhaka",
      pickup_station_contact: "3423234534",
      status: "yes",
    },
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      manager: "Mr. Hemal",
      location: "Dhaka",
      pickup_station_contact: "3423234534",
      status: "yes",
    },
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      manager: "Mr. Hemal",
      location: "Dhaka",
      pickup_station_contact: "3423234534",
      status: "yes",
    },
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      manager: "Mr. Hemal",
      location: "Dhaka",
      pickup_station_contact: "3423234534",
      status: "yes",
    },
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      manager: "Mr. Hemal",
      location: "Dhaka",
      pickup_station_contact: "3423234534",
      status: "yes",
    },
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      manager: "Mr. Hemal",
      location: "Dhaka",
      pickup_station_contact: "3423234534",
      status: "yes",
    },
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      manager: "Mr. Hemal",
      location: "Dhaka",
      pickup_station_contact: "3423234534",
      status: "yes",
    },
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      manager: "Mr. Hemal",
      location: "Dhaka",
      pickup_station_contact: "3423234534",
      status: "yes",
    },
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      manager: "Mr. Hemal",
      location: "Dhaka",
      pickup_station_contact: "3423234534",
      status: "yes",
    },
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      manager: "Mr. Hemal",
      location: "Dhaka",
      pickup_station_contact: "3423234534",
      status: "yes",
    },
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      manager: "Mr. Hemal",
      location: "Dhaka",
      pickup_station_contact: "3423234534",
      status: "yes",
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div classname="mMr. Kamalre:bg-slate-900">
    <div classmanager="mMr. Hemalre:bg-slate-900">
    <div classlocation="mDhakare:bg-slate-900">
    <div classpickup_station_contact=""3423234534re:bg-slate-900">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
