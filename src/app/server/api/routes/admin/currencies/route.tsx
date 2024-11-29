import { NextResponse } from "next/server";
import { getCurrencyList, createCurrency } from '@/app/server/controllers/CurrencyController';

export async function GET() {
  const result = await getCurrencyList();
  try{
      const currencies = result.data;
      return NextResponse.json(currencies);
  }catch(error){
      console.error("Error fetching currencies:", error);
      return NextResponse.json({ error: "Failed to fetch currencies" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createCurrency(body);

    if (result.success) {
      return NextResponse.json(
        { message: "Currency added successfully", data: result.data },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error creating new Currency:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}