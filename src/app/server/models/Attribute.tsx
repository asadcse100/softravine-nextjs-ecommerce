// models/Attribute.ts
import { PrismaClient, AttributeTranslation, AttributeValue } from '@prisma/client';

const prisma = new PrismaClient();

export interface Attribute {
  id: number;
  // Define other fields here
}

export async function getAttributeById(id: number): Promise<Attribute | null> {
  return await prisma.attribute.findUnique({
    where: { id },
    include: {
      attribute_translations: true,
      attribute_values: true,
    },
  });
}

export async function createAttribute(data: Attribute): Promise<Attribute> {
  return await prisma.attribute.create({
    data,
  });
}

export async function updateAttribute(id: number, data: Partial<Attribute>): Promise<Attribute | null> {
  return await prisma.attribute.update({
    where: { id },
    data,
  });
}

export async function deleteAttribute(id: number): Promise<Attribute | null> {
  return await prisma.attribute.delete({
    where: { id },
  });
}

export async function getAttributeTranslation(attributeId: number, lang: string, field: string): Promise<string | null> {
  const attribute = await prisma.attribute.findUnique({
    where: { id: attributeId },
    include: {
      attribute_translations: {
        where: { lang },
      },
    },
  });
  if (attribute && attribute.attribute_translations.length > 0) {
    return attribute.attribute_translations[0][field];
  } else {
    return null;
  }
}
