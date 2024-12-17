// controllers/CityController.ts
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
    console.error("Error fetching cities:", error);
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

export async function createOrUpdateBrand(data: createOrUpdateData) {
  try {
    // Use the provided `created_at` or fallback to the current date
    const created_at = data.created_at ? new Date(data.created_at) : new Date();
    // Perform the upsert operation
    const newCategory = await prisma.cities.upsert({
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

    return { success: true, data: newCategory };
  } catch (error) {
    console.error("Error creating or updating blog category:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}
