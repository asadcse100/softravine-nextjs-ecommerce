// src/pages/api/email/send-verification.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { sendEmailVerificationMail } from '@/app/server/controllers/HomeController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await sendEmailVerificationMail(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
