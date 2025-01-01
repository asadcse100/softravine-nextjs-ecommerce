
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  zone_id: number;
  code: string;
  name: string;
  status: number;
  created_at?: string;
};

export const selectCountries = async () => {
  try {
    const countries = await prisma.countries.findMany({
      select: {
        name: true,
      },
    });
    return { success: true, data: countries };

  } catch (error) {
    // console.error("Error fetching customer:", error);
    return { success: false, error };
  }
}

export const getCountryId = async (id: number) => {
  try {
    // Check if the record exists
    const existingCategory = await prisma.countries.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return { success: false, error: "Record does not exist." };
    }

    return { success: true, data: existingCategory };
  } catch (error) {
    // console.error("Error category:", error);
    return { success: false, error };
  }
};
// export const index = async (req: NextApiRequest, res: NextApiResponse) => {
//   export const index = async () => {
//   const { sort_country } = req.query;

//   try {
//     const countryQueries = prisma.countries.findMany({
//       where: {
//         name: {
//           contains: sort_country as string || '',
//           mode: 'insensitive',
//         },
//       },
//       orderBy: {
//         status: 'desc',
//       },
//     });

//     const countries = await countryQueries;

//     res.status(200).json({ countries, sort_country });
//   } catch (error) {
//     console.error("Error fetching texes:", error);
//     return { success: false, error };
//     res.status(500).json({ error: 'Failed to fetch countries' });
//   }
// };

export const getCountries = async () => {
  try {
    const countryQueries = await prisma.countries.findMany();
    return { success: true, data: countryQueries };
  } catch (error) {
    // console.error("Error fetching country Queries:", error);
    return { success: false, error };
  }
}

// export const createOrUpdateCountry = async () => {
//     const { id, status } = req.body;

//     try {
//       const country = await prisma.country.update({
//         where: { id: Number(id) },
//         data: { status },
//       });

//       if (country) {
//         res.status(200).json({ success: 1 });
//       } else {
//         res.status(400).json({ success: 0 });
//       }
//     } catch (error) {
//       res.status(500).json({ success: 0, error: 'Failed to update country status' });
//     }
//   };

export async function createOrUpdateCountry(data: createOrUpdateData) {
  try {

    const created_at = data.created_at ? new Date(data.created_at) : new Date();

    const newPost = await prisma.countries.upsert({
      where: { id: data.id ?? 0 }, // Fallback to 0 if `data.id` is null
      update: {
        zone_id: data.zone_id,
        code: data.code,
        name: data.name,
        status: data.status,
        updated_at: data.created_at,
      },
      create: {
        zone_id: data.zone_id,
        code: data.code,
        name: data.name,
        status: data.status,
        created_at: data.created_at,
      }
    });

    return { success: true, data: newPost };
  } catch (error) {
    // console.error("Error creating blog post:", error);
    return { success: false, error };
  }
};

export const deleteCountry = async (id: number) => {
  try {
    // Check if the record exists
    const existingCountrys = await prisma.countries.findUnique({
      where: { id },
    });

    if (!existingCountrys) {
      return { success: false, error: "Record does not exist." };
    }

    const deletedCountrys = await prisma.countries.delete({
      where: { id },
    });
    return { success: true, data: deletedCountrys };
  } catch (error) {
    // console.error("Error deleting Country:", error);
    return { success: false, error };
  }
};