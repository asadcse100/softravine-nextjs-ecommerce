import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { User, SellerWithdrawRequest } from '@prisma/client';

export default async function SellerWithdrawRequestController(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        return handleGet(req, res);
    } else if (req.method === 'POST') {
        return handlePost(req, res);
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
    try {
        const seller_withdraw_requests = await prisma.sellerWithdrawRequest.findMany({
            where: { user_id: Number(req.query.id) },
            orderBy: { id: 'desc' },
            take: 9
        });
        res.status(200).json(seller_withdraw_requests);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const { amount, message } = req.body;
    const userId = req.query.id;

    try {
        const seller_withdraw_request = await prisma.sellerWithdrawRequest.create({
            data: {
                user_id: Number(userId),
                amount,
                message,
                status: '0',
                viewed: '0'
            }
        });

        const users = await prisma.user.findMany({
            where: { OR: [{ id: Number(userId) }, { user_type: 'admin' }] }
        });

        // Sending notification
        // Replace the notification sending code with your actual notification sending mechanism
        // For example: notificationService.sendPayoutNotification(users, Auth.user(), amount, 'pending');

        res.status(201).json({ message: 'Request has been sent successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
