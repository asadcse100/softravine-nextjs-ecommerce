import { NextResponse } from "next/server";
import { trackOrder } from '@/app/server/controllers/HomeController';

export async function GET() {
  const result = await trackOrder();
  try{
      const trackOrder = result.data;
      return NextResponse.json(trackOrder);
  }catch(error){
      console.error("Error fetching trackOrder:", error);
      return NextResponse.json({ error: "Failed to fetch Track Order" }, { status: 500 });
  }
}