import { NextResponse } from "next/server";
import { withAuth } from '@/app/server/middleware/withAuth';
import { handleCreateAddress, handleGetAddress, handleUpdateAddress, handleDeleteAddress } from '@/app/server/controllers/AddressController';

export async function GET() {
  const result = await handleCreateAddress();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}
