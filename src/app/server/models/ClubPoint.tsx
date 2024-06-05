// models/ClubPoint.ts
import { PrismaClient, User, Order, ClubPointDetail } from '@prisma/client';

const prisma = new PrismaClient();

export interface ClubPoint {
  id: number;
  userId: number;
  orderId: number;
  // Define other fields here
}

export async function getClubPointById(id: number): Promise<ClubPoint | null> {
  return await prisma.clubPoint.findUnique({
    where: { id },
    include: {
      user: true,
      order: true,
      club_point_details: true,
    },
  });
}

export async function createClubPoint(data: ClubPoint): Promise<ClubPoint> {
  return await prisma.clubPoint.create({
    data,
  });
}

export async function updateClubPoint(id: number, data: Partial<ClubPoint>): Promise<ClubPoint | null> {
  return await prisma.clubPoint.update({
    where: { id },
    data,
  });
}

export async function deleteClubPoint(id: number): Promise<ClubPoint | null> {
  return await prisma.clubPoint.delete({
    where: { id },
  });
}
