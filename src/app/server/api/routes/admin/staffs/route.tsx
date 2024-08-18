import { NextResponse } from "next/server";
import { getStaffs, storeStaff } from '@/app/server/controllers/StaffController'; // Import the controller function

export async function GET() {
  const result = await getStaffs();
  try{
      const staffs = result.data;
      return NextResponse.json(staffs);
  }catch(error){
      console.error("Error fetching staffs:", error);
      return NextResponse.json({ error: "Failed to fetch Staffs" }, { status: 500 });
  }
}