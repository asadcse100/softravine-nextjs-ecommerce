import { NextResponse } from "next/server";
import { getSellerSaleReport } from '@/app/server/controllers/ReportController';

export async function GET() {
    const result = await getSellerSaleReport();
    try{
        const getSellerSaleReport = result.data;
        return NextResponse.json(getSellerSaleReport);
    }catch(error){
        console.error("Error fetching getSellerSaleReport:", error);
        return NextResponse.json({ error: "Failed to fetch Seller Sale Report" }, { status: 500 });
    }
  }