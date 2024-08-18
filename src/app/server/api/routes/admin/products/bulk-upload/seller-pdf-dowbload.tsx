import { NextResponse } from "next/server";
import { pdfDownloadSeller } from '@/app/server/controllers/ProductBulkUploadController';

export async function GET() {
    const result = await pdfDownloadSeller();
    try{
        const sellerPdfDownload = result.data;
        return NextResponse.json(sellerPdfDownload);
    }catch(error){
        console.error("Error fetching sellerPdfDownload:", error);
        return NextResponse.json({ error: "Failed to fetch Seller PdfDownload" }, { status: 500 });
    }
  }