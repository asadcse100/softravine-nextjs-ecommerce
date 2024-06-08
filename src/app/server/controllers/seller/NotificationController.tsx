// pages/api/seller/notifications/index.ts

import { getSession } from 'next-auth/client';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getSession({ req });
  const userId = session.user.id;

  try {
    // Fetch notifications and mark them as read
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 15,
      include: { user: true },
    });

    // Mark notifications as read
    await prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true },
    });

    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
