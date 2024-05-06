import { Products, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Products[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "Dhaka",
      state: "Dhaka",
      area_wise_shipping_cost: 324,
      show_hide: "yes",
    },
    {
      id: "728ed52f",
      name: "Dhaka",
      state: "Dhaka",
      area_wise_shipping_cost: 324,
      show_hide: "yes",
    },
    {
      id: "728ed52f",
      name: "Dhaka",
      state: "Dhaka",
      area_wise_shipping_cost: 324,
      show_hide: "yes",
    },
    {
      id: "728ed52f",
      name: "Dhaka",
      state: "Dhaka",
      area_wise_shipping_cost: 324,
      show_hide: "yes",
    },
    {
      id: "728ed52f",
      name: "Dhaka",
      state: "Dhaka",
      area_wise_shipping_cost: 324,
      show_hide: "yes",
    },
    {
      id: "728ed52f",
      name: "Dhaka",
      state: "Dhaka",
      area_wise_shipping_cost: 324,
      show_hide: "yes",
    },
    {
      id: "728ed52f",
      name: "Dhaka",
      state: "Dhaka",
      area_wise_shipping_cost: 324,
      show_hide: "yes",
    },
    {
      id: "728ed52f",
      name: "Dhaka",
      state: "Dhaka",
      area_wise_shipping_cost: 324,
      show_hide: "yes",
    },
    {
      id: "728ed52f",
      name: "Dhaka",
      state: "Dhaka",
      area_wise_shipping_cost: 324,
      show_hide: "yes",
    },
    {
      id: "728ed52f",
      name: "Dhaka",
      state: "Dhaka",
      area_wise_shipping_cost: 324,
      show_hide: "yes",
    },
    {
      id: "728ed52f",
      name: "Dhaka",
      state: "Dhaka",
      area_wise_shipping_cost: 324,
      show_hide: "yes",
    },
    {
      id: "728ed52f",
      name: "Dhaka",
      state: "Dhaka",
      area_wise_shipping_cost: 324,
      show_hide: "yes",
    },
    {
      id: "728ed52f",
      name: "Dhaka",
      state: "Dhaka",
      area_wise_shipping_cost: 324,
      show_hide: "yes",
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div classname="mDhakare:bg-slastate>
 Dhakalassmanagarea_wise_shipping_cost H324bg-slateshow_hideocayeska <div classpickup_station_contact=""3423234534re:bg-slate-900">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
