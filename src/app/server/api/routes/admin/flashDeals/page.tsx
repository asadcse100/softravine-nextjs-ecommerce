import { NextResponse } from "next/server";
import { getFlashDeals, createFlashDeal } from '@/app/server/controllers/FlashDealController';

export async function GET() {
    const result = await getFlashDeals();
    try{
        const users = result.data;
        return NextResponse.json(users);
    }catch(error){
        console.error("Error fetching users:", error);
        return NextResponse.error();
    }
  }
