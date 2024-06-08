import { NextApiRequest, NextApiResponse } from 'next';
import { createInvoicePDF } from '../../utils/pdf';
import { parseExcelFile } from '../../utils/excel';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function ProductBulkUploadController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    return handleGet(req, res);
  } else if (req.method === 'POST') {
    return handlePost(req, res);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.query;
  
  try {
    const shop = await prisma.shop.findUnique({
      where: { userId: Number(user) },
      select: { verificationStatus: true }
    });

    if (shop && shop.verificationStatus) {
      res.status(200).json({ message: 'Your shop is verified!' });
    } else {
      res.status(403).json({ message: 'Your shop is not verified yet!' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const { bulk_file } = req.body;

  try {
    if (bulk_file) {
      const products = await parseExcelFile(bulk_file);
      // Assuming parseExcelFile function returns an array of products
      
      // Save products to database using Prisma
      // Example: await prisma.product.createMany({ data: products });

      res.status(200).json({ message: 'Bulk upload successful' });
    } else {
      res.status(400).json({ message: 'No file provided' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function pdf_download_category(req: NextApiRequest, res: NextApiResponse) {
  try {
    const categories: Category[] = await prisma.category.findMany();

    const pdfBuffer = await createInvoicePDF(categories, 'category.pdf');

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=category.pdf');
    res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function pdf_download_brand(req: NextApiRequest, res: NextApiResponse) {
  try {
    const brands: Brand[] = await prisma.brand.findMany();

    const pdfBuffer = await createInvoicePDF(brands, 'brands.pdf');

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=brands.pdf');
    res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
