// controllers/ZoneController.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type createOrUpdateData = {
    id: number | null;
    name: string;
    status: boolean;
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
        console.error("Error fetching product:", error);
        return { success: false, error };
    }
}

export const getZones = async () => {
    try {
        const getZones = await prisma.zones.findMany();
        return { success: true, data: getZones };
    } catch (error) {
        console.error("Error fetching getZones:", error);
        return { success: false, error };
    }
}

//   export async store(req: NextApiRequest, res: NextApiResponse) {
// export async function store() {
//     try {
//         const { name, status, countryIds } = req.body;

//         const zone = await prisma.zone.create({
//             data: {
//                 name,
//                 status,
//                 countries: {
//                     connect: countryIds.map((id: number) => ({ id })),
//                 },
//             },
//             include: { countries: true },
//         });

//         res.status(201).json(zone);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// }

export async function createOrUpdateZone(data: createOrUpdateData) {
  try {

    const created_at = data.created_at ? new Date(data.created_at) : new Date();

    const newPost = await prisma.zones.upsert({
      where: { id: data.id ?? 0 }, // Fallback to 0 if `data.id` is null
      update: {
        name: data.name,
        status: data.status,
        updated_at: data.created_at,
      },
      create: {
        name: data.name,
        status: data.status,
        created_at: data.created_at,
      }
    });

    return { success: true, data: newPost };
  } catch (error) {
    console.error("Error creating blog post:", error);
    return { success: false, error };
  }
};

// async update(req: NextApiRequest, res: NextApiResponse) {
// export async function update(req: NextApiRequest, res: NextApiResponse) {
//     try {
//         const { id } = req.query;
//         const { name, countryIds } = req.body;

//         const updatedZone = await prisma.zone.update({
//             where: { id: Number(id) },
//             data: {
//                 name,
//                 countries: {
//                     disconnect: true,
//                     connect: countryIds.map((countryId: number) => ({ id: countryId })),
//                 },
//             },
//             include: { countries: true },
//         });

//         res.status(200).json(updatedZone);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// }

// async destroy(req: NextApiRequest, res: NextApiResponse) {
export async function destroy() {
    try {
        const { id } = req.query;

        // Disconnect countries associated with the zone
        await prisma.countries.updateMany({
            where: { zone_id: Number(id) },
            data: { zone_id: 0 },
        });

        // Delete the zone
        await prisma.zones.delete({ where: { id: Number(id) } });

        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// export const deleteAirTicket = async (id: number) => {
//   try {
//     // Check if the record exists
//     const existingAirTickets = await prisma.air_tickets.findUnique({
//       where: { id },
//     });

//     if (!existingAirTickets) {
//       return { success: false, error: "Record does not exist." };
//     }

//     const deletedAirTickets = await prisma.air_tickets.delete({
//       where: { id },
//     });
//     return { success: true, data: deletedAirTickets };
//   } catch (error) {
//     console.error("Error deleting AirTickets:", error);
//     return { success: false, error };
//   }
// };