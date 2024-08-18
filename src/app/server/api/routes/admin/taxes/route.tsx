import { NextResponse } from "next/server";
import { getTaxes, store } from '@/app/server/controllers/TaxController'; // Import the controller function

export async function GET() {
  const result = await getTaxes();
  try{
      const taxes = result.data;
      return NextResponse.json(taxes);
  }catch(error){
      console.error("Error fetching taxes:", error);
      return NextResponse.json({ error: "Failed to fetch taxes" }, { status: 500 });
  }
}