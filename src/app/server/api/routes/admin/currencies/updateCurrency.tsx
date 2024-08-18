import { NextResponse } from "next/server";
import { updateCurrency } from '@/app/server/controllers/CurrencyController';

export async function GET() {
  const result = await updateCurrency();
  try{
      const updateCurrency = result.data;
      return NextResponse.json(updateCurrency);
  }catch(error){
      console.error("Error fetching updateCurrency:", error);
      return NextResponse.json({ error: "Failed to fetch Filter Update Currency" }, { status: 500 });
  }
}
