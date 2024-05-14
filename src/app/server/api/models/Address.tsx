// models/Address.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Address {
  id: number;
  setDefault: boolean;
  userId: number;
  countryId: number;
  stateId: number;
  cityId: number;
}

export async function getAddressById(id: number): Promise<Address | null> {
  return await prisma.address.findUnique({
    where: { id },
  });
}

export async function createAddress(data: Address): Promise<Address> {
  return await prisma.address.create({
    data,
  });
}

export async function updateAddress(id: number, data: Partial<Address>): Promise<Address | null> {
  return await prisma.address.update({
    where: { id },
    data,
  });
}

export async function deleteAddress(id: number): Promise<Address | null> {
  return await prisma.address.delete({
    where: { id },
  });
}
