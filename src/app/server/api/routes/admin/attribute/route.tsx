import { NextResponse } from "next/server";
import { getAttributes, createOrUpdateAttribute } from '@/app/server/controllers/AttributeController';

export async function GET() {
  const result = await getAttributes();
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
    const result = await createOrUpdateAttribute(body);

    if (result.success) {
      return NextResponse.json(
        { message: "Auction Product added successfully", data: result.data },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error creating new Auction Product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

