import { NextResponse } from "next/server";
import { getProductQueries, createProductQuery } from '@/app/server/controllers/ProductQueryController';

export async function GET() {
    const result = await getProductQueries();
    try{
        const productQueries = result.data;
        return NextResponse.json(productQueries);
    }catch(error){
        console.error("Error fetching productQueries:", error);
        return NextResponse.json({ error: "Failed to fetch Product Queries" }, { status: 500 });
    }
  }