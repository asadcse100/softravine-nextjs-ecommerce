import { NextResponse } from "next/server";
import { getAttributes, createAttribute, updateAttribute } from '@/app/server/controllers/AttributeController';

export async function GET() {
  const result = await getAttributes();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}


