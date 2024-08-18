import { NextResponse } from "next/server";
import { getPurchaseHistory } from '@/app/server/controllers/PurchaseHistoryController';

export async function GET() {
    const result = await getPurchaseHistory();
    try{
        const reOrder = result.data;
        return NextResponse.json(reOrder);
    }catch(error){
        console.error("Error fetching reOrder:", error);
        return NextResponse.json({ error: "Failed to fetch ReOrder" }, { status: 500 });
    }
  }
