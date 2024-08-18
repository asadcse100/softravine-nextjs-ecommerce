import { NextResponse } from "next/server";
import { getPaymentHistories } from '@/app/server/controllers/PaymentController';

export async function GET() {
  const result = await getPaymentHistories();
  try{
      const getPaymentHistories = result.data;
      return NextResponse.json(getPaymentHistories);
  }catch(error){
      console.error("Error fetching getPaymentHistories:", error);
      return NextResponse.json({ error: "Failed to fetch Payment Histories" }, { status: 500 });
  }
}
