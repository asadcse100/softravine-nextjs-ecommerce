import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

type createOrUpdateData = {
  id: number | null;
  state_id: number;
  cost: number;
  status: number;
  name: string;
  created_at?: string;
};

export const getCityById = async (id: number) => {
  try {
    // Check if the record exists
    const existingCategory = await prisma.cities.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return { success: false, error: "Record does not exist." };
    }

    return { success: true, data: existingCategory };
  } catch (error) {
    return { success: false, error };
  }
};

// export const getCities = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const { sort_city, sort_state } = req.query

//     const cities = await prisma.city.findMany({
//       where: {
//         name: sort_city ? { contains: String(sort_city) } : undefined,
//         state_id: sort_state ? Number(sort_state) : undefined,
//       },
//       orderBy: {
//         status: 'desc',
//       },
//       include: {
//         State: true,
//       },
//     })

//     const states = await prisma.state.findMany({
//       where: {
//         status: true,
//       },
//     })

//     res.status(200).json({ cities, states, sort_city, sort_state })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ error: 'Internal server error' })
//   }
// }

export const getCities = async () => {
  try {
    const cities = await prisma.cities.findMany();
    return { success: true, data: cities };
  } catch (error) {
    return { success: false, error };
  }
}

// export const createOrUpdateCity = async () => {
//   try{
//       const cities = await prisma.cities.findMany();
//       return { success: true, data: cities };
//   }catch(error){
//       console.error("Error fetching cities:", error);
//       return { success: false, error };
//   }
// }

export async function createOrUpdateCity(data: createOrUpdateData) {
  try {
    // Use the provided `created_at` or fallback to the current date
    const created_at = data.created_at ? new Date(data.created_at) : new Date();
    // Perform the upsert operation
    const newCity = await prisma.cities.upsert({
      where: { id: data.id || 0 }, // Replace `0` with a non-zero ID if necessary
      update: {
        name: data.name,
        state_id: data.state_id,
        cost: data.cost,
        status: data.status,
        updated_at: created_at,
      },
      create: {
        name: data.name,
        state_id: data.state_id,
        cost: data.cost,
        status: data.status,
        created_at: created_at,
      },
    });

    return { success: true, data: newCity };
  } catch (error) {
    // return { success: false, message: "An unexpected error occurred" };
    return { success: false, error };
  }
}

export const deleteCity = async (id: number) => {
  try {
    // Check if the record exists
    const existingCitys = await prisma.categories.findUnique({
      where: { id },
    });

    if (!existingCitys) {
      return { success: false, error: "Record does not exist." };
    }

    const deletedCitys = await prisma.categories.delete({
      where: { id },
    });
    return { success: true, data: deletedCitys };
  } catch (error) {
    return { success: false, error };
  }
};