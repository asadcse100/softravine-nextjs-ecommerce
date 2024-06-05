import { PrismaClient } from '@prisma/client';
import { AddressData } from '../types/Address';

const prisma = new PrismaClient();

export const createAddress = async (addressData: AddressData) => {
  return await prisma.address.create({ data: addressData });
};

export const getAddressById = async (id: string) => {
  return await prisma.address.findUnique({ where: { id } });
};

export const updateAddress = async (id: string, addressData: Partial<AddressData>) => {
  return await prisma.address.update({
    where: { id },
    data: addressData,
  });
};

export const deleteAddress = async (id: string) => {
  return await prisma.address.delete({ where: { id } });
};
