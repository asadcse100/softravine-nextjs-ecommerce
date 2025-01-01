// controllers/attributeController.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  size_chart_id: number;
  measurement_point_id: number;
  attribute_value_id: number;
  inch_value: string;
  cen_value: string;
  created_at?: string;
};

export const selectFitType = async () => {
  try {
    const categories = await prisma.categories.findMany({
      select: {
        name: true,
      },
    });
    return { success: true, data: categories };

  } catch (error) {
    // console.error("Error fetching categorys:", error);
    return { success: false, error };
  }
}

export const getSizeChartById = async (id: number) => {
  try {
    // Check if the record exists
    const existingCategory = await prisma.size_charts.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return { success: false, error: "Record does not exist." };
    }

    return { success: true, data: existingCategory };
  } catch (error) {
    // console.error("Error category:", error);
    return { success: false, error };
  }
};

export const getSizeCharts = async () => {
  try {
    const size_chart = await prisma.size_charts.findMany();
    return { success: true, data: size_chart };
  } catch (error) {
    // console.error("Error fetching size_chart:", error);
    return { success: false, error };
  }
}

export const getSizePoints = async () => {
  try {
    const measurement_points = await prisma.measurement_points.findMany();
    return { success: true, data: measurement_points };
  } catch (error) {
    // console.error("Error fetching measurement_points:", error);
    return { success: false, error };
  }
}
