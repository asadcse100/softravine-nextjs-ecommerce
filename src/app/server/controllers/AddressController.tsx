import { NextResponse } from "next/server";
import { createAddress, getAddressById, updateAddress, deleteAddress } from '../models/Address';
import { AddressData } from '../types/Address';
import type { NextRequest } from 'next/server';

export const handleCreateAddress = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const addressData: AddressData = {
      user_id: body.customer_id ? body.customer_id : req.nextauth.user.id, // Adjust based on your session management
      address: body.address,
      country_id: body.country_id,
      state_id: body.state_id,
      city_id: body.city_id,
      longitude: body.longitude,
      latitude: body.latitude,
      postal_code: body.postal_code,
      phone: body.phone,
    };

    const address = await createAddress(addressData);
    return NextResponse.json({ message: 'Address info stored successfully', address }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
};

export const handleGetAddress = async (req: NextRequest) => {
  try {
    const addressId = new URL(req.url).searchParams.get('id');
    const address = await getAddressById(addressId);

    if (!address) {
      return NextResponse.json({ message: 'Address not found' }, { status: 404 });
    }

    return NextResponse.json({ address }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
};

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
