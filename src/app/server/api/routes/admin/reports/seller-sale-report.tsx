import { NextResponse } from "next/server";
import { getSellerSaleReport } from '@/app/server/controllers/ReportController';

export async function GET() {
    const result = await getSellerSaleReport();
    try{
        const users = result.data;
        return NextResponse.json(users);
    }catch(error){
        console.error("Error fetching users:", error);
        return NextResponse.error();
    }
  }