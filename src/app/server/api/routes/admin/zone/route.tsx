import { NextResponse } from "next/server";
import { store } from '@/app/server/controllers/ZoneController';

export async function GET() {
  const result = await store();
  try{
      const zones = result.data;
      return NextResponse.json(zones);
  }catch(error){
      console.error("Error fetching zones:", error);
      return NextResponse.json({ error: "Failed to fetch Zones" }, { status: 500 });
  }
}