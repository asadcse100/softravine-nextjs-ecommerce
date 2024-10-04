import { NextResponse } from "next/server";
import { getWithdrawRequestUsers } from '@/app/server/controllers/AffiliateController';

export async function GET() {
  const result = await getWithdrawRequestUsers();
  try{
      const attributes = result.data;
      return NextResponse.json(attributes);
  }catch(error){
      console.error("Error fetching attributes:", error);
      return NextResponse.json({ error: "Failed to fetch attributes" }, { status: 500 });
  }
}
