import { NextResponse } from "next/server";
import { updateRtlStatus } from '@/app/server/controllers/LanguageController';

export async function GET() {
    const result = await updateRtlStatus();
    try{
        const updateRtlStatus = result.data;
        return NextResponse.json(updateRtlStatus);
    }catch(error){
        console.error("Error fetching updateRtlStatus:", error);
        return NextResponse.json({ error: "Failed to fetch Update Rtl Status" }, { status: 500 });
    }
  }
