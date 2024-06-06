// pages/api/newsletters/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getUsersAndSubscribers } from '@/app/server/controllers/NewsletterController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const { users, subscribers } = await getUsersAndSubscribers();
            res.status(200).json({ users, subscribers });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
