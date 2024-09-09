// controllers/attributeController.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// export async function getAttributes() {
export const getColors = async () => {
  try {
    const colors = await prisma.colors.findMany();
    return { success: true, data: colors };
  } catch (error) {
    console.error("Error fetching colors:", error);
    return { success: false, error };
  }
}

export async function createAttribute(name: string, lang: string = 'en') {
    const attribute = await prisma.attributes.create({
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