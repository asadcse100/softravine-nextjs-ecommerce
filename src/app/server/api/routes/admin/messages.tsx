// pages/api/messages.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { createMessage } from '@/app/server/controllers/MessageController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const session = await getSession({ req });

        if (!session) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { conversation_id, message } = req.body;
        const user_id = session.user.id;

        try {
            const newMessage = await createMessage({ conversation_id, message, user_id });
            res.status(200).json(newMessage);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
