import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type createOrUpdateData = {
    id: number | null;
    name: string;
    address: string;
    phone: string;
    meta_title: string;
    meta_description: string;
    logo: string;
    shipping_cost: number;
    delivery_pickup_longitude: number;
    delivery_pickup_latitude: number;
    facebook: string;
    instagram: string;
    google: string;
    twitter: string;
    youtube: string;
    top_banner: string;
    sliders: string;
    banner_full_width_1: string;
    banners_half_width: string;
    banner_full_width_2: string;
};

// export default async function ShopController(data: createOrUpdateData) {
//     if (req.method === 'GET') {
//         return handleGet(req, res);
//     } else if (req.method === 'PUT') {
//         return handlePut(req, res);
//     } else {
//         res.status(405).end(); // Method Not Allowed
//     }
// }

async function handleGet(data: createOrUpdateData) {
    try {
        const shopId = data.id;
        const shop = await prisma.shops.findFirst({
            where: { id: Number(shopId) },
        });
        return { success: true, data: shop };
        // res.status(200).json(shop);
    } catch (error) {
        return { success: false, error };
        // console.error('Error:', error);
        // res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function handlePut(data: createOrUpdateData) {
    try {
        const shopId = data.id;
        const shop = await prisma.shops.update({
            where: { id: Number(shopId) },
            data: {
                name: data.name,
                address: data.address,
                phone: data.phone,
                slug: `${data.name.replace(/\s+/g, '-')}-${shopId}`,
                meta_title: data.meta_title,
                meta_description: data.meta_description,
                logo: data.logo,
                shipping_cost: data.shipping_cost,
                delivery_pickup_longitude: data.delivery_pickup_longitude,
                delivery_pickup_latitude: data.delivery_pickup_latitude,
                facebook: data.facebook,
                instagram: data.instagram,
                google: data.google,
                twitter: data.twitter,
                youtube: data.youtube,
                top_banner: data.top_banner,
                sliders: data.sliders,
                banner_full_width_1: data.banner_full_width_1,
                banners_half_width: data.banners_half_width,
                banner_full_width_2: data.banner_full_width_2,
            },
        });
        return { success: true, data: shop };
        // res.status(200).json({ message: 'Your Shop has been updated successfully!' });
    } catch (error) {
        return { success: false, error };
        // console.error('Error:', error);
        // res.status(500).json({ message: 'Sorry! Something went wrong.' });
    }
}
