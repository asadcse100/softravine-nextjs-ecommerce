import { NextResponse } from "next/server";
import { rejectedIndex } from '@/app/server/controllers/RefundRequestController';

export async function GET() {
    const result = await rejectedIndex();
    try{
        const rejectedIndex = result.data;
        return NextResponse.json(rejectedIndex);
    }catch(error){
        console.error("Error fetching rejectedIndex:", error);
        return NextResponse.json({ error: "Failed to fetch Rejected Index" }, { status: 500 });
    }
  }
