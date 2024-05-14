// models/SizeChartDetail.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface SizeChartDetail {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getSizeChartDetailById(id: number): Promise<SizeChartDetail | null> {
  return await prisma.SizeChartDetail.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createSizeChartDetail(data: SizeChartDetail): Promise<SizeChartDetail> {
  return await prisma.SizeChartDetail.create({
    data,
  });
}

export async function updateSizeChartDetail(id: number, data: Partial<SizeChartDetail>): Promise<SizeChartDetail | null> {
  return await prisma.SizeChartDetail.update({
    where: { id },
    data,
  });
}

export async function deleteSizeChartDetail(id: number): Promise<SizeChartDetail | null> {
  return await prisma.SizeChartDetail.delete({
    where: { id },
  });
}
