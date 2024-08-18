import { NextResponse } from "next/server";
import { getStates, createState } from '@/app/server/controllers/StateController'; // Import the controller function

export async function GET() {
  const result = await getStates();
  try{
      const states = result.data;
      return NextResponse.json(states);
  }catch(error){
      console.error("Error fetching states:", error);
      return NextResponse.json({ error: "Failed to fetch States" }, { status: 500 });
  }
}