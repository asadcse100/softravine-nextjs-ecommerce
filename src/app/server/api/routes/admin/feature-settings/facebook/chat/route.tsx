import { NextResponse } from "next/server";
import { getFacebookChatById, createOrUpdateFacebookChat } from '@/app/server/controllers/HomeController';

export async function GET() {
  const result = await getFacebookChatById();
  try{
      const delivery_boys = result.data;
      return NextResponse.json(delivery_boys);
  }catch(error){
      console.error("Error fetching Delivery Boys:", error);
      return NextResponse.json({ error: "Failed to fetch Delivery Boys" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createOrUpdateFacebookChat(body);

    if (result.success) {
      return NextResponse.json(
        { message: "Delivery Boy added successfully", data: result.data },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error creating new Delivery Boy:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}