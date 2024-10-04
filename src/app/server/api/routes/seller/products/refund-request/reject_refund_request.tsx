import { NextResponse } from "next/server";
import { rejectRefundRequest } from '@/app/server/controllers/RefundRequestController';

export async function GET() {
    const result = await rejectRefundRequest();
    try{
        const rejectRefundRequest = result.data;
        return NextResponse.json(rejectRefundRequest);
    }catch(error){
        console.error("Error fetching rejectRefundRequest:", error);
        return NextResponse.json({ error: "Failed to fetch Reject Refund Request" }, { status: 500 });
    }
  }