// models/Upload.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Upload {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getUploadById(id: number): Promise<Upload | null> {
  return await prisma.Upload.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createUpload(data: Upload): Promise<Upload> {
  return await prisma.Upload.create({
    data,
  });
}

export async function updateUpload(id: number, data: Partial<Upload>): Promise<Upload | null> {
  return await prisma.Upload.update({
    where: { id },
    data,
  });
}

export async function deleteUpload(id: number): Promise<Upload | null> {
  return await prisma.Upload.delete({
    where: { id },
  });
}
