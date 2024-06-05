// pages/api/products/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from '@/app/server/middleware/withAuth';
import { updateAuctionProduct, deleteProduct } from '@/app/server/controllers/AuctionProductController';

const auctionProductHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'PUT') {
        return updateAuctionProduct(req, res);
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    if (req.method === 'DELETE') {
        return deleteProduct(req, res);
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }

};

export default withAuth(auctionProductHandler);
