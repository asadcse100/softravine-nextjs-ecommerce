import { NextResponse } from "next/server";
import { getCommissionHistory } from '@/app/server/controllers/ReportController';

export async function GET() {
    const result = await getCommissionHistory();
    try{
        const getCommissionHistory = result.data;
        return NextResponse.json(getCommissionHistory);
    }catch(error){
        console.error("Error fetching getCommissionHistory:", error);
        return NextResponse.json({ error: "Failed to fetch Commission History" }, { status: 500 });
    }
  }