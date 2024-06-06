// pages/api/support/product-query/[id]/reply.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { replyToQuery } from '@/app/server/controllers/ProductQueryController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        await replyToQuery(req, res);
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
