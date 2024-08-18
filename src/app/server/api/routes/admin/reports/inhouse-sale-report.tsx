
import { NextResponse } from "next/server";
import { getInHouseSaleReport } from '@/app/server/controllers/ReportController';

export async function GET() {
    const result = await getInHouseSaleReport();
    try{
        const getInHouseSaleReport = result.data;
        return NextResponse.json(getInHouseSaleReport);
    }catch(error){
        console.error("Error fetching getInHouseSaleReport:", error);
        return NextResponse.json({ error: "Failed to fetch InHouse Sale Report" }, { status: 500 });
    }
  }