import { NextResponse } from "next/server";
import { remove } from '@/app/server/controllers/WishlistController';

export async function GET() {
  const result = await remove();
  try{
      const remove = result.data;
      return NextResponse.json(remove);
  }catch(error){
      console.error("Error fetching remove:", error);
      return NextResponse.json({ error: "Failed to fetch Wishlist Remove" }, { status: 500 });
  }
}