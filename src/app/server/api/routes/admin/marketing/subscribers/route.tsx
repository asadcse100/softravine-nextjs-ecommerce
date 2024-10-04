import { NextResponse } from "next/server";
import { getSubscribers, subscribeUser } from '@/app/server/controllers/SubscriberController'; // Import the controller function

export async function GET() {
  const result = await getSubscribers();
  try{
      const subscribers = result.data;
      return NextResponse.json(subscribers);
  }catch(error){
      console.error("Error fetching subscribers:", error);
      return NextResponse.json({ error: "Failed to fetch Subscribers" }, { status: 500 });
  }
}