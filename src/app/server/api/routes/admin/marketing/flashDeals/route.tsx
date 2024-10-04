import { NextResponse } from "next/server";
import { getFlashDeals, createFlashDeal } from '@/app/server/controllers/FlashDealController';

export async function GET() {
    const result = await getFlashDeals();
    try{
        const flashDeals = result.data;
        return NextResponse.json(flashDeals);
    }catch(error){
        console.error("Error fetching flashDeals:", error);
        return NextResponse.json({ error: "Failed to fetch flashDeals" }, { status: 500 });
    }
  }
