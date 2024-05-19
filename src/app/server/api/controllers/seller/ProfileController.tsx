import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { hash } from 'bcrypt';
import { User } from '@prisma/client';

export default async function ProfileController(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        return handleGet(req, res);
    } else if (req.method === 'PUT') {
        return handlePut(req, res);
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
    const userId = req.query.id;
    
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(userId) },
            include: { addresses: true }
        });
        res.status(200).json(user);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
    const userId = req.query.id;
    const {
        name,
        phone,
        new_password,
        confirm_password,
        photo,
        cash_on_delivery_status,
        bank_payment_status,
        bank_name,
        bank_acc_name,
        bank_acc_no,
        bank_routing_no
    } = req.body;

    try {
        const user = await prisma.user.update({
            where: { id: Number(userId) },
            data: {
                name,
                phone,
                ...(new_password && new_password === confirm_password && { password: await hash(new_password, 10) }),
                avatar_original: photo,
                shop: {
                    update: {
                        cash_on_delivery_status,
                        bank_payment_status,
                        bank_name,
                        bank_acc_name,
                        bank_acc_no,
                        bank_routing_no
                    }
                }
            }
        });
        res.status(200).json({ message: 'Your Profile has been updated successfully!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
