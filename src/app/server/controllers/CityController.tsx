// controllers/CityController.ts
import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

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
  try{
      const cities = await prisma.product_taxes.findMany();
      return { success: true, data: cities };
  }catch(error){
      console.error("Error fetching cities:", error);
      return { success: false, error };
  }
}
