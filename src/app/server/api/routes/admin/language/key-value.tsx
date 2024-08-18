import { NextResponse } from "next/server";
import { keyValueStore } from '@/app/server/controllers/LanguageController';

export async function GET() {
    const result = await keyValueStore();
    try{
        const keyValueStore = result.data;
        return NextResponse.json(keyValueStore);
    }catch(error){
        console.error("Error fetching keyValueStore:", error);
        return NextResponse.json({ error: "Failed to fetch Key Value Store" }, { status: 500 });
    }
  }
