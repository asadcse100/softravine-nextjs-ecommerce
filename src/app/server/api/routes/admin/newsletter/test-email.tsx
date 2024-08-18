import { NextResponse } from "next/server";
import { sendTestEmail } from '@/app/server/controllers/NewsletterController';

export async function GET() {
    const result = await sendTestEmail();
    try{
        const sendTestEmail = result.data;
        return NextResponse.json(sendTestEmail);
    }catch(error){
        console.error("Error fetching sendTestEmail:", error);
        return NextResponse.json({ error: "Failed to fetch Send Test Email" }, { status: 500 });
    }
  }
