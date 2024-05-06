import { Products, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Products[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      tax_type: "VAT",
      status: "yes",
    },
    {
      id: "728ed52f",
      tax_type: "VAT",
      status: "yes",
    },
    {
      id: "728ed52f",
      tax_type: "VAT",
      status: "yes",
    },
    {
      id: "728ed52f",
      tax_type: "VAT",
      status: "yes",
    },
    {
      id: "728ed52f",
      tax_type: "VAT",
      status: "yes",
    },
    {
      id: "728ed52f",
      tax_type: "VAT",
      status: "yes",
    },
    {
      id: "728ed52f",
      tax_type: "VAT",
      status: "yes",
    },
    {
      id: "728ed52f",
      tax_type: "VAT",
      status: "yes",
    },
    {
      id: "728ed52f",
      tax_type: "VAT",
      status: "yes",
    },
    {
      id: "728ed52f",
      tax_type: "VAT",
      status: "yes",
    },
    {
      id: "728ed52f",
      tax_type: "VAT",
      status: "yes",
    },
    {
      id: "728ed52f",
      tax_type: "VAT",
      status: "yes",
    },
    {
      id: "728ed52f",
      tax_type: "VAT",
      status: "yes",
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div classtax_type="mVATre:bg-slate-900">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
