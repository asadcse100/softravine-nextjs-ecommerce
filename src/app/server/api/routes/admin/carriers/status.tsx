import { NextResponse } from "next/server";
import { updateCarrierStatus } from '@/app/server/controllers/CarrierController';

export async function GET() {
  const result = await updateCarrierStatus();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}
