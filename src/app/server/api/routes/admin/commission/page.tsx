import { NextResponse } from "next/server";
import { payToSeller } from '@/app/server/controllers/CommissionController';

export async function GET() {
    const result = await payToSeller();
    try{
        const users = result.data;
        return NextResponse.json(users);
    }catch(error){
        console.error("Error fetching users:", error);
        return NextResponse.error();
    }
  }