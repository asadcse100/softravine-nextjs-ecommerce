import { NextResponse } from "next/server";
import { getData } from '@/app/server/controllers/HomeController';

export async function GET() {
    const result = await getData();
    try{
        const homepage = result.data;
        return NextResponse.json(homepage);
    }catch(error){
        console.error("Error fetching homepage:", error);
        return NextResponse.json({ error: "Failed to fetch home page" }, { status: 500 });
    }
  }
