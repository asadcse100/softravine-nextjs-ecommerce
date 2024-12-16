import { NextResponse } from "next/server";
import { getUserPoint, createOrUpdateUserPoint } from '@/app/server/controllers/ClubPointController';

export async function GET() {
  const result = await getUserPoint();
  try{
      const attributes = result.data;
      return NextResponse.json(attributes);
  }catch(error){
      console.error("Error fetching attributes:", error);
      return NextResponse.json({ error: "Failed to fetch attributes" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createOrUpdateUserPoint(body);

    if (result.success) {
      return NextResponse.json(
        { message: "Club Point added successfully", data: result.data },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error creating new Club Point:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}