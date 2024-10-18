import { NextResponse } from "next/server";
import { getDeliveryBoysCollectedHistory } from '@/app/server/controllers/DeliveryBoyController';

export async function GET() {
  const result = await getDeliveryBoysCollectedHistory();
  try{
      const deliveryBoysCollectedHistory = result.data;
      console.log(deliveryBoysCollectedHistory);
      
      return NextResponse.json(deliveryBoysCollectedHistory);
  }catch(error){
      return NextResponse.json({ error: "Failed to fetch Boys Collected History" }, { status: 500 });
  }
}
