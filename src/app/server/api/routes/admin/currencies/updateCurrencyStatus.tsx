import { NextResponse } from "next/server";
import { updateCurrencyStatus } from '@/app/server/controllers/CurrencyController';

export async function GET() {
  const result = await updateCurrencyStatus();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}
