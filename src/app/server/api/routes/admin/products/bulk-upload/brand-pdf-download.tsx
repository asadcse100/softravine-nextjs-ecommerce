// pages/api/categories/pdf-download.ts

import { pdfDownloadBrand } from '@/app/server/controllers/ProductBulkUploadController';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        return pdfDownloadBrand(req, res);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};