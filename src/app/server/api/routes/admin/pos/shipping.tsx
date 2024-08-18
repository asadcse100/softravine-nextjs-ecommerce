import { NextResponse } from "next/server";
import { setShippingAddress } from '@/app/server/controllers/PosController';

export async function GET() {
    const result = await setShippingAddress();
    try{
        const setShippingAddress = result.data;
        return NextResponse.json(setShippingAddress);
    }catch(error){
        console.error("Error fetching setShippingAddress:", error);
        return NextResponse.json({ error: "Failed to fetch Shipping Address" }, { status: 500 });
    }
  }
