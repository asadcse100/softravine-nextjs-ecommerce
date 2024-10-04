import { NextResponse } from "next/server";
import { refundTimeUpdate } from '@/app/server/controllers/RefundRequestController';

export async function GET() {
    const result = await refundTimeUpdate();
    try{
        const refundTimeUpdate = result.data;
        return NextResponse.json(refundTimeUpdate);
    }catch(error){
        console.error("Error fetching refundTimeUpdate:", error);
        return NextResponse.json({ error: "Failed to fetch Refund Time Update" }, { status: 500 });
    }
  }