import { NextResponse } from "next/server";
import { destroy } from '@/app/server/controllers/CustomerProductController';

export async function GET() {
  const result = await destroy();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}