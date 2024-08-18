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
