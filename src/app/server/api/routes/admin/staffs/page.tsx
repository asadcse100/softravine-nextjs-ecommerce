import { NextResponse } from "next/server";
import { getStaffs, storeStaff } from '@/app/server/controllers/StaffController'; // Import the controller function

export async function GET() {
  const result = await getStaffs();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}