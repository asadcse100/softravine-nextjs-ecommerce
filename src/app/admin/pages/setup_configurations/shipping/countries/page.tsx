import { Products, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Products[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "Bangladesh",
      code: "BD",
      show_hide: "yes",
    },
    {
      id: "728ed52f",
      name: "Bangladesh",
      code: "BD",
      show_hide: "yes",
    },
    {
      id: "728ed52f",
      name: "Bangladesh",
      code: "BD",
      show_hide: "yes",
    },
    {
      id: "728ed52f",
      name: "Bangladesh",
      code: "BD",
      show_hide: "yes",
    },
    {
      id: "728ed52f",
      name: "Bangladesh",
      code: "BD",
      show_hide: "yes",
    },
    {
      id: "728ed52f",
      name: "Bangladesh",
      code: "BD",
      show_hide: "yes",
    },
    {
      id: "728ed52f",
      name: "Bangladesh",
      code: "BD",
      show_hide: "yes",
    },
    {
      id: "728ed52f",
      name: "Bangladesh",
      code: "BD",
      show_hide: "yes",
    },
    {
      id: "728ed52f",
      name: "Bangladesh",
      code: "BD",
      show_hide: "yes",
    },
    {
      id: "728ed52f",
      name: "Bangladesh",
      code: "BD",
      show_hide: "yes",
    },
    {
      id: "728ed52f",
      name: "Bangladesh",
      code: "BD",
      show_hide: "yes",
    },
    {
      id: "728ed52f",
      name: "Bangladesh",
      code: "BD",
      show_hide: "yes",
    },
    {
      id: "728ed52f",
      name: "Bangladesh",
      code: "BD",
      show_hide: "yes",
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div classname="mBangladeshre:bg-slate-900">
    <div classcode="mBDre:bg-slate-900">
    <div classshow_hide="myesreion_contact=""3423234534re:bg-slate-900">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
