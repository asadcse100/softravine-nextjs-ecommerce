import { NextResponse } from "next/server";
import { assignDeliveryBoy } from '@/app/server/controllers/OrderController';

export async function GET() {
  const result = await assignDeliveryBoy();
  try{
      const assignDeliveryBoy = result.data;
      return NextResponse.json(assignDeliveryBoy);
  }catch(error){
      console.error("Error fetching assignDeliveryBoy:", error);
      return NextResponse.json({ error: "Failed to fetch Assign Delivery Boy" }, { status: 500 });
  }
}
