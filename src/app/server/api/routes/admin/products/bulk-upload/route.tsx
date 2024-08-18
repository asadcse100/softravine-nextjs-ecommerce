import { NextResponse } from "next/server";
import { index } from '@/app/server/controllers/ProductBulkUploadController';

export async function GET() {
    const result = await index();
    try{
        const bulkUpload = result.data;
        return NextResponse.json(bulkUpload);
    }catch(error){
        console.error("Error fetching bulkUpload:", error);
        return NextResponse.json({ error: "Failed to fetch Bulk Upload" }, { status: 500 });
    }
  }