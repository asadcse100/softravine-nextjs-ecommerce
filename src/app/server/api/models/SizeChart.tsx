// models/SizeChart.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface SizeChart {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getSizeChartById(id: number): Promise<SizeChart | null> {
  return await prisma.SizeChart.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createSizeChart(data: SizeChart): Promise<SizeChart> {
  return await prisma.SizeChart.create({
    data,
  });
}

export async function updateSizeChart(id: number, data: Partial<SizeChart>): Promise<SizeChart | null> {
  return await prisma.SizeChart.update({
    where: { id },
    data,
  });
}

export async function deleteSizeChart(id: number): Promise<SizeChart | null> {
  return await prisma.SizeChart.delete({
    where: { id },
  });
}
