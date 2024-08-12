import { NextResponse } from "next/server";
import { getCurrencyList, createCurrency } from '@/app/server/controllers/CurrencyController';

export async function GET() {
  const result = await getCurrencyList();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}
