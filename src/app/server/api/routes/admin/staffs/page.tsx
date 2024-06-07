import { NextApiRequest, NextApiResponse } from 'next';
import { getStaffs, storeStaff } from '@/app/server/controllers/StaffController'; // Import the controller function

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await getStaffs(req, res); // Call the controller function
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
  if (req.method === 'POST') {
    return storeStaff(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}