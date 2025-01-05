import { NextResponse } from "next/server";
import { roles } from '@/app/server/controllers/StaffController'; // Import the controller function

export async function GET() {
  const result = await roles();
  try{
      const roles = result.data;
      return NextResponse.json(roles);
  }catch(error){
      console.error("Error fetching roles:", error);
      return NextResponse.json({ error: "Failed to fetch roles" }, { status: 500 });
  }
}