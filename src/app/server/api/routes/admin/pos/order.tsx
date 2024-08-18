import { NextResponse } from "next/server";
import { orderStore } from '@/app/server/controllers/PosController';

export async function GET() {
    const result = await orderStore();
    try{
        const order = result.data;
        return NextResponse.json(order);
    }catch(error){
        console.error("Error fetching order:", error);
        return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
    }
  }