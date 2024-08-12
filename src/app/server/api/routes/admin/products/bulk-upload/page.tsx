import { NextResponse } from "next/server";
import { index } from '@/app/server/controllers/ProductBulkUploadController';

export async function GET() {
    const result = await index();
    try{
        const users = result.data;
        return NextResponse.json(users);
    }catch(error){
        console.error("Error fetching users:", error);
        return NextResponse.error();
    }
  }