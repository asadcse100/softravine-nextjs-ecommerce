import { NextResponse } from "next/server";
import { sendEmailVerificationMail } from '@/app/server/controllers/HomeController';

export async function GET() {
  const result = await sendEmailVerificationMail();
  try{
      const sendEmailVerificationMail = result.data;
      return NextResponse.json(sendEmailVerificationMail);
  }catch(error){
      console.error("Error fetching sendEmailVerificationMail:", error);
      return NextResponse.json({ error: "Failed to fetch Send Email Verification Mail" }, { status: 500 });
  }
}
