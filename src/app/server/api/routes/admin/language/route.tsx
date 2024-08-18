import { NextResponse } from "next/server";
import { changeLanguage, getLanguages } from '@/app/server/controllers/LanguageController';

export async function GET() {
    const result = await changeLanguage();
    try{
        const languages = result.data;
        return NextResponse.json(languages);
    }catch(error){
        console.error("Error fetching languages:", error);
        return NextResponse.json({ error: "Failed to fetch languages" }, { status: 500 });
    }
  }
