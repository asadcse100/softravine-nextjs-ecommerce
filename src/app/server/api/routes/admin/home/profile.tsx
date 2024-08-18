import { NextResponse } from "next/server";
import { handleProfile } from '@/app/server/controllers/HomeController';

export async function GET() {
  const result = await handleProfile();
  try{
      const profile = result.data;
      return NextResponse.json(profile);
  }catch(error){
      console.error("Error fetching profile:", error);
      return NextResponse.json({ error: "Failed to fetch Profile" }, { status: 500 });
  }
}
