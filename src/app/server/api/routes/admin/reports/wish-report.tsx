import { NextResponse } from "next/server";
import { getWishReport } from '@/app/server/controllers/ReportController';

export async function GET() {
    const result = await getWishReport();
    try{
        const wishReports = result.data;
        return NextResponse.json(wishReports);
    }catch(error){
        console.error("Error fetching wishReports:", error);
        return NextResponse.json({ error: "Failed to fetch Wish Reports" }, { status: 500 });
    }
  }
