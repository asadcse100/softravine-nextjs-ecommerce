import type { NextApiRequest, NextApiResponse } from 'next';
import { updateLanguage, destroyLanguage } from '@/app/server/controllers/LanguageController';

// export default async (req: NextApiRequest, res: NextApiResponse) => {
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        await updateLanguage(req, res);
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    if (req.method === 'DELETE') {
        return destroyLanguage(req, res);
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
