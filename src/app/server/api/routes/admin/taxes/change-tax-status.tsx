import { NextResponse } from "next/server";
import { changeTaxStatus } from '@/app/server/controllers/TaxController'; // Import the controller function

export async function GET() {
  const result = await changeTaxStatus();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}