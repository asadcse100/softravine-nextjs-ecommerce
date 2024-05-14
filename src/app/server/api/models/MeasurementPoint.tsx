// models/MeasurementPoint.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface MeasurementPoint {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getMeasurementPointById(id: number): Promise<MeasurementPoint | null> {
  return await prisma.MeasurementPoint.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createMeasurementPoint(data: MeasurementPoint): Promise<MeasurementPoint> {
  return await prisma.MeasurementPoint.create({
    data,
  });
}

export async function updateMeasurementPoint(id: number, data: Partial<MeasurementPoint>): Promise<MeasurementPoint | null> {
  return await prisma.MeasurementPoint.update({
    where: { id },
    data,
  });
}

export async function deleteMeasurementPoint(id: number): Promise<MeasurementPoint | null> {
  return await prisma.MeasurementPoint.delete({
    where: { id },
  });
}
