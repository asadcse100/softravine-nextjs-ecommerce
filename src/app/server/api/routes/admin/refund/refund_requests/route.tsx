import { NextResponse } from "next/server";
import { getRefundRequest } from '@/app/server/controllers/RefundRequestController';

export async function GET() {
  const result = await getRefundRequest();
  try{
      const getRefundRequest = result.data;
      return NextResponse.json(getRefundRequest);
  }catch(error){
      console.error("Error fetching getRefundRequest:", error);
      return NextResponse.json({ error: "Failed to fetch Refund Request" }, { status: 500 });
  }
}
