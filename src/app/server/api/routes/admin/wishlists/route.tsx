import { NextResponse } from "next/server";
import { wishlists, store } from '@/app/server/controllers/WishlistController';

export async function GET() {
  const result = await wishlists();
  try{
      const wishlists = result.data;
      return NextResponse.json(wishlists);
  }catch(error){
      console.error("Error fetching wishlists:", error);
      return NextResponse.json({ error: "Failed to fetch Wishlists" }, { status: 500 });
  }
}