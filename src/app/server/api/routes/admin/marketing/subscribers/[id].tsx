import { NextResponse } from "next/server";
import { deleteSubscriber } from '@/app/server/controllers/SubscriberController'; // Import the controller function

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'DELETE') {
    await deleteSubscriber(req, res); // Call the controller function
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}
