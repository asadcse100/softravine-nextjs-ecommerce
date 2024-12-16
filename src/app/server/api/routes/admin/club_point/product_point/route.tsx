import { NextResponse } from "next/server";
import { getClubPoint, createOrUpdateClubPoint } from '@/app/server/controllers/ClubPointController';

export async function GET() {
  const result = await getClubPoint();
  try{
      const ClubPoint = result.data;
      return NextResponse.json(ClubPoint);
  }catch(error){
      console.error("Error fetching ClubPoint:", error);
      return NextResponse.json({ error: "Failed to fetch ClubPoint" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createOrUpdateClubPoint(body);

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