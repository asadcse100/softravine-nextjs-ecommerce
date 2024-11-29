import { NextResponse } from "next/server";
import { getPickupPoints, createPickupPoint } from '@/app/server/controllers/PickupPointController';

export async function GET() {
    const result = await getPickupPoints();
    try{
        const pickupPoints = result.data;
        return NextResponse.json(pickupPoints);
    }catch(error){
        console.error("Error fetching pickupPoints:", error);
        return NextResponse.json({ error: "Failed to fetch Pickup Points" }, { status: 500 });
    }
  }

  export async function POST(req: Request) {
    try {
      const body = await req.json();
      const result = await createPickupPoint(body);
  
      if (result.success) {
        return NextResponse.json(
          { message: "Pickup Point added successfully", data: result.data },
          { status: 201 }
        );
      }
    } catch (error) {
      console.error("Error creating new Pickup Point:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }