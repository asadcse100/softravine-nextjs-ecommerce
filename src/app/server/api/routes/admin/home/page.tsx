import { NextApiRequest, NextApiResponse } from 'next';
import { getData } from '@/app/server/controllers/HomeController';

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        await getData(req, res);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

// export default handler;
