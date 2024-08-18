import { NextResponse } from "next/server";
import { addToCart, updateQuantity, removeFromCart } from '@/app/server/controllers/PosController';

export async function GET() {
    const result = await addToCart();
    try{
        const cart = result.data;
        return NextResponse.json(cart);
    }catch(error){
        console.error("Error fetching cart:", error);
        return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
    }
  }