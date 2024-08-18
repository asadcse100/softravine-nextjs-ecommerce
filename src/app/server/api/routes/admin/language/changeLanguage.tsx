import { NextResponse } from "next/server";
import { storeLanguage } from '@/app/server/controllers/LanguageController';

export async function GET() {
    const result = await storeLanguage();
    try{
        const changeTaxStatus = result.data;
        return NextResponse.json(changeTaxStatus);
    }catch(error){
        console.error("Error fetching changeTaxStatus:", error);
        return NextResponse.json({ error: "Failed to fetch Change Tax Status" }, { status: 500 });
    }
  }