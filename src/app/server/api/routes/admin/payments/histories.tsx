import { NextResponse } from "next/server";
import { getPaymentHistories } from '@/app/server/controllers/PaymentController';

export async function GET() {
  const result = await getPaymentHistories();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}
