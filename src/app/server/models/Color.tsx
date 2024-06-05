// models/Color.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Color {
  id: number;
  // Define other fields here
}

export async function getColorById(id: number): Promise<Color | null> {
  return await prisma.color.findUnique({
    where: { id },
  });
}

export async function createColor(data: Color): Promise<Color> {
  return await prisma.color.create({
    data,
  });
}

export async function updateColor(id: number, data: Partial<Color>): Promise<Color | null> {
  return await prisma.color.update({
    where: { id },
    data,
  });
}

export async function deleteColor(id: number): Promise<Color | null> {
  return await prisma.color.delete({
    where: { id },
  });
}
