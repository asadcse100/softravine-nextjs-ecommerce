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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await storeStaff(body);

    if (result.success) {
      return NextResponse.json(
        { message: "Staff added successfully", data: result.data },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error creating new Staff:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}