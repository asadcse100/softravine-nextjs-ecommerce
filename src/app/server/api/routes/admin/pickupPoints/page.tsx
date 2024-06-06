// pages/api/pickupPoints/index.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getPickupPoints, createPickupPoint } from '@/app/server/controllers/PickupPointController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        return getPickupPoints(req, res);
    } else {
        res.status(405).json({ error: `Method ${req.method} not allowed` });
    }

    if (req.method === 'POST') {
        return createPickupPoint(req, res);
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
