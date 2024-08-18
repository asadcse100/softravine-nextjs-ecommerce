import { NextResponse } from "next/server";
import { getUserPurchaseHistory } from '@/app/server/controllers/AuctionProductController';
import { withAuth } from '@/app/server/middleware/withAuth';

export async function GET() {
    const result = await getUserPurchaseHistory();
    try{
        const getUserPurchaseHistory = result.data;
        return NextResponse.json(getUserPurchaseHistory);
    }catch(error){
        console.error("Error fetching getUserPurchaseHistory:", error);
        return NextResponse.json({ error: "Failed to fetch User Purchase History" }, { status: 500 });
    }
  }