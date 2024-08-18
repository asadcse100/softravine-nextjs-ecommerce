import { NextResponse } from "next/server";
import { getDigitalPurchaseHistory } from '@/app/server/controllers/PurchaseHistoryController';

export async function GET() {
    const result = await getDigitalPurchaseHistory();
    try{
        const digitalPurchaseHistories = result.data;
        return NextResponse.json(digitalPurchaseHistories);
    }catch(error){
        console.error("Error fetching digitalPurchaseHistories:", error);
        return NextResponse.json({ error: "Failed to fetch digital Purchase Histories" }, { status: 500 });
    }
  }
