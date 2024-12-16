import { NextResponse } from "next/server";
import { getColors, createOrUpdateColor } from '@/app/server/controllers/ColorController';

export async function GET() {
  const result = await getColors();
  try{
      const colors = result.data;
      return NextResponse.json(colors);
  }catch(error){
      console.error("Error fetching colors:", error);
      return NextResponse.json({ error: "Failed to fetch colors" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createOrUpdateColor(body);

    if (result.success) {
      return NextResponse.json(
        { message: "Color added successfully", data: result.data },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error creating new Color:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}