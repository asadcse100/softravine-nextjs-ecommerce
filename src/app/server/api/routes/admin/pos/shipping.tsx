
import type { NextApiRequest, NextApiResponse } from 'next';
import { setShippingAddress } from '@/app/server/controllers/PosController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        return setShippingAddress(req, res);
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
