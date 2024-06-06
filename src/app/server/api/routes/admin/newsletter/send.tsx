// pages/api/newsletters/send.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail } from '@/app/server/controllers/NewsletterController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { user_emails, subscriber_emails, subject, content } = req.body;

        if (!process.env.SMTP_USER) {
            return res.status(500).json({ message: 'Please configure SMTP first' });
        }

        try {
            const emailPromises: Promise<void>[] = [];

            if (user_emails) {
                user_emails.forEach((email: string) => {
                    emailPromises.push(sendEmail({ to: email, subject, content }));
                });
            }

            if (subscriber_emails) {
                subscriber_emails.forEach((email: string) => {
                    emailPromises.push(sendEmail({ to: email, subject, content }));
                });
            }

            await Promise.all(emailPromises);
            res.status(200).json({ message: 'Newsletter has been sent' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
