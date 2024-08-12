import { NextResponse } from "next/server";
import { getSession } from 'next-auth/react';
import { getUserNotifications } from '@/app/server/controllers/NotificationController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { page = 1, perPage = 15 } = req.query;
    const userId = session.user.id;
    const userType = session.user.userType;

    try {
        const notifications = await getUserNotifications(userId, userType, Number(page), Number(perPage));
        res.status(200).json({ notifications });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
