import { NextResponse } from "next/server";
import { updatePublished } from '@/app/server/controllers/AuctionProductController';

export async function GET() {
    const result = await updatePublished();
    try{
        const updatePublished = result.data;
        return NextResponse.json(updatePublished);
    }catch(error){
        console.error("Error fetching updatePublished:", error);
        return NextResponse.json({ error: "Failed to fetch Update Published" }, { status: 500 });
    }
  }
