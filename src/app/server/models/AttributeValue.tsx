// models/AttributeValue.ts
import { PrismaClient, Attribute } from '@prisma/client';

const prisma = new PrismaClient();

export interface AttributeValue {
  id: number;
  // Define other fields here
}

export async function getAttributeValueById(id: number): Promise<AttributeValue | null> {
  return await prisma.attributeValue.findUnique({
    where: { id },
    include: {
      attribute: true,
    },
  });
}

export async function createAttributeValue(data: AttributeValue): Promise<AttributeValue> {
  return await prisma.attributeValue.create({
    data,
  });
}

export async function updateAttributeValue(id: number, data: Partial<AttributeValue>): Promise<AttributeValue | null> {
  return await prisma.attributeValue.update({
    where: { id },
    data,
  });
}

export async function deleteAttributeValue(id: number): Promise<AttributeValue | null> {
  return await prisma.attributeValue.delete({
    where: { id },
  });
}
