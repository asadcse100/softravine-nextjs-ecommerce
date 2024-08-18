import { NextResponse } from "next/server";
import { getUserSearchReport  } from '@/app/server/controllers/ReportController';

export async function GET() {
    const result = await getUserSearchReport();
    try{
        const getUserSearchReport = result.data;
        return NextResponse.json(getUserSearchReport);
    }catch(error){
        console.error("Error fetching getUserSearchReport:", error);
        return NextResponse.json({ error: "Failed to fetch User Search Report" }, { status: 500 });
    }
  }