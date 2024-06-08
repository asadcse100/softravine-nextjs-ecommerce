// pages/api/wishlist/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// export default async (req: NextApiRequest, res: NextApiResponse) => {
export async function wishlists(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const wishlists = await prisma.wishlist.findMany({
        where: { userId: session.user.id },
    });

    res.status(200).json(wishlists);
};

export async function store(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.body;
    const userId = req.cookies.userId; // Assuming userId is stored in cookies

    try {
        if (userId) {
            const wishlist = await prisma.wishlist.findFirst({
                where: {
                    user_id: Number(userId),
                    product_id: Number(id)
                }
            });

            if (!wishlist) {
                await prisma.wishlist.create({
                    data: {
                        user_id: Number(userId),
                        product_id: Number(id)
                    }
                });
            }
            res.status(200).json({ message: 'Wishlist updated successfully' });
        } else {
            res.status(403).json({ error: 'User not authenticated' });
        }
    } catch (error) {
        console.error('Error updating wishlist:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function remove(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.body;

    try {
        const wishlist = await prisma.wishlist.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (wishlist) {
            await prisma.wishlist.delete({
                where: {
                    id: Number(id)
                }
            });
            res.status(200).json({ message: 'Wishlist item removed successfully' });
        } else {
            res.status(404).json({ error: 'Wishlist item not found' });
        }
    } catch (error) {
        console.error('Error removing wishlist item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}