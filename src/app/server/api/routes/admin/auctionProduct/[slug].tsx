// pages/api/products/[slug].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getAuctionProductDetails } from '@/app/server/controllers/AuctionProductController';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        return getAuctionProductDetails(req, res);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;
