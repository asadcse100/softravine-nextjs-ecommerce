import { NextResponse } from "next/server";
import { index } from '@/app/server/controllers/PosController';

export async function GET() {
    const result = await index();
    try{
        const pos = result.data;
        return NextResponse.json(pos);
    }catch(error){
        console.error("Error fetching pos:", error);
        return NextResponse.json({ error: "Failed to fetch pos" }, { status: 500 });
    }
  }
