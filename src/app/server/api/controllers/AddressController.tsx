import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function addressHandler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    switch (req.method) {
        case 'POST':
            return createAddress(req, res, session);
        case 'GET':
            return getAddress(req, res);
        case 'PUT':
            return updateAddress(req, res);
        case 'DELETE':
            return deleteAddress(req, res);
        default:
            return res.status(405).json({ message: 'Method Not Allowed' });
    }
}

async function createAddress(req: NextApiRequest, res: NextApiResponse, session) {
    try {
        const addressData = {
            user_id: req.body.customer_id ? req.body.customer_id : session.user.id,
            address: req.body.address,
            country_id: req.body.country_id,
            state_id: req.body.state_id,
            city_id: req.body.city_id,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            postal_code: req.body.postal_code,
            phone: req.body.phone,
        };

        const address = await prisma.address.create({ data: addressData });

        if (address) {
            return res.status(200).json({ message: 'Address info Stored successfully' });
        } else {
            return res.status(500).json({ message: 'Failed to store address info' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function getAddress(req: NextApiRequest, res: NextApiResponse) {
    try {
        const addressId = req.query.id;
        const address = await prisma.address.findUnique({ where: { id: addressId } });

        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }

        return res.status(200).json({ address });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function updateAddress(req: NextApiRequest, res: NextApiResponse) {
    try {
        const addressId = req.query.id;
        const addressData = {
            address: req.body.address,
            country_id: req.body.country_id,
            state_id: req.body.state_id,
            city_id: req.body.city_id,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            postal_code: req.body.postal_code,
            phone: req.body.phone,
        };

        const address = await prisma.address.update({
            where: { id: addressId },
            data: addressData,
        });

        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }

        return res.status(200).json({ message: 'Address info updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function deleteAddress(req: NextApiRequest, res: NextApiResponse) {
    try {
        const addressId = req.query.id;

        const address = await prisma.address.delete({ where: { id: addressId } });

        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }

        return res.status(200).json({ message: 'Address deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
