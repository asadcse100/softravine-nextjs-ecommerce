// src/pages/api/update-profile.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { updateUserProfile } from '@/app/server/controllers/HomeController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await updateUserProfile(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
