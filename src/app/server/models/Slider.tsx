// models/Slider.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Slider {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getSliderById(id: number): Promise<Slider | null> {
  return await prisma.Slider.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createSlider(data: Slider): Promise<Slider> {
  return await prisma.Slider.create({
    data,
  });
}

export async function updateSlider(id: number, data: Partial<Slider>): Promise<Slider | null> {
  return await prisma.Slider.update({
    where: { id },
    data,
  });
}

export async function deleteSlider(id: number): Promise<Slider | null> {
  return await prisma.Slider.delete({
    where: { id },
  });
}
