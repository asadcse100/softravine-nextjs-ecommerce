import { NextResponse } from "next/server";
import { getUsersAndSubscribers } from '@/app/server/controllers/NewsletterController';

export async function GET() {
    const result = await getUsersAndSubscribers();
    try{
        const users = result.data;
        return NextResponse.json(users);
    }catch(error){
        console.error("Error fetching users:", error);
        return NextResponse.error();
    }
  }
