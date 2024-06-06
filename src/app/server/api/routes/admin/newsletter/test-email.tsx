// pages/api/test-email.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { sendTestEmail } from '@/app/server/controllers/NewsletterController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email } = req.body;

        try {
            await sendTestEmail(email);
            res.status(200).json({ message: 'An email has been sent.' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
