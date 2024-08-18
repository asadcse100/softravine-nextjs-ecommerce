import { NextResponse } from "next/server";
import { getOrderDetails } from '@/app/server/controllers/OrderController';

export async function GET() {
  const result = await getOrderDetails();
  try{
      const getOrderDetails = result.data;
      return NextResponse.json(getOrderDetails);
  }catch(error){
      console.error("Error fetching getOrderDetails:", error);
      return NextResponse.json({ error: "Failed to fetch Order Details" }, { status: 500 });
  }
}
