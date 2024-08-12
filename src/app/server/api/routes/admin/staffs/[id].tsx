import { NextResponse } from "next/server";
import { updateStaff, deleteStaff } from '@/app/server/controllers/StaffController'; // Import the controller function

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    await updateStaff(req, res); // Call the controller function
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
  if (req.method === 'DELETE') {
    await deleteStaff(req, res); // Call the controller function
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}
