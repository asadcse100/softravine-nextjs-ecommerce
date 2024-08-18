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
