// controllers/attributeController.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  name: string;
  created_at: string;
};

export const getAttributes = async () => {

  try {
    const attributes = await prisma.attributes.findMany();
    return { success: true, data: attributes };
  } catch (error) {
    console.error("Error fetching attributes:", error);
    return { success: false, error };
  }
}

export async function createOrUpdateAttribute(data: createOrUpdateData) {
  try {

    // const attribute = await prisma.attributes.create({
    //   data: {
    //     name,
    //     translations: {
    //       create: {
    //         lang,
    //         name,
    //       },
    //     },
    //   },
    // });

    // return attribute;

    const created_at = data.created_at ? new Date(data.created_at) : new Date();

    const newPost = await prisma.attributes.upsert({
      where: { id: data.id ?? 0 }, // Fallback to 0 if `data.id` is null
      update: {
        name: data.name,
        updated_at: data.created_at,
      },
      create: {
        id: data.id ?? undefined, // Ensure `id` is included only if provided
        name: data.name,
        created_at: data.created_at,
      }
    });

    return { success: true, data: newPost };
  } catch (error) {
    console.error("Error creating blog post:", error);
    return { success: false, error };
  }
}


// export async function updateAttribute(id: number, name: string, lang: string = 'en') {
//   const attribute = await prisma.attributes.update({
//     where: { id },
//     data: {
//       name,
//       translations: {
//         upsert: {
//           where: { lang_attributeId: { lang, attributeId: id } },
//           update: { name },
//           create: { lang, name, attribute: { connect: { id } } },
//         },
//       },
//     },
//     include: { translations: true },
//   });

//   return attribute;
// }