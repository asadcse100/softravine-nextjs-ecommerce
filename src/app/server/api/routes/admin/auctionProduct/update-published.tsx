// pages/api/products/update-published.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { updatePublished } from '@/app/server/controllers/AuctionProductController';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'PUT') {
        return updatePublished(req, res);
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;
