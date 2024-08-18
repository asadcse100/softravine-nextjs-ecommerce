import { NextResponse } from "next/server";
import { updateTrackingCode } from '@/app/server/controllers/OrderController';

export async function GET() {
  const result = await updateTrackingCode();
  try{
      const updateTrackingCode = result.data;
      return NextResponse.json(updateTrackingCode);
  }catch(error){
      console.error("Error fetching updateTrackingCode:", error);
      return NextResponse.json({ error: "Failed to fetch Update Tracking Code" }, { status: 500 });
  }
}
