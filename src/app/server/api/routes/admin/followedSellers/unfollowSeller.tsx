import { NextApiRequest, NextApiResponse } from 'next';
import { followSellerController } from '@/app/server/controllers/FollowSellerController';
// import authMiddleware from '../../middleware/authMiddleware';

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        await followSellerController.remove(req, res);
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

// export default authMiddleware(handler);
