import { NextApiRequest, NextApiResponse } from 'next';
import { getReviews, createReview } from '@/app/server/controllers/ReviewController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {
        try {
            await getReviews(req, res);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    if (req.method === 'POST') {
        await createReview(req, res); // Call the controller function
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}