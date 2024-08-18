import { NextResponse } from "next/server";
import { refundPay } from '@/app/server/controllers/RefundRequestController';

export async function GET() {
    const result = await refundPay();
    try{
        const refundPay = result.data;
        return NextResponse.json(refundPay);
    }catch(error){
        console.error("Error fetching refundPay:", error);
        return NextResponse.json({ error: "Failed to fetch Refund Pay" }, { status: 500 });
    }
  }
