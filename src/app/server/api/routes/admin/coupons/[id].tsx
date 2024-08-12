import { NextResponse } from "next/server";
import { update, destroy  } from '@/app/server/controllers/CouponController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    await update(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }

  if (req.method === 'DELETE') {
    await destroy(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
