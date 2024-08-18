import { NextResponse } from "next/server";
import { index, updateStatus } from '@/app/server/controllers/CountryController';

export async function GET() {
  const result = await index();
  try{
      const countries = result.data;
      return NextResponse.json(countries);
  }catch(error){
      console.error("Error fetching Countries:", error);
      return NextResponse.json({ error: "Failed to fetch Countries" }, { status: 500 });
  }
}
