import { NextResponse } from "next/server";
import { updateCarrierStatus } from '@/app/server/controllers/CarrierController';

export async function GET() {
  const result = await updateCarrierStatus();
  try{
      const up = result.data;
      return NextResponse.json(up);
  }catch(error){
      console.error("Error fetching up:", error);
      return NextResponse.json({ error: "Failed to fetch Filter up" }, { status: 500 });
  }
}
