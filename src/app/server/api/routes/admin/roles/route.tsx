import { NextResponse } from "next/server";
import { index } from '@/app/server/controllers/RoleController'; // Import the controller function

export async function GET() {
  const result = await index();
  try{
      const roles = result.data;
      return NextResponse.json(roles);
  }catch(error){
      console.error("Error fetching roles:", error);
      return NextResponse.json({ error: "Failed to fetch roles" }, { status: 500 });
  }
}