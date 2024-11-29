import { NextResponse } from "next/server";
import { getStates, createState } from '@/app/server/controllers/StateController'; // Import the controller function

export async function GET() {
  const result = await getStates();
  try{
      const states = result.data;
      return NextResponse.json(states);
  }catch(error){
      console.error("Error fetching states:", error);
      return NextResponse.json({ error: "Failed to fetch States" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createState(body);

    if (result.success) {
      return NextResponse.json(
        { message: "State added successfully", data: result.data },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error creating new State:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}