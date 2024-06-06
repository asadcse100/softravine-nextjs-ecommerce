// services/notificationService.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUserNotifications(userId: number, userType: string, page: number, perPage: number) {
    const notifications = await prisma.notification.findMany({
        where: { userId },
        skip: (page - 1) * perPage,
        take: perPage,
        orderBy: { createdAt: 'desc' },
    });

    await prisma.notification.updateMany({
        where: { userId, readAt: null },
        data: { readAt: new Date() },
    });

    return notifications;
}
