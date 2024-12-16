// services/notificationService.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type createOrUpdateData = {
    id: number | null;
    type: string;
    notifiable_type: string;
    notifiable_id: string;
    data: string;
    read_at: string;
    created_at?: string;
};

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
