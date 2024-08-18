import { NextResponse } from "next/server";
import { withAuth } from '@/app/server/middleware/withAuth';
import { handleCreateAddress, handleGetAddress, handleUpdateAddress, handleDeleteAddress } from '@/app/server/controllers/AddressController';

export async function GET() {
  const result = await handleCreateAddress();
  try{
      const address = result.data;
      return NextResponse.json(address);
  }catch(error){
      console.error("Error fetching address:", error);
      return NextResponse.json({ error: "Failed to fetch Address" }, { status: 500 });
  }
}
