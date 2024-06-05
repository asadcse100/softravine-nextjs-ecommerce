import type { NextApiRequest, NextApiResponse } from 'next';
import { keyValueStore } from '@/app/server/controllers/LanguageController';

// export default async (req: NextApiRequest, res: NextApiResponse) => {
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        await keyValueStore(req, res);
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
