// models/CityTranslation.ts
import { PrismaClient, CityTranslation as CityTranslationModel } from '@prisma/client';

const prisma = new PrismaClient();

export interface CityTranslation {
  id: number;
  name: string;
  lang: string;
  city_id: number;
}

export async function createCityTranslation(data: CityTranslation): Promise<CityTranslation> {
  return await prisma.cityTranslation.create({
    data,
  });
}

export async function updateCityTranslation(id: number, data: Partial<CityTranslation>): Promise<CityTranslation | null> {
  return await prisma.cityTranslation.update({
    where: { id },
    data,
  });
}

export async function deleteCityTranslation(id: number): Promise<CityTranslation | null> {
  return await prisma.cityTranslation.delete({
    where: { id },
  });
}
