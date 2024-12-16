// controllers/ZoneController.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type createOrUpdateData = {
    id: number | null;
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
export async function store(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { name, status, countryIds } = req.body;

        const zone = await prisma.zone.create({
            data: {
                name,
                status,
                countries: {
                    connect: countryIds.map((id: number) => ({ id })),
                },
            },
            include: { countries: true },
        });

        res.status(201).json(zone);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// async update(req: NextApiRequest, res: NextApiResponse) {
export async function update(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query;
        const { name, countryIds } = req.body;

        const updatedZone = await prisma.zone.update({
            where: { id: Number(id) },
            data: {
                name,
                countries: {
                    disconnect: true,
                    connect: countryIds.map((countryId: number) => ({ id: countryId })),
                },
            },
            include: { countries: true },
        });

        res.status(200).json(updatedZone);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// async destroy(req: NextApiRequest, res: NextApiResponse) {
export async function destroy(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query;

        // Disconnect countries associated with the zone
        await prisma.country.updateMany({
            where: { zoneId: Number(id) },
            data: { zoneId: 0 },
        });

        // Delete the zone
        await prisma.zone.delete({ where: { id: Number(id) } });

        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}