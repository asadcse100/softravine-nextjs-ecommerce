import { NextResponse } from "next/server";
import { sendTestEmail } from '@/app/server/controllers/NewsletterController';

export async function GET() {
    const result = await sendTestEmail();
    try{
        const users = result.data;
        return NextResponse.json(users);
    }catch(error){
        console.error("Error fetching users:", error);
        return NextResponse.error();
    }
  }
