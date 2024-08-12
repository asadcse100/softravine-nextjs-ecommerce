import { NextResponse } from "next/server";
import { getPickupPoints, createPickupPoint } from '@/app/server/controllers/PickupPointController';

export async function GET() {
    const result = await getPickupPoints();
    try{
        const users = result.data;
        return NextResponse.json(users);
    }catch(error){
        console.error("Error fetching users:", error);
        return NextResponse.error();
    }
  }
