import { NextResponse } from "next/server";
import { addToCart, updateQuantity, removeFromCart } from '@/app/server/controllers/PosController';

export async function GET() {
    const result = await addToCart();
    try{
        const users = result.data;
        return NextResponse.json(users);
    }catch(error){
        console.error("Error fetching users:", error);
        return NextResponse.error();
    }
  }