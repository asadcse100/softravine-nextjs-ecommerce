import { NextResponse } from "next/server";
import { payToSeller } from '@/app/server/controllers/CommissionController';

export async function GET() {
    const result = await payToSeller();
    try{
        const commission = result.data;
        return NextResponse.json(commission);
    }catch(error){
        console.error("Error fetching commission:", error);
        return NextResponse.json({ error: "Failed to fetch commission" }, { status: 500 });
    }
  }