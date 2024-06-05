import type { NextApiRequest, NextApiResponse } from 'next';
import { updateRtlStatus } from '@/app/server/controllers/LanguageController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            await updateRtlStatus(req, res);
        } catch (error) {
            console.error('Error in processing request:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
