import { Products, columns } from "./columns";
import { DataTable } from "./data-table";
import Breadcrumb from "@/app/admin/components/Breadcrumbs/Breadcrumb"
async function getData(): Promise<Products[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      manager: "Mr. Hemal",
      location: "Dhaka",
      pickup_station_contact: "3423234534",
      status: "Open",
    },
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      manager: "Mr. Hemal",
      location: "Dhaka",
      pickup_station_contact: "3423234534",
      status: "Open",
    },
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      manager: "Mr. Hemal",
      location: "Dhaka",
      pickup_station_contact: "3423234534",
      status: "Open",
    },
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      manager: "Mr. Hemal",
      location: "Dhaka",
      pickup_station_contact: "3423234534",
      status: "Open",
    },
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      manager: "Mr. Hemal",
      location: "Dhaka",
      pickup_station_contact: "3423234534",
      status: "Open",
    },
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      manager: "Mr. Hemal",
      location: "Dhaka",
      pickup_station_contact: "3423234534",
      status: "Open",
    },
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      manager: "Mr. Hemal",
      location: "Dhaka",
      pickup_station_contact: "3423234534",
      status: "Open",
    },
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      manager: "Mr. Hemal",
      location: "Dhaka",
      pickup_station_contact: "3423234534",
      status: "Open",
    },
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      manager: "Mr. Hemal",
      location: "Dhaka",
      pickup_station_contact: "3423234534",
      status: "Open",
    },
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      manager: "Mr. Hemal",
      location: "Dhaka",
      pickup_station_contact: "3423234534",
      status: "Open",
    },
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      manager: "Mr. Hemal",
      location: "Dhaka",
      pickup_station_contact: "3423234534",
      status: "Open",
    },
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      manager: "Mr. Hemal",
      location: "Dhaka",
      pickup_station_contact: "3423234534",
      status: "Open",
    },
    {
      id: "728ed52f",
      name: "Mr. Kamal",
      manager: "Mr. Hemal",
      location: "Dhaka",
      pickup_station_contact: "3423234534",
      status: "Open",
    },
    // ...
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl p-4 mt-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
