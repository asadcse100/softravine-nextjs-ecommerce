import { NextResponse } from "next/server";
import { deletePage } from '@/app/server/controllers/PageController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === 'POST') {
    return deletePage(req, res);
  } else {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
