import { NextResponse } from "next/server";
import { getUserSearchReport  } from '@/app/server/controllers/ReportController';

export async function GET() {
    const result = await getUserSearchReport();
    try{
        const users = result.data;
        return NextResponse.json(users);
    }catch(error){
        console.error("Error fetching users:", error);
        return NextResponse.error();
    }
  }