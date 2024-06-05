// pages/api/orders/purchase-history.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getUserPurchaseHistory } from '@/app/server/controllers/AuctionProductController';
import { withAuth } from '@/app/server/middleware/withAuth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        return getUserPurchaseHistory(req, res);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default withAuth(handler);
