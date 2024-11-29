import { NextApiRequest, NextApiResponse } from 'next';
import { ProductService } from '../../services/ProductService';
import { ProductTaxService } from '../../services/ProductTaxService';
import { ProductFlashDealService } from '../../services/ProductFlashDealService';
import { ProductStockService } from '../../services/ProductStockService';
import { NotificationService } from '../../services/NotificationService';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const productService = new ProductService();
const productTaxService = new ProductTaxService();
const productFlashDealService = new ProductFlashDealService();
const productStockService = new ProductStockService();
const notificationService = new NotificationService();

export default async function ProductController(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        return handleGet(req, res);
    } else if (req.method === 'POST') {
        return handlePost(req, res);
    } else if (req.method === 'PUT') {
        return handlePut(req, res);
    } else if (req.method === 'DELETE') {
        return handleDelete(req, res);
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
    const { user } = req.query;
    const products = await prisma.product.findMany({
        where: { user_id: Number(user), digital: false, auction_product: false, wholesale_product: false },
        orderBy: { created_at: 'desc' },
        include: { product_translations: true }
    });
    res.status(200).json(products);
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const { name, unit, description, user_id, category_ids, tax_id, ...rest } = req.body;
    
    try {
        const product = await productService.store({
            name,
            unit,
            description,
            user_id,
            ...rest
        });

        if (category_ids) {
            await prisma.productCategory.createMany({
                data: category_ids.map((category_id: number) => ({
                    product_id: product.id,
                    category_id
                }))
            });
        }

        if (tax_id) {
            await productTaxService.store({
                tax_id,
                product_id: product.id,
                ...rest
            });
        }

        res.status(201).json({ message: 'Product has been inserted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const { name, unit, description, category_ids, tax_id, ...rest } = req.body;

    try {
        const product = await productService.update(Number(id), {
            name,
            unit,
            description,
            ...rest
        });

        if (category_ids) {
            await prisma.productCategory.deleteMany({ where: { product_id: Number(id) } });
            await prisma.productCategory.createMany({
                data: category_ids.map((category_id: number) => ({
                    product_id: Number(id),
                    category_id
                }))
            });
        }

        if (tax_id) {
            await prisma.productTax.deleteMany({ where: { product_id: Number(id) } });
            await productTaxService.store({
                tax_id,
                product_id: Number(id),
                ...rest
            });
        }

        res.status(200).json({ message: 'Product has been updated successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    try {
        await prisma.productCategory.deleteMany({ where: { product_id: Number(id) } });
        await prisma.productTax.deleteMany({ where: { product_id: Number(id) } });
        await prisma.productStock.deleteMany({ where: { product_id: Number(id) } });
        await prisma.product.delete({ where: { id: Number(id) } });

        res.status(200).json({ message: 'Product has been deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
