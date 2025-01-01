import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// export default async function SellerWithdrawRequestController(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'GET') {
//         return handleGet(req, res);
//     } else if (req.method === 'POST') {
//         return handlePost(req, res);
//     } else {
//         res.status(405).end(); // Method Not Allowed
//     }
// }

type createOrUpdateData = {
    id: number | null;
    user_id: number;
    value: string;
};

async function SellerWithdrawRequest(data: createOrUpdateData) {
    try {
        const seller_withdraw_requests = await prisma.seller_withdraw_requests.findMany({
            where: { user_id: Number(data.id) },
            orderBy: { id: 'desc' },
            take: 9
        });
        return { success: true, data: seller_withdraw_requests };
        // res.status(200).json(seller_withdraw_requests);
    } catch (error) {
        return { success: false, error };
        // console.error('Error:', error);
        // res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function createOrUpdateSellerWithdrawRequest(data: createOrUpdateData) {
    // const { amount, message } = req.body;
    // const userId = req.query.id;
    const userId = data.user_id;

    try {
        const seller_withdraw_request = await prisma.seller_withdraw_requests.create({
            data: {
                user_id: Number(userId),
                amount,
                message,
                status: '0',
                viewed: '0'
            }
        });

        const users = await prisma.users.findMany({
            where: { OR: [{ id: Number(userId) }, { user_type: 'admin' }] }
        });

        // Sending notification
        // Replace the notification sending code with your actual notification sending mechanism
        // For example: notificationService.sendPayoutNotification(users, Auth.user(), amount, 'pending');
        return { success: true, data: users };
        // res.status(201).json({ message: 'Request has been sent successfully' });
    } catch (error) {
        return { success: false, error };
        // console.error('Error:', error);
        // res.status(500).json({ message: 'Internal Server Error' });
    }
}
