import { NextResponse } from "next/server";
import { updateStateStatus } from '@/app/server/controllers/StateController'; // Import the controller function

export async function GET() {
  const result = await updateStateStatus();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}