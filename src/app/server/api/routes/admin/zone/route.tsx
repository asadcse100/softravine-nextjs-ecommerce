import { NextResponse } from "next/server";
import { getZones, createZone} from '@/app/server/controllers/ZoneController';

export async function GET() {
  const result = await getZones();
  try{
      const getZones = result.data;
      return NextResponse.json(getZones);
  }catch(error){
      return NextResponse.json({ error: "Failed to fetch getZones" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createZone(body);

    if (result.success) {
      return NextResponse.json(
        { message: "Zone added successfully", data: result.data },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error creating new Zone:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}