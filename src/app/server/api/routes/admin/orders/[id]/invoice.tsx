// src/pages/api/orders/[id]/invoice.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { downloadInvoice } from '@/app/server/controllers/InvoiceController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await downloadInvoice(req, res);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
