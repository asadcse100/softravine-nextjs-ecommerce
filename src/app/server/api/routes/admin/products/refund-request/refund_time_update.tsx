import { NextResponse } from "next/server";
import { refundTimeUpdate } from '@/app/server/controllers/RefundRequestController';

export async function GET() {
    const result = await refundTimeUpdate();
    try{
        const users = result.data;
        return NextResponse.json(users);
    }catch(error){
        console.error("Error fetching users:", error);
        return NextResponse.error();
    }
  }