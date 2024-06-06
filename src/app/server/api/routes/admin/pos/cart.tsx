// pages/api/cart.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { addToCart, updateQuantity, removeFromCart } from '@/app/server/controllers/PosController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        return addToCart(req, res);
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    if (req.method === 'PUT') {
        return updateQuantity(req, res);
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    if (req.method === 'DELETE') {
        return removeFromCart(req, res);
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
