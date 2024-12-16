import { NextResponse } from "next/server";
import { getAllCarriers, createOrUpdateCarrier } from '@/app/server/controllers/CarrierController';

export async function GET() {
  const result = await getAllCarriers();
  try{
      const carries = result.data;
      return NextResponse.json(carries);
  }catch(error){
      console.error("Error fetching carries:", error);
      return NextResponse.json({ error: "Failed to fetch carries" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createOrUpdateCarrier(body);

    if (result.success) {
      return NextResponse.json(
        { message: "Carrier added successfully", data: result.data },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error creating new Carrier:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}