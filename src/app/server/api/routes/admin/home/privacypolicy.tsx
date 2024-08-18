import { NextResponse } from "next/server";
import { privacyPolicy } from '@/app/server/controllers/HomeController';

export async function GET() {
  const result = await privacyPolicy();
  try{
      const privacyPolicy = result.data;
      return NextResponse.json(privacyPolicy);
  }catch(error){
      console.error("Error fetching privacyPolicy:", error);
      return NextResponse.json({ error: "Failed to fetch Privacy Policy" }, { status: 500 });
  }
}
