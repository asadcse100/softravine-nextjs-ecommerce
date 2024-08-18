import { NextResponse } from "next/server";
import { getStockReport } from '@/app/server/controllers/ReportController';

export async function GET() {
    const result = await getStockReport();
    try{
        const getStockReport = result.data;
        return NextResponse.json(getStockReport);
    }catch(error){
        console.error("Error fetching getStockReport:", error);
        return NextResponse.json({ error: "Failed to fetch Stock Report" }, { status: 500 });
    }
  }
