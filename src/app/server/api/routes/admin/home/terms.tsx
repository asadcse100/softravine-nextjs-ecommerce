import { NextResponse } from "next/server";
import { termsConditions } from '@/app/server/controllers/HomeController';

export async function GET() {
  const result = await termsConditions();
  try{
      const termsConditions = result.data;
      return NextResponse.json(termsConditions);
  }catch(error){
      console.error("Error fetching termsConditions:", error);
      return NextResponse.json({ error: "Failed to fetch Terms Conditions" }, { status: 500 });
  }
}
