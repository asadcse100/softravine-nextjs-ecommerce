import { NextResponse } from "next/server";
import { selectCode } from '@/app/server/controllers/LanguageController'; // Import the controller function

export async function GET() {
  const result = await selectCode();
  try{
      const code = result.data;
      return NextResponse.json(code);
  }catch(error){
      console.error("Error fetching code:", error);
      return NextResponse.json({ error: "Failed to fetch code" }, { status: 500 });
  }
}