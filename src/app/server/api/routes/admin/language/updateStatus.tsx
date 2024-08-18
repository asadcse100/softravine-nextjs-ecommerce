import { NextResponse } from "next/server";
import { updateStatus } from '@/app/server/controllers/LanguageController';

export async function GET() {
    const result = await updateStatus();
    try{
        const updateStatus = result.data;
        return NextResponse.json(updateStatus);
    }catch(error){
        console.error("Error fetching updateStatus:", error);
        return NextResponse.json({ error: "Failed to fetch Update Status" }, { status: 500 });
    }
  }
