import { NextResponse } from "next/server";
import { update, destroy } from '@/app/server/controllers/TaxController'; // Import the controller function

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    await update(req, res); // Call the controller function
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
  if (req.method === 'DELETE') {
    await destroy(req, res); // Call the controller function
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}