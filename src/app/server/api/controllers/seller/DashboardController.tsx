import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function index(req: Request, res: Response) {
    try {
        const products = await prisma.product.findMany({
            where: {
                user_id: Auth.user.id
            },
            orderBy: {
                num_of_sale: 'desc'
            },
            take: 12
        });

        const last7DaysSales = await prisma.order.groupBy({
            by: ['created_at'],
            where: {
                created_at: {
                    gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
                },
                seller_id: Auth.user.id,
                delivery_status: 'delivered'
            },
            _sum: {
                grand_total: true
            },
            _count: false
        });

        const last7DaysSalesFormatted = last7DaysSales.reduce((acc, curr) => {
            const formattedDate = format(new Date(curr.created_at), 'dd MMM');
            acc[formattedDate] = curr._sum.grand_total;
            return acc;
        }, {});

        const data = {
            products,
            last_7_days_sales: last7DaysSalesFormatted
        };

        return res.render('seller.dashboard', data);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
