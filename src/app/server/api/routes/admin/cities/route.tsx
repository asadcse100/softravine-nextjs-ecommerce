import { NextResponse } from "next/server";
import { getCities, createCity } from '@/app/server/controllers/CityController';

export async function GET() {
  const result = await getCities();
  try{
      const getCities = result.data;
      return NextResponse.json(getCities);
  }catch(error){
      return NextResponse.json({ error: "Failed to fetch Cities" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createCity(body);

    if (result.success) {
      return NextResponse.json(
        { message: "City added successfully", data: result.data },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error creating new City:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}