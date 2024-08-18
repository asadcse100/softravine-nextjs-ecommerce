import { NextResponse } from "next/server";
import { pdfDownloadBrand } from '@/app/server/controllers/ProductBulkUploadController';

export async function GET() {
    const result = await pdfDownloadBrand();
    try{
        const pdfDownloadBrand = result.data;
        return NextResponse.json(pdfDownloadBrand);
    }catch(error){
        console.error("Error fetching pdfDownloadBrand:", error);
        return NextResponse.json({ error: "Failed to fetch PDF Download Brand" }, { status: 500 });
    }
  }