// controllers/pickupPointController.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

export const createPickupPoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name, address, phone, pickUpStatus, staffId } = req.body;

    try {
        const pickupPoint = await prisma.pickupPoint.create({
            data: {
                name,
                address,
                phone,
                pickUpStatus,
                staffId,
                translations: {
                    create: {
                        lang: process.env.DEFAULT_LANGUAGE || 'en',
                        name,
                        address,
                    },
                },
            },
        });

        res.status(201).json({ message: 'Pickup Point has been inserted successfully', pickupPoint });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong', details: error.message });
    }
};

export const updatePickupPoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const { name, address, phone, pickUpStatus, staffId, lang } = req.body;

    try {
        const defaultLang = process.env.DEFAULT_LANGUAGE || 'en';

        const pickupPoint = await prisma.pickupPoint.update({
            where: { id: Number(id) },
            data: {
                ...(lang === defaultLang && { name, address }),
                phone,
                pickUpStatus,
                staffId,
            },
        });

        await prisma.pickupPointTranslation.upsert({
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

export const deletePickupPoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;

    try {
        // Delete translations first
        await prisma.pickupPointTranslation.deleteMany({
            where: { pickupPointId: Number(id) },
        });

        // Delete the pickup point
        await prisma.pickupPoint.delete({
            where: { id: Number(id) },
        });

        res.status(200).json({ message: 'Pickup Point has been deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong', details: error.message });
    }
};