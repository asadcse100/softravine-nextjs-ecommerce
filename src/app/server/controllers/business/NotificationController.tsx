// services/notificationService.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type createOrUpdateData = {
    id: number | null;
    type: string;
    notifiable_type: string;
    notifiable_id: number;
    data: string;
    read_at: string;
    created_at?: string;
};

// export async function getUserNotifications(userId: number, userType: string, page: number, perPage: number) {
export const getUserNotifications = async (data: createOrUpdateData) => {
    const notifications = await prisma.notifications.findMany({
        where: { notifiable_id:data.notifiable_id },
        orderBy: { created_at: 'desc' },
    });

    await prisma.notifications.updateMany({
        where: { notifiable_id:data.notifiable_id, read_at: null },
        data: { read_at: new Date() },
    });
    return { success: true, data: notifications };
    // return notifications;
}
