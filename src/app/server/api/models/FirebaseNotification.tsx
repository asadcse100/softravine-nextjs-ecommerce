// models/FirebaseNotification.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface FirebaseNotification {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getFirebaseNotificationById(id: number): Promise<FirebaseNotification | null> {
  return await prisma.FirebaseNotification.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createFirebaseNotification(data: FirebaseNotification): Promise<FirebaseNotification> {
  return await prisma.FirebaseNotification.create({
    data,
  });
}

export async function updateFirebaseNotification(id: number, data: Partial<FirebaseNotification>): Promise<FirebaseNotification | null> {
  return await prisma.FirebaseNotification.update({
    where: { id },
    data,
  });
}

export async function deleteFirebaseNotification(id: number): Promise<FirebaseNotification | null> {
  return await prisma.FirebaseNotification.delete({
    where: { id },
  });
}
