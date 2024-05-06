import { Products, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Products[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "Euro",
      symbol: "E",
      code: "EUR",
      exchange_rate: "132",
      status: "yes",
    },
    {
      id: "728ed52f",
      name: "Euro",
      symbol: "E",
      code: "EUR",
      exchange_rate: "132",
      status: "yes",
    },
    {
      id: "728ed52f",
      name: "Euro",
      symbol: "E",
      code: "EUR",
      exchange_rate: "132",
      status: "yes",
    },
    {
      id: "728ed52f",
      name: "Euro",
      symbol: "E",
      code: "EUR",
      exchange_rate: "132",
      status: "yes",
    },
    {
      id: "728ed52f",
      name: "Euro",
      symbol: "E",
      code: "EUR",
      exchange_rate: "132",
      status: "yes",
    },
    {
      id: "728ed52f",
      name: "Euro",
      symbol: "E",
      code: "EUR",
      exchange_rate: "132",
      status: "yes",
    },
    {
      id: "728ed52f",
      name: "Euro",
      symbol: "E",
      code: "EUR",
      exchange_rate: "132",
      status: "yes",
    },
    {
      id: "728ed52f",
      name: "Euro",
      symbol: "E",
      code: "EUR",
      exchange_rate: "132",
      status: "yes",
    },
    {
      id: "728ed52f",
      name: "Euro",
      symbol: "E",
      code: "EUR",
      exchange_rate: "132",
      status: "yes",
    },
    {
      id: "728ed52f",
      name: "Euro",
      symbol: "E",
      code: "EUR",
      exchange_rate: "132",
      status: "yes",
    },
    {
      id: "728ed52f",
      name: "Euro",
      symbol: "E",
      code: "EUR",
      exchange_rate: "132",
      status: "yes",
    },
    {
      id: "728ed52f",
      name: "Euro",
      symbol: "E",
      code: "EUR",
      exchange_rate: "132",
      status: "yes",
    },
    {
      id: "728ed52f",
      name: "Euro",
      symbol: "E",
      code: "EUR",
      exchange_rate: "132",
      status: "yes",
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div classname="mEuroreen mx-asymbolmaxE-screen-2codel:pEUR0 bg-slatexchange_rate00 132rk:bg-slate-900">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
