import { NextResponse } from "next/server";
import { withAuth } from '@/app/server/middleware/withAuth';
import { updateAuctionProduct, deleteProduct } from '@/app/server/controllers/AuctionProductController';

export async function GET() {
    const result = await getAuctionProductOrders();
    try{
        const users = result.data;
        return NextResponse.json(users);
    }catch(error){
        console.error("Error fetching users:", error);
        return NextResponse.error();
    }
  }
