import { NextResponse } from "next/server";
import { updateDeliveryStatus } from '@/app/server/controllers/OrderController';

export async function GET() {
  const result = await updateDeliveryStatus();
  try{
      const updateDeliveryStatus = result.data;
      return NextResponse.json(updateDeliveryStatus);
  }catch(error){
      console.error("Error fetching updateDeliveryStatus:", error);
      return NextResponse.json({ error: "Failed to fetch Update Delivery Status" }, { status: 500 });
  }
}
