import { NextResponse } from "next/server";
import { getFlashDeals, createFlashDeal } from '@/app/server/controllers/FlashDealController';

export async function GET() {
    const result = await getFlashDeals();
    try{
        const flashDeals = result.data;
        return NextResponse.json(flashDeals);
    }catch(error){
        console.error("Error fetching flashDeals:", error);
        return NextResponse.json({ error: "Failed to fetch flashDeals" }, { status: 500 });
    }
  }

  export async function POST(req: Request) {
    try {
      const body = await req.json();
      const result = await createFlashDeal(body);
  
      if (result.success) {
        return NextResponse.json(
          { message: "Flash Deal added successfully", data: result.data },
          { status: 201 }
        );
      }
    } catch (error) {
      console.error("Error creating new Flash Deal:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }