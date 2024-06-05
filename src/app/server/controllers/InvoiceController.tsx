// src/server/controllers/orderController.ts
import { NextApiRequest, NextApiResponse } from 'next';
import PDF from 'pdfkit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const downloadInvoice = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const order = await prisma.findById(id); // Replace with your actual method to find an order by ID
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const doc = new PDF();
    // Add your PDF generation logic here using PDFKit

    // Set response headers for PDF download
    res.setHeader('Content-Disposition', `attachment; filename="order-${order.code}.pdf"`);
    res.setHeader('Content-Type', 'application/pdf');

    // Pipe the PDF content to the response
    doc.pipe(res);
    // Add your PDF content here
    doc.end();

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
