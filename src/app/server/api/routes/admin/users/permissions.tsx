import { NextResponse } from "next/server";
import { addPermission } from '@/app/server/controllers/RoleController'; // Import the controller function

export async function GET() {
  const result = await addPermission();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}
