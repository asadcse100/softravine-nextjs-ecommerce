// models/AttributeTranslation.ts
import { PrismaClient, Attribute } from '@prisma/client';

const prisma = new PrismaClient();

export interface AttributeTranslation {
  id: number;
  name: string;
  lang: string;
  attributeId: number;
}

export async function createAttributeTranslation(data: AttributeTranslation): Promise<AttributeTranslation> {
  return await prisma.attributeTranslation.create({
    data,
  });
}

export async function updateAttributeTranslation(id: number, data: Partial<AttributeTranslation>): Promise<AttributeTranslation | null> {
  return await prisma.attributeTranslation.update({
    where: { id },
    data,
  });
}

export async function deleteAttributeTranslation(id: number): Promise<AttributeTranslation | null> {
  return await prisma.attributeTranslation.delete({
    where: { id },
  });
}
