import { NextResponse } from "next/server";
import { updateEmail } from '@/app/server/controllers/HomeController';

export async function GET() {
  const result = await updateEmail();
  try{
      const updateEmail = result.data;
      return NextResponse.json(updateEmail);
  }catch(error){
      console.error("Error fetching updateEmail:", error);
      return NextResponse.json({ error: "Failed to fetch Update Email" }, { status: 500 });
  }
}
