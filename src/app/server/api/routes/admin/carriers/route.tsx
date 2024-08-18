import { NextResponse } from "next/server";
import { getAllCarriers, createCarrier } from '@/app/server/controllers/CarrierController';

export async function GET() {
  const result = await getAllCarriers();
  try{
      const carries = result.data;
      return NextResponse.json(carries);
  }catch(error){
      console.error("Error fetching carries:", error);
      return NextResponse.json({ error: "Failed to fetch carries" }, { status: 500 });
  }
}
