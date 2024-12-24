// controllers/attributeController.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  name: string;
  code: string;
  created_at?: string;
};

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

// export async function createOrUpdateColor(data: createOrUpdateData) {
//   const attribute = await prisma.attributes.create({
//     data: {
//       name,
//       translations: {
//         create: {
//           lang,
//           name,
//         },
//       },
//     },
//   });

//   return attribute;
// }

export async function createOrUpdateColor(data: createOrUpdateData) {
  try {
    // Use the provided `created_at` or fallback to the current date
    const created_at = data.created_at ? new Date(data.created_at) : new Date();
    // Perform the upsert operation
    const newCategory = await prisma.colors.upsert({
      where: { id: data.id || 0 }, // Replace `0` with a non-zero ID if necessary
      update: {
        name: data.name,
        code: data.code,
        updated_at: created_at,
      },
      create: {
        name: data.name,
        code: data.code,
        created_at: created_at,
      },
    });

    return { success: true, data: newCategory };
  } catch (error) {
    console.error("Error creating or updating colors:", error);
    return { success: false, message: "An unexpected error occurred" };
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

export const deleteColor = async (id: number) => {
  try {
    // Check if the record exists
    const existingColors = await prisma.colors.findUnique({
      where: { id },
    });

    if (!existingColors) {
      return { success: false, error: "Record does not exist." };
    }

    const deletedColors = await prisma.colors.delete({
      where: { id },
    });
    return { success: true, data: deletedColors };
  } catch (error) {
    console.error("Error deleting Color:", error);
    return { success: false, error };
  }
};