import { NextApiRequest, NextApiResponse } from 'next';
import { index } from '@/app/server/controllers/ProductBulkUploadController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        return index(req, res);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};