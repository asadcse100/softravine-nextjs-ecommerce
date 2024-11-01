import { NextResponse } from "next/server";
import { selectEmail } from '@/app/server/controllers/NewsletterController'; // Import the controller function

export async function GET() {
  const result = await selectEmail();
  try{
      const emails = result.data;
      return NextResponse.json(emails);
  }catch(error){
      console.error("Error fetching emails:", error);
      return NextResponse.json({ error: "Failed to fetch emails" }, { status: 500 });
  }
}