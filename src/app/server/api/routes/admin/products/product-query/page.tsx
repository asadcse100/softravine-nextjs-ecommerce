import { NextResponse } from "next/server";
import { getProductQueries, createProductQuery } from '@/app/server/controllers/ProductQueryController';

export async function GET() {
    const result = await getProductQueries();
    try{
        const users = result.data;
        return NextResponse.json(users);
    }catch(error){
        console.error("Error fetching users:", error);
        return NextResponse.error();
    }
  }