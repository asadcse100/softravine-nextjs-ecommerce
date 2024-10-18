import { NextResponse } from "next/server";
import { getDeliveryBoys } from '@/app/server/controllers/DeliveryBoyController';

export async function GET() {
  const result = await getDeliveryBoys();
  try{
      const delivery_boys = result.data;
      console.log(delivery_boys);
      
      return NextResponse.json(delivery_boys);
  }catch(error){
      console.error("Error fetching Delivery Boys:", error);
      return NextResponse.json({ error: "Failed to fetch Delivery Boys" }, { status: 500 });
  }
}
