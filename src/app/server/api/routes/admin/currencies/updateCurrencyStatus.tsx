import { NextResponse } from "next/server";
import { updateCurrencyStatus } from '@/app/server/controllers/CurrencyController';

export async function GET() {
  const result = await updateCurrencyStatus();
  try{
      const updateCurrencyStatus = result.data;
      return NextResponse.json(updateCurrencyStatus);
  }catch(error){
      console.error("Error fetching updateCurrencyStatus:", error);
      return NextResponse.json({ error: "Failed to fetch Filter Update Currency Status" }, { status: 500 });
  }
}
