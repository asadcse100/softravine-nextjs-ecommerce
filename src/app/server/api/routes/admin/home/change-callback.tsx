import { NextResponse } from "next/server";
import { emailChangeCallback } from '@/app/server/controllers/HomeController';

export async function GET() {
  const result = await emailChangeCallback();
  try{
      const emailChangeCallback = result.data;
      return NextResponse.json(emailChangeCallback);
  }catch(error){
      console.error("Error fetching emailChangeCallback:", error);
      return NextResponse.json({ error: "Failed to fetch Email Change Callback" }, { status: 500 });
  }
}
