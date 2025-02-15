import { NextResponse } from "next/server";
import { deleteOrder } from '@/app/server/controllers/OrderController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    return deleteOrder(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
