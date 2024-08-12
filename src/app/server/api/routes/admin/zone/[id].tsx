import { NextResponse } from "next/server";
import { update, destroy } from '@/app/server/controllers/ZoneController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  
  if (req.method === 'PUT') {
    return update(req, res);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
  if (req.method === 'DELETE') {
    await destroy(req, res);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
