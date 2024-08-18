import { NextResponse } from "next/server";
import { changeTaxStatus } from '@/app/server/controllers/TaxController'; // Import the controller function

export async function GET() {
  const result = await changeTaxStatus();
  try{
      const changeTaxStatus = result.data;
      return NextResponse.json(changeTaxStatus);
  }catch(error){
      console.error("Error fetching changeTaxStatus:", error);
      return NextResponse.json({ error: "Failed to fetch change Tax Status" }, { status: 500 });
  }
}