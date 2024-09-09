import { NextResponse } from "next/server";
import { getRefundApproved } from '@/app/server/controllers/RefundRequestController';

export async function GET() {
  const result = await getRefundApproved();
  try{
      const getRefundApproved = result.data;
      return NextResponse.json(getRefundApproved);
  }catch(error){
      console.error("Error fetching getRefundApproved:", error);
      return NextResponse.json({ error: "Failed to fetch Refund Approved" }, { status: 500 });
  }
}
