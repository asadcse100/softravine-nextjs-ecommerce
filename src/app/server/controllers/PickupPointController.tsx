import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type createOrUpdateData = {
    id: number | null;
    staff_id: number;
    name: string;
    address: string;
    phone: string;
    pick_up_status: number;
    cash_on_pickup_status: number;
    created_at: string;
};

// export async function getPickupPoints(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const { search = '', page = 1, pageSize = 10 } = req.query;
//     const pageNum = parseInt(page as string, 10);
//     const pageSizeNum = parseInt(pageSize as string, 10);
//     const searchQuery = search as string;

//     const pickupPoints = await prisma.pickupPoint.findMany({
//       where: {
//         name: {
//           contains: searchQuery,
//           mode: 'insensitive', // Case insensitive search
//         },
//       },
//       orderBy: { createdAt: 'desc' },
//       skip: (pageNum - 1) * pageSizeNum,
//       take: pageSizeNum,
//     });

//     const totalPickupPoints = await prisma.pickupPoint.count({
//       where: {
//         name: {
//           contains: searchQuery,
//           mode: 'insensitive',
//         },
//       },
//     });

//     return res.status(200).json({ pickupPoints, totalPickupPoints, page: pageNum, pageSize: pageSizeNum, search: searchQuery });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// }

export const getPickupPoints = async () => {
    try {
        const pickupPoints = await prisma.pickup_points.findMany();
        // Convert BigInt fields to strings
        const serializedPickupPoint = pickupPoints.map(pickupPoint => ({
            ...pickupPoint,
            staff_id: pickupPoint.staff_id.toString(), // Assuming id is the BigInt field
        }));
        return { success: true, data: serializedPickupPoint };
    } catch (error) {
        console.error("Error fetching pickupPoints:", error);
        return { success: false, error };
    }
}

// export const createPickupPoint = async (req: NextApiRequest, res: NextApiResponse) => {
//     const { name, address, phone, pickUpStatus, staffId } = req.body;

//     try {
//         const pickupPoint = await prisma.pickup_points.create({
//             data: {
//                 name,
//                 address,
//                 phone,
//                 pickup_point,
//                 staffId,
//                 translations: {
//                     create: {
//                         lang: process.env.DEFAULT_LANGUAGE || 'en',
//                         name,
//                         address,
//                     },
//                 },
//             },
//         });

//         res.status(201).json({ message: 'Pickup Point has been inserted successfully', pickupPoint });
//     } catch (error) {
//         res.status(500).json({ error: 'Something went wrong', details: error.message });
//     }
// };

export async function createOrUpdatePickupPoint(data: createOrUpdateData) {
  try {
    // Use the provided `created_at` or fallback to the current date
    const created_at = data.created_at ? new Date(data.created_at) : new Date();
    // Perform the upsert operation
    const newCategory = await prisma.pickup_points.upsert({
      where: { id: data.id || 0 }, // Replace `0` with a non-zero ID if necessary
      update: {
        name: data.name,
        staff_id: data.staff_id,
        address: data.address,
        phone: data.phone,
        pick_up_status: data.pick_up_status,
        cash_on_pickup_status: data.cash_on_pickup_status,
        updated_at: created_at,
      },
      create: {
        name: data.name,
        staff_id: data.staff_id,
        address: data.address,
        phone: data.phone,
        pick_up_status: data.pick_up_status,
        cash_on_pickup_status: data.cash_on_pickup_status,
        created_at: created_at,
      },
    });

    return { success: true, data: newCategory };
  } catch (error) {
    console.error("Error creating or updating colors:", error);
    return { success: false, error: error.message || "An unexpected error occurred" };
  }
}

export const updatePickupPoint = async (data: createOrUpdateData) => {
    const { id } = req.query;
    const { name, address, phone, pickUpStatus, staffId, lang } = req.body;

    try {
        const defaultLang = process.env.DEFAULT_LANGUAGE || 'en';

        const pickupPoint = await prisma.pickup_points.update({
            where: { id: Number(id) },
            data: {
                ...(lang === defaultLang && { name, address }),
                phone,
                pickUpStatus,
                staffId,
            },
        });

        await prisma.pickup_point_translations.upsert({
            where: {
                pickupPointId_lang: {
                    pickupPointId: pickupPoint.id,
                    lang,
                },
            },
            update: { name, address },
            create: {
                pickupPointId: pickupPoint.id,
                lang,
                name,
                address,
            },
        });

        res.status(200).json({ message: 'Pickup Point has been updated successfully', pickupPoint });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong', details: error.message });
    }
};

export const deletePickupPoint = async (data: createOrUpdateData) => {
    const { id } = req.query;

    try {
        // Delete translations first
        await prisma.pickup_point_translations.deleteMany({
            where: { pickup_point_id: Number(id) },
        });

        // Delete the pickup point
        await prisma.pickup_points.delete({
            where: { id: Number(id) },
        });

        res.status(200).json({ message: 'Pickup Point has been deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong', details: error.message });
    }
};