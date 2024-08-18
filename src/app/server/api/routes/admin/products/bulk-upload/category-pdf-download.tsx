import { NextResponse } from "next/server";
import { pdfDownloadCategory } from '@/app/server/controllers/ProductBulkUploadController';

export async function GET() {
    const result = await pdfDownloadCategory();
    try{
        const pdfDownloadCategory = result.data;
        return NextResponse.json(pdfDownloadCategory);
    }catch(error){
        console.error("Error fetching pdfDownloadCategory:", error);
        return NextResponse.json({ error: "Failed to fetch PDF Download Category" }, { status: 500 });
    }
  }
