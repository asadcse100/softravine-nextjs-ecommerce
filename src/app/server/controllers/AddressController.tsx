import { NextResponse } from "next/server";
import { createAddress, getAddressById, updateAddress, deleteAddress } from '../models/Address';
import { AddressData } from '../types/Address';
import type { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  user_id: number;
  country_id: number;
  state_id: number;
  city_id: number;
  address: string;
  longitude: number;
  latitude: number;
  postal_code: string;
  phone: string;
  created_at?: string;
};

// export const handleGetAddress = async (req: NextRequest) => {
//   try {
//     const addressId = new URL(req.url).searchParams.get('id');
//     const address = await getAddressById(addressId);

//     if (!address) {
//       return NextResponse.json({ message: 'Address not found' }, { status: 404 });
//     }

//     return NextResponse.json({ address }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
//   }
// };

export async function createOrUpdateAddress(data: createOrUpdateData) {
  try {
    // Use the provided `created_at` or fallback to the current date
    const created_at = data.created_at ? new Date(data.created_at) : new Date();
    const customer_id = data.user_id;
    const country_id = data.country_id;
    const state_id = data.state_id;
    const city_id = data.city_id;
    // Perform the upsert operation
    const address = await prisma.addresses.upsert({
      where: {
        id: data.id || 0,
        user_id: customer_id || 0,
        country_id: country_id || 0,
        state_id: state_id || 0,
        city_id: city_id || 0
      }, // Replace `0` with a non-zero ID if necessary
      update: {
        user_id: customer_id,
        country_id: country_id,
        state_id: state_id,
        city_id: city_id,
        address: data.address,
        longitude: data.longitude,
        latitude: data.latitude,
        postal_code: data.postal_code,
        phone: data.phone,
        updated_at: created_at,
      },
      create: {
        user_id: customer_id,
        country_id: country_id,
        state_id: state_id,
        city_id: city_id,
        address: data.address,
        longitude: data.longitude,
        latitude: data.latitude,
        postal_code: data.postal_code,
        phone: data.phone,
        created_at: created_at,
      },
    });

    return { success: true, data: address };
  } catch (error) {
    console.error("Error creating or updating blog category:", error);
    return { success: false, error: error.message || "An unexpected error occurred" };
  }
}

export const handleUpdateAddress = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const addressId = body.id;
    const addressData: Partial<AddressData> = {
      address: body.address,
      country_id: body.country_id,
      state_id: body.state_id,
      city_id: body.city_id,
      longitude: body.longitude,
      latitude: body.latitude,
      postal_code: body.postal_code,
      phone: body.phone,
    };

    const address = await updateAddress(addressId, addressData);
    return NextResponse.json({ message: 'Address info updated successfully', address }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
};

export const handleDeleteAddress = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const addressId = body.id;
    const address = await deleteAddress(addressId);

    return NextResponse.json({ message: 'Address info deleted successfully', address }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
};
