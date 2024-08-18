import { NextResponse } from "next/server";
import { getUsersAndSubscribers } from '@/app/server/controllers/NewsletterController';

export async function GET() {
    const result = await getUsersAndSubscribers();
    try{
        const newsleller = result.data;
        return NextResponse.json(newsleller);
    }catch(error){
        console.error("Error fetching newsleller:", error);
        return NextResponse.json({ error: "Failed to fetch Newsleller" }, { status: 500 });
    }
  }
