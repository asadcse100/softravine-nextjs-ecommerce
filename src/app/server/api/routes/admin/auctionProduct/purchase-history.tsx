import { NextResponse } from "next/server";
import { getUserPurchaseHistory } from '@/app/server/controllers/AuctionProductController';
import { withAuth } from '@/app/server/middleware/withAuth';

export async function GET() {
    const result = await getUserPurchaseHistory();
    try{
        const users = result.data;
        return NextResponse.json(users);
    }catch(error){
        console.error("Error fetching users:", error);
        return NextResponse.error();
    }
  }