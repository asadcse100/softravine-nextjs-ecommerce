import { NextResponse } from "next/server";
import { index, store } from '@/app/server/controllers/TaxController'; // Import the controller function

export async function GET() {
  const result = await index();
  try{
      const taxes = result.data;
      return NextResponse.json(taxes);
  }catch(error){
      console.error("Error fetching taxes:", error);
      return NextResponse.error();
  }
}