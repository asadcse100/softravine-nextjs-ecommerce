import { NextResponse } from "next/server";
import { toggleUserBanStatus } from '@/app/server/controllers/CustomerController';

export async function GET() {
  const result = await toggleUserBanStatus();
  try{
      const toggleUserBanStatus = result.data;
      return NextResponse.json(toggleUserBanStatus);
  }catch(error){
      console.error("Error fetching toggleUserBanStatus:", error);
      return NextResponse.json({ error: "Failed to fetch Toggle User Ban Status" }, { status: 500 });
  }
}
