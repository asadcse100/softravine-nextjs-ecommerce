// controllers/attributeController.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getSizeCharts = async () => {
  try {
    const size_chart = await prisma.size_charts.findMany();
    return { success: true, data: size_chart };
  } catch (error) {
    console.error("Error fetching size_chart:", error);
    return { success: false, error };
  }
}

export const getSizePoints = async () => {
  try {
    const measurement_points = await prisma.measurement_points.findMany();
    return { success: true, data: measurement_points };
  } catch (error) {
    console.error("Error fetching measurement_points:", error);
    return { success: false, error };
  }
}
