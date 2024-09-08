// services/notificationService.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUserNotifications(userId: number, userType: string, page: number, perPage: number) {
    const notifications = await prisma.notifications.findMany({
        where: { notifiable_id },
        skip: (page - 1) * perPage,
        take: perPage,
        orderBy: { created_at: 'desc' },
    });

    await prisma.notifications.updateMany({
        where: { notifiable_id, read_at: null },
        data: { read_at: new Date() },
    });

    return notifications;
}
