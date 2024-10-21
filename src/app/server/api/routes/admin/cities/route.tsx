import { NextResponse } from "next/server";
import { getCities } from '@/app/server/controllers/CityController';

export async function GET() {
  const result = await getCities();
  try{
      const getCities = result.data;
      return NextResponse.json(getCities);
  }catch(error){
      return NextResponse.json({ error: "Failed to fetch Cities" }, { status: 500 });
  }
}
