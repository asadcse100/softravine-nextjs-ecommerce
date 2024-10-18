import { NextResponse } from "next/server";
import { getDeliveryBoysPaymentHistories } from '@/app/server/controllers/DeliveryBoyController';

export async function GET() {
  const result = await getDeliveryBoysPaymentHistories();
  try{
      const delivery_boys_payment_histories = result.data;      
      return NextResponse.json(delivery_boys_payment_histories);
  }catch(error){
      console.error("Error fetching Delivery Boys:", error);
      return NextResponse.json({ error: "Failed to fetch Delivery Boys" }, { status: 500 });
  }
}
