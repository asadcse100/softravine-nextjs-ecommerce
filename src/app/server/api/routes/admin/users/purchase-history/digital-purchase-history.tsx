import { NextResponse } from "next/server";
import { getDigitalPurchaseHistory } from '@/app/server/controllers/PurchaseHistoryController';

export async function GET() {
    const result = await getDigitalPurchaseHistory();
    try{
        const users = result.data;
        return NextResponse.json(users);
    }catch(error){
        console.error("Error fetching users:", error);
        return NextResponse.error();
    }
  }
