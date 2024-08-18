import { NextResponse } from "next/server";
import { addPermission } from '@/app/server/controllers/RoleController'; // Import the controller function

export async function GET() {
  const result = await addPermission();
  try{
      const permission = result.data;
      return NextResponse.json(permission);
  }catch(error){
      console.error("Error fetching permission:", error);
      return NextResponse.json({ error: "Failed to fetch Permission" }, { status: 500 });
  }
}
