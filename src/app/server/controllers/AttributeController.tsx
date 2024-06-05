// controllers/attributeController.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAttributes() {
  const attributes = await prisma.attribute.findMany({
    include: { attributeValues: true },
    orderBy: { createdAt: 'desc' },
  });
  return attributes;
}

export async function createAttribute(name: string, lang: string = 'en') {
    const attribute = await prisma.attribute.create({
      data: {
        name,
        translations: {
          create: {
            lang,
            name,
          },
        },
      },
    });
  
    return attribute;
  }


  export async function updateAttribute(id: number, name: string, lang: string = 'en') {
    const attribute = await prisma.attribute.update({
      where: { id },
      data: {
        name,
        translations: {
          upsert: {
            where: { lang_attributeId: { lang, attributeId: id } },
            update: { name },
            create: { lang, name, attribute: { connect: { id } } },
          },
        },
      },
      include: { translations: true },
    });
  
    return attribute;
  }