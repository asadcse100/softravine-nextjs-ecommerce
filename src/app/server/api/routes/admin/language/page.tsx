import type { NextApiRequest, NextApiResponse } from 'next';
import { changeLanguage, getLanguages } from '@/app/server/controllers/LanguageController';

// export default async (req: NextApiRequest, res: NextApiResponse) => {
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        await getLanguages(req, res);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    if (req.method === 'POST') {
        await changeLanguage(req, res);
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
