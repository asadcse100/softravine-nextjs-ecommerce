import { NextResponse } from "next/server";
import { getRejectedRefund } from '@/app/server/controllers/RefundRequestController';

export async function GET() {
  const result = await getRejectedRefund();
  try{
      const getRejectedRefund = result.data;
      return NextResponse.json(getRejectedRefund);
  }catch(error){
      console.error("Error fetching getRejectedRefund:", error);
      return NextResponse.json({ error: "Failed to fetch Rejected Refund" }, { status: 500 });
  }
}
