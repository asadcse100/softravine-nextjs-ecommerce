import prisma from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { Shop, User } from '@prisma/client';

export default async function ShopController(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        return handleGet(req, res);
    } else if (req.method === 'PUT') {
        return handlePut(req, res);
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
    try {
        const shopId = req.query.shop_id as string;
        const shop = await prisma.shop.findFirst({
            where: { id: Number(shopId) },
        });
        res.status(200).json(shop);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
    try {
        const shopId = req.body.shop_id as string;
        const shop = await prisma.shop.update({
            where: { id: Number(shopId) },
            data: {
                name: req.body.name,
                address: req.body.address,
                phone: req.body.phone,
                slug: `${req.body.name.replace(/\s+/g, '-')}-${shopId}`,
                meta_title: req.body.meta_title,
                meta_description: req.body.meta_description,
                logo: req.body.logo,
                shipping_cost: req.body.shipping_cost,
                delivery_pickup_longitude: req.body.delivery_pickup_longitude,
                delivery_pickup_latitude: req.body.delivery_pickup_latitude,
                facebook: req.body.facebook,
                instagram: req.body.instagram,
                google: req.body.google,
                twitter: req.body.twitter,
                youtube: req.body.youtube,
                top_banner: req.body.top_banner,
                sliders: req.body.sliders,
                banner_full_width_1: req.body.banner_full_width_1,
                banners_half_width: req.body.banners_half_width,
                banner_full_width_2: req.body.banner_full_width_2,
            },
        });
        res.status(200).json({ message: 'Your Shop has been updated successfully!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Sorry! Something went wrong.' });
    }
}
