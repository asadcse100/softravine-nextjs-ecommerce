import { NextResponse } from "next/server";
import { getManualPaymentMethods, storeManualPaymentMethod } from '@/app/server/controllers/ManualPaymentMethodController';

export async function GET() {
  const result = await getManualPaymentMethods();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}
