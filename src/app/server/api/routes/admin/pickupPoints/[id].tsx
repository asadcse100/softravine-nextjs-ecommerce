import { NextApiRequest, NextApiResponse } from 'next';
import { updatePickupPoint, deletePickupPoint } from '@/app/server/controllers/PickupPointController';

// export default async (req: NextApiRequest, res: NextApiResponse) => {
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        return updatePickupPoint(req, res);
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    if (req.method === 'DELETE') {
        return deletePickupPoint(req, res);
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}