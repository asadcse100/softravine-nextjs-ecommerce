import { NextResponse } from "next/server";
import { purchasePaymentDone } from '@/app/server/controllers/CustomerPackageController';

export async function GET() {
  const result = await purchasePaymentDone();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}
