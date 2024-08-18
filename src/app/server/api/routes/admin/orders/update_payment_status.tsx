import { NextResponse } from "next/server";
import { updatePaymentStatus } from '@/app/server/controllers/OrderController';

export async function GET() {
  const result = await updatePaymentStatus();
  try{
      const updatePaymentStatus = result.data;
      return NextResponse.json(updatePaymentStatus);
  }catch(error){
      console.error("Error fetching updatePaymentStatus:", error);
      return NextResponse.json({ error: "Failed to fetch Update Payment Status" }, { status: 500 });
  }
}
