import { NextResponse } from "next/server";
import { getSubscribers, subscribeUser } from '@/app/server/controllers/SubscriberController'; // Import the controller function

export async function GET() {
  const result = await getSubscribers();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}