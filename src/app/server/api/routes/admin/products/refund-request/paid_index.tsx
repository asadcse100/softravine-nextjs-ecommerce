import { NextResponse } from "next/server";
import { paidIndex } from '@/app/server/controllers/RefundRequestController';

export async function GET() {
    const result = await paidIndex();
    try{
        const paidIndex = result.data;
        return NextResponse.json(paidIndex);
    }catch(error){
        console.error("Error fetching paidIndex:", error);
        return NextResponse.json({ error: "Failed to fetch Paid Index" }, { status: 500 });
    }
  }