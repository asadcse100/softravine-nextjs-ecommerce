import { NextResponse } from "next/server";
import { vendorIndex } from '@/app/server/controllers/RefundRequestController';

export async function GET() {
    const result = await vendorIndex();
    try{
        const refundRequest = result.data;
        return NextResponse.json(refundRequest);
    }catch(error){
        console.error("Error fetching refundRequest:", error);
        return NextResponse.json({ error: "Failed to fetch Refund Request" }, { status: 500 });
    }
  }
