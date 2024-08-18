import { NextResponse } from "next/server";
import { refundStickerUpdate } from '@/app/server/controllers/RefundRequestController';

export async function GET() {
    const result = await refundStickerUpdate();
    try{
        const refundStickerUpdate = result.data;
        return NextResponse.json(refundStickerUpdate);
    }catch(error){
        console.error("Error fetching refundStickerUpdate:", error);
        return NextResponse.json({ error: "Failed to fetch Refund Sticker Update" }, { status: 500 });
    }
  }