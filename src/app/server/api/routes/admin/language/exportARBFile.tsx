import { NextResponse } from "next/server";
import { exportARBFile } from '@/app/server/controllers/LanguageController';

export async function GET() {
  const result = await exportARBFile();
  try{
      const exportARBFile = result.data;
      return NextResponse.json(exportARBFile);
  }catch(error){
      console.error("Error fetching exportARBFile:", error);
      return NextResponse.json({ error: "Failed to fetch Export ARB File" }, { status: 500 });
  }
}
