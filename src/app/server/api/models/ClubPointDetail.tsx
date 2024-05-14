// models/ClubPointDetail.ts
import { PrismaClient, Product, ClubPoint } from '@prisma/client';

const prisma = new PrismaClient();

export interface ClubPointDetail {
  id: number;
  productId: number;
  clubPointId: number;
  // Define other fields here
}

export async function getClubPointDetailById(id: number): Promise<ClubPointDetail | null> {
  return await prisma.clubPointDetail.findUnique({
    where: { id },
    include: {
      product: true,
      club_point: true,
    },
  });
}

export async function createClubPointDetail(data: ClubPointDetail): Promise<ClubPointDetail> {
  return await prisma.clubPointDetail.create({
    data,
  });
}

export async function updateClubPointDetail(id: number, data: Partial<ClubPointDetail>): Promise<ClubPointDetail | null> {
  return await prisma.clubPointDetail.update({
    where: { id },
    data,
  });
}

export async function deleteClubPointDetail(id: number): Promise<ClubPointDetail | null> {
  return await prisma.clubPointDetail.delete({
    where: { id },
  });
}
