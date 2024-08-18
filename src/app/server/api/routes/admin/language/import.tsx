import { NextResponse } from "next/server";
import { importEnglishFile } from '@/app/server/controllers/LanguageController';

export async function GET() {
  const result = await importEnglishFile();
  try{
      const import = result.data;
      return NextResponse.json(import);
  }catch(error){
      console.error("Error fetching import:", error);
      return NextResponse.json({ error: "Failed to fetch Import" }, { status: 500 });
  }
}