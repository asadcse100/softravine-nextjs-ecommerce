// models/City.ts
import { PrismaClient, City as CityModel } from '@prisma/client';

const prisma = new PrismaClient();

export interface City {
  id: number;
  // Add other fields here
}

export async function getCityById(id: number): Promise<City | null> {
  return await prisma.city.findUnique({
    where: { id },
    include: {
      city_translations: {
        where: { lang: { equals: 'en' } }, // Assuming default language is 'en'
      },
      country: true,
      state: true,
    },
  });
}

export async function createCity(data: City): Promise<City> {
  return await prisma.city.create({
    data,
  });
}

export async function updateCity(id: number, data: Partial<City>): Promise<City | null> {
  return await prisma.city.update({
    where: { id },
    data,
  });
}

export async function deleteCity(id: number): Promise<City | null> {
  return await prisma.city.delete({
    where: { id },
  });
}
