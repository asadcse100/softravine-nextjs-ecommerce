import { NextApiRequest, NextApiResponse } from 'next';
import { Address } from '../../../models/Address'; // Make sure to import your Address model
import { City } from '../../../models/City'; // Import your City model
import { State } from '../../../models/State'; // Import your State model
import { getSession } from 'next-auth/client'; // If you're using NextAuth.js for authentication

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });

    if (!session) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    switch (req.method) {
        case 'POST':
            return handlePostRequest(req, res);
        case 'GET':
            return handleGetRequest(req, res);
        case 'PUT':
            return handlePutRequest(req, res);
        case 'DELETE':
            return handleDeleteRequest(req, res);
        default:
            res.status(405).json({ message: 'Method Not Allowed' });
    }
}

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { address, country_id, state_id, city_id, longitude, latitude, postal_code, phone } = req.body;

        const newAddress = new Address({
            user_id: req.user.id,
            address,
            country_id,
            state_id,
            city_id,
            longitude,
            latitude,
            postal_code,
            phone,
        });

        await newAddress.save();
        res.status(200).json({ message: 'Address created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
    try {
        const addresses = await Address.find({ user_id: req.user.id });
        res.status(200).json(addresses);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function handlePutRequest(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query;
        const { address, country_id, state_id, city_id, longitude, latitude, postal_code, phone } = req.body;

        await Address.findByIdAndUpdate(id, {
            address,
            country_id,
            state_id,
            city_id,
            longitude,
            latitude,
            postal_code,
            phone,
        });

        res.status(200).json({ message: 'Address updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function handleDeleteRequest(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query;
        await Address.findByIdAndDelete(id);
        res.status(200).json({ message: 'Address deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
