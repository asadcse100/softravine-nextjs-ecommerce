// controllers/ProductController.ts

import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';
import PDFDocument from 'pdfkit';
import multer from 'multer';
import ProductsImport from './ProductsImport';
import Excel from 'exceljs';

type createOrUpdateData = {
    id: number | null;
    type: string;
    value: string;
};

const prisma = new PrismaClient();

export const index = async (data: createOrUpdateData) => {
    const session = await getSession({ req });
    if (!session || !session.user) {
        // return res.status(401).json({ success: 0, message: 'Unauthorized' });
        return { success: false };
    }

    const user = await prisma.users.findUnique({
        where: { email: session.user.email },
        include: { shop: true }
    });

    if (user.user_type === 'seller') {
        if (user.shop.verification_status) {
            return res.status(200).json({ view: 'seller.product_bulk_upload.index' });
        } else {
            flash('Your shop is not verified yet!', 'warning', req, res);
            return res.status(403).json({ success: 0, message: 'Your shop is not verified yet!' });
        }
    } else if (user.user_type === 'admin' || user.user_type === 'staff') {
        return res.status(200).json({ view: 'backend.product.bulk_upload.index' });
    } else {
        return res.status(403).json({ success: 0, message: 'Unauthorized' });
    }
};

export const pdfDownloadCategory = async (data: createOrUpdateData) => {
    const categories = await prisma.categories.findMany();

    const doc = new PDFDocument();

    let buffers: Buffer[] = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        res.writeHead(200, {
            'Content-Length': pdfData.length,
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment;filename=category.pdf',
        }).end(pdfData);
    });

    doc.fontSize(25).text('Categories', {
        align: 'center'
    });

    doc.moveDown();

    categories.forEach(category => {
        doc.fontSize(18).text(`Category: ${category.name}`);
        doc.moveDown();
    });

    doc.end();
};


export const pdfDownloadBrand = async (data: createOrUpdateData) => {
    const brands = await prisma.brands.findMany();

    const doc = new PDFDocument();

    let buffers: Buffer[] = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        res.writeHead(200, {
            'Content-Length': pdfData.length,
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment;filename=brands.pdf',
        }).end(pdfData);
    });

    doc.fontSize(25).text('Brands', {
        align: 'center'
    });

    doc.moveDown();

    brands.forEach(brand => {
        doc.fontSize(18).text(`Brand: ${brand.name}`);
        doc.moveDown();
    });

    doc.end();
};


export const pdfDownloadSeller = async (data: createOrUpdateData) => {
    const sellers = await prisma.users.findMany({
        where: {
            user_type: 'seller'
        }
    });

    const doc = new PDFDocument();

    let buffers: Buffer[] = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        res.writeHead(200, {
            'Content-Length': pdfData.length,
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment;filename=user.pdf',
        }).end(pdfData);
    });

    doc.fontSize(25).text('Sellers', {
        align: 'center'
    });

    doc.moveDown();

    sellers.forEach(seller => {
        doc.fontSize(18).text(`Seller: ${seller.name}`);
        doc.fontSize(14).text(`Email: ${seller.email}`);
        doc.fontSize(14).text(`Phone: ${seller.phone}`);
        doc.moveDown();
    });

    doc.end();
};


// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Specify the destination folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Keep the original filename
    }
});

// Initialize multer upload
const upload = multer({ storage }).single('bulk_file');

export const bulkUpload = async (data: createOrUpdateData) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading
            return res.status(500).json({ success: false, message: 'Error uploading file' });
        } else if (err) {
            // An unknown error occurred
            return res.status(500).json({ success: false, message: 'Unknown error' });
        }

        // File uploaded successfully
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        try {
            const import = new ProductsImport();
            await import.import(req.file.path);
            return res.status(200).json({ success: true, message: 'Bulk upload successful' });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Error processing bulk upload' });
        }
    });
};