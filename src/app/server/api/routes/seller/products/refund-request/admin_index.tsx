import { NextResponse } from "next/server";
import { adminIndex } from '@/app/server/controllers/RefundRequestController';

export async function GET() {
    const result = await adminIndex();
    try{
        const adminIndex = result.data;
        return NextResponse.json(adminIndex);
    }catch(error){
        console.error("Error fetching adminIndex:", error);
        return NextResponse.json({ error: "Failed to fetch Admin Index" }, { status: 500 });
    }
  }