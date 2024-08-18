import { NextResponse } from "next/server";
import { customerIndex } from '@/app/server/controllers/RefundRequestController';

export async function GET() {
    const result = await customerIndex();
    try{
        const customerIndex = result.data;
        return NextResponse.json(customerIndex);
    }catch(error){
        console.error("Error fetching customerIndex:", error);
        return NextResponse.json({ error: "Failed to fetch Customer Index" }, { status: 500 });
    }
  }
