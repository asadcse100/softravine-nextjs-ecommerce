import PDF from 'pdfkit';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  type: string;
  value: string;
};

export const getInvoiceById = async (id: number) => {
  try {
    // Check if the record exists
    const existingCategory = await prisma.attributes.findUnique({
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

export const downloadInvoice = async (id: number) => {
  try {
    // const id = data.id;
    // const order = await prisma.orders.findUnique(id); // Replace with your actual method to find an order by ID
    const order = await prisma.orders.findUnique({
      where: { id },
    });
    if (!order) {
      // return res.status(404).json({ message: 'Order not found' });
      return { success: false };
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
    // console.error('Error:', error);
    // res.status(500).json({ message: 'Internal Server Error' });
    return { success: false, error };
  }
};
