import { NextResponse } from "next/server";
import { search } from '@/app/server/controllers/PosController';

export async function GET() {
    const result = await search();
    try{
        const users = result.data;
        return NextResponse.json(users);
    }catch(error){
        console.error("Error fetching users:", error);
        return NextResponse.error();
    }
  }
