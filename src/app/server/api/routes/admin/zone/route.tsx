import { NextResponse } from "next/server";
import { getZones } from '@/app/server/controllers/ZoneController';

export async function GET() {
  const result = await getZones();
  try{
      const getZones = result.data;
      return NextResponse.json(getZones);
  }catch(error){
      console.error("Error fetching getZones:", error);
      return NextResponse.json({ error: "Failed to fetch getZones" }, { status: 500 });
  }
}