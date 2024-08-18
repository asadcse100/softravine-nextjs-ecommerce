import { NextResponse } from "next/server";
import { updateStateStatus } from '@/app/server/controllers/StateController'; // Import the controller function

export async function GET() {
  const result = await updateStateStatus();
  try{
      const updateStateStatus = result.data;
      return NextResponse.json(updateStateStatus);
  }catch(error){
      console.error("Error fetching updateStateStatus:", error);
      return NextResponse.json({ error: "Failed to fetch Update State Status" }, { status: 500 });
  }
}