import { NextResponse } from "next/server";
import { remove } from '@/app/server/controllers/WishlistController';

export async function GET() {
  const result = await remove();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}